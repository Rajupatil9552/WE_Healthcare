"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ListChecks,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Pulse,
  ShareNetwork,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import {
  WHATS_INCLUDED_ITEMS,
  CHALLENGE_SUPPORT_MATRIX,
} from "@/content/overflow-backlog-support";

export function WhatsIncludedChallengeSection() {
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
      id="scope-and-solutions"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#050c12] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Main Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <ListChecks size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>OPERATIONAL SCOPE &amp; SOLUTIONS</span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            What&apos;s Included &amp; How It Solves Your Capacity Constraints
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            Comprehensive backlog interpretation protocols built to adapt directly to your facility&apos;s clinical workflow and volume fluctuations.
          </motion.p>
        </div>

        {/* Cohesive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: Typographic Checklist (7 Core Inclusions) (~6 cols)      */}
          {/* ============================================================== */}
          <motion.div
            {...fadeUp(0.12)}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
                Core Deliverables
              </span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 border-t border-b border-slate-200/80 dark:border-slate-800/80">
              {WHATS_INCLUDED_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className="py-4 sm:py-5 flex items-start gap-3.5 group hover:bg-white/60 dark:hover:bg-slate-900/40 px-2 rounded-lg transition-colors"
                >
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.verificationNote && (
                        <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          Configurable
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck size={16} className="text-sky-600 dark:text-sky-400" />
              <span>Full compliance with your facility&apos;s credentialing bylaws and templates.</span>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT: Challenge → Support Connecting Visual Relationships (~6 cols) */}
          {/* ============================================================== */}
          <motion.div
            {...fadeUp(0.18)}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
                Operational Alignment
              </span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-4">
              {CHALLENGE_SUPPORT_MATRIX.map((matrix, idx) => (
                <div
                  key={matrix.challenge}
                  className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#091522] p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-md"
                >
                  {/* Connected Challenge -> Support pill header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {matrix.challenge}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
                      <ArrowRight size={14} weight="bold" className="text-sky-500" />
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 font-mono">
                        {matrix.support}
                      </span>
                    </div>
                  </div>

                  {/* Context and Solution text */}
                  <div className="space-y-1.5 text-xs sm:text-[13px]">
                    <p className="text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300">Context:</strong> {matrix.description}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong className="text-sky-700 dark:text-sky-400">WE Support:</strong> {matrix.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl border border-sky-200/60 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">Implementation Flexibility:</strong> Coverage can scale dynamically on an hourly, daily, or seasonal cadence depending on acute department demand.
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
