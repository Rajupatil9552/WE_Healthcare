"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { Lightning, Pause, Play } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS_CONTENT as CONTENT } from "@/content/emergency-stat-reporting";

const STEP_MS = 4500;
const STEP_COUNT = CONTENT.steps.length;

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInView = useInView(sectionRef, { amount: 0.35 });

  const currentStep = CONTENT.steps[activeStepIndex];

  // Auto-progression runs only while on screen and not hovered/focused (WCAG 2.2.2);
  // the play/pause control stops it entirely.
  const isAutoAdvancing = isAutoPlaying && isInView && !isInteracting && !shouldReduceMotion;

  useEffect(() => {
    if (!isAutoAdvancing) return;
    const t = window.setTimeout(() => setActiveStepIndex((prev) => (prev + 1) % STEP_COUNT), STEP_MS);
    return () => window.clearTimeout(t);
  }, [isAutoAdvancing, activeStepIndex]);

  const selectStep = (index: number) => {
    setIsAutoPlaying(false);
    setActiveStepIndex(index);
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const next =
      e.key === "ArrowRight" ? (idx + 1) % STEP_COUNT : e.key === "ArrowLeft" ? (idx - 1 + STEP_COUNT) % STEP_COUNT : null;
    if (next === null) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    selectStep(next);
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsInteracting(false);
      }}
      className="relative overflow-clip py-section lg:py-section-lg bg-background scroll-mt-20"
    >
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow [--eyebrow-color:var(--color-urgent)]">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              From <span className="text-urgent">STAT</span> Flag to Direct Communication
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">{CONTENT.supportingText}</p>
        </div>

        {/* Step rail: one control, doubles as the tab list */}
        <div className="mt-14 flex items-end gap-6">
          <div
            role="tablist"
            aria-label="How emergency STAT radiology reporting works"
            className="grid flex-1 grid-cols-2 md:grid-cols-4 border-t border-border-strong"
          >
            {CONTENT.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`stat-tab-${step.number}`}
                  aria-selected={isActive}
                  aria-controls="stat-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectStep(idx)}
                  onKeyDown={(e) => onTabKeyDown(e, idx)}
                  className="relative py-4 pr-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-urgent"
                >
                  <span aria-hidden="true" className="absolute left-0 right-4 -top-px h-0.5 overflow-hidden">
                    {isActive ? (
                      <motion.span
                        key={`${activeStepIndex}-${isAutoAdvancing}`}
                        initial={{ scaleX: isAutoAdvancing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: isAutoAdvancing ? STEP_MS / 1000 : 0, ease: "linear" }}
                        className="block h-full origin-left bg-urgent"
                      />
                    ) : (
                      <span className={cn("block h-full", isPast ? "bg-urgent/40" : "bg-transparent")} />
                    )}
                  </span>
                  <span className={cn("block font-mono text-xs tabular-nums", isActive ? "text-urgent" : "text-foreground-subtle")}>
                    {step.number}
                  </span>
                  <span className={cn("mt-1 block text-base font-semibold", isActive ? "text-foreground" : "text-foreground-muted")}>
                    {step.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? "Pause automatic step progression" : "Resume automatic step progression"}
            aria-pressed={!isAutoPlaying}
            className="mb-4 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urgent"
          >
            {isAutoPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        </div>

        <div
          id="stat-panel"
          role="tabpanel"
          aria-labelledby={`stat-tab-${currentStep.number}`}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Illustrative study progressing through the stages */}
          <div className="lg:col-span-7 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded-sm bg-surface-muted px-2 py-0.5 font-mono text-xs font-semibold text-foreground-muted">
                  {CONTENT.study.modality}
                </span>
                <span className="text-base font-semibold text-foreground">{CONTENT.study.exam}</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-sm bg-urgent px-2 py-0.5 font-mono text-xs font-semibold text-white">
                <Lightning size={12} weight="fill" aria-hidden="true" />
                {currentStep.priorityLabel}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-6 px-5 py-5 text-sm">
              <div>
                <dt className="text-xs text-foreground-subtle">Clinical Indication</dt>
                <dd className="mt-1 font-semibold text-foreground">{CONTENT.study.indication}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">Active State in Workflow</dt>
                <dd className="mt-1 font-semibold text-urgent">{currentStep.statusLabel}</dd>
              </div>
            </dl>

            <div className="mx-5 mb-5 min-h-36 border-l-2 border-urgent/40 pl-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: MOTION.easeOut }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-foreground">{currentStep.stageHeading}</p>
                    <p className="font-mono text-xs text-urgent">{currentStep.stageTag}</p>
                  </div>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{currentStep.stageNarrative}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface px-5 py-3 text-xs text-foreground-subtle">
              <span>{currentStep.actionDetail}</span>
              <span className="font-mono">{currentStep.queueState}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-950">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentStep.id}
                    initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.55, ease: MOTION.easeOut }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentStep.image ?? "/images/emergency-stat-reporting/priority-radiology-worklist.jpg"}
                      alt={currentStep.alt ?? "Radiology workflow diagnostic review"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <figcaption className="mt-3 text-[13px] text-foreground-subtle">
                Stage {currentStep.number}: {currentStep.title}
              </figcaption>
            </figure>
            <p className="mt-6 text-lg font-semibold text-foreground">
              <span className="mr-2 font-mono text-sm text-urgent">{currentStep.number}</span>
              {currentStep.title}
            </p>
            <p className="mt-2 text-base text-foreground-muted leading-relaxed">{currentStep.description}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          <p className="text-foreground-subtle">
            Conceptual operational representation. Actual turnaround and escalation protocols are established in collaboration with facility leadership.
          </p>
          <a
            href="#service-levels"
            className="shrink-0 rounded-sm font-semibold text-urgent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urgent"
          >
            {CONTENT.transition.from} → {CONTENT.transition.arrow} · Next: {CONTENT.transition.nextSectionName}
          </a>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;
