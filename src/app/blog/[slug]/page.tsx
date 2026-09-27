import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/routes";
import { getPostBySlug, getPostSlugs, getRelatedPosts, getToc, readingMinutes } from "@/lib/blog";
import { SITE_URL, buildBlogPostingJsonLd } from "@/lib/structured-data";
import { PostHeader } from "@/components/sections/blog/post-header";
import { PostBody } from "@/components/sections/blog/post-body";
import { PostAside, ShareLinks } from "@/components/sections/blog/post-aside";
import { RelatedPosts } from "@/components/sections/blog/related-posts";
import { BlogCta } from "@/components/sections/blog/blog-cta";

type Props = { params: Promise<{ slug: string }> };

// One route serves every post. Known slugs are prerendered at build; slugs
// published later (from the CMS) render on first request, then are cached.
// Unknown slugs 404 via notFound().
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  const title = post.seo?.title ?? `${post.title} | WE Healthcare`;
  const description = post.seo?.description ?? post.excerpt;
  const url = routes.blogPost(post.slug);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      section: post.category.name,
      tags: post.tags,
      images: [{ url: post.cover.src, alt: post.cover.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [post.cover.src] },
  };
}

export default async function Page({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  const [related, toc] = await Promise.all([getRelatedPosts(post), getToc(post)]);
  const url = `${SITE_URL}${routes.blogPost(post.slug)}`;
  const jsonLd = buildBlogPostingJsonLd(post);

  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <PostHeader post={post} readingMinutes={readingMinutes(post)} />

        <Container className="py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-8 lg:col-start-2 xl:col-span-7 xl:col-start-2">
              <PostBody blocks={post.content} />

              {/* Tags + share (share also sits in the sidebar on desktop) */}
              <footer className="mt-16 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-start sm:justify-between">
                {post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="lg:hidden">
                  <ShareLinks title={post.title} url={url} />
                </div>
              </footer>
            </div>

            <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <PostAside toc={toc} title={post.title} url={url} />
            </aside>
          </div>
        </Container>
      </article>

      <RelatedPosts posts={related} />
      <BlogCta />
    </main>
  );
}
