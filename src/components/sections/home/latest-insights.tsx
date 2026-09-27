import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { formatPostDate, getPosts } from "@/lib/blog";
import type { BlogPostSummary } from "@/lib/blog/types";
import { PostCard } from "@/components/sections/blog/post-card";
import { cn } from "@/lib/utils";

/** Homepage teaser for the blog: newest post large, the next two as compact rows. */
export async function LatestInsights() {
  const [lead, ...rest] = (await getPosts()).slice(0, 3);
  if (!lead) return null;

  return (
    <section id="insights" className="relative scroll-mt-24 overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">From the Blog</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">Latest Insights</RevealHeading>
            <p className="mt-5 text-lead text-foreground-muted">
              Practical perspectives on teleradiology, reporting workflows, and healthcare operations.
            </p>
          </div>
          <Link href={routes.blog} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group self-start lg:self-auto")}>
            View All Articles
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PostCard post={lead} />
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((post) => (
              <li key={post.slug}>
                <CompactPostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function CompactPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={routes.blogPost(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-row"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-950 lg:aspect-auto lg:w-2/5">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
          <span className="text-primary">{post.category.name}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
          Read article
          <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default LatestInsights;
