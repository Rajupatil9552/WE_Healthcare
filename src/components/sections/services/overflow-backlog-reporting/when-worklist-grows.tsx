"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { TrendUp, Stack, CheckCircle, Warning, ArrowsDownUp } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { WHEN_WORKLIST_GROWS_CONTENT } from "@/content/overflow-backlog-support";

export function WhenWorklistGrowsSection() {
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
      id="worklist-dynamics"
      className="py-20 lg:py-28 bg-white dark:bg-[#070e14] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Large Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Editorial Typography & Operational Objective (~6 cols)    */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <TrendUp size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>{WHEN_WORKLIST_GROWS_CONTENT.eyebrow}</span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.h2
              {...fadeUp(0.08)}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
            >
              {WHEN_WORKLIST_GROWS_CONTENT.heading}
            </motion.h2>

            {/* Narrative Body */}
            <motion.p
              {...fadeUp(0.14)}
              className="mt-5 text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium"
            >
              {WHEN_WORKLIST_GROWS_CONTENT.narrative}
            </motion.p>

            {/* Strategic Objective Banner */}
            <motion.div
              {...fadeUp(0.2)}
              className="mt-6 p-5 sm:p-6 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/30 text-slate-900 dark:text-slate-100"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold block mb-1">
                The Core Objective
              </span>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {WHEN_WORKLIST_GROWS_CONTENT.objective}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {WHEN_WORKLIST_GROWS_CONTENT.detail}
              </p>
            </motion.div>

            {/* Supporting Operational Bullet Points */}
            <motion.div
              {...fadeUp(0.26)}
              className="mt-6 space-y-3 w-full"
            >
              <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle size={18} weight="fill" className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Immediate capacity injection without waiting for month-long recruitment cycles</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle size={18} weight="fill" className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Prevents backlog from encroaching on scheduled outpatient exam slots</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle size={18} weight="fill" className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Maintains referring physician confidence and clinical satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Visual Worklist Stack + Clinical Photography (~6 cols)   */}
          {/* ============================================================== */}
          <motion.div
            {...fadeUp(0.16)}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Visual Photography Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-[16/10] shadow-xl shadow-slate-900/5">
              <Image
                src={WHEN_WORKLIST_GROWS_CONTENT.image}
                alt={WHEN_WORKLIST_GROWS_CONTENT.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Overlay telemetry badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 block">
                    Diagnostic Reading Room
                  </span>
                  <span className="text-sm font-semibold">Continuous Multi-Modality Triage</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Steady-State Flow
                </div>
              </div>
            </div>

            {/* Visual Worklist Stack Indicator: Inbound vs Reading Velocity */}
            <div className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1825] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Stack size={18} weight="bold" className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Worklist Dynamics Model
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Capacity Balance
                </span>
              </div>

              {/* Dynamic Queue Comparison */}
              <div className="space-y-4">
                {/* 1. Unmanaged Backlog Risk */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Warning size={13} className="text-amber-500" />
                      Inbound Volume Surge (Unassisted)
                    </span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">Accumulating Queue</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[88%]" />
                  </div>
                </div>

                {/* 2. With WE Healthcare Overflow Support */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CheckCircle size={13} weight="fill" className="text-emerald-500" />
                      With WE Healthcare Overflow Support
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">Queue Stabilized</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Explanatory Caption */}
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-normal border-t border-slate-200/80 dark:border-slate-800/80 pt-3">
                Supplemental teleradiology balances worklist influx, preventing acute reporting delays while your in-house team focuses on priority patient workflows.
              </p>
            </div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
