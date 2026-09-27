"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  ChatCircleDots,
  CheckCircle,
  FileText,
  Gear,
  MagnifyingGlass,
  Path,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION, heroFadeIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { QUALITY_HERO as CONTENT } from "@/content/quality";

/** CSS-driven entrance (no JS wait); see heroFadeIn. */
const fadeIn = heroFadeIn;

const GATE_ICONS = [Brain, Path, MagnifyingGlass, ChatCircleDots, Gear];
const GATES = CONTENT.layers;
/** Gate positions along the track (0..1); the final report sits at 1. */
const POS = GATES.map((_, i) => (i + 1) / (GATES.length + 1));
const LAP_S = 9;

export function QualityHero() {
  return (
    <section className="relative isolate overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />
      {/* Soft grid + glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_50%_30%,black_5%,transparent_65%)]"
      />
      <div aria-hidden="true" className="absolute left-1/2 top-24 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...fadeIn(0)} className="eyebrow justify-center">
            {CONTENT.eyebrow}
          </motion.p>
          <motion.h1 {...HERO_HEADING_MOTION} className="mx-auto mt-6 max-w-[18ch] text-display-sm font-semibold text-balance text-foreground">
            Quality Built Into{" "}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
              Every Reporting Workflow
            </span>
          </motion.h1>
          <motion.p {...fadeIn(0.1)} className="mx-auto mt-6 max-w-[62ch] text-lead text-foreground-muted">
            {CONTENT.body}
          </motion.p>
          <motion.p {...fadeIn(0.16)} className="mx-auto mt-3 max-w-[62ch] text-base text-foreground">
            {CONTENT.approach}
          </motion.p>
          <motion.div {...fadeIn(0.22)} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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

        <motion.div {...fadeIn(0.32)} className="mt-16 lg:mt-20">
          <CheckpointRail />
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * A report travels along the workflow through five quality checkpoints; each
 * lights up and is checked as the report passes, ending at the final report.
 * Gates are links to their sections. Hovering the rail pauses the report.
 * Reduced motion: the report rests at the end with every gate checked.
 */
function CheckpointRail() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = usePrefersReducedMotion();
  const p = useMotionValue(0);
  const [passed, setPassed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lap, setLap] = useState(0);
  const left = useTransform(p, (v) => `${v * 100}%`);
  const fill = useTransform(p, (v) => v);

  useMotionValueEvent(p, "change", (v) => setPassed(POS.filter((x) => v >= x - 0.01).length + (v >= 0.99 ? 1 : 0)));

  useEffect(() => {
    if (reduce) {
      p.set(1);
      return;
    }
    if (!inView || paused) return;
    // Resume from wherever the report is; after a short rest at the end, start a new lap.
    const from = p.get();
    if (from >= 0.999) {
      const t = window.setTimeout(() => {
        p.set(0);
        setLap((n) => n + 1);
      }, 1600);
      return () => window.clearTimeout(t);
    }
    const controls = animate(p, 1, {
      duration: LAP_S * (1 - from),
      ease: "linear",
      onComplete: () => setLap((n) => n + 1),
    });
    return () => controls.stop();
  }, [inView, paused, reduce, p, lap]);

  const done = passed > GATES.length;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative rounded-2xl border border-border bg-card/80 p-5 shadow-lg backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
        <span>Quality checkpoints across the workflow</span>
        <span className={cn("tabular-nums transition-colors", done && "text-success")} aria-live="polite">
          {done ? "Final report · quality built in" : `${Math.min(passed, GATES.length)} / ${GATES.length} checks`}
        </span>
      </div>

      {/* Desktop / tablet rail */}
      <div className="relative hidden md:block">
        <div className="relative mx-6 h-40">
          {/* Track */}
          <div className="absolute inset-x-0 top-[34px] h-1 rounded-full bg-surface-muted">
            <motion.div style={{ scaleX: fill }} className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
          </div>

          {/* Gates */}
          {GATES.map((g, i) => {
            const Icon = GATE_ICONS[i];
            const on = passed > i;
            return (
              <a
                key={g.label}
                href={`#${g.target}`}
                className="group absolute top-0 flex w-36 -translate-x-1/2 flex-col items-center text-center focus-visible:outline-none"
                style={{ left: `${POS[i] * 100}%` }}
              >
                <span
                  className={cn(
                    "relative flex size-[70px] items-center justify-center rounded-2xl border-2 bg-card transition-[border-color,background-color,color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring",
                    on ? "border-primary text-primary shadow-[0_0_0_6px_var(--color-primary-soft)]" : "border-border text-foreground-subtle group-hover:border-primary/50"
                  )}
                >
                  <Icon size={28} weight={on ? "duotone" : "regular"} aria-hidden="true" />
                  <motion.span
                    initial={false}
                    animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    className="absolute -right-2 -top-2 rounded-full bg-card text-success"
                  >
                    <CheckCircle size={22} weight="fill" aria-hidden="true" />
                  </motion.span>
                </span>
                <span className={cn("mt-3 text-sm font-semibold leading-snug transition-colors", on ? "text-foreground" : "text-foreground-muted")}>
                  {g.label}
                </span>
                <span className="mt-1 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  View section <ArrowDown size={11} weight="bold" aria-hidden="true" />
                </span>
              </a>
            );
          })}

          {/* Final report */}
          <div className="absolute right-0 top-0 flex w-28 translate-x-1/2 flex-col items-center text-center">
            <span
              className={cn(
                "flex size-[70px] items-center justify-center rounded-2xl border-2 transition-colors duration-500",
                done ? "border-success bg-success text-white shadow-lg" : "border-dashed border-border-strong bg-surface text-foreground-subtle"
              )}
            >
              <FileText size={30} weight={done ? "fill" : "regular"} aria-hidden="true" />
            </span>
            <span className={cn("mt-3 text-sm font-semibold", done ? "text-success" : "text-foreground-muted")}>Final report</span>
          </div>

          {/* Travelling report */}
          {!reduce && (
            <motion.div aria-hidden="true" style={{ left }} className="pointer-events-none absolute top-[36px] -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-11 w-9 flex-col gap-1 rounded-md border border-primary/40 bg-card p-1.5 shadow-md">
                <span className="h-1 w-full rounded-full bg-primary/60" />
                <span className="h-1 w-4/5 rounded-full bg-foreground/15" />
                <span className="h-1 w-full rounded-full bg-foreground/15" />
                <span className="h-1 w-3/5 rounded-full bg-foreground/15" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Phones: checklist */}
      <ol className="space-y-2 md:hidden">
        {GATES.map((g, i) => {
          const Icon = GATE_ICONS[i];
          const on = passed > i;
          return (
            <li key={g.label}>
              <a
                href={`#${g.target}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-300",
                  on ? "border-primary/40 bg-primary-soft" : "border-border"
                )}
              >
                <Icon size={20} weight="duotone" aria-hidden="true" className="shrink-0 text-primary" />
                <span className="flex-1 text-sm font-semibold text-foreground">{g.label}</span>
                <CheckCircle
                  size={18}
                  weight="fill"
                  aria-hidden="true"
                  className={cn("shrink-0 transition-[opacity,color] duration-300", on ? "text-success opacity-100" : "text-border-strong opacity-60")}
                />
              </a>
            </li>
          );
        })}
        <li
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-500",
            done ? "border-success/50 bg-success/10" : "border-dashed border-border-strong"
          )}
        >
          <FileText size={20} weight="fill" aria-hidden="true" className={done ? "text-success" : "text-foreground-subtle"} />
          <span className="flex-1 text-sm font-semibold text-foreground">Final report</span>
        </li>
      </ol>
    </div>
  );
}

export default QualityHero;
