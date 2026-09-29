import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { legalDocuments, type LegalBlock, type LegalDocument } from "@/content/legal";
import { cn } from "@/lib/utils";

interface LegalPageProps {
  doc: LegalDocument;
  href: string;
  /** Extra content under the intro, e.g. the Cookie Settings button. */
  action?: ReactNode;
}

/**
 * Shared layout for the Privacy Policy, Terms of Service and Cookie Policy:
 * title, "Last updated", intro, then numbered sections with a sticky
 * contents list on large screens.
 */
export function LegalPage({ doc, href, action }: LegalPageProps) {
  const others = legalDocuments.filter((d) => d.href !== href);

  return (
    <main className="flex-1">
      {/* Dark band keeps the transparent (white-text) header readable. */}
      <section className="bg-[#061421] pt-36 pb-14 lg:pt-44 lg:pb-16 text-white">
        <Container>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky-400">Legal</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{doc.title}</h1>
          <p className="mt-4 text-sm text-slate-400">
            Last updated: <RichText text={doc.lastUpdated} />
          </p>
        </Container>
      </section>

      <section className="bg-background py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label={`${doc.title} contents`} className="sticky top-28">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-foreground-subtle">Contents</p>
              <ol className="mt-4 space-y-1 border-l border-border">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex gap-2.5 border-l-2 border-transparent py-1.5 pl-4 text-sm text-foreground-muted transition-colors hover:border-primary hover:text-foreground"
                    >
                      <span className="font-mono text-[11px] tabular-nums text-foreground-subtle pt-0.5">{i + 1}.</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl text-[15px] leading-relaxed text-foreground-muted">
            <div className="space-y-4 text-base text-foreground">
              {doc.intro.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
            {action && <div className="mt-6">{action}</div>}

            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mt-12 scroll-mt-28">
                <h2 id={`${s.id}-heading`} className="flex gap-3 text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                  <span className="font-mono text-base sm:text-lg text-primary pt-0.5 sm:pt-1">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </section>
            ))}

            <nav aria-label="Other legal pages" className="mt-16 border-t border-border pt-8">
              <p className="text-sm font-semibold text-foreground">Related policies</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.href}>
                    <Link
                      href={o.href}
                      className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary hover:bg-primary-soft transition-colors"
                    >
                      {o.doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </article>
        </Container>
      </section>
    </main>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p>
        <RichText text={block} />
      </p>
    );
  }
  if ("subheading" in block) {
    return <h3 className="pt-2 text-base font-semibold text-foreground">{block.subheading}</h3>;
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2 pl-5 list-disc marker:text-primary">
        {block.list.map((item, i) => (
          <li key={i} className="pl-1">
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  const { caption, head, rows } = block.table;
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border-strong">
            {head.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border align-top">
              {row.map((cell, j) => (
                <td key={j} className={cn("py-3 pr-4", j === 0 && "font-mono text-[13px] text-foreground")}>
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** `[label](href)` becomes a link; any other `[text]` is a placeholder, highlighted until replaced. */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\[([^\]]+)\]/g;

function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    parts.push(text.slice(last, m.index));
    if (m[2]) {
      const external = /^https?:/.test(m[2]);
      parts.push(
        external ? (
          <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary-strong">
            {m[1]}
          </a>
        ) : (
          <Link key={m.index} href={m[2]} className="font-medium text-primary underline underline-offset-2 hover:text-primary-strong">
            {m[1]}
          </Link>
        )
      );
    } else {
      parts.push(
        <mark key={m.index} className="rounded-sm bg-yellow-200 px-1 text-slate-900">
          [{m[3]}]
        </mark>
      );
    }
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
