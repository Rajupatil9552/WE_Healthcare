"use client";

import { useEffect, useId } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import type { UsImage } from "@/content/ultrasound";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/* Display geometry in a 400 x 300 viewBox. */
const W = 400;
const H = 300;

/* Curved array: fan from an apex near the top, +/-38 deg. */
const AX = 200;
const AY = 12;
const R = 282;
const HALF = 38;
/**
 * Rounded so server and browser produce identical path strings: Math.sin/cos
 * can differ in the last digits between Node and the browser, which would
 * break hydration.
 */
const round = (n: number) => Math.round(n * 100) / 100;
const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [round(AX + r * Math.sin(a)), round(AY + r * Math.cos(a))] as const;
};
const [lx, ly] = polar(-HALF, R);
const [rx, ry] = polar(HALF, R);
const [ilx, ily] = polar(-HALF, 18);
const [irx, iry] = polar(HALF, 18);
const FAN = `M${ilx} ${ily} A18 18 0 0 0 ${irx} ${iry} L${rx} ${ry} A${R} ${R} 0 0 1 ${lx} ${ly} Z`;

/* Linear array: flat probe face, rectangular field. */
const LIN = { x: 40, y: 18, w: 320, h: 266 };
const RECT = `M${LIN.x} ${LIN.y} H${LIN.x + LIN.w} V${LIN.y + LIN.h} H${LIN.x} Z`;

type Box = { x: number; y: number; w: number; h: number };
const BOX: Record<UsImage["probe"], Box> = {
  curved: { x: 26, y: 12, w: 348, h: 282 },
  linear: LIN,
  native: { x: 0, y: 0, w: W, h: H },
};

/** Where the image lands inside its box (cover for probe shapes, contain for native). */
function place(image: UsImage): Box {
  const box = BOX[image.probe];
  const fit = image.probe === "native" ? Math.min : Math.max;
  const s = fit(box.w / image.width, box.h / image.height);
  const w = image.width * s;
  const h = image.height * s;
  return { x: round(box.x + (box.w - w) / 2), y: round(box.y + (box.h - h) / 2), w: round(w), h: round(h) };
}

const TICKS = Array.from({ length: 9 }, (_, i) => 30 + i * 30);

type SectorViewerProps = {
  image: UsImage;
  /** Top-left mono label, e.g. "US · ABD". */
  label?: string;
  /** Top-right mono label. */
  detail?: string;
  tone?: "default" | "urgent";
  /** Sweep the beam when the image changes (off for static thumbnails). */
  sweep?: boolean;
  /** Show anatomy labels (labels hide below `sm`; dots stay). */
  labels?: boolean;
  /** Show the "Illustrative" caption. */
  caption?: boolean;
  className?: string;
};

/**
 * Ultrasound display shaped by the probe that made the image (curved fan,
 * linear rectangle, or the image's own endocavitary shape), with anatomy
 * labels and a beam that sweeps once whenever the image changes.
 */
