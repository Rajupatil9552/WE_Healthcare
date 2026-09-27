/**
 * Blog content model. Shaped like a headless-CMS response so the admin panel
 * can map onto it directly: the pages only ever see these types.
 */

export type BlogImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BlogCategory = {
  slug: string;
  name: string;
};

export type BlogAuthor = {
  name: string;
  role?: string;
  avatar?: BlogImage;
};

/**
 * Post body as typed blocks rather than raw HTML: renders without
 * `dangerouslySetInnerHTML`, and most CMS rich-text formats map onto it.
 */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; image: BlogImage; caption?: string }
  | { type: "callout"; title?: string; text: string };

export type BlogPost = {
  /** URL segment: /blog/{slug}. Unique. */
  slug: string;
  title: string;
  excerpt: string;
  cover: BlogImage;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  /** ISO 8601 */
  publishedAt: string;
  /** ISO 8601 */
  updatedAt?: string;
  featured?: boolean;
  /** Overrides for <title> / meta description; fall back to title / excerpt. */
  seo?: { title?: string; description?: string };
  content: BlogBlock[];
};

/** Listing shape: everything but the body. */
export type BlogPostSummary = Omit<BlogPost, "content"> & { readingMinutes: number };

/** A heading pulled from the body for the table of contents. */
export type BlogTocItem = { id: string; text: string; level: 2 | 3 };
