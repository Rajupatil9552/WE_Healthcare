"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Stack,
  CheckCircle,
  PhoneCall,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Eye,
  FileText,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { TRAUMA_HOW_IT_WORKS_CONTENT } from "@/content/trauma-critical-care";

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle natural scroll tracking on desktop without scroll-locking or wheel hijacking
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-stage-index");
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              if (!isNaN(idx)) {
                setActiveStageIndex(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.2,
      }
    );

    stageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeStage = TRAUMA_HOW_IT_WORKS_CONTENT.stages[activeStageIndex];

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeTransition,
    },
  });

  return (
    <section 
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50/60 dark:bg-[#030914] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <motion.div
            {...fadeIn(0.04)}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              {TRAUMA_HOW_IT_WORKS_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...fadeIn(0.12)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
          >
            {TRAUMA_HOW_IT_WORKS_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeIn(0.2)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {TRAUMA_HOW_IT_WORKS_CONTENT.supportingText}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* MAIN SIGNATURE VISUAL + WORKFLOW INTERACTION                   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ============================================================ */}
          {/* LEFT: MULTI-STUDY CONVERGENCE CONSOLE (~55% / 7 cols)        */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 flex flex-col gap-4">
            
            {/* Visual Frame */}
            <div className="rounded-3xl bg-white dark:bg-[#07131e] border border-sky-100 dark:border-slate-800 p-5 sm:p-7 shadow-lg shadow-sky-950/5 relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Stack size={16} className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                    Multi-Study Trauma Workup
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-sky-800 dark:text-sky-300 uppercase">
                    Stage {activeStage.step} / 04
                  </span>
                </div>
              </div>

              {/* 4 Studies Grid (CT Head, CT Chest, CT Abdomen, X-Ray) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                {TRAUMA_HOW_IT_WORKS_CONTENT.studies.map((study, idx) => (
                  <div
                    key={study.id}
                    className={cn(
                      "p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 relative overflow-hidden",
                      activeStageIndex >= 1
                        ? "bg-sky-50/60 dark:bg-sky-950/20 border-sky-300 dark:border-sky-800/80 shadow-xs"
                        : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-950">
                      <Image
                        src={study.image}
                        alt={study.alt}
                        fill
                        sizes="50px"
                        className="object-cover object-center filter brightness-95"
                      />
                      <span className="absolute bottom-0.5 left-1 text-[8px] font-mono font-bold text-sky-300">
                        {study.modality}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {study.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {study.region}
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white/80 dark:bg-slate-800 text-sky-800 dark:text-sky-300 border border-sky-100 dark:border-slate-700">
                          {activeStageIndex === 0 && "FLAGGED"}
                          {activeStageIndex === 1 && "BATCHED"}
                          {activeStageIndex === 2 && "IN REVIEW"}
                          {activeStageIndex === 3 && "VERBAL OUTREACH"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Workflow Transition Indicator Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50/50 dark:from-[#061423] dark:via-[#081a2e] dark:to-[#05111d] border border-sky-200/80 dark:border-sky-900/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                        {activeStage.step}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                          {activeStage.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {activeStage.detailBadge}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-sky-700 dark:text-sky-400 hidden sm:block">
                      STEP {activeStage.step} OF 04
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Note */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>{TRAUMA_HOW_IT_WORKS_CONTENT.disclaimer}</span>
                <span className="font-mono text-[10px] text-slate-400">NON-PHI CONCEPTUAL</span>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: 4 WORKFLOW STAGES (DESKTOP INTERACTIVE / SCROLL)      */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {TRAUMA_HOW_IT_WORKS_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  data-stage-index={idx}
                  onClick={() => setActiveStageIndex(idx)}
                  className={cn(
                    "p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer relative",
                    isActive
                      ? "bg-white dark:bg-[#07131e] border-sky-300 dark:border-sky-800 shadow-md ring-1 ring-sky-500/20"
                      : "bg-white/60 dark:bg-[#07131e]/50 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-[#07131e]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors",
                          isActive
                            ? "bg-sky-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {stage.step}
                      </span>
                      <h3
                        className={cn(
                          "text-base sm:text-lg font-bold uppercase tracking-tight transition-colors",
                          isActive
                            ? "text-sky-900 dark:text-sky-200"
                            : "text-slate-900 dark:text-white"
                        )}
                      >
                        {stage.title}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {stage.step} / 04
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pl-9">
                    {stage.description}
                  </p>

                  <div className="mt-3 pl-9 flex items-center gap-2 text-[11px] text-sky-700 dark:text-sky-400 font-mono">
                    <span className="w-1 h-1 rounded-full bg-sky-500" />
                    <span>{stage.detailBadge}</span>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </Container>
    </section>
  );
}
