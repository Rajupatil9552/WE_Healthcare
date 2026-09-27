import type { BlogBlock, BlogPost, BlogTocItem } from "./types";

/* Pure helpers, safe to import from client components (no data access). */

const WORDS_PER_MINUTE = 220;

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "list":
      return block.items.join(" ");
    case "image":
      return block.caption ?? "";
    case "callout":
      return `${block.title ?? ""} ${block.text}`;
    default:
      return block.text;
  }
}

export function readingMinutes(post: BlogPost): number {
  const words = post.content.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Stable anchor id for a heading. Used by both the TOC and the renderer. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getToc(post: BlogPost): BlogTocItem[] {
  return post.content
    .filter((b): b is Extract<BlogBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: headingId(b.text), text: b.text, level: b.level ?? 2 }));
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
