"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { SPINAL_WORKFLOW_CONTENT as CONTENT, SPINE_IMAGES } from "@/content/spinal-annotation";
import { AnnotatedSpine } from "./annotated-spine";

const IMAGE = SPINE_IMAGES.cervicalCt;
const LAST = CONTENT.steps.length - 1;
const ANNOTATE = 2;
const REVIEW = 3;

/**
 * How It Works on one study: the same sagittal spine moves through each
 * step (received, prepared, annotated, reviewed, delivered as a label set).
 * Steps advance on their own while in view; any step can be selected.
 * Quality & Review sits alongside. Reduced motion shows the final state.
 */
export function SpinalWorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [step, select] = useAutoCycle(CONTENT.steps.length, ref, 2400, 5000);
  const current = reduce ? LAST : step;

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>

        <div ref={ref} className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Steps */}
          <div className="lg:col-span-5">
            <ol className="relative">
              <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-4 w-0.5 bg-border" />
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{ scaleY: current / LAST }}
                transition={{ duration: 0.6, ease: MOTION.easeOut }}
                className="absolute bottom-6 left-[15px] top-4 w-0.5 origin-top bg-primary"
              />
              {CONTENT.steps.map((s, i) => {
                const done = current >= i;
                const isCurrent = current === i;
                return (
                  <li key={s.id} className="relative pb-5 last:pb-0">
                    <button
                      type="button"
                      aria-current={isCurrent ? "step" : undefined}
                      onClick={() => select(i)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-lg py-2 pr-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isCurrent && "bg-primary-soft"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative grid size-8 shrink-0 place-items-center rounded-full border-2 bg-background font-mono text-xs transition-colors duration-300",
                          isCurrent ? "border-primary bg-primary text-on-primary" : done ? "border-primary text-primary" : "border-border-strong text-foreground-subtle"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className={cn("text-lg font-semibold transition-colors", done ? "text-foreground" : "text-foreground-subtle")}>{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Quality & Review (verbatim) */}
            <div className="mt-10 rounded-xl border border-border bg-surface p-6">
              <h3 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
                <ShieldCheck size={20} weight="duotone" aria-hidden="true" className="text-primary" />
                {CONTENT.qualityHeading}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-foreground-muted">{CONTENT.qualityBody}</p>
            </div>
          </div>

          {/* Study stage */}
          <div aria-hidden="true" className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-xl bg-slate-950 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                <span className="font-medium text-white">Spinal Annotation · Sagittal</span>
                <span className="font-mono uppercase tracking-[0.12em]">Step {current + 1}/{CONTENT.steps.length}</span>
              </div>
              <div className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6 sm:p-6">
                {/* Image */}
                <div className="relative">
                  <motion.div
                    animate={{ filter: current >= 1 ? "contrast(1.15) brightness(1.08)" : "contrast(0.85) brightness(0.7)" }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden rounded-md"
                  >
                    <AnnotatedSpine
                      key={current >= ANNOTATE ? "on" : "off"}
                      image={IMAGE}
                      shown={current >= ANNOTATE ? IMAGE.levels.length : 0}
                      reviewed={current >= REVIEW}
                      sizes="(max-width: 1024px) 45vw, 18rem"
                      className="w-full"
                    />
                  </motion.div>
                  {/* 02: preparation frame */}
                  <motion.span
                    initial={false}
                    animate={{ opacity: current === 1 ? 1 : 0 }}
                    className="pointer-events-none absolute inset-[6%] rounded-sm border border-dashed border-amber-300"
                  />
                  {current === 0 && (
                    <span className="absolute left-2 top-2 rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sky-100">
                      Received
                    </span>
                  )}
                </div>

                {/* Output */}
                <div className="flex flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Output</p>
                  <AnimatePresence mode="wait">
                    {current === LAST ? (
                      <motion.div
                        key="out"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: MOTION.easeOut }}
                        className="mt-2 rounded-md bg-slate-50 p-3 text-slate-900 shadow-xl"
                      >
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">Annotation set</p>
                        <ul className="mt-2 grid grid-cols-2 gap-1">
                          {IMAGE.levels.map((l) => (
                            <li key={l.label} className="rounded-sm bg-emerald-100 px-1.5 py-0.5 text-center font-mono text-[11px] font-semibold text-emerald-900">
                              {l.label}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">Delivered per workflow</p>
                      </motion.div>
                    ) : (
                      <motion.p key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-white/40">
                        {CONTENT.steps[current].label}…
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-foreground-subtle">Illustrative workflow, non-PHI.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SpinalWorkflowSection;
