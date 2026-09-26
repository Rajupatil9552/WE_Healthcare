"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { CBCT_WORKFLOW_CONTENT as CONTENT } from "@/content/cbct";

const LAST = CONTENT.steps.length - 1;

/**
 * How It Works as a ring: the six steps sit around a circle, echoing the
 * CBCT gantry, and light in sequence while visible. Below lg it becomes a
 * vertical list. Reduced motion shows every step complete.
 */
export function CbctWorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [step] = useAutoCycle(CONTENT.steps.length, ref, 1300, 1300);
  const current = reduce ? LAST : step;

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.intro}</p>
          </div>

          <div ref={ref} className="lg:col-span-8">
            {/* Ring (lg+) */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] lg:block">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" fill="none">
                <circle cx="50" cy="50" r="38" stroke="var(--color-border)" strokeWidth="0.6" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="var(--color-primary)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: (current + 1) / CONTENT.steps.length }}
                  transition={{ duration: 0.6, ease: MOTION.easeOut }}
                />
              </svg>
              <div className="absolute inset-[30%] grid place-items-center rounded-full bg-surface text-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Step</p>
                  <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-primary">
                    {String(current + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <ol>
                {CONTENT.steps.map((s, i) => {
                  const a = ((i / CONTENT.steps.length) * 360 - 90) * (Math.PI / 180);
                  const x = Math.round((50 + 38 * Math.cos(a)) * 100) / 100;
                  const y = Math.round((50 + 38 * Math.sin(a)) * 100) / 100;
                  const done = current >= i;
                  return (
                    <li
                      key={s.id}
                      aria-current={current === i ? "step" : undefined}
                      className="absolute w-40 -translate-x-1/2 -translate-y-1/2 text-center"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mx-auto grid size-8 place-items-center rounded-full border-2 bg-background font-mono text-xs transition-colors duration-300",
                          current === i ? "border-primary bg-primary text-on-primary" : done ? "border-primary text-primary" : "border-border-strong text-foreground-subtle"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className={cn("mt-2 block rounded-md bg-background/90 px-1 text-sm font-semibold leading-snug transition-colors", done ? "text-foreground" : "text-foreground-subtle")}>
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* List (below lg) */}
            <ol className="relative lg:hidden">
              <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-4 w-0.5 bg-border" />
              {CONTENT.steps.map((s, i) => {
                const done = current >= i;
                return (
                  <li key={s.id} className="relative flex items-center gap-4 pb-6 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative grid size-8 shrink-0 place-items-center rounded-full border-2 bg-background font-mono text-xs transition-colors duration-300",
                        current === i ? "border-primary bg-primary text-on-primary" : done ? "border-primary text-primary" : "border-border-strong text-foreground-subtle"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("text-base font-semibold transition-colors", done ? "text-foreground" : "text-foreground-subtle")}>{s.label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CbctWorkflowSection;
