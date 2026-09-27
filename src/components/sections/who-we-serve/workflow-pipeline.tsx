"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Info } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { WORKFLOW as CONTENT } from "@/content/who-we-serve";

const STEPS = CONTENT.steps;
const LAST = STEPS.length - 1;

/**
 * Seven-step pipeline driven by scroll: the track fills and each station
 * lights up as the "study" reaches it. Hover/focus pins a station's detail;
 * otherwise the readout follows scroll. Reduced motion shows every step lit.
 */
export function WorkflowPipeline() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const headLeft = useTransform(progress, (v) => `${v * 100}%`);
  const [reached, setReached] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  useMotionValueEvent(progress, "change", (v) => {
    setReached(Math.min(LAST, Math.max(0, Math.round(v * LAST))));
  });

  const lit = reduce ? LAST : reached;
  const shown = pinned ?? lit;

  return (
    <section ref={ref} id="workflow" className="relative overflow-clip scroll-mt-24 bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle lg:col-span-5 lg:text-right">
            Step {String(shown + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </p>
        </div>

        {/* Desktop: horizontal track */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-6 h-[2px] rounded-full bg-border">
            <motion.div
              style={{ scaleX: reduce ? 1 : progress }}
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
            />
            {/* The travelling study */}
            {!reduce && (
              <motion.span
                style={{ left: headLeft }}
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.2)]"
              />
            )}
          </div>
          <ol className="relative grid grid-cols-7">
            {STEPS.map((step, i) => (
              <Station key={step.label} index={i} label={step.label} on={i <= lit} current={i === shown} onPin={setPinned} />
            ))}
          </ol>
        </div>

        {/* Mobile: vertical track */}
        <ol className="relative mt-12 lg:hidden">
          <span aria-hidden="true" className="absolute left-6 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-border">
            <motion.span
              style={{ scaleY: reduce ? 1 : progress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-sky-500 to-cyan-400"
            />
          </span>
          {STEPS.map((step, i) => (
            <li key={step.label} className="relative flex gap-5 pb-8 last:pb-0">
              <StationDot index={i} on={i <= lit} />
              <div className="pt-2.5">
                <p className={cn("font-semibold transition-colors", i <= lit ? "text-foreground" : "text-foreground-subtle")}>{step.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop readout */}
        <div className="mt-12 hidden min-h-[5.5rem] items-center gap-6 rounded-lg border border-border bg-card px-8 py-6 shadow-sm lg:flex" aria-live="polite">
          <span className="font-mono text-3xl font-medium tabular-nums text-primary">{String(shown + 1).padStart(2, "0")}</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={shown}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: MOTION.easeOut }}
            >
              <p className="text-lg font-semibold text-foreground">{STEPS[shown].label}</p>
              <p className="mt-0.5 text-sm text-foreground-muted">{STEPS[shown].detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 flex max-w-[80ch] items-start gap-2.5 text-sm leading-relaxed text-foreground-subtle">
          <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          {CONTENT.note}
        </p>
      </Container>
    </section>
  );
}

function StationDot({ index, on }: { index: number; on: boolean }) {
  return (
    <span
      className={cn(
        "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm tabular-nums transition-[background-color,border-color,color,box-shadow] duration-500",
        on
          ? "border-primary bg-primary text-on-primary shadow-[0_0_0_6px_var(--color-primary-soft)]"
          : "border-border-strong bg-card text-foreground-subtle"
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function Station({
  index,
  label,
  on,
  current,
  onPin,
}: {
  index: number;
  label: string;
  on: boolean;
  current: boolean;
  onPin: (i: number | null) => void;
}) {
  return (
    <li className="flex flex-col items-center px-2 text-center">
      <button
        type="button"
        onMouseEnter={() => onPin(index)}
        onMouseLeave={() => onPin(null)}
        onFocus={() => onPin(index)}
        onBlur={() => onPin(null)}
        aria-label={`Step ${index + 1}: ${label}`}
        className={cn("rounded-full transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", current && "scale-110")}
      >
        <StationDot index={index} on={on} />
      </button>
      <p className={cn("mt-4 text-sm font-semibold leading-snug transition-colors", on ? "text-foreground" : "text-foreground-subtle")}>{label}</p>
    </li>
  );
}

export default WorkflowPipeline;
