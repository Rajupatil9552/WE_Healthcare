"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CaretRight,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { COMMON_USE_CASES_CONTENT } from "@/content/emergency-stat-reporting";

export function CommonUseCasesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(
    COMMON_USE_CASES_CONTENT.useCases[0].id
  );

  const activeCase =
    COMMON_USE_CASES_CONTENT.useCases.find((item) => item.id === activeId) ??
    COMMON_USE_CASES_CONTENT.useCases[0];

  // Subtle scroll-triggered reveal
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="common-use-cases"
      className="relative overflow-hidden bg-slate-50/70 dark:bg-[#040c16] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* Asymmetric 40% / 60% Layout: Editorial Narrative + Interactive Scenario List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT ~40%: Editorial Context & Narrative Bridge (~5 cols)      */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Eyebrow */}
            <motion.span
              {...fadeUp(0.04)}
              className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400"
            >
              {COMMON_USE_CASES_CONTENT.eyebrow}
            </motion.span>

            {/* Main Editorial Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {COMMON_USE_CASES_CONTENT.heading}
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              {...fadeUp(0.18)}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {COMMON_USE_CASES_CONTENT.supportingCopy}
            </motion.p>

            {/* Contextual Visual Preview Anchor (Desktop Sticky Reference) */}
            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 hidden lg:block w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeCase.image}
                      alt={activeCase.alt}
                      fill
                      sizes="400px"
                      className="object-cover object-center filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlaid Context Metadata */}
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold text-rose-300 drop-shadow-xs">
                    {activeCase.number} — {activeCase.title}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    Operational Scenario
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white dark:bg-[#07131e] border-t border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                  Clinical Focus Area
                </span>
                <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {activeCase.clinicalFocus}
                </p>
              </div>
            </motion.div>

            {/* Bottom Sectional Transition Toward Next Section */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                <span className="text-slate-500 dark:text-slate-400">
                  {COMMON_USE_CASES_CONTENT.transition.lead}
                </span>
                <CaretRight size={14} className="text-rose-600 dark:text-rose-400" />
                <span className="text-rose-700 dark:text-rose-300">
                  {COMMON_USE_CASES_CONTENT.transition.arrow}
                </span>
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT ~60%: Editorial Interactive Use-Case List (~7 cols)      */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            {/* List Container with Accessible Role */}
            <div
              role="tablist"
              aria-label="Common clinical use cases for emergency and STAT radiology"
              className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800"
            >
              {COMMON_USE_CASES_CONTENT.useCases.map((useCase, index) => {
                const isActive = useCase.id === activeId;

                return (
                  <motion.div
                    key={useCase.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.08 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${useCase.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${useCase.id}`}
                      tabIndex={0}
                      onClick={() => setActiveId(useCase.id)}
                      onMouseEnter={() => setActiveId(useCase.id)}
                      onFocus={() => setActiveId(useCase.id)}
                      className={cn(
                        "group w-full text-left py-5 sm:py-6 px-3 sm:px-5 transition-all duration-200 relative flex flex-col focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg",
                        isActive
                          ? "bg-white dark:bg-slate-900/90 shadow-xs sm:translate-x-2"
                          : "hover:bg-white/60 dark:hover:bg-slate-900/40"
                      )}
                    >
                      {/* Active Indicator Bar on Left */}
                      {isActive && (
                        <motion.span
                          layoutId="active-scenario-bar"
                          className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-rose-600 dark:bg-rose-400"
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Header Row: Number + Title + Arrow */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          
                          {/* Large Typography Number */}
                          <span
                            className={cn(
                              "font-mono text-base sm:text-lg font-bold transition-colors duration-200 shrink-0",
                              isActive
                                ? "text-rose-600 dark:text-rose-400"
                                : "text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400"
                            )}
                          >
                            {useCase.number}
                          </span>

                          {/* Use Case Title */}
                          <h3
                            className={cn(
                              "text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200",
                              isActive
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                            )}
                          >
                            {useCase.title}
                          </h3>

                        </div>

                        {/* Subtle Directional Arrow */}
                        <div
                          className={cn(
                            "transition-transform duration-200 shrink-0",
                            isActive
                              ? "text-rose-600 dark:text-rose-400 translate-x-1"
                              : "text-slate-300 dark:text-slate-700 group-hover:text-slate-500"
                          )}
                        >
                          <ArrowRight size={18} weight={isActive ? "bold" : "regular"} />
                        </div>
                      </div>

                      {/* Expanded Narrative & Context (Smoothly Revealed) */}
                      {isActive && (
                        <motion.div
                          id={`panel-${useCase.id}`}
                          role="tabpanel"
                          aria-labelledby={`tab-${useCase.id}`}
                          initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-3.5 pl-8 sm:pl-12 pr-4 overflow-hidden"
                        >
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {useCase.description}
                          </p>

                          {/* Mobile Inline Image Preview */}
                          <div className="mt-3 lg:hidden relative h-36 w-full rounded-lg overflow-hidden bg-slate-950">
                            <Image
                              src={useCase.image}
                              alt={useCase.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 400px"
                              className="object-cover object-center filter brightness-95"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-medium flex items-center justify-between">
                              <span>{useCase.clinicalFocus}</span>
                              <span className="font-mono text-[10px] text-slate-300">
                                Acute Scenario
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 hidden sm:flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 font-medium">
                            <CheckCircle size={14} weight="fill" className="text-rose-600 dark:text-rose-400" />
                            <span>Clinical Focus: {useCase.clinicalFocus}</span>
                          </div>
                        </motion.div>
                      )}

                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Clarification Note */}
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 px-2">
              Contextual operational reference scenarios. WE Healthcare teleradiology priority routing protocols are tailored to each facility's clinical bylaws and medical staff workflow.
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default CommonUseCasesSection;
