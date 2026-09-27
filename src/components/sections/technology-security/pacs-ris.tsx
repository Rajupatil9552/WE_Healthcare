"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PACS_RIS as CONTENT } from "@/content/technology-security";
import { ChapterHeader, ChapterNote } from "./chapter-layout";
import { useJourney, useScrollStep } from "./journey";

const STEPS = CONTENT.steps;
const VIEW = { w: 800, h: 470 };
const C = { x: 400, y: 235, rx: 305, ry: 170 };
/** Clockwise angle (deg, 0 = top) for each step: facility on the left, reading on the right. */
const ANGLES = [236, 292, 360, 62, 116, 164, 204];

const pos = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: C.x + C.rx * Math.sin(r), y: C.y - C.ry * Math.cos(r) };
};

const SIDE_LABEL = {
  facility: "Your facility",
  gateway: "Secure boundary",
  reading: "Reading environment",
} as const;

/**
 * Chapter 01: the integration path as a closed loop. A study travels from the
 * modality through the gateway to the reading environment and back to the
 * facility's PACS/RIS. Steps advance with scroll; click one to jump to it.
 */
export function PacsRisChapter() {
  const ref = useRef<HTMLElement>(null);
  // The study advances one step per slice of scroll through this chapter.
  const [active, select] = useScrollStep(ref, STEPS.length);
  const { setPacsStep } = useJourney();
  useEffect(() => setPacsStep(active), [active, setPacsStep]);

  // Unwrapped angle so the dot always travels clockwise around the loop.
  const angle = useMotionValue(ANGLES[0]);
  useEffect(() => {
    const from = angle.get();
    let target = ANGLES[active];
    while (target < from - 1) target += 360;
    const controls = animate(angle, target, { duration: 0.9, ease: MOTION.easeOut });
    return () => controls.stop();
  }, [active, angle]);
  const dotX = useTransform(angle, (a) => pos(a).x);
  const dotY = useTransform(angle, (a) => pos(a).y);

  const step = STEPS[active];

  return (
    <section ref={ref} id="pacs-ris-integration" className="scroll-mt-28 border-b border-border py-16 lg:py-24">
      <ChapterHeader id="pacs-ris-integration" title={CONTENT.heading} body={CONTENT.body} />

      {/* Loop diagram (sm and up) */}
      <div className="relative mt-12 hidden overflow-hidden rounded-lg border border-border bg-surface sm:block">
        <div className="relative" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
          {/* Zones */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 bg-card/60" />
          <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">Your facility</span>
          <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Reading environment</span>

          <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <line x1={C.x} y1="40" x2={C.x} y2={VIEW.h - 20} stroke="var(--color-border-strong)" strokeDasharray="4 6" />
            <ellipse cx={C.x} cy={C.y} rx={C.rx} ry={C.ry} stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <motion.ellipse
              cx={C.x}
              cy={C.y}
              rx={C.rx}
              ry={C.ry}
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray="3 10"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              opacity={0.6}
            />
            <motion.circle r="16" fill="var(--color-primary)" opacity={0.18} cx={dotX} cy={dotY} />
            <motion.circle r="7" fill="var(--color-primary)" stroke="var(--color-card)" strokeWidth="3" cx={dotX} cy={dotY} />
          </svg>

          {STEPS.map((s, i) => {
            const p = pos(ANGLES[i]);
            const on = i === active;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => select(i)}
                aria-pressed={on}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-sm transition-[background-color,border-color,color,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-4 md:py-2 md:text-sm",
                  on
                    ? "scale-105 border-primary bg-primary text-on-primary shadow-md"
                    : s.side === "gateway"
                      ? "border-primary/50 bg-primary-soft text-foreground hover:border-primary"
                      : "border-border bg-card text-foreground-muted hover:border-border-strong hover:text-foreground"
                )}
                style={{ left: `${(p.x / VIEW.w) * 100}%`, top: `${(p.y / VIEW.h) * 100}%` }}
              >
                <span className={cn("font-mono text-[10px] tabular-nums", on ? "text-on-primary/80" : "text-foreground-subtle")}>0{i + 1}</span>
                {s.label}
              </button>
            );
          })}

          {/* Centre readout */}
          <div className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 text-center" aria-live="polite">
            <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">
                Step {String(active + 1).padStart(2, "0")} · {SIDE_LABEL[step.side]}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-foreground md:text-2xl">{step.label}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vertical path (phones) */}
      <ol className="relative mt-10 space-y-3 sm:hidden">
        <span aria-hidden="true" className="absolute left-[19px] top-4 bottom-4 w-px bg-border-strong" />
        {STEPS.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-4">
            <span
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs tabular-nums",
                s.side === "facility" ? "border-border-strong bg-card text-foreground-muted" : "border-primary bg-primary-soft text-primary"
              )}
            >
              0{i + 1}
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-foreground">{s.label}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">{SIDE_LABEL[s.side]}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ChapterNote>{CONTENT.note}</ChapterNote>
        <Link
          href={CONTENT.cta.href}
          className="group inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-8"
        >
          <span className="underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">Learn More / {CONTENT.cta.label}</span>
          <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default PacsRisChapter;
