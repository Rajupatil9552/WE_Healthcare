"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { OPERATIONAL_NEEDS_INCLUDED_CONTENT } from "@/content/trauma-critical-care";

export function NeedsAndIncludedSection() {
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
      id="operational-needs-included"
      className="relative overflow-hidden bg-white dark:bg-[#040c16] text-slate-900 dark:text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.div
            {...fadeIn(0.04)}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              {OPERATIONAL_NEEDS_INCLUDED_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
          >
            {OPERATIONAL_NEEDS_INCLUDED_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeIn(0.16)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {OPERATIONAL_NEEDS_INCLUDED_CONTENT.supportingText}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* SUBTLE CONCEPTUAL CONNECTOR: NEEDS → CAPACITY → SUPPORT         */}
        {/* ============================================================== */}
        <motion.div
          {...fadeIn(0.2)}
          className="mb-14 lg:mb-16 p-4 sm:p-5 rounded-2xl bg-sky-50/50 dark:bg-[#07131e]/70 border border-sky-100 dark:border-slate-800"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            {OPERATIONAL_NEEDS_INCLUDED_CONTENT.conceptualConnector.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.sub}
                    </div>
                  </div>
                </div>

                {idx < OPERATIONAL_NEEDS_INCLUDED_CONTENT.conceptualConnector.length - 1 && (
                  <div className="hidden sm:flex flex-1 items-center justify-center text-sky-400 dark:text-sky-600 px-2" aria-hidden="true">
                    <div className="w-full h-px bg-sky-200 dark:bg-sky-900/60" />
                    <ArrowRight size={12} weight="bold" className="-ml-1 shrink-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 2-COLUMN SPLIT EDITORIAL FRAMEWORK (50% / 50%)                 */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          
          {/* ============================================================ */}
          {/* LEFT: COMMON OPERATIONAL NEEDS (6 cols)                      */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 lg:pr-10 xl:pr-14 lg:border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col">
            
            {/* Column Header */}
            <div className="pb-4 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-sky-800 dark:text-sky-300 uppercase">
                {OPERATIONAL_NEEDS_INCLUDED_CONTENT.needsSection.eyebrow}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                06 Operational Considerations
              </span>
            </div>

            {/* Rows */}
            <ul className="flex flex-col list-none p-0 m-0">
              {OPERATIONAL_NEEDS_INCLUDED_CONTENT.needsSection.items.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : 0.16 + idx * 0.05,
                    ease: easeTransition,
                  }}
                  tabIndex={0}
                  className="group py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800/70 hover:border-sky-200 dark:hover:border-sky-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 group-hover:text-sky-950 dark:group-hover:text-sky-200 pt-0.5 shrink-0 transition-colors">
                      {item.number}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-1 h-3 rounded-full bg-sky-600 dark:bg-sky-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" 
                          aria-hidden="true" 
                        />
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: WHAT'S INCLUDED (6 cols)                              */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 lg:pl-10 xl:pl-14 flex flex-col pt-6 lg:pt-0">
            
            {/* Column Header */}
            <div className="pb-4 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-sky-800 dark:text-sky-300 uppercase">
                {OPERATIONAL_NEEDS_INCLUDED_CONTENT.includedSection.eyebrow}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                05 Integrated Capabilities
              </span>
            </div>

            {/* Rows */}
            <ul className="flex flex-col list-none p-0 m-0">
              {OPERATIONAL_NEEDS_INCLUDED_CONTENT.includedSection.items.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.06,
                    ease: easeTransition,
                  }}
                  tabIndex={0}
                  className="group py-4 sm:py-4.5 border-b border-slate-100 dark:border-slate-800/70 hover:border-sky-200 dark:hover:border-sky-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-1 h-3 rounded-full bg-sky-600 dark:bg-sky-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" 
                          aria-hidden="true" 
                        />
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase group-hover:translate-x-1 transition-transform duration-200 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Monospace Architectural Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-900/60 text-[10px] font-mono text-sky-800 dark:text-sky-300 shrink-0 mt-0.5">
                      {item.badge}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Editorial Footer Note */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Tailored to facility bylaws & clinical escalation pathways</span>
              <span className="font-mono text-sky-700 dark:text-sky-400">CONFIGURED PRE-LAUNCH</span>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
