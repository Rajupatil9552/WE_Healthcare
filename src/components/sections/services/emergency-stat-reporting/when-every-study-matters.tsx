"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Lightning,
  WarningCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  ArrowsSplit,
  Funnel,
  CaretRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { WHEN_EVERY_STUDY_MATTERS_CONTENT } from "@/content/emergency-stat-reporting";

export function WhenEveryStudyMattersSection() {
  const shouldReduceMotion = useReducedMotion();

  // Controlled editorial entrance animations
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.55,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  const queueItemAnim = (delay: number, isStat = false) => ({
    initial: shouldReduceMotion
      ? false
      : { opacity: 0, x: isStat ? -12 : 0, y: isStat ? 0 : 12 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="when-every-study-matters"
      className="relative overflow-hidden bg-white dark:bg-[#030910] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* Asymmetric 45% / 55% Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* LEFT 45%: Editorial Narrative & Clinical Reality (~5 cols)     */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Section Eyebrow */}
            <motion.span
              {...fadeUp(0.04)}
              className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400"
            >
              {WHEN_EVERY_STUDY_MATTERS_CONTENT.eyebrow}
            </motion.span>

            {/* Section Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {WHEN_EVERY_STUDY_MATTERS_CONTENT.heading}
            </motion.h2>

            {/* Section Body */}
            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {WHEN_EVERY_STUDY_MATTERS_CONTENT.body}
            </motion.p>

            {/* Visual Clinical Rationale */}
            <motion.div
              {...fadeUp(0.24)}
              className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                <Funnel size={15} className="text-rose-600 dark:text-rose-400" />
                <span>The Principle of Differentiated Triage</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A single undifferentiated queue creates clinical delay. Clear classification ensures life-critical emergency studies are identified upon ingestion and bypass non-emergent outpatient volume.
              </p>
            </motion.div>

            {/* Transition Bridge to Upcoming Priority Queue / STAT Workflow */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {WHEN_EVERY_STUDY_MATTERS_CONTENT.transition.message}
              </p>

              {/* Directional Step Path: Priority → Routing → Review → Communication */}
              <div className="mt-3.5 flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                {WHEN_EVERY_STUDY_MATTERS_CONTENT.transition.steps.map((step, idx) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {step.label}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {step.sub}
                      </span>
                    </div>
                    {idx < WHEN_EVERY_STUDY_MATTERS_CONTENT.transition.steps.length - 1 && (
                      <CaretRight size={13} className="text-slate-300 dark:text-slate-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT 55%: Conceptual Priority Worklist Visual (~7 cols)        */}
          {/* ============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* The Priority Queue Interface Panel */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050e18] shadow-xl shadow-slate-200/40 dark:shadow-black/60 overflow-hidden">
              
              {/* Panel Clinical Header */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                  <span className="font-semibold text-xs text-slate-900 dark:text-white tracking-wide uppercase">
                    Acuity Classification Engine
                  </span>
                  <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                    Dynamic Triage Matrix
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-[10px] uppercase bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    Conceptual UI
                  </span>
                  <span>Non-Clinical Demo Data</span>
                </div>
              </div>

              {/* Contextual Radiology Suite Workstation Anchor */}
              <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-950">
                <Image
                  src={WHEN_EVERY_STUDY_MATTERS_CONTENT.image}
                  alt={WHEN_EVERY_STUDY_MATTERS_CONTENT.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center filter brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-5 right-5 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-rose-400" />
                    <span className="font-medium">
                      Multi-Monitor PACS Diagnostic Reading Suite
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono hidden sm:inline">
                    Priority Study Elevation Active
                  </span>
                </div>
              </div>

              {/* Priority Worklist Rows Container */}
              <div className="p-4 sm:p-5 space-y-2.5 bg-slate-50/50 dark:bg-[#050e18]">
                
                {/* 1. STAT Study Row (Visually Emphasized & Elevated) */}
                <motion.div
                  {...queueItemAnim(0.2, true)}
                  className="rounded-xl border-2 border-rose-500/80 dark:border-rose-500/70 bg-white dark:bg-rose-950/20 p-3.5 sm:p-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    
                    {/* Left: Badge & Study */}
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                        <Lightning size={13} weight="fill" />
                        STAT
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[0].exam}
                        </h4>
                        <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[0].indication}
                        </p>
                      </div>
                    </div>

                    {/* Right: Operational Destination & Routing */}
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                          Triage Action
                        </span>
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[0].destination}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-semibold shrink-0">
                        {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[0].action}
                      </span>
                    </div>

                  </div>

                  {/* Immediate routing rationale strip */}
                  <div className="mt-2.5 pt-2 border-t border-rose-200/70 dark:border-rose-900/50 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-300 font-medium">
                      <CheckCircle size={13} weight="fill" />
                      Elevated to top of credentialed radiologist worklist
                    </span>
                    <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                      Bypasses Routine Queue
                    </span>
                  </div>
                </motion.div>

                {/* 2. HIGH Priority Study Row */}
                <motion.div
                  {...queueItemAnim(0.3)}
                  className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-white dark:bg-slate-900/80 p-3 sm:p-3.5 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        HIGH
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[1].exam}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[1].indication}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] font-medium text-amber-700 dark:text-amber-300">
                          {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[1].destination}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium shrink-0">
                        {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue[1].action}
                      </span>
                    </div>

                  </div>
                </motion.div>

                {/* 3. ROUTINE Study Rows */}
                {WHEN_EVERY_STUDY_MATTERS_CONTENT.priorityQueue.slice(2).map((study, idx) => (
                  <motion.div
                    key={study.id}
                    {...queueItemAnim(0.38 + idx * 0.08)}
                    className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3 sm:p-3.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          ROUTINE
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                            {study.exam}
                          </h4>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {study.indication}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {study.destination}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-normal shrink-0">
                          {study.action}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                ))}

              </div>

              {/* Bottom Clinical Triage Guarantee Note */}
              <div className="px-5 py-3 bg-slate-100/80 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  Studies dynamically sorted by clinical acuity parameter upon ingestion
                </span>
                <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
                  HL7 / DICOM Priority Flags
                </span>
              </div>

            </div>

            {/* Subtle Annotation Below Visual */}
            <p className="text-xs text-slate-500 dark:text-slate-400 px-1">
              Conceptual worklist model. WE Healthcare interfaces with your existing RIS/PACS priority flags without disrupting established technologist routines.
            </p>
          </motion.div>

        </div>

      </Container>
    </section>
  );
}

export default WhenEveryStudyMattersSection;
