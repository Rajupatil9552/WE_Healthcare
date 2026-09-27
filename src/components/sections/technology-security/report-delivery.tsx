"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { CheckCircle, FileText } from "@phosphor-icons/react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { REPORT_DELIVERY as CONTENT, STUDY } from "@/content/technology-security";

/** Other (dimmed) rows so the worklist reads as a real list. Example data. */
const OTHER_ROWS = [
  { study: "XR Chest 2 views", status: "Final" },
  { study: "MRI Lumbar Spine", status: "Final" },
];

/**
 * Final journey stage: the example study lands in the facility's PACS/RIS
 * worklist and its status steps Received → In review → Final.
 */
export function ReportDelivery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const last = CONTENT.statuses.length - 1;
  const status = reduce ? last : step;

  useEffect(() => {
    if (!inView || reduce || step >= last) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 1100);
    return () => window.clearTimeout(t);
  }, [inView, reduce, step, last]);

  const final = status === last;

  return (
    <section id="report-delivery" className="scroll-mt-28 border-t border-border py-16 lg:py-24">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
          <FileText size={20} weight="duotone" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-success">{CONTENT.eyebrow}</span>
      </div>
      <RevealHeading className="mt-5 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
      <p className="mt-5 max-w-[62ch] text-lead text-foreground-muted">{CONTENT.body}</p>

      <div ref={ref} className="mt-10 overflow-hidden rounded-lg border border-border bg-card shadow-md">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
          <span className="font-mono text-xs text-foreground-muted">Your PACS/RIS · Worklist</span>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">Illustrative</span>
        </div>

        <ul className="divide-y divide-border">
          {/* The followed study arrives at the top of the list */}
          <motion.li
            initial={{ opacity: 0, x: -40 }}
            animate={inView || reduce ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: MOTION.easeOut }}
            className={cn("flex items-center gap-4 px-4 py-4 transition-colors duration-500", final ? "bg-success/5" : "bg-primary-soft/60")}
          >
            <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-slate-950">
              <Image src={STUDY.thumb} alt="" fill sizes="44px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold text-foreground">{STUDY.title}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">{STUDY.label} · Structured report attached</span>
            </span>
            {/* Status stepper */}
            <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              {CONTENT.statuses.map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-colors duration-500",
                    i <= status ? (final ? "bg-success" : "bg-primary") : "bg-surface-muted"
                  )}
                />
              ))}
            </span>
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]",
                final ? "bg-success/10 text-success" : "bg-primary-soft text-primary"
              )}
              aria-live="polite"
            >
              {final && <CheckCircle size={13} weight="fill" aria-hidden="true" />}
              {CONTENT.statuses[status]}
            </motion.span>
          </motion.li>

          {OTHER_ROWS.map((r) => (
            <li key={r.study} className="flex items-center gap-4 px-4 py-3.5 opacity-60">
              <span className="size-11 shrink-0 rounded-md bg-surface-muted" />
              <span className="flex-1 text-sm text-foreground-muted">{r.study}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground-subtle">{r.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ReportDelivery;
