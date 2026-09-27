import type { Metadata } from "next";
import { routes } from "@/config/routes";
import { getCategories, getPosts } from "@/lib/blog";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { PostGrid } from "@/components/sections/blog/post-grid";
import { BlogCta } from "@/components/sections/blog/blog-cta";

const TITLE = "Blog | Teleradiology & Healthcare Insights | WE Healthcare";
const DESCRIPTION =
  "Articles from WE Healthcare on teleradiology, radiology reporting workflows, coverage models, and healthcare operations.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: routes.blog },
  openGraph: { title: TITLE, description: DESCRIPTION, url: routes.blog, type: "website" },
};

// Re-check the source at most every 5 minutes (ISR). Matters once posts come from the CMS.
export const revalidate = 300;

export default async function Page() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <BlogHero featured={featured} />
      <PostGrid posts={rest} categories={categories} />
      <BlogCta />
    </main>
  );
}
