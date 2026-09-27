import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/routes";
import { formatPostDate } from "@/lib/blog/utils";
import type { BlogPost } from "@/lib/blog/types";

/** Breadcrumb, title block and wide cover image. */
export function PostHeader({ post, readingMinutes }: { post: BlogPost; readingMinutes: number }) {
  const initials = post.author.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <header className="relative isolate overflow-clip bg-background pt-32 text-foreground lg:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_15%,transparent_70%)]"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-foreground-muted">
              <li>
                <Link href={routes.blog} className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <CaretRight size={12} />
              </li>
              <li>
                <span className="font-medium text-primary">{post.category.name}</span>
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-h2 font-semibold text-balance lg:text-[3.5rem] lg:leading-[1.08]">{post.title}</h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lead text-foreground-muted">{post.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <Image src={post.author.avatar.src} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
              ) : (
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                  {initials}
                </span>
              )}
              <span className="text-left">
                <span className="block font-semibold text-foreground">{post.author.name}</span>
                {post.author.role && <span className="block text-xs text-foreground-muted">{post.author.role}</span>}
              </span>
            </div>
            <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span aria-hidden="true"> · </span>
              {readingMinutes} min read
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-slate-950 shadow-xl ring-1 ring-border lg:mt-16 lg:aspect-[21/9]">
          <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(max-width: 1100px) 100vw, 1024px" className="object-cover" />
        </div>
      </Container>
    </header>
  );
}
