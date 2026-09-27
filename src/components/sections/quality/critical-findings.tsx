"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { CheckCircle, FileText, Pause, Phone, Play, Siren, UserCircle, ClipboardText } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CRITICAL_FINDINGS as CONTENT } from "@/content/quality";
import { SectionNote } from "./section-note";

const STEPS = CONTENT.steps;
const STEP_MS = 2600;

/**
 * Escalation player: plays the five communication steps on a device-style
 * panel beside the radiologist photo. Auto-plays in view; pause, or pick a
 * step. No response times are implied.
 */
export function CriticalFindingsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!inView || !playing || reduce) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), step === STEPS.length - 1 ? STEP_MS * 1.6 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [inView, playing, reduce, step]);

  return (
    <section ref={ref} id="critical-findings" className="relative overflow-clip scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" className="top-1/4" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow [--eyebrow-color:var(--color-urgent)]">04 · Critical Findings</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          </div>
          <p className="text-lead text-foreground-muted lg:col-span-5">{CONTENT.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
          {/* Photo */}
          <div className="relative min-h-[18rem] overflow-hidden rounded-lg bg-slate-950 lg:col-span-6">
            <Image src={CONTENT.image.src} alt={CONTENT.image.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose-500" />
              </span>
              <motion.span key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold text-white">
                Step {step + 1} · {STEPS[step]}
              </motion.span>
            </div>
          </div>

          {/* Player */}
          <div className="flex flex-col rounded-lg border border-border bg-card shadow-lg lg:col-span-6">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">Communication flow · Illustrative</span>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {playing ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" />}
                </button>
              )}
            </div>

            <div className="relative flex min-h-[17rem] flex-1 items-center justify-center p-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: MOTION.easeOut }}
                  className="w-full max-w-sm"
                >
                  <Screen step={step} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step dots */}
            <ol className="grid grid-cols-5 gap-1 border-t border-border p-3">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(i);
                      setPlaying(false);
                    }}
                    aria-current={i === step ? "step" : undefined}
                    className="group flex w-full flex-col items-center gap-2 rounded-md px-1 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className={cn("h-1 w-full rounded-full transition-colors duration-300", i <= step ? "bg-urgent" : "bg-surface-muted")} />
                    <span className={cn("hidden text-center text-[11px] font-medium leading-tight sm:block", i === step ? "text-foreground" : "text-foreground-subtle group-hover:text-foreground-muted")}>
                      {s}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8">
          <SectionNote>{CONTENT.note}</SectionNote>
        </div>
      </Container>
    </section>
  );
}

function Screen({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="rounded-lg border border-urgent/40 bg-urgent-soft p-5">
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="flex size-11 items-center justify-center rounded-full bg-urgent text-white"
            >
              <Siren size={22} weight="fill" aria-hidden="true" />
            </motion.span>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-urgent">Critical finding</p>
              <p className="text-base font-semibold text-foreground">Identified during interpretation</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-foreground-muted">Requires timely clinical attention.</p>
        </div>
      );
    case 1:
      return (
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">Appropriate clinical contact</p>
          <div className="mt-4 flex items-center gap-3">
            <UserCircle size={44} weight="duotone" aria-hidden="true" className="text-primary" />
            <div>
              <p className="text-base font-semibold text-foreground">Responsible clinician</p>
              <p className="text-sm text-foreground-muted">Per the approved contact protocol</p>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center text-center">
          <span className="relative flex size-20 items-center justify-center">
            {[0, 1].map((k) => (
              <motion.span
                key={k}
                className="absolute inset-0 rounded-full border-2 border-urgent"
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.8 }}
              />
            ))}
            <span className="flex size-16 items-center justify-center rounded-full bg-urgent text-white shadow-lg">
              <Phone size={28} weight="fill" aria-hidden="true" />
            </span>
          </span>
          <p className="mt-5 text-base font-semibold text-foreground">Direct communication</p>
          <p className="mt-1 text-sm text-foreground-muted">Radiologist to clinical contact</p>
        </div>
      );
    case 3:
      return (
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
            <ClipboardText size={14} aria-hidden="true" />
            Documentation
          </p>
          <ul className="mt-4 space-y-2.5">
            {["Finding communicated", "Communication documented"].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.25 }}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <CheckCircle size={16} weight="fill" aria-hidden="true" className="text-success" />
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      );
    default:
      return (
        <div className="rounded-lg border border-success/40 bg-success/5 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-success text-white">
              <FileText size={22} weight="fill" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-success">Report / Addendum</p>
              <p className="text-base font-semibold text-foreground">Communication reflected in the report</p>
            </div>
          </div>
        </div>
      );
  }
}

export default CriticalFindingsSection;
