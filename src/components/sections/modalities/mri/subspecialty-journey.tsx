"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, Database, LockSimple, UserFocus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { MRI_WORKFLOW_CONTENT as CONTENT } from "@/content/mri";

const LAST = CONTENT.steps.length - 1;
const STEP_MS = 1400;
const HOLD_MS = 2400;
/** How long a clicked step stays before autoplay carries on. */
const MANUAL_MS = 4000;
/** Skeleton line widths per report section (layout only, no findings text). */
const REPORT_LINES = [[48], [66], [94, 80, 62], [86, 50]];
const STACK = [
  { x: 0, y: 0, rotate: 0 },
  { x: 10, y: -10, rotate: 2 },
  { x: 20, y: -20, rotate: 4 },
];

/**
 * Subspecialty Expertise + How It Works as one journey: a matching board
 * pairs clinical areas with a subspecialty and radiologist, and the selected
 * pairing travels the five supplied workflow steps on the stage below.
 * Autoplays continuously while in view (it only pauses while a keyboard user
 * is focused inside How It Works); reduced motion shows the final state.
 */
export function SubspecialtyJourneySection() {
  const reduce = usePrefersReducedMotion();
  const flowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(flowRef, { amount: 0.2 });
  const [lane, setLane] = useState(0);
  const [step, setStep] = useState(0);
  const [focused, setFocused] = useState(false);
  // A manual pick holds its step for MANUAL_MS; `nudge` restarts that timer on repeat clicks.
  const [hold, setHold] = useState(false);
  const [nudge, setNudge] = useState(0);

  const autoplay = inView && !focused && !reduce;
  const current = reduce ? LAST : step;
  const on = (i: number) => current >= i;

  useEffect(() => {
    if (!autoplay) return;
    const done = step >= LAST;
    const timer = window.setTimeout(
      () => {
        setHold(false);
        if (done) {
          setLane((l) => (l + 1) % CONTENT.matches.length);
          setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      },
      hold ? MANUAL_MS : done ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, step, lane, hold, nudge]);

  const match = CONTENT.matches[lane];
  const stat = match.priority === "STAT";

  // Picking a row replays its journey; picking a step shows it, then autoplay continues.
  const pickLane = (i: number) => {
    setHold(false);
    setLane(i);
    setStep(0);
  };
  const pickStep = (i: number) => {
    setHold(true);
    setNudge((n) => n + 1);
    setStep(i);
  };

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div ref={flowRef}>
          {/* Subspecialty Expertise */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">{CONTENT.eyebrow}</p>
              <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.subspecialtyHeading}</RevealHeading>
            </div>
            <p className="text-base leading-relaxed text-foreground-muted lg:col-span-5">{CONTENT.subspecialtyIntro}</p>
          </div>

          <div className="mt-10">
            <div aria-hidden="true" className="hidden grid-cols-[minmax(0,1.5fr)_3rem_minmax(0,1fr)_3rem_8rem] gap-4 px-5 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle md:grid">
              <span>{CONTENT.columns.area}</span>
              <span />
              <span>{CONTENT.columns.subspecialty}</span>
              <span />
              <span>{CONTENT.columns.radiologist}</span>
            </div>
            <ul className="space-y-2">
              {CONTENT.matches.map((m, i) => {
                const isActive = i === lane;
                const urgent = m.priority === "STAT";
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => pickLane(i)}
                      className={cn(
                        "grid w-full grid-cols-1 items-center gap-3 rounded-lg border px-5 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[minmax(0,1.5fr)_3rem_minmax(0,1fr)_3rem_8rem] md:gap-4",
                        isActive ? "border-primary/50 bg-primary-soft" : "border-border bg-card hover:border-border-strong"
                      )}
                    >
                      <span className="flex flex-wrap gap-1.5">
                        {m.areas.map((area) => (
                          <span
                            key={area}
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-xs font-medium",
                              urgent ? "border-urgent/30 text-urgent" : isActive ? "border-primary/30 text-foreground" : "border-border text-foreground-muted"
                            )}
                          >
                            {area}
                          </span>
                        ))}
                      </span>
                      <Connector active={isActive} />
                      <span className="flex items-center gap-3">
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-black">
                          <Image src={m.image.src} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                        <span className={cn("text-lg font-semibold tracking-tight", isActive ? "text-foreground" : "text-foreground-muted")}>{m.subspecialty}</span>
                      </span>
                      <Connector active={isActive && on(3)} />
                      <span className="hidden items-center gap-2 md:flex">
                        <span
                          className={cn(
                            "grid size-9 place-items-center rounded-full border transition-colors duration-300",
                            isActive && on(3) ? "border-primary bg-primary text-on-primary" : "border-border-strong text-foreground-subtle"
                          )}
                        >
                          <UserFocus size={16} aria-hidden="true" />
                        </span>
                        <span className="text-xs text-foreground-muted">Radiologist review</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-foreground-subtle">{CONTENT.nightNote}</p>
          </div>

          {/* How It Works */}
          <div
            onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
            className="mt-20 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-5">
              <div className="flex items-end justify-between gap-4">
                <RevealHeading className="text-h2 font-semibold text-balance text-foreground">{CONTENT.workflowHeading}</RevealHeading>
              </div>

              <ol className="relative mt-10">
                <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-3 w-px bg-border" />
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleY: current / LAST }}
                  transition={{ duration: 0.6, ease: MOTION.easeOut }}
                  className="absolute bottom-6 left-[11px] top-3 w-px origin-top bg-primary"
                />
                {CONTENT.steps.map((s, i) => {
                  const done = on(i);
                  const isCurrent = current === i;
                  return (
                    <li key={s.id} className="relative pb-7 pl-10 last:pb-0">
                      <button
                        type="button"
                        onClick={() => pickStep(i)}
                        aria-current={isCurrent ? "step" : undefined}
                        className="rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute left-0 top-0.5 grid size-[23px] place-items-center rounded-full border-2 bg-background font-mono text-[10px] transition-colors duration-300",
                            isCurrent ? "border-primary bg-primary text-on-primary" : done ? "border-primary text-primary" : "border-border-strong text-foreground-subtle"
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className={cn("block text-lg font-semibold leading-snug transition-colors", done ? "text-foreground" : "text-foreground-subtle")}>
                          {s.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Journey stage */}
            <div aria-hidden="true" className="lg:col-span-7">
              <div className="overflow-hidden rounded-lg bg-slate-950 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                  <span className="font-medium text-white">MRI Reporting Journey</span>
                  <span className="font-mono uppercase tracking-[0.12em]">{match.subspecialty}</span>
                </div>

                <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6">
                  {/* Series stack + transfer */}
                  <div>
                    <div className="relative mx-auto mt-5 aspect-[4/5] w-[85%]">
                      <AnimatePresence initial={false}>
                        {STACK.map((pos, i) => (
                          <motion.div
                            key={`${match.id}-${i}`}
                            initial={{ opacity: 0, x: pos.x - 30, y: pos.y, rotate: pos.rotate }}
                            animate={{ opacity: 1 - i * 0.3, x: pos.x, y: pos.y, rotate: pos.rotate }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: MOTION.easeOut }}
                            className="absolute inset-0 overflow-hidden rounded-md border border-white/10 bg-black"
                            style={{ zIndex: 3 - i }}
                          >
                            <Image src={match.image.src} alt="" fill sizes="(max-width: 640px) 80vw, 18rem" className="object-cover" />
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* 04: radiologist interpretation */}
                      <div className="absolute inset-0 z-10 overflow-hidden rounded-md">
                        <motion.div
                          initial={false}
                          animate={{ opacity: on(3) ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-[18%] rounded-sm border border-sky-200/80 shadow-[0_0_0_9999px_rgb(2_6_23/0.35)]"
                        />
                        {current === 3 && (
                          <motion.span
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 1.3, ease: "easeInOut" }}
                            className="absolute inset-x-0 h-px bg-sky-300 shadow-[0_0_14px_2px_rgb(125_211_252/0.6)]"
                          />
                        )}
                        <motion.span
                          initial={false}
                          animate={{ opacity: on(3) ? 1 : 0, y: on(3) ? 0 : 6 }}
                          transition={{ duration: 0.4 }}
                          className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-sky-100"
                        >
                          <UserFocus size={12} /> Radiologist
                        </motion.span>
                      </div>
                    </div>

                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                      MRI · {match.image.plane} series · Illustrative, non-PHI
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <LockSimple size={14} weight="fill" className={cn("transition-colors duration-300", on(1) ? "text-sky-300" : "text-white/30")} />
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          initial={false}
                          animate={{ scaleX: on(1) ? 1 : 0 }}
                          transition={{ duration: current === 1 ? 1.1 : 0.3, ease: "linear" }}
                          className="block h-full origin-left bg-sky-300"
                        />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">Secure transfer</span>
                    </div>
                  </div>

                  {/* Routing, report, PACS/RIS */}
                  <div className="flex flex-col">
                    <div className="flex min-h-7 flex-wrap gap-1.5">
                      <Chip show={on(2)} tone={stat ? "urgent" : "primary"}>
                        {match.priority}
                      </Chip>
                      <Chip show={on(2)}>{match.subspecialty}</Chip>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ y: on(4) ? 28 : 0, scale: on(4) ? 0.96 : 1 }}
                      transition={{ duration: 0.6, delay: on(4) ? 0.6 : 0, ease: MOTION.easeOut }}
                      className="mt-4 rounded-md bg-slate-50 p-4 text-slate-900 shadow-xl"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">Structured Report</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">MRI</p>
                      </div>
                      <dl className="mt-3 space-y-2.5">
                        {CONTENT.reportSections.map((section, i) => (
                          <div key={section} className="grid grid-cols-[5.5rem_1fr] items-start gap-2">
                            <dt className={cn("font-mono text-[9px] uppercase leading-4 tracking-[0.12em]", section === "Impression" ? "font-semibold text-sky-800" : "text-slate-500")}>
                              {section}
                            </dt>
                            <dd className="space-y-1 pt-1.5">
                              {REPORT_LINES[i].map((w, j) => (
                                <motion.span
                                  key={j}
                                  initial={false}
                                  animate={{ scaleX: on(4) ? 1 : 0.1 }}
                                  transition={{ duration: 0.5, delay: on(4) ? i * 0.1 + j * 0.04 : 0, ease: MOTION.easeOut }}
                                  className={cn("block h-1 origin-left rounded-full", section === "Impression" ? "bg-sky-700/60" : "bg-slate-300")}
                                  style={{ width: `${w}%` }}
                                />
                              ))}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>

                    <div
                      className={cn(
                        "mt-auto flex items-center gap-2 rounded-md border px-3 py-3 pt-5 transition-colors duration-500",
                        on(4) ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10"
                      )}
                    >
                      <Database size={16} className={cn("transition-colors duration-500", on(4) ? "text-emerald-300" : "text-white/40")} />
                      <span className={cn("font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-500", on(4) ? "text-white" : "text-white/50")}>
                        PACS / RIS
                      </span>
                      <ArrowRight size={12} className={cn("ml-auto transition-opacity duration-500", on(4) ? "text-emerald-300 opacity-100" : "opacity-0")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <span aria-hidden="true" className="hidden items-center md:flex">
      <span className="relative h-px flex-1 bg-border-strong">
        <motion.span
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: MOTION.easeOut }}
          className="absolute inset-0 origin-left bg-primary"
        />
      </span>
      <ArrowRight size={12} className={cn("-ml-1 transition-colors", active ? "text-primary" : "text-border-strong")} />
    </span>
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
            "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em]",
            tone === "urgent" ? "border-rose-400/70 bg-rose-950/80 text-rose-100" : "border-sky-300/60 bg-slate-900 text-sky-100"
          )}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default SubspecialtyJourneySection;
