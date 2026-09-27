import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { routes } from "@/config/routes";
import type { BlogPostSummary } from "@/lib/blog/types";
import { PostCard } from "./post-card";

export function RelatedPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (!posts.length) return null;
  return (
    <section className="relative overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Keep Reading</p>
            <h2 className="mt-4 text-h2 font-semibold tracking-tight text-foreground">Related Articles</h2>
          </div>
          <Link href={routes.blog} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
            All articles
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
