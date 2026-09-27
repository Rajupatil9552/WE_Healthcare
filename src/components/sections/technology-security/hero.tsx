"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowDown, ArrowRight, ArrowCounterClockwise, CheckCircle, Pause, Play } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { HERO_HEADING_MOTION, MOTION, heroFadeIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { TECH_HERO as CONTENT } from "@/content/technology-security";

/** CSS-driven entrance (no JS wait); see heroFadeIn. */
const fadeIn = heroFadeIn;

/** Illustrative event log for one study (example data, not a live feed). */
const LOG = [
  { stage: "PACS", text: "Study sent from facility PACS", meta: "CT · Head w/o contrast" },
  { stage: "GATEWAY", text: "Received at secure gateway", meta: "Transfer verified" },
  { stage: "ROUTING", text: "Routed by priority and modality", meta: "STAT → Neuro queue" },
  { stage: "READ", text: "Opened at radiologist workstation", meta: "Priors attached" },
  { stage: "REPORT", text: "Structured report finalized", meta: "Findings + impression" },
  { stage: "PACS/RIS", text: "Report delivered to PACS/RIS", meta: "Workflow complete" },
];
const STEP_MS = 1400;

export function TechHero() {
  return (
    <section className="relative isolate overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_75%_40%,black_10%,transparent_65%)]"
      />
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 max-w-[15ch] text-display-sm font-semibold text-balance text-foreground sm:text-display">
              Technology Designed Around{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
                Your Existing Workflow
              </span>
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-7 max-w-[58ch] text-lead text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.p
              {...fadeIn(0.16)}
              className="mt-5 max-w-[58ch] border-l-2 border-primary pl-4 text-base leading-relaxed text-foreground"
            >
              {CONTENT.goal}
            </motion.p>
            <motion.div {...fadeIn(0.22)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={CONTENT.secondaryCta.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}>
                {CONTENT.secondaryCta.label}
                <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <motion.div {...fadeIn(0.2)} className="lg:col-span-6">
            <IntegrationConsole />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Console card that plays the illustrative log one event at a time while in
 * view, then loops. Pause/replay controls; reduced motion shows the full log.
 */
function IntegrationConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = usePrefersReducedMotion();
  const [count, setCount] = useState(1);
  const [paused, setPaused] = useState(false);
  const done = count >= LOG.length;
  const shown = reduce ? LOG.length : count;

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = window.setTimeout(() => setCount((c) => (c >= LOG.length ? 1 : c + 1)), done ? STEP_MS * 2.5 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [count, paused, inView, reduce, done]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[36rem] lg:mr-0">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="ml-3 font-mono text-xs text-foreground-muted">integration-workflow</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="mr-2 rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
              Illustrative
            </span>
            {!reduce && (
              <>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play workflow" : "Pause workflow"}
                  className="flex size-7 items-center justify-center rounded-full text-foreground-muted hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {paused ? <Play size={13} weight="fill" /> : <Pause size={13} weight="fill" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCount(1);
                    setPaused(false);
                  }}
                  aria-label="Replay workflow"
                  className="flex size-7 items-center justify-center rounded-full text-foreground-muted hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ArrowCounterClockwise size={13} weight="bold" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Log */}
        <ol className="min-h-[22rem] space-y-1 p-3 font-mono text-[13px] sm:p-4" aria-live="polite">
          <AnimatePresence initial={false}>
            {LOG.slice(0, shown).map((row, i) => {
              const last = i === shown - 1;
              return (
                <motion.li
                  key={row.stage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: MOTION.easeOut }}
                  className={cn(
                    "grid grid-cols-[5.5rem_1fr] items-start gap-3 rounded-md px-3 py-2.5 transition-colors sm:grid-cols-[6.5rem_1fr]",
                    last && !reduce ? "bg-primary-soft" : ""
                  )}
                >
                  <span className={cn("pt-px text-[11px] font-semibold tracking-[0.08em]", last && !reduce ? "text-primary" : "text-foreground-subtle")}>
                    {row.stage}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-sans text-sm font-medium text-foreground">
                      {row.text}
                      {(!last || reduce || i === LOG.length - 1) && (
                        <CheckCircle size={14} weight="fill" aria-hidden="true" className="shrink-0 text-success" />
                      )}
                      {last && !reduce && i < LOG.length - 1 && (
                        <span aria-hidden="true" className="inline-block h-3.5 w-1.5 animate-pulse bg-primary" />
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-foreground-subtle">{row.meta}</span>
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>

        {/* Progress */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-foreground-subtle">
            <span>{done || reduce ? "Report delivered" : "Study in progress…"}</span>
            <span className="tabular-nums">
              {shown}/{LOG.length}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
              animate={{ width: `${(shown / LOG.length) * 100}%` }}
              transition={{ duration: 0.5, ease: MOTION.easeOut }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechHero;
