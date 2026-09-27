import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { routes } from "@/config/routes";
import { formatPostDate } from "@/lib/blog/utils";
import type { BlogPostSummary } from "@/lib/blog/types";

/** Blog index header plus the featured post as a large split card. */
export function BlogHero({ featured }: { featured?: BlogPostSummary }) {
  return (
    <section className="relative isolate overflow-clip bg-background pb-16 pt-36 text-foreground lg:pb-20 lg:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_30%_20%,black_15%,transparent_65%)]"
      />
      <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 size-[620px] rounded-full bg-primary/10 blur-[120px]" />
      <DecorativeLines variant="top-right" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Blog</p>
            <h1 className="mt-6 max-w-[16ch] text-display-sm font-semibold text-balance sm:text-display">
              Insights for{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
                Radiology Teams
              </span>
            </h1>
          </div>
          <p className="max-w-[48ch] text-lead text-foreground-muted lg:col-span-5 lg:pb-2">
            Practical perspectives on teleradiology, reporting workflows, coverage models, and healthcare operations.
          </p>
        </div>

        {featured && (
          <Link
            href={routes.blogPost(featured.slug)}
            className="group mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:mt-20 lg:grid-cols-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src={featured.cover.src}
                alt={featured.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">Featured</span>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{featured.category.name}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-foreground-muted lg:text-lg">{featured.excerpt}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
                <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
                <span aria-hidden="true"> · </span>
                {featured.readingMinutes} min read
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}
      </Container>
    </section>
  );
}
