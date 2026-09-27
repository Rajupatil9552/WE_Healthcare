"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  CaretUp,
  CheckCircle,
  FileText,
  LockKey,
  Plugs,
  ShieldCheck,
  FileImage,
  X,
} from "@phosphor-icons/react";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DICOM, JOURNEY, PACS_RIS, STUDY, type JourneyStageId } from "@/content/technology-security";

export const STAGE_ICONS: Record<JourneyStageId, typeof Plugs> = {
  "pacs-ris-integration": Plugs,
  "dicom-workflow": FileImage,
  "secure-image-transfer": LockKey,
  "security-compliance": ShieldCheck,
  "report-delivery": FileText,
};

/* ------------------------------------------------------------------ */
/* Shared journey state                                                 */
/* ------------------------------------------------------------------ */

type JourneyState = {
  /** Index into JOURNEY (-1 before the first chapter). */
  stage: number;
  /** 0..1 progress through the current stage's section. */
  stageProgress: number;
  /** 0..1 progress through the whole journey. */
  overall: number;
  pacsStep: number;
  setPacsStep: (i: number) => void;
  dicomIndex: number;
  setDicomIndex: (i: number) => void;
};

const JourneyContext = createContext<JourneyState | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside <JourneyProvider>");
  return ctx;
}

/**
 * Tracks which journey section the reading line (35% down the viewport) is
 * in, how far through it the reader is, and the step each chapter diagram is
 * showing, so the study card and the diagrams always tell the same story.
 */
export function JourneyProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState(-1);
  const [stageProgress, setStageProgress] = useState(0);
  const [overall, setOverall] = useState(0);
  const [pacsStep, setPacsStep] = useState(0);
  const [dicomIndex, setDicomIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = -1;
      let local = 0;
      JOURNEY.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= line) {
          current = i;
          local = Math.min(1, Math.max(0, (line - r.top) / r.height));
        }
      });
      setStage(current);
      setStageProgress(local);
      // Delivery is the finish line: reaching it completes the journey.
      setOverall(current < 0 ? 0 : current === JOURNEY.length - 1 ? 1 : (current + local) / JOURNEY.length);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <JourneyContext.Provider value={{ stage, stageProgress, overall, pacsStep, setPacsStep, dicomIndex, setDicomIndex }}>
      {children}
    </JourneyContext.Provider>
  );
}

/**
 * Step index driven by scroll through `ref` (the reader's scroll moves the
 * diagram). Clicking a step overrides it until scrolling reaches a new step.
 */
export function useScrollStep(ref: RefObject<HTMLElement | null>, count: number) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 45%", "end 55%"] });
  const [scrolled, setScrolled] = useState(0);
  const [manual, setManual] = useState<number | null>(null);
  const last = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    if (next !== last.current) {
      last.current = next;
      setScrolled(next);
      setManual(null);
    }
  });

  return [manual ?? scrolled, setManual] as const;
}

/* ------------------------------------------------------------------ */
/* Study card (desktop sticky)                                          */
/* ------------------------------------------------------------------ */

const STATUS = [
  { label: "In transit", tone: "primary" },
  { label: "Header read", tone: "primary" },
  { label: "Secured", tone: "primary" },
  { label: "Protected", tone: "primary" },
  { label: "Delivered", tone: "success" },
] as const;

