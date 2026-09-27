"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlass, Minus, Plus, X } from "@phosphor-icons/react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { TECH_FAQ as ITEMS, TECH_CTA } from "@/content/technology-security";

/** Wrap matches of `q` in <mark>. */
function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-primary/15 text-inherit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/**
 * Searchable FAQ: a filter box narrows questions (matching question or
 * answer) and highlights the match; answers expand as a disclosure list.
 */
export function TechFaq() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(ITEMS[0].id);
  const uid = useId();
  const q = query.trim();

  const results = useMemo(
    () => ITEMS.filter((f) => !q || `${f.question} ${f.answer}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <section id="faqs" className="relative overflow-clip scroll-mt-24 bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQs</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">Frequently Asked Questions</RevealHeading>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted">
              Can&apos;t find what you need?{" "}
              <Link href={TECH_CTA.cta.href} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                Ask our team
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-8">
            {/* Search */}
            <div className="relative">
              <label htmlFor={`${uid}-search`} className="sr-only">
                Search technology questions
              </label>
              <MagnifyingGlass size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
              <input
                id={`${uid}-search`}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: PACS, DICOM, encryption, documentation…"
                className="h-13 w-full rounded-full border border-border-strong bg-card pl-11 pr-11 text-base text-foreground placeholder:text-foreground-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-foreground-subtle hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X size={14} weight="bold" />
                </button>
              )}
            </div>
            <p className="mt-3 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle" aria-live="polite">
              {q ? `${results.length} of ${ITEMS.length} questions` : `${ITEMS.length} questions`}
            </p>

            <ul className="mt-4 space-y-3">
              <AnimatePresence initial={false}>
                {results.map((f) => {
                  const isOpen = open === f.id || (!!q && results.length === 1);
                  const panelId = `${uid}-p-${f.id}`;
                  return (
                    <motion.li
                      key={f.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: MOTION.easeOut }}
                      className={cn(
                        "overflow-hidden rounded-lg border transition-colors duration-300",
                        isOpen ? "border-primary/40 bg-card shadow-sm" : "border-border bg-card hover:border-border-strong"
                      )}
                    >
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : f.id)}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                        >
                          <span className="flex-1 text-base font-semibold text-foreground sm:text-lg">{highlight(f.question, q)}</span>
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                              isOpen ? "bg-primary text-on-primary" : "bg-surface-muted text-foreground-muted"
                            )}
                          >
                            {isOpen ? <Minus size={14} weight="bold" aria-hidden="true" /> : <Plus size={14} weight="bold" aria-hidden="true" />}
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: MOTION.easeOut }}
                          >
                            <p className="px-5 pb-5 text-base leading-relaxed text-foreground-muted">{highlight(f.answer, q)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {results.length === 0 && (
              <div className="mt-4 rounded-lg border border-dashed border-border-strong px-5 py-8 text-center">
                <p className="text-base font-medium text-foreground">No questions match “{q}”.</p>
                <p className="mt-1 text-sm text-foreground-muted">
                  <Link href={TECH_CTA.cta.href} className="font-semibold text-primary underline underline-offset-4">
                    Ask our team directly
                  </Link>{" "}
                  and we&apos;ll help with your integration questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TechFaq;
