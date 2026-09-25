"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Lightning,
  ArrowsSplit,
  Eye,
  PhoneCall,
  CheckCircle,
  CaretRight,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  LockKey,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS_CONTENT } from "@/content/emergency-stat-reporting";

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentStep = HOW_IT_WORKS_CONTENT.steps[activeStepIndex];

  // Pause auto-play when user interacts manually
  const handleSelectStep = (index: number) => {
    setIsAutoPlaying(false);
    setActiveStepIndex(index);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveStepIndex((prev) => (prev + 1) % HOW_IT_WORKS_CONTENT.steps.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveStepIndex((prev) =>
      prev === 0 ? HOW_IT_WORKS_CONTENT.steps.length - 1 : prev - 1
    );
  };

  // Subtle auto-progression when in view (paused on user interaction or reduced motion)
  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % HOW_IT_WORKS_CONTENT.steps.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, shouldReduceMotion]);

  // Controlled scroll entrance animations
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
      id="how-it-works"
      className="relative overflow-hidden bg-white dark:bg-[#030910] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER: Editorial Title & Purpose                       */}
        {/* ============================================================== */}
        <div className="max-w-3xl flex flex-col items-start">
          <motion.span
            {...fadeUp(0.04)}
            className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400"
          >
            {HOW_IT_WORKS_CONTENT.eyebrow}
          </motion.span>

          <motion.h2
            {...fadeUp(0.1)}
            className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            From <span className="text-rose-600 dark:text-rose-400 font-extrabold">STAT</span> Flag to Direct Communication
          </motion.h2>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {HOW_IT_WORKS_CONTENT.supportingText}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* STEP SELECTOR BAR: Interactive Stage Indicator Tabs (01-04)    */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.22)}
          className="mt-10 pt-4"
        >
          {/* Step Pill Controls */}
          <div
            role="tablist"
            aria-label="How emergency STAT radiology reporting works steps"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800"
          >
            {HOW_IT_WORKS_CONTENT.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`tab-step-${step.number}`}
                  aria-selected={isActive}
                  aria-controls={`panel-step-${step.number}`}
                  tabIndex={0}
                  onClick={() => handleSelectStep(idx)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 text-left relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500",
                    isActive
                      ? "bg-white dark:bg-[#07131e] text-slate-900 dark:text-white shadow-xs font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                  )}
                >
                  {/* Step Number Badge */}
                  <span
                    className={cn(
                      "size-5 rounded flex items-center justify-center font-mono text-[11px] font-bold shrink-0 transition-colors",
                      isActive
                        ? "bg-rose-600 text-white"
                        : isPast
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {step.number}
                  </span>

                  <span className="truncate">{step.shortTitle}</span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.span
                      layoutId="active-workflow-pill"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-rose-600 dark:bg-rose-400 rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* SIGNATURE CONNECTED WORKFLOW CANVAS                             */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.28)}
          className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#050e18] p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 relative overflow-hidden"
        >
          {/* Top Canvas Bar: Telemetry & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs font-semibold text-rose-700 dark:text-rose-300">
                <span className="size-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                Active Workflow Stage: {currentStep.number} / 04
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                {currentStep.title}
              </span>
            </div>

            {/* Manual Step Forward/Backward Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous workflow step"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next workflow step"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Desktop Horizontal Connected Track (Hidden on mobile) */}
          <div className="hidden lg:block my-8 relative">
            {/* Base Background Track Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2 bg-slate-200 dark:bg-slate-800 z-0" />
            
            {/* Active Highlight Fill Track */}
            <motion.div
              className="absolute top-1/2 left-8 h-0.5 -translate-y-1/2 bg-rose-600 dark:bg-rose-400 z-0"
              initial={false}
              animate={{
                width: `${(activeStepIndex / (HOW_IT_WORKS_CONTENT.steps.length - 1)) * 90}%`,
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* 4 Connected Operational Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {HOW_IT_WORKS_CONTENT.steps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className="flex flex-col items-center group focus-visible:outline-hidden"
                  >
                    <div
                      className={cn(
                        "size-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2",
                        isActive
                          ? "bg-rose-600 text-white border-rose-600 scale-110 shadow-md shadow-rose-600/20"
                          : isPassed
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-700 group-hover:border-slate-400"
                      )}
                    >
                      {isPassed ? (
                        <CheckCircle size={16} weight="fill" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium transition-colors text-center max-w-[120px]",
                        isActive
                          ? "text-slate-900 dark:text-white font-semibold"
                          : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* THE CORE DYNAMIC STUDY CAPSULE & STAGE STATE DISPLAY           */}
          {/* ============================================================== */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT / CENTER: Conceptual Study Card Progressing Through Stages */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] p-5 sm:p-6 shadow-md relative overflow-hidden">
                
                {/* Upper Study Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {HOW_IT_WORKS_CONTENT.study.modality}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                      {HOW_IT_WORKS_CONTENT.study.exam}
                    </span>
                  </div>

                  {/* Dynamic Priority State Badge */}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-2xs">
                      <Lightning size={12} weight="fill" />
                      {currentStep.priorityLabel}
                    </span>
                  </div>
                </div>

                {/* Study Clinical Indication & State */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-medium">
                      Clinical Indication
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5 block">
                      {HOW_IT_WORKS_CONTENT.study.indication}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-medium">
                      Active State in Workflow
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold mt-0.5 block">
                      {currentStep.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Stage-Specific Visual Representation */}
                <div className="mt-5 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80">
                  
                  {/* Step 01: Flag STAT */}
                  {activeStepIndex === 0 && (
                    <motion.div
                      key="stage-01"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      className="space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Priority Classification Triggered
                        </span>
                        <span className="font-mono text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                          ROUTINE → STAT
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        The ordering clinician or technologist identifies an emergent clinical presentation. An acute protocol flag is appended upon study transmission, initiating priority handling.
                      </p>
                    </motion.div>
                  )}

                  {/* Step 02: Priority Routing */}
                  {activeStepIndex === 1 && (
                    <motion.div
                      key="stage-02"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      className="space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Intelligent Worklist Sorting
                        </span>
                        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          Queue Elevation
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        The study automatically routes ahead of routine outpatient queues and matches to an appropriately credentialed, subspecialty-trained diagnostic radiologist.
                      </p>
                    </motion.div>
                  )}

                  {/* Step 03: Radiologist Review */}
                  {activeStepIndex === 2 && (
                    <motion.div
                      key="stage-03"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      className="space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Board-Certified Diagnostic Review
                        </span>
                        <span className="font-mono text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                          PACS In Progress
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        The assigned radiologist opens cross-sectional series on multi-monitor diagnostic displays, evaluating critical emergent pathology according to facility protocol.
                      </p>
                    </motion.div>
                  )}

                  {/* Step 04: Direct Communication */}
                  {activeStepIndex === 3 && (
                    <motion.div
                      key="stage-04"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      className="space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Direct Telephone Escalation
                        </span>
                        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          Closed-Loop EHR
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        Unexpected or time-sensitive critical findings trigger immediate verbal telephone communication with the emergency physician, backed by timestamped documentation.
                      </p>
                    </motion.div>
                  )}

                </div>

                {/* Bottom Card Annotation */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={14} className="text-rose-600 dark:text-rose-400" />
                    {currentStep.actionDetail}
                  </span>
                  <span className="font-mono hidden sm:inline">
                    {currentStep.queueState}
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT: Step Explanation & Visual Workstation Anchor (~5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Contextual Visual Window */}
              <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md">
                <Image
                  src={
                    currentStep.image ??
                    "/images/emergency-stat-reporting/priority-radiology-worklist.jpg"
                  }
                  alt={currentStep.alt ?? "Radiology workflow diagnostic review"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-300 drop-shadow-xs">
                    Stage {currentStep.number}: {currentStep.title}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    Conceptual Representation
                  </span>
                </div>
              </div>

              {/* Step Approved Narrative Box */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] p-5 shadow-xs">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                    {currentStep.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {currentStep.title}
                  </h3>
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {currentStep.description}
                </p>

                {/* Internal verification audit: [VERIFY: radiologist assignment / exact communication protocol] */}
              </div>

            </div>

          </div>

          {/* Bottom Clarification Disclaimer */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Conceptual operational representation. Actual turnaround and escalation protocols are established in collaboration with facility leadership.
            </span>
            <span className="font-mono text-[11px] shrink-0">
              No Automated Turnaround Promises
            </span>
          </div>

        </motion.div>

        {/* ============================================================== */}
        {/* SUBTLE DIRECTIONAL BRIDGE TO CRITICAL FINDINGS PROTOCOL        */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.34)}
          className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs"
        >
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-semibold text-slate-900 dark:text-white">
              {HOW_IT_WORKS_CONTENT.transition.from}
            </span>
            <CaretRight size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />
            <span className="text-rose-700 dark:text-rose-300 font-semibold">
              {HOW_IT_WORKS_CONTENT.transition.arrow}
            </span>
          </div>

          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Upcoming: {HOW_IT_WORKS_CONTENT.transition.nextSectionName}
          </span>
        </motion.div>

      </Container>
    </section>
  );
}

export default HowItWorksSection;