export function SectorViewer({
  image,
  label,
  detail,
  tone = "default",
  sweep = true,
  labels = true,
  caption = true,
  className,
}: SectorViewerProps) {
  const uid = useId().replace(/:/g, "");
  const reduce = usePrefersReducedMotion();
  const animateSweep = sweep && !reduce && image.probe !== "native";
  const progress = useMotionValue(1);

  useEffect(() => {
    if (!animateSweep) return;
    progress.jump(0);
    const controls = animate(progress, 1, { duration: 1.5, ease: [0.4, 0, 0.2, 1] });
    return () => controls.stop();
  }, [image.src, animateSweep, progress]);

  // Curved: beam rotates across the fan. Linear: beam slides across the rectangle.
  const beamLine = useTransform(progress, (t) => {
    if (image.probe === "linear") {
      const x = round(LIN.x - 10 + t * (LIN.w + 30));
      return `M${x} ${LIN.y} L${x} ${LIN.y + LIN.h}`;
    }
    const [x, y] = polar(-HALF - 6 + t * (2 * HALF + 16), R);
    return `M${AX} ${AY} L${x} ${y}`;
  });
  const beamWake = useTransform(progress, (t) => {
    if (image.probe === "linear") {
      const x = round(LIN.x - 10 + t * (LIN.w + 30));
      return `M${x - 34} ${LIN.y} H${x} V${LIN.y + LIN.h} H${x - 34} Z`;
    }
    const a = -HALF - 6 + t * (2 * HALF + 16);
    const [x1, y1] = polar(a - 9, R);
    const [x2, y2] = polar(a, R);
    return `M${AX} ${AY} L${x1} ${y1} A${R} ${R} 0 0 0 ${x2} ${y2} Z`;
  });

  const at = place(image);
  const clip = image.probe === "curved" ? FAN : image.probe === "linear" ? RECT : null;
  const outline = tone === "urgent" ? "rgb(251 113 133 / 0.55)" : "rgb(125 211 252 / 0.35)";

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-black", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={image.alt}>
        <defs>
          {clip && (
            <clipPath id={`${uid}-field`}>
              <path d={clip} />
            </clipPath>
          )}
          <linearGradient id={`${uid}-wake`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(186 230 253)" stopOpacity="0" />
            <stop offset="1" stopColor="rgb(186 230 253)" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <g clipPath={clip ? `url(#${uid}-field)` : undefined}>
          <AnimatePresence initial={false}>
            <motion.image
              key={image.src}
              href={image.src}
              x={at.x}
              y={at.y}
              width={at.w}
              height={at.h}
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          {animateSweep && (
            <>
              <motion.path d={beamWake} fill={`url(#${uid}-wake)`} />
              <motion.path d={beamLine} stroke="rgb(186 230 253 / 0.9)" strokeWidth="1.2" />
            </>
          )}
        </g>

        {clip && <path d={clip} fill="none" stroke={outline} strokeWidth="1" />}
        {image.probe !== "native" && (
          <>
            <line x1={W - 14} x2={W - 14} y1={AY + 10} y2={H - 12} stroke="rgb(255 255 255 / 0.18)" />
            {TICKS.map((y) => (
              <line key={y} x1={W - 18} x2={W - 14} y1={y} y2={y} stroke="rgb(255 255 255 / 0.35)" />
            ))}
          </>
        )}
      </svg>

      {/* Anatomy labels: positioned in % of the frame, so they track the image at any size */}
      {labels && (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={image.src} aria-hidden="true" className="pointer-events-none absolute inset-0">
            {image.points.map((point, i) => {
              const left = round(((at.x + (point.x / 100) * at.w) / W) * 100);
              const top = round(((at.y + (point.y / 100) * at.h) / H) * 100);
              const toLeft = point.side === "left";
              return (
                <div
                  key={point.label}
                  className="absolute"
                  style={{ left: `${left}%`, top: `${top}%`, transform: toLeft ? "translate(calc(-100% + 4px), -50%)" : "translate(-4px, -50%)" }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: toLeft ? 6 : -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 + i * 0.1, ease: MOTION.easeOut }}
                    className={cn("flex items-center", toLeft && "flex-row-reverse")}
                  >
                    <span className="block size-2 shrink-0 rounded-full border border-sky-300 bg-sky-300/30" />
                    <span className="block h-px w-3 shrink-0 bg-sky-300/70 sm:w-5" />
                    <span className="hidden whitespace-nowrap rounded-[3px] bg-slate-950/75 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sky-100 sm:block">
                      {point.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {label && (
        <p
          className={cn(
            "pointer-events-none absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]",
            tone === "urgent" ? "text-rose-200" : "text-sky-100/85"
          )}
        >
          {label}
        </p>
      )}
      {detail && (
        <p className="pointer-events-none absolute right-8 top-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55 sm:text-[11px]">
          {detail}
        </p>
      )}
      {caption && (
        <p className="pointer-events-none absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          Illustrative · Non-PHI
        </p>
      )}
    </div>
  );
}
