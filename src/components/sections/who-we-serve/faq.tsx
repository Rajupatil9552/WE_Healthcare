"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Question } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { WHO_WE_SERVE_FAQ as ITEMS } from "@/content/who-we-serve";

/**
 * Master-detail FAQ: questions on the left, the selected answer in a large
 * panel on the right (desktop). Below lg the answer opens inline under its
 * question instead. Each question is a disclosure button.
 */
export function WhoWeServeFaq() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const item = ITEMS[active];

  return (
    <section id="faqs" className="relative overflow-clip scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" className="top-1/4" />
      <Container className="relative">
        <p className="eyebrow">FAQs</p>
        <RevealHeading className="mt-4 max-w-[20ch] text-h2 font-semibold text-balance text-foreground">Frequently Asked Questions</RevealHeading>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <ul className="space-y-2 lg:col-span-6">
            {ITEMS.map((q, i) => {
              const selected = i === active;
              const panelId = `${uid}-a-${q.id}`;
              return (
                <li key={q.id}>
                  <button
                    type="button"
                    aria-expanded={selected}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-[background-color,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected
                        ? "border-primary/40 bg-primary-soft lg:translate-x-2"
                        : "border-transparent hover:border-border hover:bg-card"
                    )}
                  >
                    <span className={cn("font-mono text-xs tabular-nums", selected ? "text-primary" : "text-foreground-subtle")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("flex-1 text-base font-semibold sm:text-lg", selected ? "text-foreground" : "text-foreground-muted group-hover:text-foreground")}>
                      {q.question}
                    </span>
                    <ArrowRight
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className={cn("shrink-0 transition-[transform,opacity] duration-300", selected ? "rotate-90 text-primary lg:rotate-0" : "text-foreground-subtle opacity-0 group-hover:opacity-100")}
                    />
                  </button>

                  {/* Inline answer (mobile / tablet) */}
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: MOTION.easeOut }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="px-5 pb-4 pt-3 pl-14 text-base leading-relaxed text-foreground-muted">{q.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Answer panel (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-lg border border-border bg-card p-10 text-foreground shadow-md">
              <Question size={160} weight="thin" aria-hidden="true" className="absolute -right-8 -top-8 text-primary/10" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  id={`${uid}-panel`}
                  role="region"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: MOTION.easeOut }}
                  className="relative"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                    Answer {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance">{item.question}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{item.answer}</p>
                </motion.div>
              </AnimatePresence>
              {/* Progress pips */}
              <div className="relative mt-12 flex gap-1.5" aria-hidden="true">
                {ITEMS.map((q, i) => (
                  <span key={q.id} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-10 bg-primary" : "w-4 bg-border-strong")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServeFaq;
