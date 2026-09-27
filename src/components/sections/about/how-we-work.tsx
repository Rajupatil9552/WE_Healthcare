"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HOW_WE_WORK as CONTENT } from "@/content/about";

/**
 * Vertical timeline. Desktop: steps alternate either side of a center line that
 * draws in on scroll. Mobile: a single left-hand rail.
 */
export function HowWeWork() {
  return (
    <section className="relative overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <DecorativeLines variant="left" className="top-3/4" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{CONTENT.eyebrow}</p>
          <RevealHeading className="mx-auto mt-4 max-w-[20ch] text-h2 font-semibold text-balance text-foreground">
            {CONTENT.heading}
          </RevealHeading>
          <p className="mt-6 text-lead text-foreground-muted">{CONTENT.body}</p>
        </div>

        <ol className="relative mx-auto mt-16 max-w-5xl lg:mt-20">
          {/* Rail: left on mobile, centered on desktop */}
          <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.6, ease: MOTION.easeOut }}
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-primary/10 lg:left-1/2 lg:-translate-x-1/2"
          />

          {CONTENT.steps.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-6 pb-12 last:pb-0 lg:grid-cols-2 lg:gap-0 lg:pb-16">
                {/* Node */}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-primary/40 bg-card font-mono text-sm font-semibold tabular-nums text-primary shadow-sm lg:absolute lg:left-1/2 lg:top-4 lg:-translate-x-1/2">
                  0{i + 1}
                </span>

                <motion.div
                  initial={{ opacity: 0, x: right ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: MOTION.easeOut }}
                  className={cn(
                    "rounded-lg border border-border bg-card p-6 shadow-sm lg:p-8",
                    right ? "lg:col-start-2 lg:ml-16" : "lg:col-start-1 lg:mr-16"
                  )}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Step 0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-3 text-base text-foreground-muted">{step.body}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

export default HowWeWork;
