#!/usr/bin/env node
/**
 * Pre-deployment asset + code cleanup.
 *
 *   node scripts/optimize-assets.mjs            dry run: report only, changes nothing
 *   node scripts/optimize-assets.mjs --apply    perform the changes
 *
 * Options:
 *   --only=prune-assets,images,videos,prune-code   run a subset of steps (default: all)
 *   --quality=80        WebP quality (1-100)
 *   --max-width=2560    downscale images wider than this
 *   --keep=<paths>      extra public paths to never prune (comma separated, substring match)
 *   --skip-convert=<paths>  public paths to leave in their original format
 *                       (default: /images/branding/ - logos double as PNG favicon /
 *                       apple-touch-icon in app/layout.tsx, which must stay PNG)
 *
 * Steps (in order):
 *   1. prune-assets  Move files in public/images and public/videos that no source file
 *                    references (by full path or file name) to the backup folder.
 *   2. images        Convert .jpg/.jpeg/.png in public/images to .webp and rewrite every
 *                    reference in src/ (and next.config.ts). Unsafe file names are slugified.
 *   3. videos        For each .mp4 in public/videos, write a .webm (VP9) next to it and
 *                    re-encode the .mp4 fallback to <=1080p H.264 if it is larger than that.
 *                    Components list the .webm first and fall back to the .mp4 (Safari/iOS).
 *                    Needs ffmpeg: FFMPEG_PATH, ffmpeg on PATH, or `npm i -D ffmpeg-static`.
 *   4. prune-code    Move .ts/.tsx/.js/.jsx/.css files under src/ that are not reachable
 *                    from any Next.js entry point (pages, layouts, routes, ...) to the backup.
 *
 * Nothing is hard-deleted: removed/replaced files go to .optimize-backup/<timestamp>/
 * (git-ignored). Review the site, then delete that folder.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(ROOT, "src");
const STAMP = new Date().toISOString().replace(/[:.]/g, "-");
const BACKUP = path.join(ROOT, ".optimize-backup", STAMP);

/* ------------------------------------------------------------------ */
/* CLI                                                                  */
/* ------------------------------------------------------------------ */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const APPLY = Boolean(args.apply);
const STEPS = new Set(String(args.only ?? "prune-assets,images,videos,prune-code").split(","));
const QUALITY = Number(args.quality ?? 80);
const MAX_WIDTH = Number(args["max-width"] ?? 2560);
const EXTRA_KEEP = String(args.keep ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SKIP_CONVERT = String(args["skip-convert"] ?? "/images/branding/")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const ASSET_DIRS = ["images", "videos"].map((d) => path.join(PUBLIC, d));
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json", ".md", ".mdx"]);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const publicUrl = (p) => "/" + path.relative(PUBLIC, p).split(path.sep).join("/");
const kb = (n) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);
const size = (p) => (fs.existsSync(p) ? fs.statSync(p).size : 0);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Move a file into the backup folder (keeps its repo-relative path). */
function backup(p) {
  const dest = path.join(BACKUP, path.relative(ROOT, p));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(p, dest);
}

function sourceFiles() {
  const files = walk(SRC).filter((p) => TEXT_EXT.has(path.extname(p)));
  const cfg = path.join(ROOT, "next.config.ts");
  if (fs.existsSync(cfg)) files.push(cfg);
  return files;
}

function readSources() {
  return sourceFiles().map((p) => ({ path: p, text: fs.readFileSync(p, "utf8") }));
}

/** Every form a public file might be written as in code. */
function referenceForms(p) {
  const url = publicUrl(p);
  const base = path.basename(p);
  return [url, encodeURI(url), base, encodeURIComponent(base), base.replace(/ /g, "%20")];
}

/** File name safe for URLs; unchanged when it already is. */
function safeName(name) {
  if (/^[A-Za-z0-9._-]+$/.test(name)) return name;
  const ext = path.extname(name);
  const stem = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return stem + ext.toLowerCase();
}

const log = {
  h: (s) => console.log(`\n\x1b[1m${s}\x1b[0m`),
  i: (s) => console.log(`  ${s}`),
  warn: (s) => console.log(`  \x1b[33m! ${s}\x1b[0m`),
};

/* ------------------------------------------------------------------ */
/* 1. Unused public assets                                              */
/* ------------------------------------------------------------------ */

function findUnusedAssets(sources) {
  const all = ASSET_DIRS.flatMap((d) => walk(d)).filter((p) => path.basename(p) !== ".gitkeep");
  const haystack = sources.map((s) => s.text).join("\n");
  return all.filter((p) => {
    const url = publicUrl(p);
    if (EXTRA_KEEP.some((k) => url.includes(k))) return false;
    // Name-based match also catches paths assembled at runtime, e.g. `${IMG}/ct-head.webp`.
    return !referenceForms(p).some((form) => haystack.includes(form));
  });
}

