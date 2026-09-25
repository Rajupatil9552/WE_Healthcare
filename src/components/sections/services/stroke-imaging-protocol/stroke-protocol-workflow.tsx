"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  Scan,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  Clock,
  ArrowDown,
  Sparkle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { STROKE_PROTOCOL_WORKFLOW_CONTENT } from "@/content/stroke-imaging-protocol";

export function StrokeProtocolWorkflowSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle natural scroll tracking on desktop without any scroll-locking or wheel hijacking
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

  const activeStage = STROKE_PROTOCOL_WORKFLOW_CONTENT.stages[activeStageIndex];

  // Subtle editorial entrance
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
    <section 
      id="stroke-protocol"
      className="relative overflow-hidden bg-slate-50/60 dark:bg-[#060f1c] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Subtle ambient lighting tone */}
      <div 
        className="absolute top-1/3 right-0 w-[45vw] max-w-[550px] h-[450px] -translate-y-1/2 bg-gradient-to-l from-sky-100/50 via-sky-50/20 to-transparent dark:from-sky-950/25 dark:to-transparent pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.div
            {...fadeIn(0.04)}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              {STROKE_PROTOCOL_WORKFLOW_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...fadeIn(0.12)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
          >
            {STROKE_PROTOCOL_WORKFLOW_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeIn(0.2)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {STROKE_PROTOCOL_WORKFLOW_CONTENT.supportingText}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* MAIN WORKFLOW GRID: Left Sticky Visual + Right Progressive Stages */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: Diagnostic CT/CTA Study Visual (Sticky Desktop, 5.5 cols) */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 z-20">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-black/60 transition-all"
            >
              {/* Header Bar showing Live Active Stage Telemetry */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" aria-hidden="true" />
                  <span className="font-semibold text-white">
                    Stroke Protocol Viewer
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sky-300 font-mono text-[11px]">
                    STAGE {activeStage.step}/04
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ACTIVE: {activeStage.title}
                </div>
              </div>

              {/* Main Diagnostic Imaging Viewport */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <Image
                  src={STROKE_PROTOCOL_WORKFLOW_CONTENT.image}
                  alt={STROKE_PROTOCOL_WORKFLOW_CONTENT.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-95"
                />

                {/* Subtle vignette */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none" 
                  aria-hidden="true"
                />

                {/* Dynamic Protocol Overlay Box reflecting Active Stage */}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 pointer-events-none">
                  <div className="rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 p-3 sm:p-3.5 shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          STAGE {activeStage.step}
                        </span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {activeStage.detailBadge}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400">
                        ILLUSTRATIVE NON-PHI
                      </span>
                    </div>
                    <p className="text-xs text-sky-200 font-medium leading-snug">
                      {activeStage.visualFocus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Navigation Pill Indicator underneath scan */}
              <div className="px-4 py-2.5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Protocol Pathway Progression:
                </span>
                <div className="flex items-center gap-1.5">
                  {STROKE_PROTOCOL_WORKFLOW_CONTENT.stages.map((stg, i) => (
                    <button
                      key={stg.id}
                      onClick={() => setActiveStageIndex(i)}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all",
                        activeStageIndex === i
                          ? "bg-sky-500 text-white shadow-xs"
                          : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                      )}
                      aria-label={`Jump to stage ${stg.step}: ${stg.title}`}
                    >
                      {stg.step}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Four Defined Protocol Stages (Natural Scroll, 6 cols)  */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
            
            {STROKE_PROTOCOL_WORKFLOW_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stage.id}
                  data-stage-index={idx}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  className="relative"
                >
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.08,
                    }}
                    tabIndex={0}
                    onClick={() => setActiveStageIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStageIndex(idx);
                      }
                    }}
                    className={cn(
                      "p-4.5 sm:p-5.5 rounded-xl border transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      isActive
                        ? "bg-white dark:bg-[#07131e] border-sky-500/80 dark:border-sky-400/80 shadow-md shadow-sky-500/5 dark:shadow-sky-950/30"
                        : "bg-white/70 dark:bg-[#07131e]/50 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "w-6 h-6 rounded-full text-[11px] font-mono font-bold flex items-center justify-center transition-colors",
                            isActive
                              ? "bg-sky-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {stage.step}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                          {stage.title}
                        </h3>
                      </div>
                      
                      <span
                        className={cn(
                          "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors",
                          isActive
                            ? "bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/70"
                            : "bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {stage.detailBadge}
                      </span>
                    </div>

                    {/* Stage Narrative */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Active State Details Strip */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                        {stage.visualFocus}
                      </span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                          Inspecting Scan
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Connecting Arrow between Stages */}
                  {idx < STROKE_PROTOCOL_WORKFLOW_CONTENT.stages.length - 1 && (
                    <div className="flex justify-center my-0.5 text-slate-300 dark:text-slate-700" aria-hidden="true">
                      <ArrowDown size={13} weight="bold" />
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>

      </Container>
    </section>
  );
}
