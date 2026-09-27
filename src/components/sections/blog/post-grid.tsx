"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPostSummary } from "@/lib/blog/types";
import { PostCard } from "./post-card";

const ALL = "all";

/** Category filter + card grid. Filtering is client-side over the posts passed in. */
export function PostGrid({ posts, categories }: { posts: BlogPostSummary[]; categories: BlogCategory[] }) {
  const [active, setActive] = useState(ALL);
  const visible = useMemo(() => (active === ALL ? posts : posts.filter((p) => p.category.slug === active)), [active, posts]);
  const filters = [{ slug: ALL, name: "All" }, ...categories];

  return (
    <section id="articles" className="relative scroll-mt-24 overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Latest Articles</p>
            <h2 className="mt-4 text-h2 font-semibold tracking-tight text-foreground">Browse the Blog</h2>
          </div>

          <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
            {filters.map((c) => {
              const on = c.slug === active;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.slug)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    on ? "border-primary bg-primary text-on-primary" : "border-border-strong bg-card text-foreground hover:bg-surface-muted"
                  )}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {visible.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {visible.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 rounded-lg border border-dashed border-border-strong p-10 text-center text-foreground-muted">
            No articles in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}
