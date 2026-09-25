"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { OVERFLOW_HERO_CONTENT } from "@/content/overflow-backlog-support";

// Mock study queue items for the readable worklist simulation
interface WorklistRow {
  id: string;
  accession: string;
  modality: "CT" | "MRI" | "X-Ray";
  examName: string;
  priority: "STAT" | "Urgent" | "Routine";
  elapsed: string;
  status: "Pending" | "In Review" | "Completed";
  assignee: string;
  flag?: string;
}

const INITIAL_WORKLIST: WorklistRow[] = [
  {
    id: "case-01",
    accession: "ACC-9041",
    modality: "CT",
    examName: "CTA Head & Neck w/ Perfusion",
    priority: "STAT",
    elapsed: "11m ago",
    status: "In Review",
    assignee: "Neuroradiology",
    flag: "Awaiting Read",
  },
  {
    id: "case-02",
    accession: "ACC-9043",
    modality: "CT",
    examName: "CT Chest / Abdomen / Pelvis w/ IV",
    priority: "Urgent",
    elapsed: "24m ago",
    status: "Pending",
    assignee: "Overflow Batch A",
  },
  {
    id: "case-03",
    accession: "ACC-9047",
    modality: "MRI",
    examName: "MRI Brain w/ & w/o IV Contrast",
    priority: "Urgent",
    elapsed: "38m ago",
    status: "In Review",
    assignee: "Body Imaging",
  },
  {
    id: "case-04",
    accession: "ACC-9050",
    modality: "CT",
    examName: "CT Pulmonary Angiogram (PE Protocol)",
    priority: "STAT",
    elapsed: "16m ago",
    status: "Pending",
    assignee: "WE Teleradiology Queue",
    flag: "Triage Alert",
  },
  {
    id: "case-05",
    accession: "ACC-9052",
    modality: "X-Ray",
    examName: "XR Chest 2-Views PA & Lateral",
    priority: "Routine",
    elapsed: "49m ago",
    status: "Completed",
    assignee: "Thoracic Imaging",
  },
  {
    id: "case-06",
    accession: "ACC-9058",
    modality: "MRI",
    examName: "MRI Lumbar Spine w/o Contrast",
    priority: "Routine",
    elapsed: "1h 12m ago",
    status: "Pending",
    assignee: "Overflow Batch B",
  },
];

const PRIORITY_RANK: Record<WorklistRow["priority"], number> = { STAT: 0, Urgent: 1, Routine: 2 };
const MODALITIES = ["All", "CT", "MRI", "X-Ray"] as const;
const BACKLOG_REASONS = [
  "Volume Spikes",
  "Staffing Gaps",
  "New Imaging Sites",
  "Seasonal Demand",
  "Temporary Capacity Constraints",
];
const HIGHLIGHTS = [
  "Rapid overflow absorption without requiring new software",
  "Modality-matched assignment for CT, MRI, X-ray, and ultrasound",
  "Direct escalation for critical and unexpected acute findings",
];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function OverflowHero() {
  const [modality, setModality] = useState<(typeof MODALITIES)[number]>("All");
  const [isTriaged, setIsTriaged] = useState(false);

  // Signature: the queue arrives in accession order, then re-sorts by clinical
  // priority so STAT studies visibly move to the top.
  useEffect(() => {
    const t = window.setTimeout(() => setIsTriaged(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const rows = useMemo(() => {
    const filtered = modality === "All" ? INITIAL_WORKLIST : INITIAL_WORKLIST.filter((r) => r.modality === modality);
    return isTriaged
      ? [...filtered].sort((x, y) => PRIORITY_RANK[x.priority] - PRIORITY_RANK[y.priority])
      : filtered;
  }, [modality, isTriaged]);

  return (
    <section className="relative bg-background pt-36 pb-section lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">{OVERFLOW_HERO_CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display-sm font-semibold text-foreground text-balance">
              {OVERFLOW_HERO_CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-6 text-lead font-medium text-primary-strong">
              {OVERFLOW_HERO_CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 text-base text-foreground-muted leading-relaxed">
              {OVERFLOW_HERO_CONTENT.body}
            </motion.p>

            <motion.ul {...fadeIn(0.22)} className="mt-8 border-t border-border">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="py-3 border-b border-border text-sm text-foreground">
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fadeIn(0.28)} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={OVERFLOW_HERO_CONTENT.primaryCta.href}
                className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}
              >
                <span>{OVERFLOW_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={OVERFLOW_HERO_CONTENT.secondaryCta.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                {OVERFLOW_HERO_CONTENT.secondaryCta.label}
              </Link>
            </motion.div>
          </div>

          {/* Illustrative worklist: mock data, no patient information */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: MOTION.easeOut }}
            className="lg:col-span-7 overflow-hidden rounded-lg border border-border bg-card shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Clinical Operations Queue</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Radiology Worklist</p>
              </div>
              <p className="font-mono text-xs text-foreground-subtle">
                Queue Load: <strong className="font-semibold text-warning">{INITIAL_WORKLIST.length} Studies</strong>
              </p>
            </div>

            <div role="radiogroup" aria-label="Filter by modality" className="flex gap-1 border-b border-border bg-surface px-5 py-3">
              {MODALITIES.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={modality === m}
                  onClick={() => setModality(m)}
                  className={cn(
                    "rounded-sm px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    modality === m ? "bg-foreground text-background" : "text-foreground-muted hover:bg-surface-muted"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>

            <table className="w-full text-left text-sm">
              <caption className="sr-only">Illustrative example of a radiology worklist sorted by priority</caption>
              <thead className="text-xs text-foreground-subtle">
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-2 font-medium">Priority</th>
                  <th scope="col" className="px-2 py-2 font-medium">Study</th>
                  <th scope="col" className="hidden md:table-cell px-2 py-2 font-medium">Reader</th>
                  <th scope="col" className="px-5 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <motion.tr
                    layout="position"
                    key={row.id}
                    transition={{ layout: { duration: 0.7, ease: MOTION.easeOut } }}
                    className="border-b border-border align-top last:border-b-0"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "inline-block rounded-sm px-2 py-0.5 font-mono text-xs font-semibold",
                          row.priority === "STAT" && "bg-urgent-soft text-urgent",
                          row.priority === "Urgent" && "bg-warning/10 text-warning",
                          row.priority === "Routine" && "bg-surface-muted text-foreground-muted"
                        )}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-2 py-3.5">
                      <span className="font-mono text-xs text-foreground-subtle">
                        {row.accession} · {row.modality} · {row.elapsed}
                      </span>
                      <span className="mt-0.5 block font-medium text-foreground">{row.examName}</span>
                    </td>
                    <td className="hidden md:table-cell px-2 py-3.5 text-xs text-foreground-muted">{row.assignee}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-xs font-medium text-foreground-muted">
                      {row.status}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <p className="border-t border-border bg-surface px-5 py-3 text-xs text-foreground-subtle">
              U.S. Board-Certified Diagnostic Reads
            </p>
          </motion.div>
        </div>

        <motion.p {...fadeIn(0.35)} className="mt-16 max-w-4xl text-base leading-relaxed text-foreground-muted">
          <span className="font-semibold text-foreground">Common Reasons Backlogs Develop: </span>
          {BACKLOG_REASONS.join(" · ")}
        </motion.p>
      </Container>
    </section>
  );
}
