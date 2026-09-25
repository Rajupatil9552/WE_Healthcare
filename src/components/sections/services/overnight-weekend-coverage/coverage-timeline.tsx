"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowsClockwise,
  UserCheck,
  PhoneCall,
  FileText,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  activationDelay: number;
  connectorDelay: number;
  isSpecial?: boolean;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "HANDOVER",
    description: "Team transition / study queue.",
    image: "/images/overnight-weekend-coverage/workflow-radiology.jpg",
    alt: "Hospital PACS study queue and automated worklist ingestion network",
    icon: ArrowsClockwise,
    activationDelay: 0.1,
    connectorDelay: 0.4,
  },
  {
    number: "02",
    title: "OVERNIGHT READS",
    description: "Radiologist reviews overnight studies.",
    image: "/images/overnight-weekend-coverage/radiologist-reading-study.jpg",
    alt: "Board-certified diagnostic radiologist reviewing cross-sectional imaging scans during night shift",
    icon: UserCheck,
    activationDelay: 0.7,
    connectorDelay: 1.0,
  },
  {
    number: "03",
    title: "ESCALATION",
    description: "Time-sensitive findings follow the agreed escalation pathway.",
    image: "/images/overnight-weekend-coverage/escalation-critical-finding.jpg",
    alt: "Emergency radiologist communicating critical STAT findings on telephone directly to care team",
    icon: PhoneCall,
    activationDelay: 0.5,
    connectorDelay: 0.8,
    isSpecial: true,
  },
  {
    number: "04",
    title: "MORNING SUMMARY",
    description: "Agreed handoff/summary for the next operating period.",
    image: "/images/overnight-weekend-coverage/morning-radiology-handoff.jpg",
    alt: "Radiology team and hospital physician reviewing morning handoff summary",
    icon: FileText,
    activationDelay: 1.9,
    connectorDelay: 2.2,
  },
];

export function CoverageTimelineSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="coverage-timeline"
      className="relative overflow-hidden py-24 lg:py-32 bg-slate-50/70 dark:bg-[#060c10] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Subtle ambient nocturnal background radiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_15%,rgba(14,165,233,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_70%_40%_at_50%_15%,rgba(14,165,233,0.12),transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <Sparkle size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>HOW IT WORKS</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
          >
            From Handover to Morning Summary
          </motion.h2>

          {/* Main Flow Ribbon: Handover → Overnight Reads → Escalation → Morning Summary */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-5 inline-flex items-center justify-center flex-wrap gap-2 sm:gap-3 rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-tight text-sky-900 dark:text-sky-200 shadow-xs"
          >
            <span>Handover</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Overnight Reads</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Escalation</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Morning Summary</span>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.22 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            The workflow is configured around the agreed coverage window and escalation requirements.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP TIMELINE: LARGE HORIZONTAL EDITORIAL TIMELINE (lg:block)*/}
        {/* NO RECTANGULAR CARDS! Circles, typography, line, and visuals   */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative max-w-6xl mx-auto pt-6 pb-4">
          
          {/* Top Overarching Phase Identifier: NIGHT COVERAGE */}
          <div className="flex justify-center mb-8">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.25em] text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-800/80 px-4 py-1.5 rounded-full shadow-xs">
              NIGHT COVERAGE
            </span>
          </div>

          {/* Progressive Connecting Horizontal Timeline Track (0% -> 100%) */}
          <div
            aria-hidden="true"
            className="absolute top-[96px] left-[6%] right-[6%] h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? { width: "100%" } : { width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400"
            />
          </div>

          {/* Four Large Timeline Points */}
          <div className="grid grid-cols-4 gap-8 relative z-10 items-start">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="flex flex-col items-center text-center group">
                  
                  {/* Station Station Node / Circle with Sequential Activation */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            scale: 0.85,
                            opacity: 0,
                            borderColor: "rgba(226, 232, 240, 1)",
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1,
                            opacity: 1,
                            borderColor: step.isSpecial ? "rgba(245, 158, 11, 1)" : "rgba(14, 165, 233, 1)",
                            boxShadow: step.isSpecial
                              ? "0 0 24px rgba(245, 158, 11, 0.35)"
                              : "0 0 24px rgba(14, 165, 233, 0.3)",
                          }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : step.activationDelay,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className={cn(
                      "size-16 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#09131a] relative z-10 transition-transform duration-300 group-hover:scale-105",
                      step.isSpecial
                        ? "text-amber-500"
                        : "text-sky-500"
                    )}
                  >
                    <Icon size={24} weight="bold" />
                  </motion.div>

                  {/* Step Numeric Identifier */}
                  <motion.span
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : step.activationDelay + 0.1,
                    }}
                    className="mt-4 font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider"
                  >
                    STEP {step.number}
                  </motion.span>

                  {/* Step Title */}
                  <motion.h3
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : step.activationDelay + 0.15,
                    }}
                    className={cn(
                      "mt-1 text-base sm:text-lg font-extrabold tracking-tight leading-snug transition-colors",
                      step.isSpecial
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400"
                    )}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Step Short Description */}
                  <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : step.activationDelay + 0.22,
                    }}
                    className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-[220px]"
                  >
                    {step.description}
                  </motion.p>

                  {/* Small Relevant Visual Thumbnail (Editorial treatment) */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.1,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="mt-5 w-full max-w-[210px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm group-hover:shadow-md group-hover:border-sky-300 dark:group-hover:border-sky-700/80 transition-all duration-300 bg-slate-100 dark:bg-slate-900"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        sizes="220px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET TIMELINE: VERTICAL TIMELINE (block lg:hidden)  */}
        {/* Natural scrolling with continuous left vertical track          */}
        {/* ============================================================== */}
        <div className="block lg:hidden relative pl-6 sm:pl-8">
          
          {/* Continuous vertical connector track */}
          <div
            aria-hidden="true"
            className="absolute left-[23px] sm:left-[27px] top-6 bottom-6 w-[3px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? { height: "100%" } : { height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full bg-gradient-to-b from-sky-500 via-blue-500 to-emerald-400"
            />
          </div>

          <div className="space-y-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative flex items-start gap-4 sm:gap-6">
                  
                  {/* Station Marker on Spine */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : 0.1 * idx,
                    }}
                    className={cn(
                      "relative z-10 size-11 sm:size-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-white dark:bg-[#09131a] shadow-md",
                      step.isSpecial
                        ? "border-amber-500 text-amber-500 shadow-amber-500/20"
                        : "border-sky-500 text-sky-500 shadow-sky-500/20"
                    )}
                  >
                    <Icon size={18} weight="bold" />
                  </motion.div>

                  {/* Step Narrative & Thumbnail */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.12 * idx,
                    }}
                    className="flex-1 pb-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        STEP {step.number}
                      </span>
                    </div>

                    <h3 className={cn(
                      "text-lg font-extrabold tracking-tight leading-snug",
                      step.isSpecial ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white"
                    )}>
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {step.description}
                    </p>

                    {/* Small thumbnail for mobile */}
                    <div className="mt-3.5 w-full max-w-[240px] rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-xs bg-slate-100 dark:bg-slate-900">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          fill
                          sizes="240px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CoverageTimelineSection;