/** Files step 1 removes; later steps skip them (matters in a dry run, where nothing moves). */
const pruned = new Set();

function stepPruneAssets() {
  log.h("1. Unused images and videos");
  const unused = findUnusedAssets(readSources());
  unused.forEach((p) => pruned.add(p));
  if (!unused.length) return log.i("None found.");
  let total = 0;
  for (const p of unused) {
    total += size(p);
    log.i(`${rel(p)}  (${kb(size(p))})`);
    if (APPLY) backup(p);
  }
  log.i(`${unused.length} file(s), ${kb(total)} ${APPLY ? "moved to backup" : "would be moved to backup"}.`);
}

/* ------------------------------------------------------------------ */
/* 2. Images -> WebP                                                    */
/* ------------------------------------------------------------------ */

async function stepImages() {
  log.h("2. Convert images to WebP");
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    return log.warn("`sharp` is not installed (npm i -D sharp). Skipping.");
  }

  const images = walk(path.join(PUBLIC, "images")).filter(
    (p) =>
      IMAGE_EXT.has(path.extname(p).toLowerCase()) &&
      !pruned.has(p) &&
      !SKIP_CONVERT.some((k) => publicUrl(p).includes(k))
  );
  if (!images.length) return log.i("No .jpg/.png images left to convert.");

  const renames = []; // [oldBasename, newBasename, oldUrl, newUrl]
  let before = 0;
  let after = 0;

  for (const src of images) {
    const outName = safeName(path.basename(src, path.extname(src)) + ".webp");
    const out = path.join(path.dirname(src), outName);
    if (fs.existsSync(out) && out !== src) {
      log.warn(`${rel(out)} already exists; leaving ${rel(src)} as is.`);
      continue;
    }
    before += size(src);
    if (APPLY) {
      const img = sharp(src, { failOn: "none" }).rotate();
      const meta = await img.metadata();
      if (meta.width && meta.width > MAX_WIDTH) img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      await img.webp({ quality: QUALITY, effort: 5, alphaQuality: 90 }).toFile(out);
      after += size(out);
      log.i(`${rel(src)} -> ${outName}  (${kb(size(src))} -> ${kb(size(out))})`);
      backup(src);
    } else {
      log.i(`${rel(src)} -> ${outName}  (${kb(size(src))})`);
    }
    renames.push([path.basename(src), outName, publicUrl(src), publicUrl(out)]);
  }

  // Rewrite references: full URLs (plain and encoded) and bare file names after a "/".
  const changed = [];
  for (const file of sourceFiles()) {
    const text = fs.readFileSync(file, "utf8");
    let next = text;
    for (const [oldBase, newBase, oldUrl, newUrl] of renames) {
      for (const form of new Set([oldUrl, encodeURI(oldUrl)])) next = next.split(form).join(newUrl);
      for (const form of new Set([oldBase, encodeURIComponent(oldBase), oldBase.replace(/ /g, "%20")])) {
        next = next.replace(new RegExp(`(?<=/)${escapeRe(form)}(?=["'\`?#)\\s])`, "g"), newBase);
      }
    }
    if (next !== text) {
      changed.push(rel(file));
      if (APPLY) fs.writeFileSync(file, next);
    }
  }

  log.i(`${renames.length} image(s)${APPLY ? `: ${kb(before)} -> ${kb(after)}` : `, ${kb(before)} total`}.`);
  log.i(`${changed.length} source file(s) ${APPLY ? "updated" : "would be updated"}${changed.length ? ":" : "."}`);
  changed.forEach((f) => log.i(`  ${f}`));
}

/* ------------------------------------------------------------------ */
/* 3. Videos -> WebM (+ lighter MP4 fallback)                           */
/* ------------------------------------------------------------------ */

async function findFfmpeg() {
  const candidates = [process.env.FFMPEG_PATH];
  try {
    candidates.push((await import("ffmpeg-static")).default);
  } catch {
    /* optional */
  }
  candidates.push("ffmpeg");
  for (const c of candidates.filter(Boolean)) {
    if (spawnSync(c, ["-version"], { stdio: "ignore" }).status === 0) return c;
  }
  return null;
}

function probe(ffmpeg, file) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-i", file], { encoding: "utf8" });
  const m = /Video:.*?(\d{2,5})x(\d{2,5})/.exec(r.stderr ?? "");
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

