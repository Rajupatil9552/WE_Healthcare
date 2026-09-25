"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  HardDrives,
  ShareNetwork,
  UserCheck,
  FileText,
  CheckCircle,
  Cpu,
  LockKey,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.
// Internal verification tracking:
// [VERIFY: supported PACS/RIS integrations, interfaces, and workflow capabilities]

interface WorkflowStepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  activationDelay: number;
  connectorDelay: number;
}

const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    number: "01",
    title: "Study Received",
    description: "DICOM transfer initiates directly from local modalities or facility PACS via secure connection.",
    icon: HardDrives,
    activationDelay: 0.05,
    connectorDelay: 0.35,
  },
  {
    number: "02",
    title: "Study Routing",
    description: "Automated worklist ingestion matches study modality, priority level, and required subspecialty.",
    icon: ShareNetwork,
    activationDelay: 0.65,
    connectorDelay: 0.95,
  },
  {
    number: "03",
    title: "Radiologist Review",
    description: "Board-certified radiologist reviews prior imaging history and performs diagnostic interpretation.",
    icon: UserCheck,
    activationDelay: 1.25,
    connectorDelay: 1.55,
  },
  {
    number: "04",
    title: "Report Returned",
    description: "Signed diagnostic report returns bi-directionally into your local PACS and EHR environment.",
    icon: FileText,
    activationDelay: 1.85,
    connectorDelay: 2.15,
  },
];

const CAPABILITY_LABELS = [
  { label: "PACS/RIS", icon: HardDrives },
  { label: "Secure Connectivity", icon: LockKey },
  { label: "Reporting Workflow", icon: Cpu },
];

export function ExistingWorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="workflow"
      className="py-20 lg:py-28 bg-slate-50 dark:bg-[#071116] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <ShieldCheck size={14} weight="bold" className="text-sky-500" />
            <span>BUILT FOR YOUR ENVIRONMENT</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Built Around Your Existing Workflow
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            The goal is to fit into your current imaging environment rather than create a separate process.
          </motion.p>

          {/* Capability Badges */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.22 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
          >
            {CAPABILITY_LABELS.map((cap) => {
              const CapIcon = cap.icon;
              return (
                <span
                  key={cap.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  <CapIcon size={14} weight="bold" className="text-sky-500" />
                  <span>{cap.label}</span>
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP WORKFLOW (Horizontal Sequential Animation, md:block)  */}
        {/* ============================================================== */}
        <div className="hidden md:block relative mb-6">
          <div className="grid grid-cols-4 gap-4 lg:gap-6 relative items-start">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isLast = idx === WORKFLOW_STEPS.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Step Card Node */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : step.activationDelay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "w-full p-5 lg:p-6 rounded-2xl border transition-all duration-300 relative group bg-white dark:bg-slate-900/80 shadow-md",
                      "hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-lg hover:-translate-y-1"
                    )}
                  >
                    {/* Top Step Pill with Blue Activation Glow */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-800/80 px-2.5 py-0.5 rounded-full">
                        {step.number}
                      </span>
                      <motion.div
                        initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                        whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: shouldReduceMotion ? 0 : step.activationDelay + 0.1,
                        }}
                        className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400"
                      >
                        <StepIcon size={20} weight="bold" />
                      </motion.div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug text-left">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left font-normal">
                      {step.description}
                    </p>

                    {/* Active Verification Status */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span>Interoperable Stage</span>
                      <CheckCircle size={14} weight="fill" className="text-emerald-500" />
                    </div>
                  </motion.div>

                  {/* Horizontal Animated Connector to Next Node */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute top-1/2 -right-2 lg:-right-3 -translate-y-1/2 w-4 lg:w-6 h-0.5 bg-slate-200 dark:bg-slate-800 z-10 overflow-hidden"
                    >
                      <motion.div
                        initial={shouldReduceMotion ? { width: "100%" } : { width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: shouldReduceMotion ? 0 : step.connectorDelay,
                          ease: "easeInOut",
                        }}
                        className="h-full bg-gradient-to-r from-sky-500 to-sky-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE WORKFLOW (Vertical Timeline Animation, block md:hidden) */}
        {/* ============================================================== */}
        <div className="block md:hidden relative pl-6">
          {/* Continuous Vertical Connector Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? { height: "100%" } : { height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="w-full bg-gradient-to-b from-sky-500 via-sky-400 to-emerald-400"
            />
          </div>

          <div className="space-y-6">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <div key={step.number} className="relative flex items-start gap-4">
                  {/* Step Node Marker on Vertical Spine */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : 0.1 * idx,
                    }}
                    className="relative z-10 size-11 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-500 shadow-md flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0"
                  >
                    <StepIcon size={18} weight="bold" />
                  </motion.div>

                  {/* Step Card Content */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.12 * idx,
                    }}
                    className="flex-1 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400">
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ExistingWorkflowSection;
