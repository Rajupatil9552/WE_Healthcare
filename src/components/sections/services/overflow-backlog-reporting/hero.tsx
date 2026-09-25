"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Queue,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Funnel,
  WarningCircle,
  Clock,
  Sparkle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    assignee: "Dr. E. Chen (Neuro)",
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
    assignee: "Dr. K. Vance (Fellowship)",
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
    assignee: "Dr. M. Rivera (Thoracic)",
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

export function OverflowHero() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedModality, setSelectedModality] = useState<string>("All");

  const filteredStudies =
    selectedModality === "All"
      ? INITIAL_WORKLIST
      : INITIAL_WORKLIST.filter((study) => study.modality === selectedModality);

  // Controlled sequential fade
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/25 to-white dark:from-[#040c14] dark:via-[#071524] dark:to-[#0a1b2e] text-slate-900 dark:text-white pt-36 pb-20 lg:pt-44 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background ambient lighting - clinical cool blues */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 size-[580px] rounded-full bg-sky-500/10 dark:bg-sky-400/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-5 size-[460px] rounded-full bg-blue-600/5 dark:bg-blue-600/12 blur-[130px]"
      />

      <Container className="relative z-10">
        {/* Asymmetrical Editorial Composition: Left narrative + Right radiology worklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Narrative & Strategic Positioning (~5 cols on xl)        */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-20 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* 1. Eyebrow Badge */}
            <motion.div
              {...fadeUp(0.06)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <Queue size={15} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>{OVERFLOW_HERO_CONTENT.eyebrow}</span>
            </motion.div>

            {/* 2. Primary H1 Headline */}
            <motion.h1
              {...fadeUp(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              {OVERFLOW_HERO_CONTENT.heading}
            </motion.h1>

            {/* 3. Supporting Heading */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-200/90 leading-snug"
            >
              {OVERFLOW_HERO_CONTENT.subheading}
            </motion.p>

            {/* 4. Body Copy */}
            <motion.p
              {...fadeUp(0.28)}
              className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              {OVERFLOW_HERO_CONTENT.body}
            </motion.p>

            {/* Key Operational Commitments */}
            <motion.div
              {...fadeUp(0.34)}
              className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2.5 w-full"
            >
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Rapid overflow absorption without requiring new software</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Modality-matched assignment for CT, MRI, X-ray, and ultrasound</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Direct escalation for critical and unexpected acute findings</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              <Link
                href={OVERFLOW_HERO_CONTENT.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 px-6 font-semibold"
                )}
              >
                <span>{OVERFLOW_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </Link>
              <Link
                href={OVERFLOW_HERO_CONTENT.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-6 font-medium"
                )}
              >
                <span>{OVERFLOW_HERO_CONTENT.secondaryCta.label}</span>
              </Link>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: High-Precision Radiology Worklist Visual (~7 cols xl)   */}
          {/* ============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 relative"
          >
            {/* Subtle glow container framing the workstation */}
            <div className="relative rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#081523]/95 shadow-2xl shadow-slate-900/10 dark:shadow-black/50 backdrop-blur-md overflow-hidden">
              
              {/* Optional Subtle Header Backdrop Banner */}
              <div className="relative h-28 sm:h-36 w-full overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
                <Image
                  src={OVERFLOW_HERO_CONTENT.image}
                  alt={OVERFLOW_HERO_CONTENT.alt}
                  fill
                  priority
                  className="object-cover object-center opacity-30 dark:opacity-25 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#081523] dark:via-[#081523]/80 dark:to-transparent" />
                
                {/* Live Diagnostic Status Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">
                      PACS Ingestion: Active
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-300/60 dark:border-sky-800 text-[11px] font-medium text-sky-800 dark:text-sky-300">
                    <Clock size={12} weight="bold" />
                    <span>Overflow Mode: On-Demand</span>
                  </div>
                </div>

                {/* Worklist Title & Metrics Summary */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400">
                      Clinical Operations Queue
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Radiology Worklist
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Queue Load: <strong className="text-amber-600 dark:text-amber-400 font-semibold">14 Studies</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Worklist Filter Bar */}
              <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <Funnel size={13} className="text-slate-400 mr-1 shrink-0" />
                  {["All", "CT", "MRI", "X-Ray"].map((modality) => (
                    <button
                      key={modality}
                      type="button"
                      onClick={() => setSelectedModality(modality)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium transition-colors shrink-0",
                        selectedModality === modality
                          ? "bg-sky-600 text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                      )}
                    >
                      {modality}
                    </button>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Routing: Auto-Modality</span>
                </div>
              </div>

              {/* Table / Study Rows — High Readability */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[380px] overflow-y-auto">
                {filteredStudies.map((study, idx) => (
                  <motion.div
                    key={study.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.05,
                    }}
                    className="p-3.5 sm:px-4 hover:bg-sky-50/40 dark:hover:bg-sky-950/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    {/* Left details: Priority, Modality, Exam Name */}
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Priority Tag */}
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase mt-0.5 shrink-0",
                          study.priority === "STAT"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800/80"
                            : study.priority === "Urgent"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        )}
                      >
                        {study.priority}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-200">
                            {study.accession}
                          </span>
                          <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                            {study.modality}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                            • {study.elapsed}
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-200 truncate max-w-[280px] sm:max-w-sm">
                          {study.examName}
                        </p>
                      </div>
                    </div>

                    {/* Right details: Status & Assigned Radiologist */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-9 sm:pl-0 shrink-0">
                      {/* Assignment */}
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono hidden sm:inline">
                        {study.assignee}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5",
                          study.status === "In Review"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : study.status === "Pending"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            study.status === "In Review"
                              ? "bg-blue-500 animate-pulse"
                              : study.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          )}
                        />
                        {study.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Worklist Footer Bar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-sky-600 dark:text-sky-400" />
                  <span>U.S. Board-Certified Diagnostic Reads</span>
                </div>
                <div className="font-mono text-[11px]">
                  Batch Processing: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative operational caption */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px]">Interface: Live Radiology Queue Synchronization</span>
              <span className="hidden sm:inline font-mono text-[11px]">HL7 / DICOM Bi-directional</span>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