function run(ffmpeg, argv) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...argv], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg exited with ${r.status}`);
}

async function stepVideos() {
  log.h("3. Convert videos to WebM");
  const videos = walk(path.join(PUBLIC, "videos")).filter(
    (p) => path.extname(p).toLowerCase() === ".mp4" && !pruned.has(p)
  );
  if (!videos.length) return log.i("No .mp4 files found.");

  const ffmpeg = await findFfmpeg();
  if (!ffmpeg) {
    log.warn("ffmpeg not found. Install it (e.g. `winget install ffmpeg` or `npm i -D ffmpeg-static`) or set FFMPEG_PATH.");
    videos.forEach((v) => log.i(`would convert ${rel(v)} (${kb(size(v))})`));
    return;
  }

  // Cap long edge at 1080p-equivalent: plenty for a full-bleed background, far smaller files.
  const scale = "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'";

  for (const src of videos) {
    const webm = src.replace(/\.mp4$/i, ".webm");
    const dim = probe(ffmpeg, src);
    const oversized = dim ? Math.max(dim.width, dim.height) > 1920 : size(src) > 10 * 1024 * 1024;
    const plan = [`-> ${path.basename(webm)}`];
    if (oversized) plan.push("+ re-encode .mp4 fallback to 1080p");
    log.i(`${rel(src)} (${dim ? `${dim.width}x${dim.height}, ` : ""}${kb(size(src))}) ${plan.join(" ")}`);
    if (!APPLY) continue;

    if (fs.existsSync(webm)) backup(webm);
    run(ffmpeg, ["-i", src, "-vf", scale, "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-an", webm]);
    log.i(`   webm: ${kb(size(webm))}`);

    if (oversized) {
      const tmp = src.replace(/\.mp4$/i, ".tmp.mp4");
      run(ffmpeg, ["-i", src, "-vf", scale, "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", tmp]);
      backup(src);
      fs.renameSync(tmp, src);
      log.i(`   mp4:  ${kb(size(src))}`);
    }
  }
}

/* ------------------------------------------------------------------ */
/* 4. Unreachable source files                                          */
/* ------------------------------------------------------------------ */

const ENTRY_NAMES =
  /^(page|layout|template|loading|error|not-found|global-error|forbidden|unauthorized|route|default|sitemap|robots|manifest|opengraph-image|twitter-image|icon|apple-icon)\.(tsx?|jsx?|mjs)$/;
const ROOT_ENTRIES = ["middleware", "proxy", "instrumentation", "instrumentation-client"];
const RESOLVE_EXT = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"];
const IMPORT_RE =
  /(?:import|export)\s[^'"`;]*?from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']|require\(\s*["']([^"']+)["']\s*\)|@import\s+(?:url\()?["']([^"']+)["']/g;

function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null; // package import
  const tries = [base, ...RESOLVE_EXT.map((e) => base + e), ...RESOLVE_EXT.map((e) => path.join(base, "index" + e))];
  return tries.find((t) => fs.existsSync(t) && fs.statSync(t).isFile()) ?? null;
}

function stepPruneCode() {
  log.h("4. Unused source files");
  const all = walk(SRC).filter((p) => CODE_EXT.has(path.extname(p)) && !p.endsWith(".d.ts"));
  const entries = all.filter(
    (p) =>
      (p.startsWith(path.join(SRC, "app")) && ENTRY_NAMES.test(path.basename(p))) ||
      ROOT_ENTRIES.some((n) => RESOLVE_EXT.some((e) => p === path.join(SRC, n + e)))
  );
  const cfg = path.join(ROOT, "next.config.ts");
  if (fs.existsSync(cfg)) entries.push(cfg);

  const seen = new Set();
  const queue = [...entries];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(IMPORT_RE)) {
      const spec = m[1] ?? m[2] ?? m[3] ?? m[4] ?? m[5];
      const target = spec && resolveImport(spec, file);
      if (target && !seen.has(target)) queue.push(target);
    }
  }

  const unused = all.filter((p) => !seen.has(p));
  if (!unused.length) return log.i("None found.");
  for (const p of unused) {
    log.i(rel(p));
    if (APPLY) backup(p);
  }
  log.i(`${unused.length} file(s) ${APPLY ? "moved to backup" : "would be moved to backup"}.`);
}

/* ------------------------------------------------------------------ */

console.log(`\x1b[1m${APPLY ? "APPLY" : "DRY RUN (pass --apply to make changes)"}\x1b[0m  steps: ${[...STEPS].join(", ")}`);
if (APPLY) console.log(`Backup folder: ${rel(BACKUP)}`);

if (STEPS.has("prune-assets")) stepPruneAssets();
if (STEPS.has("images")) await stepImages();
if (STEPS.has("videos")) await stepVideos();
if (STEPS.has("prune-code")) stepPruneCode();

console.log(
  APPLY
    ? `\nDone. Run \`npm run build\`, check the site, then delete ${rel(path.dirname(BACKUP))} when happy.`
    : "\nDry run complete. Nothing was changed."
);
