"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  GitCommit,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Funnel,
  Sparkle,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS_CONTENT, type WorkflowStep } from "@/content/overflow-backlog-support";

// Mock study queue states for the 4 transformation phases
interface TransformationCase {
  id: string;
  accession: string;
  modality: string;
  exam: string;
  priority?: "STAT" | "Urgent" | "Routine";
  status: "Pending" | "Triage" | "In Review" | "Reported" | "Archived";
  assignedTo?: string;
  isCompleted?: boolean;
}

const PHASE_CASES: Record<number, TransformationCase[]> = {
  // Step 1: Assess Backlog — Unsorted raw unread studies
  0: [
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", status: "Pending" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", status: "Pending" },
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", status: "Pending" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", status: "Pending" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", status: "Pending" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", status: "Pending" },
  ],
  // Step 2: Prioritize — Clinical urgency indicators & modality triage applied
  1: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "Triage" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "Triage" },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "Triage" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Pending" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "Pending" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "Pending" },
  ],
  // Step 3: Report in Batches — Studies actively routed to subspecialists
  2: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "In Review", assignedTo: "Dr. E. Chen (Neuro)" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "In Review", assignedTo: "Dr. K. Vance (Fellowship)" },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "In Review", assignedTo: "WE Teleradiology Batch A" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Triage", assignedTo: "Batch B (Scheduled)" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "Pending", assignedTo: "Batch B (Scheduled)" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "Pending", assignedTo: "Batch C (Scheduled)" },
  ],
  // Step 4: Clear Queue — High-acuity cases reported, queue normalized
  3: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "In Review", assignedTo: "Steady-State Shift" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "In Review", assignedTo: "Steady-State Shift" },
  ],
};

export function BacklogTransformationSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStepData = HOW_IT_WORKS_CONTENT[activeStep];
  const currentCases = PHASE_CASES[activeStep];

  const fadeUp = (delay: number = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-white dark:bg-[#070e14] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <ArrowsClockwise size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>MAIN SIGNATURE EXPERIENCE</span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            From Growing Backlog to a Managed Worklist
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            A conceptual walkthrough of how our clinical operations organize, prioritize, and systematically process overflow imaging volume.
          </motion.p>
        </div>

        {/* Step Navigation Bar (4 Phases) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {HOW_IT_WORKS_CONTENT.map((stepItem: WorkflowStep, idx: number) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={stepItem.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "p-3 sm:p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between",
                  isSelected
                    ? "bg-sky-50/90 dark:bg-sky-950/40 border-sky-500/80 dark:border-sky-600 shadow-xs ring-1 ring-sky-500/30"
                    : "bg-slate-50 dark:bg-[#0c1825] border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold",
                      isSelected ? "text-sky-700 dark:text-sky-400" : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {stepItem.step}
                  </span>
                  {isSelected && (
                    <span className="size-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm sm:text-base font-bold tracking-tight block",
                    isSelected ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {stepItem.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Signature Interactive Visualization Panel */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-[#071320] p-5 sm:p-8 lg:p-10 shadow-lg shadow-slate-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Step Details & Narrative (~5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-2">
                <span>Phase {activeStep + 1} of 4</span>
                <span>•</span>
                <span>{currentStepData.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentStepData.title}
              </h3>

              <p className="mt-2 text-sm sm:text-base font-medium text-sky-700 dark:text-sky-300">
                {currentStepData.subtitle}
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Phase Telemetry Indicators */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-4">
                {currentStepData.visualMetrics.map((metric) => (
                  <div key={metric.label} className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                      {metric.label}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">
                      {metric.value}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-400">
                      {metric.subtext}
                    </span>
                  </div>
                ))}
              </div>

              {/* Next Phase Quick Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-600 font-mono transition-colors"
                >
                  <span>Advance to next workflow step</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>

            {/* RIGHT: Transforming Worklist Simulation UI (~7 cols on lg) */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-[#0a1624] shadow-md overflow-hidden">
                
                {/* Header with State Badge */}
                <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      Worklist State: {currentStepData.title.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Active Studies: 6
                  </span>
                </div>

                {/* Dynamic Study Rows Animation */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80 min-h-[300px] flex flex-col justify-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`step-${activeStep}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="divide-y divide-slate-100 dark:divide-slate-800/80"
                    >
                      {currentCases.map((study) => (
                        <div
                          key={study.id}
                          className={cn(
                            "p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors",
                            study.isCompleted
                              ? "bg-emerald-50/30 dark:bg-emerald-950/15 text-slate-500 dark:text-slate-400"
                              : "hover:bg-slate-50 dark:hover:bg-slate-900/40"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {/* Priority Indicator if available */}
                            {study.priority ? (
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase shrink-0",
                                  study.priority === "STAT"
                                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800"
                                    : study.priority === "Urgent"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                )}
                              >
                                {study.priority}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                Untriaged
                              </span>
                            )}

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-200">
                                  {study.accession}
                                </span>
                                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                                  {study.modality}
                                </span>
                              </div>
                              <p className={cn("text-xs font-medium truncate max-w-[260px] sm:max-w-xs", study.isCompleted ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-300")}>
                                {study.exam}
                              </p>
                            </div>
                          </div>

                          {/* Right status badge */}
                          <div className="flex items-center gap-2.5 sm:justify-end pl-8 sm:pl-0 text-xs">
                            {study.assignedTo && (
                              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                                {study.assignedTo}
                              </span>
                            )}
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1",
                                study.isCompleted
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                                  : study.status === "In Review"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                                  : study.status === "Triage"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                              )}
                            >
                              {study.isCompleted && <CheckCircle size={12} weight="fill" className="text-emerald-600 dark:text-emerald-400" />}
                              {study.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer simulation notice */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="italic">Conceptual workflow representation for healthcare operational planning.</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400">DICOM / HL7 Standard</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
