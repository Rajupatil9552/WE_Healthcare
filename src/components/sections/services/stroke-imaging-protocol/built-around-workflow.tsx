"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  Scan,
  UsersThree,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { BUILT_AROUND_WORKFLOW_CONTENT } from "@/content/stroke-imaging-protocol";

export function BuiltAroundWorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  // Subtle editorial entrance transitions
  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-[#06101c] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Subtle ambient lighting tone */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[400px] bg-gradient-to-r from-sky-100/30 via-sky-50/10 to-transparent dark:from-sky-950/20 dark:via-transparent dark:to-transparent pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <Container className="relative z-10">
        
        {/* Section Header with Left-Bordered Architectural Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-16">
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              {...fadeIn(0.04)}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {BUILT_AROUND_WORKFLOW_CONTENT.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              {...fadeIn(0.12)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
            >
              {BUILT_AROUND_WORKFLOW_CONTENT.heading}
            </motion.h2>

            <motion.p
              {...fadeIn(0.2)}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {BUILT_AROUND_WORKFLOW_CONTENT.body}
            </motion.p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <motion.div
              {...fadeIn(0.28)}
              className="border-l-2 lg:border-l-0 lg:border-r-2 border-sky-600 dark:border-sky-400 pl-4 lg:pl-0 lg:pr-4 py-1 text-left lg:text-right"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-800 dark:text-sky-300 block">
                {BUILT_AROUND_WORKFLOW_CONTENT.tagline}
              </span>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Aligned with existing emergency pathways, stroke center guidelines, and hospital communication protocols.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Horizontal 3-Stakeholder Interconnected Clinical Bridge         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 relative mb-12">
          {BUILT_AROUND_WORKFLOW_CONTENT.coordinationSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative rounded-2xl bg-white dark:bg-[#07131e] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm shadow-slate-200/40 dark:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center border border-sky-200/60 dark:border-sky-800/60">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Connecting arrow indicator for desktop (between items 1->2 and 2->3) */}
              {idx < 2 && (
                <div 
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 items-center justify-center text-sky-600 dark:text-sky-400 z-20 shadow-xs pointer-events-none"
                  aria-hidden="true"
                >
                  <ArrowRight size={12} weight="bold" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* Panoramic Diagnostic Workstation Visual Strip                   */}
        {/* ============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35 }}
          className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-black/60"
        >
          <div className="relative aspect-[21/9] sm:aspect-[24/9] lg:aspect-[28/9] min-h-[220px] w-full overflow-hidden">
            <Image
              src={BUILT_AROUND_WORKFLOW_CONTENT.image}
              alt={BUILT_AROUND_WORKFLOW_CONTENT.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center filter brightness-95"
            />
            
            {/* Dark gradient vignette */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" 
              aria-hidden="true"
            />

            {/* Micro bottom overlay bar */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-sky-200 font-medium text-xs sm:text-sm">
                  Clinical Care Coordination • Axial Brain CT & CTA Perfusion Review
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono tracking-wider">
                ILLUSTRATIVE NON-PHI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Micro-Detail Caption */}
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center italic">
          {BUILT_AROUND_WORKFLOW_CONTENT.caption}
        </p>

      </Container>
    </section>
  );
}
