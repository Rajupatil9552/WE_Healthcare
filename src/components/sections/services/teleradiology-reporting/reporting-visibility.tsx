"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ChartBar,
  ChartDonut,
  Pulse,
  Clock,
  CheckCircle,
  HardDrives,
  SlidersHorizontal,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

// Internal verification tracking:
// [VERIFY: available client reporting and analytics]
// Must not appear on public UI.

const ACTIVITY_BARS = [
  { label: "00:00", height: 60, shift: "Overnight" },
  { label: "04:00", height: 42, shift: "Overnight" },
  { label: "08:00", height: 85, shift: "Morning" },
  { label: "12:00", height: 95, shift: "Daytime" },
  { label: "16:00", height: 78, shift: "Evening" },
  { label: "20:00", height: 68, shift: "Evening" },
];

const MODALITY_SEGMENTS = [
  { name: "CT Scans", percentage: 40, strokeColor: "#0ea5e9", dashOffset: 0, dashLength: 105 },
  { name: "MRI Studies", percentage: 30, strokeColor: "#38bdf8", dashOffset: -105, dashLength: 79 },
  { name: "Ultrasound", percentage: 18, strokeColor: "#818cf8", dashOffset: -184, dashLength: 47 },
  { name: "X-Ray / Other", percentage: 12, strokeColor: "#94a3b8", dashOffset: -231, dashLength: 33 },
];

const WORKFLOW_STATUSES = [
  { stage: "DICOM Ingestion", status: "Normalized", statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", pct: 100 },
  { stage: "Subspecialty Routing", status: "Active Matching", statusColor: "text-sky-500 bg-sky-500/10 border-sky-500/30", pct: 100 },
  { stage: "Diagnostic Review", status: "In Progress", statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/30", pct: 75 },
  { stage: "EHR / PACS Return", status: "Transmitted", statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", pct: 100 },
];

const RECENT_ACTIVITIES = [
  {
    event: "Final Report Transmitted",
    detail: "Structured diagnostic report returned into local PACS/EHR",
    timestamp: "Sample event",
    icon: CheckCircle,
    color: "text-emerald-500",
  },
  {
    event: "Prior Studies Matched",
    detail: "Historical comparative series linked to current worklist accession",
    timestamp: "Sample event",
    icon: HardDrives,
    color: "text-sky-500",
  },
  {
    event: "Critical Escalation Documented",
    detail: "Closed-loop provider telephone notification confirmed and logged",
    timestamp: "Sample event",
    icon: Pulse,
    color: "text-amber-500",
  },
  {
    event: "Shift Worklist Rebalanced",
    detail: "Elastic subspecialty queue adjusted for after-hours volume",
    timestamp: "Sample event",
    icon: SlidersHorizontal,
    color: "text-sky-400",
  },
];

export function ReportingVisibilitySection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="reporting-visibility"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#070d11] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <ChartBar size={14} weight="bold" className="text-sky-500" />
            <span>REPORTING VISIBILITY</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Reporting Visibility
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Define the operational measures that matter to your team, such as volume, coverage windows, workflow status, and reporting activity.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* CONCEPTUAL PREMIUM REPORTING DASHBOARD MOCKUP                  */}
        {/* ============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#0c141a]/95 backdrop-blur-md p-6 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/40"
        >
          {/* Dashboard Control Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-950/70 border border-sky-200/80 dark:border-sky-800/80 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Pulse size={20} weight="bold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Operational Measures Portal
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                  Conceptual Demonstration &bull; Configurable Facility Analytics
                </p>
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Interface
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Clock size={13} />
                24/7 Monitoring
              </span>
            </div>
          </div>

          {/* 4 Dashboard Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* MODULE 1: Reporting Activity (Bar Chart, 6 cols on lg) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ChartBar size={18} weight="bold" className="text-sky-500" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Reporting Activity
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Sample Service Windows
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Relative volume density across morning, daytime, and after-hours coverage.
                </p>
              </div>

              {/* Animated Bar Chart */}
              <div className="mt-8 pt-4 border-t border-slate-200/70 dark:border-slate-800/70">
                <div className="h-44 flex items-end justify-between gap-3 px-2">
                  {ACTIVITY_BARS.map((bar, idx) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full max-w-[40px] bg-slate-200/80 dark:bg-slate-800/80 rounded-t-lg h-full flex items-end p-1">
                        <motion.div
                          initial={shouldReduceMotion ? { height: `${bar.height}%` } : { height: "0%" }}
                          whileInView={{ height: `${bar.height}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.07,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }}
                          className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md relative group/bar"
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MODULE 2: Study Distribution (Donut Chart, 6 cols on lg) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ChartDonut size={18} weight="bold" className="text-sky-500" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Study Distribution
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Modality Mix
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Normalized categorization of incoming diagnostic studies.
                </p>
              </div>

              {/* Animated Donut SVG & Legend */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col sm:flex-row items-center justify-around gap-6">
                {/* SVG Donut */}
                <div className="relative size-36 shrink-0 flex items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="10"
                    />
                    {MODALITY_SEGMENTS.map((seg, idx) => (
                      <motion.circle
                        key={seg.name}
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={seg.strokeColor}
                        strokeWidth="10"
                        strokeDasharray="264"
                        initial={shouldReduceMotion ? { strokeDashoffset: seg.dashOffset } : { strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: seg.dashOffset }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.1,
                          ease: "easeInOut",
                        }}
                        strokeLinecap="round"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      Multi
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Modality
                    </span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2.5 w-full sm:w-auto">
                  {MODALITY_SEGMENTS.map((seg) => (
                    <div key={seg.name} className="flex items-center justify-between sm:justify-start gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: seg.strokeColor }}
                        />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {seg.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {seg.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MODULE 3: Workflow Status (6 cols on lg) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrives size={18} weight="bold" className="text-sky-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Workflow Status
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Continuous Pipeline
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mb-5">
                Active tracking across clinical stages from receipt to electronic return.
              </p>

              <div className="space-y-3.5">
                {WORKFLOW_STATUSES.map((item, idx) => (
                  <div key={item.stage} className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.stage}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={shouldReduceMotion ? { width: `${item.pct}%` } : { width: "0%" }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.08,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 4: Recent Activity (6 cols on lg, Staggered Reveal) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={18} weight="bold" className="text-sky-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Recent Activity
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Event Stream
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mb-5">
                Timestamped operational logs providing audit-ready visibility.
              </p>

              <div className="space-y-3">
                {RECENT_ACTIVITIES.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <motion.div
                      key={act.event}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                      whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.08,
                        ease: "easeOut",
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 flex items-start gap-3"
                    >
                      <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} weight="bold" className={act.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {act.event}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                            {act.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug truncate mt-0.5">
                          {act.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default ReportingVisibilitySection;
