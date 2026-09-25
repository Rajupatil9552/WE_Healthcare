"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ChartLineUp,
  Clock,
  Stack,
  CheckCircle,
  CalendarCheck,
  ShieldCheck,
  Eye,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { REPORTING_VISIBILITY_CONTENT } from "@/content/overflow-backlog-support";

export function ReportingVisibilitySection() {
  const shouldReduceMotion = useReducedMotion();

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
      id="reporting-visibility"
      className="py-20 lg:py-28 bg-white dark:bg-[#070e14] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <Eye size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>{REPORTING_VISIBILITY_CONTENT.eyebrow}</span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            {REPORTING_VISIBILITY_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {REPORTING_VISIBILITY_CONTENT.subtitle}
          </motion.p>
        </div>

        {/* Conceptual Operations Dashboard Visual & Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Conceptual Dashboard UI Mockup (~7 cols on lg) */}
          <motion.div
            {...fadeUp(0.12)}
            className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#091523] p-5 sm:p-7 shadow-xl shadow-slate-900/5 overflow-hidden"
          >
            {/* Dashboard Topbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200/80 dark:border-slate-800 gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Operations Console
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Backlog Triage &amp; Velocity Telemetry
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300">
                  Window: Shift 2
                </span>
              </div>
            </div>

            {/* Visual Metrics Row (4 Indicators) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">
                  Study Volume
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                  Monitored
                </span>
                <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                  By Modality &amp; Site
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">
                  Reporting Activity
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                  Synchronous
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Continuous Throughput
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">
                  Coverage Window
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                  Agreed Hours
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Custom Surge Blocks
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">
                  Backlog Status
                </span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                  Controlled
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Steady-State Tracking
                </span>
              </div>
            </div>

            {/* Visual Photography Overlay: Command center coordination */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 dark:border-slate-800">
              <Image
                src="/images/overflow-backlog-reporting/backlog-prioritization.jpg"
                alt="Radiology operations manager and physician reviewing organized case triage display in command center"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-sky-200">
                  Agreed Measures • Structured Clinical Audits
                </span>
                <span className="font-mono text-[10px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                  Transparent Telemetry
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Bi-directional tracking ensures full visibility into reading progress.</span>
              <span className="font-mono text-[11px] text-sky-600 dark:text-sky-400">HL7 Verified</span>
            </div>
          </motion.div>

          {/* RIGHT: Detail of the 4 agreed metrics (~5 cols on lg) */}
          <motion.div
            {...fadeUp(0.18)}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            {REPORTING_VISIBILITY_CONTENT.metrics.map((m, idx) => (
              <div
                key={m.label}
                className="p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {m.label}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800">
                    {m.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {m.description}
                </p>
              </div>
            ))}

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-2">
              <ShieldCheck size={16} className="text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Metrics are established during onboarding according to your institution&apos;s governance.</span>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
