"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatCircleText, CheckCircle, FilePlus, ListChecks, MagnifyingGlass, Warning, ArrowsClockwise, Siren, SealCheck } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { QUALITY_CONTROL as CONTENT } from "@/content/quality";
import { SectionNote } from "./section-note";

const STEPS = CONTENT.steps;
const ITEM_ICONS = [ListChecks, MagnifyingGlass, Warning, ArrowsClockwise, FilePlus, Siren];

/**
 * QC as an annotated report: each step of the QC flow adds its mark to an
 * illustrative report (template, review stamp, flagged line, feedback note,
 * addendum). Steps cycle in view; click one to hold it.
 */
export function QualityControlSection() {
  const ref = useRef<HTMLElement>(null);
  const [step, select] = useAutoCycle(STEPS.length, ref, 2800, 8000);

  return (
    <section ref={ref} id="quality-control" className="relative overflow-clip scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="eyebrow">02 · Quality Control</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          <p className="mt-5 text-lead text-foreground-muted">{CONTENT.body}</p>
        </div>

        {/* Stepper */}
        <ol className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-5" aria-label="Quality control flow">
          {STEPS.map((label, i) => {
            const on = i === step;
            const done = i < step;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className={cn(
                    "relative flex h-full w-full items-center gap-3 overflow-hidden rounded-lg border px-3 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    on ? "border-primary bg-card shadow-md" : "border-border bg-card/60 hover:bg-card"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] tabular-nums transition-colors duration-300",
                      on ? "bg-primary text-on-primary" : done ? "bg-primary-soft text-primary" : "bg-surface-muted text-foreground-subtle"
                    )}
                  >
                    {done ? <CheckCircle size={14} weight="fill" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={cn("text-sm font-semibold leading-snug", on ? "text-foreground" : "text-foreground-muted")}>{label}</span>
                  {on && (
                    <motion.span
                      layoutId="qc-step-bar"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <AnnotatedReport step={step} />

          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">Built into the process</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {CONTENT.items.map((item, i) => {
                const Icon = ITEM_ICONS[i];
                return (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: MOTION.easeOut }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <Icon size={20} weight="duotone" aria-hidden="true" className="shrink-0 text-primary" />
                    <span className="text-[15px] font-medium text-foreground">{item}</span>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-6">
              <SectionNote>{CONTENT.note}</SectionNote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Grey text placeholder line (the report content itself is not shown). */
function Line({ w, flagged = false }: { w: string; flagged?: boolean }) {
  return (
    <span className={cn("relative block h-2.5 rounded-full transition-colors duration-500", flagged ? "bg-warning/50" : "bg-foreground/10")} style={{ width: w }}>
      {flagged && <span className="absolute -inset-x-2 -inset-y-1.5 rounded-md border-2 border-warning" />}
    </span>
  );
}

function AnnotatedReport({ step }: { step: number }) {
  const templated = step >= 0;
  const reviewed = step >= 1;
  const flagged = step >= 2;
  const feedback = step >= 3;
  const addendum = step >= 4;

  return (
    <div className="relative lg:col-span-7" aria-live="polite">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-lg sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">Radiology report · Illustrative</p>
            <p className="mt-1 text-lg font-semibold text-foreground">CT Head without contrast</p>
          </div>
          <AnimatePresence>
            {reviewed && (
              <motion.span
                initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
                animate={{ scale: 1, opacity: 1, rotate: -8 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                className="flex shrink-0 items-center gap-1.5 rounded-md border-2 border-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
              >
                <SealCheck size={14} weight="fill" aria-hidden="true" />
                QA review
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Structured template sections */}
        {[
          { title: "Clinical history", lines: ["70%"] },
          { title: "Technique", lines: ["55%"] },
          { title: "Findings", lines: ["92%", "84%", "88%", "60%"], flagLine: 2 },
          { title: "Impression", lines: ["76%", "48%"] },
        ].map((sec) => (
          <div key={sec.title} className="mt-5">
            <p
              className={cn(
                "inline-block rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500",
                templated && step === 0 ? "bg-primary-soft text-primary" : "text-foreground-muted"
              )}
            >
              {sec.title}
            </p>
            <div className="mt-2.5 space-y-2">
              {sec.lines.map((w, i) => (
                <Line key={i} w={w} flagged={flagged && step <= 3 && sec.flagLine === i} />
              ))}
            </div>

            {/* Discrepancy + feedback notes attach to the findings section */}
            {sec.title === "Findings" && (
              <div className="mt-3 flex flex-wrap gap-2">
                <AnimatePresence>
                  {flagged && step <= 3 && (
                    <motion.span
                      key="discrepancy"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-foreground"
                    >
                      <Warning size={13} weight="fill" aria-hidden="true" className="text-warning" />
                      Discrepancy flagged
                    </motion.span>
                  )}
                  {feedback && step === 3 && (
                    <motion.span
                      key="feedback"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      <ChatCircleText size={13} weight="fill" aria-hidden="true" />
                      Feedback sent to reporting radiologist
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}

        {/* Addendum */}
        <AnimatePresence>
          {addendum && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: MOTION.easeOut }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-md border-l-4 border-success bg-success/5 p-4">
                <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-success">
                  <FilePlus size={14} weight="fill" aria-hidden="true" />
                  Addendum
                </p>
                <div className="mt-2.5 space-y-2">
                  <Line w="80%" />
                  <Line w="52%" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-xs text-foreground-subtle">Illustration only: text lines stand in for report content.</p>
    </div>
  );
}

export default QualityControlSection;