export function StudyCard({ className }: { className?: string }) {
  const { stage, stageProgress, overall, pacsStep, dicomIndex } = useJourney();
  const s = Math.max(0, stage);
  const status = stage < 0 ? { label: "Acquired", tone: "primary" as const } : STATUS[s];
  const delivered = stage === JOURNEY.length - 1;

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card shadow-lg transition-colors duration-500", delivered ? "border-success/40" : "border-border", className)}>
      {/* Identity */}
      <div className="flex items-center gap-3 border-b border-border p-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-slate-950">
          <Image src={STUDY.thumb} alt="" fill sizes="48px" className="object-cover" />
          {!delivered && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 h-3 bg-gradient-to-b from-transparent via-cyan-300/50 to-transparent motion-reduce:hidden"
              animate={{ top: ["-20%", "110%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{STUDY.title}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">{STUDY.label}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors duration-500",
            status.tone === "success" ? "bg-success/10 text-success" : "bg-primary-soft text-primary"
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Stage body */}
      <div className="relative min-h-[13.75rem] p-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: MOTION.easeOut }}
          >
            {stage < 0 && <StageAcquired />}
            {stage === 0 && <StageGateway step={pacsStep} />}
            {stage === 1 && <StageDicom index={dicomIndex} />}
            {stage === 2 && <StageChannel progress={stageProgress} />}
            {stage === 3 && <StageSecurity />}
            {stage === 4 && <StageDelivered />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Journey progress */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">
          <span>Study journey</span>
          <span className="tabular-nums">{Math.round(overall * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
          <div
            className={cn("h-full origin-left rounded-full transition-colors duration-500", delivered ? "bg-success" : "bg-gradient-to-r from-sky-500 to-cyan-400")}
            style={{ transform: `scaleX(${overall})` }}
          />
        </div>
      </div>
    </div>
  );
}

function StageLine({ k, v, on = false }: { k: string; v: string; on?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3 rounded px-2 py-1 transition-colors duration-300", on && "bg-primary-soft")}>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">{k}</span>
      <span className={cn("truncate text-right font-mono text-xs", on ? "font-semibold text-primary" : "text-foreground-muted")}>{v}</span>
    </div>
  );
}

function StageAcquired() {
  return (
    <>
      <p className="text-sm font-semibold text-foreground">Acquired at the modality</p>
      <p className="mt-1 text-sm text-foreground-muted">Scroll to follow this study through the workflow.</p>
      <div className="mt-3 space-y-1">
        <StageLine k="Location" v="Your facility" on />
        <StageLine k="Next" v="Your PACS" />
      </div>
    </>
  );
}

function StageGateway({ step }: { step: number }) {
  const steps = PACS_RIS.steps;
  return (
    <>
      <p className="text-sm font-semibold text-foreground">Moving through the integration</p>
      <div className="mt-3 flex items-center gap-1" aria-hidden="true">
        {steps.map((st, i) => (
          <span
            key={st.label}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i < step ? "bg-primary/50" : i === step ? "bg-primary" : "bg-surface-muted"
            )}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1">
        <StageLine k="Now" v={steps[step].label} on />
        <StageLine k="Next" v={steps[Math.min(step + 1, steps.length - 1)].label} />
      </div>
    </>
  );
}

/** Compact labels for the card's copy of the study header. */
const SHORT_NAMES: Record<string, string> = {
  study: "Study UID",
  modality: "Modality",
  priority: "Priority",
  destination: "Route",
  report: "Return to",
  priors: "Priors",
};

function StageDicom({ index }: { index: number }) {
  const field = DICOM.capabilities[index].field;
  return (
    <>
      <p className="text-sm font-semibold text-foreground">DICOM header read for routing</p>
      <div className="mt-3 space-y-0.5">
        {DICOM.header.map((r) => (
          <StageLine key={r.field} k={SHORT_NAMES[r.field]} v={r.value} on={r.field === field} />
        ))}
      </div>
    </>
  );
}

function StageChannel({ progress }: { progress: number }) {
  return (
    <>
      <p className="text-sm font-semibold text-foreground">In the secure channel</p>
      <div className="relative mt-4 h-8">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full border border-primary/30 bg-surface" />
        <div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
        <span
          className="absolute top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-md"
          style={{ left: `${Math.min(94, Math.max(6, progress * 100))}%` }}
        >
          <LockKey size={13} weight="fill" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
        <span>Facility</span>
        <span>Reading environment</span>
      </div>
    </>
  );
}

function StageSecurity() {
  return (
    <div className="relative">
      <p className="text-sm font-semibold text-foreground">Handled under security controls</p>
      <div className="mt-3 space-y-1">
        <StageLine k="Access" v="Assigned radiologist" on />
        <StageLine k="Audit" v="Logged where supported" />
      </div>
      <motion.span
        initial={{ scale: 2, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="absolute -right-1 -top-1 flex size-11 items-center justify-center rounded-full border-2 border-primary bg-primary-soft text-primary"
        aria-hidden="true"
      >
        <ShieldCheck size={22} weight="fill" />
      </motion.span>
    </div>
  );
}

function StageDelivered() {
  return (
    <>
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <CheckCircle size={16} weight="fill" aria-hidden="true" className="text-success" />
        Structured report delivered
      </p>
      <div className="mt-3 space-y-1">
        <StageLine k="Returned to" v="Your PACS/RIS" on />
        <StageLine k="Status" v="Final" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Stations (desktop, under the card)                                   */
/* ------------------------------------------------------------------ */

export function JourneyStations() {
  const { stage } = useJourney();
  return (
    <ol className="relative mt-6 space-y-0.5">
      <span aria-hidden="true" className="absolute left-[19px] top-3 bottom-3 w-px bg-border" />
      {JOURNEY.map((j, i) => {
        const Icon = STAGE_ICONS[j.id];
        const on = stage === i;
        const done = stage > i;
        return (
          <li key={j.id}>
            <a
              href={`#${j.id}`}
              aria-current={on ? "location" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-1.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                on ? "text-foreground" : "text-foreground-muted hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex size-[26px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                  on
                    ? "border-primary bg-primary text-on-primary"
                    : done
                      ? "border-primary/40 bg-primary-soft text-primary"
                      : "border-border bg-card text-foreground-subtle"
                )}
              >
                {done ? <CheckCircle size={14} weight="fill" aria-hidden="true" /> : <Icon size={13} weight={on ? "fill" : "regular"} aria-hidden="true" />}
              </span>
              <span className={cn("text-sm", on ? "font-semibold" : "font-medium")}>{j.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile chip                                                          */
/* ------------------------------------------------------------------ */

export function JourneyChip() {
  const { stage, overall } = useJourney();
  const [open, setOpen] = useState(false);
  const s = Math.max(0, stage);
  const delivered = stage === JOURNEY.length - 1;
  const r = 15;
  const c = 2 * Math.PI * r;

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex flex-col items-center gap-2 px-4 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.ul
            id="journey-chapters"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md space-y-1 rounded-2xl border border-border bg-card/95 p-2 shadow-lg backdrop-blur-xl"
          >
            {JOURNEY.map((j, i) => {
              const Icon = STAGE_ICONS[j.id];
              return (
                <li key={j.id}>
                  <a
                    href={`#${j.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                      stage === i ? "bg-primary-soft text-foreground" : "text-foreground-muted"
                    )}
                  >
                    <Icon size={16} aria-hidden="true" className="text-primary" />
                    {j.label}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="journey-chapters"
        className="flex w-full max-w-md items-center gap-3 rounded-full border border-border bg-card/95 p-1.5 pr-4 text-left shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative flex size-10 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r={r} fill="none" stroke="var(--color-surface-muted)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke={delivered ? "var(--color-success)" : "var(--color-primary)"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - overall)}
            />
          </svg>
          <span className="relative size-7 overflow-hidden rounded-full bg-slate-950">
            <Image src={STUDY.thumb} alt="" fill sizes="28px" className="object-cover" />
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-foreground">{JOURNEY[s].label}</span>
          <span className="block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
            {delivered ? "Report delivered" : `Study journey · ${Math.round(overall * 100)}%`}
          </span>
        </span>
        {open ? <X size={16} aria-hidden="true" className="text-foreground-muted" /> : <CaretUp size={16} aria-hidden="true" className="text-foreground-muted" />}
      </button>
    </div>
  );
}
