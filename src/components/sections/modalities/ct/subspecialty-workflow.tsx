"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle, Pause, Play } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { CT_WORKFLOW_CONTENT as CONTENT } from "@/content/ct";

/** Node 0 is the CT study; nodes 1-6 are the supplied workflow steps. */
const NODES = [CONTENT.origin, ...CONTENT.steps.map((s) => s.label)];
const LAST = NODES.length - 1;
const STEP_MS = 1300;
const HOLD_MS = 2200;
/** Skeleton line widths per report section (layout only, no findings text). */
const REPORT_LINES = [[46], [64], [92, 84, 70], [88, 52]];

/**
 * Subspecialty Expertise + How It Works as one connected system: a CT study
 * travels the workflow rail, is assigned to one of the four subspecialty
 * lanes, and ends as a structured report delivered to PACS/RIS.
 * Autoplays only while in view; the rail text is always fully visible and
 * reduced motion shows the completed state.
 */
export function SubspecialtyWorkflowSection() {
  const reduce = usePrefersReducedMotion();
  const flowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(flowRef, { amount: 0.25 });
  const [step, setStep] = useState(0);
  const [lane, setLane] = useState(0);
  const [paused, setPaused] = useState(false);

  const autoplay = inView && !paused && !reduce;
  const current = reduce ? LAST : step;
  const on = (i: number) => current >= i;

  useEffect(() => {
    if (!autoplay) return;
    const done = step >= LAST;
    const timer = window.setTimeout(
      () => {
        if (done) {
          setLane((l) => (l + 1) % CONTENT.subspecialties.length);
          setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      },
      done ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, step]);

  const active = CONTENT.subspecialties[lane];
  const urgent = active.id === "emergency";

  const pickStep = (i: number) => {
    setPaused(true);
    setStep(i);
  };
  const pickLane = (i: number) => {
    setPaused(true);
    setLane(i);
    setStep(LAST);
  };

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        {/* Subspecialty Expertise */}
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.subspecialtyHeading}</RevealHeading>

        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {CONTENT.subspecialties.map((item, i) => {
            const isActive = i === lane;
            const assigned = isActive && on(3);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => pickLane(i)}
                  className={cn(
                    "group w-full rounded-lg border bg-card p-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4",
                    isActive ? "border-primary shadow-md" : "border-border hover:border-border-strong"
                  )}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-md bg-black">
                    <Image
                      src={item.image.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 280px"
                      className={cn("object-contain transition-opacity duration-300", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-85")}
                    />
                    <span className="absolute left-2 top-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">{item.image.plane}</span>
                    <AnimatePresence>
                      {assigned && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-1.5 right-1.5 rounded-full bg-sky-400 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-950"
                        >
                          Assigned
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="mt-3 flex items-baseline gap-2">
                    <span className={cn("font-mono text-xs tabular-nums", isActive ? "text-primary" : "text-foreground-subtle")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold leading-snug text-foreground sm:text-lg">{item.label}</span>
                  </span>
                  <span className="mt-1 block pl-7 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">{item.study}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* How It Works */}
        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 lg:mt-24">
          <RevealHeading className="text-h2 font-semibold text-balance text-foreground">{CONTENT.workflowHeading}</RevealHeading>
          {!reduce && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play workflow animation" : "Pause workflow animation"}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {paused ? <Play size={14} weight="fill" aria-hidden="true" /> : <Pause size={14} weight="fill" aria-hidden="true" />}
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>

        <div ref={flowRef}>
        {/* Workflow rail: horizontal on desktop, vertical on mobile */}
        <ol className="relative mt-10 grid grid-cols-1 gap-0 lg:grid-cols-7">
          {/* Track + progress: vertical on mobile, horizontal from lg (ends at the last node) */}
          <span aria-hidden="true" className="absolute bottom-16 left-[7px] top-2 w-px bg-border lg:hidden" />
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ scaleY: current / LAST }}
            transition={{ duration: 0.6, ease: MOTION.easeOut }}
            className="absolute bottom-16 left-[7px] top-2 w-px origin-top bg-primary lg:hidden"
          />
          <span aria-hidden="true" className="absolute left-[7px] top-[7px] hidden h-px w-[calc(100%*6/7)] bg-border lg:block" />
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ scaleX: current / LAST }}
            transition={{ duration: 0.6, ease: MOTION.easeOut }}
            className="absolute left-[7px] top-[7px] hidden h-px w-[calc(100%*6/7)] origin-left bg-primary lg:block"
          />
          {NODES.map((label, i) => {
            const done = on(i);
            const isCurrent = current === i;
            return (
              <li key={label} className="relative pb-6 pl-8 lg:pb-0 lg:pl-0 lg:pr-4">
                <button
                  type="button"
                  onClick={() => pickStep(i)}
                  aria-current={isCurrent ? "step" : undefined}
                  className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border-2 bg-background transition-colors duration-300",
                      done ? "border-primary" : "border-border-strong",
                      isCurrent && "bg-primary"
                    )}
                  />
                  <span className={cn("block font-mono text-xs tabular-nums transition-colors lg:mt-7", done ? "text-primary" : "text-foreground-subtle")}>
                    {i === 0 ? "CT" : String(i).padStart(2, "0")}
                  </span>
                  <span className={cn("mt-1 block text-base font-semibold leading-snug transition-colors", done ? "text-foreground" : "text-foreground-subtle")}>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Stage: the CT study and its report */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 lg:gap-6">
          <div aria-hidden="true" className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black shadow-lg lg:col-span-5 lg:aspect-auto lg:min-h-[22rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image src={active.image.src} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            <p className="absolute left-4 top-3 font-mono text-[11px] uppercase tracking-[0.14em] text-sky-100/80">{active.study}</p>

            <div className="absolute left-4 top-9 flex flex-wrap gap-1.5">
              <Chip show={on(1)}>DICOM</Chip>
              <Chip show={on(2)} tone={urgent ? "urgent" : "primary"}>
                {urgent ? "STAT" : "Routine"}
              </Chip>
              <Chip show={on(3)}>{active.label}</Chip>
            </div>

            {/* 01: transfer bar */}
            <div className="absolute inset-x-4 bottom-4 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                initial={false}
                animate={{ scaleX: on(1) ? 1 : 0 }}
                transition={{ duration: current === 1 ? 1.1 : 0.3, ease: "linear" }}
                className="block h-full origin-left bg-sky-300"
              />
            </div>

            {/* 04: read sweep */}
            {current === 4 && (
              <motion.span
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-x-0 h-px bg-sky-300 shadow-[0_0_14px_2px_rgb(125_211_252/0.6)]"
              />
            )}
          </div>

          <div aria-hidden="true" className="hidden items-center justify-center lg:col-span-1 lg:flex">
            <ArrowRight size={22} className={cn("transition-colors duration-300", on(5) ? "text-primary" : "text-border-strong")} />
          </div>

          {/* Structured report */}
          <div aria-hidden="true" className="rounded-lg border border-border bg-card p-6 shadow-md lg:col-span-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Structured Report</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">{active.study}</p>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted">
              Subspecialty · <span className={cn("transition-colors", on(3) ? "text-primary" : "text-foreground-subtle")}>{on(3) ? active.label : "—"}</span>
            </p>
            <dl className="mt-5 space-y-4">
              {CONTENT.reportSections.map((section, i) => (
                <div key={section} className="grid grid-cols-[7rem_1fr] items-start gap-4">
                  <dt className={cn("font-mono text-[11px] uppercase tracking-[0.12em]", section === "Impression" ? "font-semibold text-primary" : "text-foreground-subtle")}>
                    {section}
                  </dt>
                  <dd className="space-y-1.5 pt-1">
                    {REPORT_LINES[i].map((w, j) => (
                      <motion.span
                        key={j}
                        initial={false}
                        animate={{ scaleX: on(5) ? 1 : 0.12 }}
                        transition={{ duration: 0.5, delay: on(5) ? i * 0.12 + j * 0.05 : 0, ease: MOTION.easeOut }}
                        className={cn("block h-1.5 origin-left rounded-full", section === "Impression" ? "bg-primary/60" : "bg-border-strong")}
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
              <CheckCircle
                size={16}
                weight="fill"
                className={cn("transition-colors duration-300", on(6) ? "text-success" : "text-border-strong")}
              />
              <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em] transition-colors", on(6) ? "text-foreground" : "text-foreground-subtle")}>
                Returned to PACS/RIS
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-[13px] text-foreground-subtle">Illustrative workflow, non-PHI.</p>
        </div>
      </Container>
    </section>
  );
}

function Chip({ show, tone = "primary", children }: { show: boolean; tone?: "primary" | "urgent"; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] backdrop-blur-sm",
            tone === "urgent" ? "border-rose-400/70 bg-rose-950/80 text-rose-100" : "border-sky-300/60 bg-slate-950/80 text-sky-100"
          )}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default SubspecialtyWorkflowSection;
