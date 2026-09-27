import { BLOG_POSTS } from "@/content/blog-posts";
import type { BlogCategory, BlogPost, BlogPostSummary } from "./types";
import { readingMinutes } from "./utils";

export type * from "./types";
export * from "./utils";

/**
 * Blog data access (server only). Pages call only these functions, so moving
 * to the CMS means replacing `fetchAllPosts` / `fetchPost` and nothing else.
 *
 * TODO(cms): swap the local dummy data for the admin-panel API, e.g.
 *   fetch(`${process.env.CMS_URL}/posts?status=published`, { next: { tags: ["blog"] } })
 * and call revalidateTag("blog") from a publish webhook.
 */
async function fetchAllPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS;
}

async function fetchPost(slug: string): Promise<BlogPost | undefined> {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

function toSummary(post: BlogPost): BlogPostSummary {
  const summary: Partial<BlogPost> = { ...post };
  delete summary.content;
  return { ...(summary as Omit<BlogPost, "content">), readingMinutes: readingMinutes(post) };
}

const byNewest = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/** All published posts, newest first. */
export async function getPosts(): Promise<BlogPostSummary[]> {
  return [...(await fetchAllPosts())].sort(byNewest).map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return fetchPost(slug);
}

export async function getPostSlugs(): Promise<string[]> {
  return (await fetchAllPosts()).map((p) => p.slug);
}

/** Categories that have at least one post, in newest-post order. */
export async function getCategories(): Promise<BlogCategory[]> {
  const seen = new Map<string, BlogCategory>();
  for (const p of await getPosts()) seen.set(p.category.slug, p.category);
  return [...seen.values()];
}

/** Same category first, then most shared tags, then newest. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const score = (p: BlogPostSummary) =>
    (p.category.slug === post.category.slug ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return (await getPosts())
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || byNewest(a, b))
    .slice(0, limit);
}
