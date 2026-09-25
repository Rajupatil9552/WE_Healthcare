"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ShieldCheck, FileText, PhoneCall, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { TRAUMA_PROTOCOL_CRITICAL_CONTENT } from "@/content/trauma-critical-care";

export function ProtocolAndCriticalSection() {
  const shouldReduceMotion = useReducedMotion();

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 10 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.45,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeTransition,
    },
  });

  return (
    <section 
      id="protocol-alignment-critical-findings"
      className="relative overflow-hidden bg-white dark:bg-[#040c16] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: PROTOCOL ALIGNMENT NARRATIVE (~45% / 5 cols)             */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Eyebrow */}
            <motion.div
              {...fadeIn(0.04)}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.protocolSection.eyebrow}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeIn(0.1)}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
            >
              {TRAUMA_PROTOCOL_CRITICAL_CONTENT.protocolSection.heading}
            </motion.h2>

            {/* Protocol Content */}
            <motion.p
              {...fadeIn(0.18)}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {TRAUMA_PROTOCOL_CRITICAL_CONTENT.protocolSection.content}
            </motion.p>

            {/* Governance Callout */}
            <motion.div
              {...fadeIn(0.26)}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-sky-50/50 dark:bg-[#07131e]/70 border border-sky-100 dark:border-slate-800 w-full"
            >
              <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-1">
                Institutional Alignment
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.protocolSection.governanceNote}
              </p>
            </motion.div>

            {/* Part B — Critical Findings Briefing */}
            <motion.div
              {...fadeIn(0.34)}
              className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full"
            >
              <span className="text-xs font-mono font-bold tracking-wider text-sky-800 dark:text-sky-300 uppercase block mb-1.5">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.criticalSection.eyebrow}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.criticalSection.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.criticalSection.content}
              </p>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: CONCEPTUAL COMMUNICATION FRAMEWORK (~55% / 7 cols)      */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <div className="rounded-3xl bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 dark:from-[#07131e] dark:via-[#081726] dark:to-[#05111d] border border-sky-100 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                  Clinical Escalation Framework
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Closed-Loop Sequence
                </span>
              </div>

              {/* 5 Conceptual Nodes with Thin Sequential Connector Lines */}
              <div className="flex flex-col">
                {TRAUMA_PROTOCOL_CRITICAL_CONTENT.frameworkSteps.map((step, idx) => {
                  const nodeDelays = [0.18, 0.32, 0.46, 0.60, 0.74];
                  const lineDelays = [0.25, 0.39, 0.53, 0.67];

                  return (
                    <div key={step.id} className="relative">
                      {/* Node Card */}
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: shouldReduceMotion ? 0 : nodeDelays[idx],
                          ease: easeTransition,
                        }}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-4 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                          {step.step}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                            {step.label}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed font-normal">
                            {step.detail}
                          </p>
                        </div>
                      </motion.div>

                      {/* Connecting Down Arrow */}
                      {idx < TRAUMA_PROTOCOL_CRITICAL_CONTENT.frameworkSteps.length - 1 && (
                        <div className="flex justify-center items-center py-1.5 text-sky-400 dark:text-sky-600" aria-hidden="true">
                          <motion.div
                            initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
                            whileInView={shouldReduceMotion ? {} : { scaleY: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: shouldReduceMotion ? 0 : lineDelays[idx],
                              ease: "easeOut",
                            }}
                            className="origin-top flex flex-col items-center"
                          >
                            <div className="w-px h-3.5 bg-sky-300 dark:bg-sky-800" />
                            <ArrowDown size={12} weight="bold" className="-mt-1" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-8 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Direct physician-to-physician communication</span>
                <span className="font-mono text-sky-700 dark:text-sky-400">ZERO AMBIGUITY</span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
