"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { cn } from "@/lib/utils";
import { EXPERTISE as CONTENT } from "@/content/quality";
import { SectionNote } from "./section-note";

const EXAMPLES = CONTENT.examples;

/**
 * Subspecialty matcher: choose an example study and the matching
 * subspecialty lights up while the others dim. Cycles in view.
 */
export function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, select] = useAutoCycle(EXAMPLES.length, ref, 2400, 7000);
  const match = EXAMPLES[active].match;

  return (
    <section ref={ref} id="radiologists" className="relative overflow-clip scroll-mt-24 border-t border-border bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">01 · Our Radiologists</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          </div>
          <p className="text-lead text-foreground-muted lg:col-span-5">{CONTENT.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Example studies */}
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">Example study · choose one</p>
            <div role="group" aria-label="Example studies" className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
              {EXAMPLES.map((ex, i) => {
                const on = i === active;
                return (
                  <button
                    key={ex.study}
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(i)}
                    className={cn(
                      "relative flex items-center justify-between gap-3 overflow-hidden rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:rounded-lg lg:py-3",
                      on ? "border-primary bg-primary text-on-primary" : "border-border bg-card text-foreground-muted hover:border-border-strong hover:text-foreground"
                    )}
                  >
                    {ex.study}
                    <ArrowRight size={14} weight="bold" aria-hidden="true" className={cn("hidden transition-opacity lg:block", on ? "opacity-100" : "opacity-0")} />
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-foreground-subtle">Illustrative example of subspecialty matching.</p>
          </div>

          {/* Subspecialties */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8" aria-live="polite">
            {CONTENT.subspecialties.map((s) => {
              const on = s.id === match;
              return (
                <li
                  key={s.id}
                  className={cn(
                    "relative overflow-hidden rounded-lg border bg-card transition-[opacity,border-color,box-shadow,transform] duration-500",
                    on ? "z-10 scale-[1.03] border-primary opacity-100 shadow-lg" : "border-border opacity-60"
                  )}
                >
                  <div className="relative aspect-[4/3] bg-slate-950">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, 200px"
                      className={cn("object-cover transition-[filter,transform] duration-700", on ? "scale-105 grayscale-0" : "grayscale")}
                    />
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[11px] font-semibold text-white shadow"
                        >
                          <CheckCircle size={12} weight="fill" aria-hidden="true" />
                          Matched
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className={cn("px-3 py-2.5 text-sm font-semibold leading-snug", on ? "text-foreground" : "text-foreground-muted")}>{s.label}</p>
                  <span className="sr-only">{on ? `Matched to ${EXAMPLES[active].study}` : ""}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionNote>{CONTENT.note}</SectionNote>
          <Link
            href={CONTENT.cta.href}
            className="group inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">{CONTENT.cta.label}</span>
            <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default ExpertiseSection;
