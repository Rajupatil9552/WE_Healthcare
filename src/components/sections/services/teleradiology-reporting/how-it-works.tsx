"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown, ShieldCheck } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface HowItWorksStep {
  number: string;
  title: string;
  statement: string;
  image: string;
  alt: string;
  modalityBadge: string;
  activationDelay: number;
  connectorDelay: number;
}

const STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "SEND",
    statement: "Studies are received through the agreed workflow.",
    image: "/images/teleradiology-reporting/send-ct-mri-study.jpg",
    alt: "Clinical CT and MRI scanning suite with diagnostic technologist console",
    modalityBadge: "CT / MRI Study",
    activationDelay: 0.1,
    connectorDelay: 0.5,
  },
  {
    number: "02",
    title: "ROUTE",
    statement: "Studies are routed according to defined rules.",
    image: "/images/teleradiology-reporting/workflow-radiology.jpg",
    alt: "Automated PACS network and intelligent clinical study routing interface",
    modalityBadge: "Workflow & Routing",
    activationDelay: 0.9,
    connectorDelay: 1.3,
  },
  {
    number: "03",
    title: "READ",
    statement: "The assigned radiologist reviews the study.",
    image: "/images/teleradiology-reporting/radiologist-reading-study.jpg",
    alt: "Board-certified radiologist reviewing diagnostic imaging scans at clinical workstation",
    modalityBadge: "Radiologist Review",
    activationDelay: 1.7,
    connectorDelay: 2.1,
  },
  {
    number: "04",
    title: "REVIEW & RETURN",
    statement: "The report is returned through the connected reporting workflow.",
    image: "/images/teleradiology-reporting/radiology-report.jpg",
    alt: "Signed diagnostic radiology report with structured impression findings",
    modalityBadge: "Radiology Report",
    activationDelay: 2.5,
    connectorDelay: 2.9,
  },
];

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-white dark:bg-[#080e12] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <ShieldCheck size={14} weight="bold" className="text-sky-500" />
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            How It Works
          </motion.h2>

          {/* Main Statement Flow Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.14 }}
            className="mt-4 inline-flex items-center justify-center flex-wrap gap-2 sm:gap-3 rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-tight text-sky-900 dark:text-sky-200 shadow-xs"
          >
            <span>Send</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Route</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Read</span>
            <ArrowRight size={14} weight="bold" className="text-sky-500 shrink-0" />
            <span>Review &amp; Return</span>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Studies are received through the agreed workflow, routed according to defined rules, reviewed by the assigned radiologist, and returned through the connected reporting workflow.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP TIMELINE (Horizontal Sequential Animation, md:block)   */}
        {/* ============================================================== */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-4 gap-4 lg:gap-6 relative items-stretch">
            {STEPS.map((step, idx) => {
              const isLast = idx === STEPS.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col">
                  {/* Step Card with Sequential Activation */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 18,
                            borderColor: "rgba(226, 232, 240, 0.8)",
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? {}
                        : {
                            opacity: 1,
                            y: 0,
                            borderColor: "rgba(56, 189, 248, 0.9)",
                            boxShadow: "0 10px 30px -10px rgba(14, 165, 233, 0.2)",
                          }
                    }
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : step.activationDelay,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className={cn(
                      "relative flex flex-col justify-between h-full rounded-2xl border bg-white dark:bg-[#0c141a] p-4 lg:p-5 shadow-xs transition-all duration-300 group",
                      "hover:-translate-y-1 hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-500 ring-2 ring-transparent hover:ring-sky-400/40"
                    )}
                  >
                    <div>
                      {/* Top Step Pill with Blue Activation Glow */}
                      <div className="flex items-center justify-between mb-3.5">
                        <motion.span
                          initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0 }}
                          whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: shouldReduceMotion ? 0 : step.activationDelay,
                          }}
                          className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 border border-sky-300/80 dark:border-sky-700/80 ring-2 ring-sky-500/20 px-2.5 py-0.5 rounded-full shadow-xs"
                        >
                          {step.number}
                        </motion.span>

                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {step.modalityBadge}
                        </span>
                      </div>

                      {/* Image / Visual Container with Subtle Scaling */}
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900">
                        <motion.div
                          initial={shouldReduceMotion ? false : { scale: 1 }}
                          whileInView={shouldReduceMotion ? {} : { scale: 1.04 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: shouldReduceMotion ? 0 : step.activationDelay + 0.15,
                            ease: [0.16, 1, 0.3, 1] as const,
                          }}
                          className="w-full h-full relative"
                        >
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            sizes="(max-width: 1024px) 25vw, 280px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Step Title */}
                      <motion.h3
                        initial={shouldReduceMotion ? false : { opacity: 0.7 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: shouldReduceMotion ? 0 : step.activationDelay,
                        }}
                        className="text-base lg:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                      >
                        {step.title}
                      </motion.h3>

                      {/* Step Short Description */}
                      <p className="mt-1.5 text-xs lg:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {step.statement}
                      </p>
                    </div>
                  </motion.div>

                  {/* Horizontal Animated Connector to Next Node (0% -> 100%) */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute top-[45%] -right-2.5 lg:-right-3.5 -translate-y-1/2 w-5 lg:w-7 h-1 bg-slate-200 dark:bg-slate-800 z-20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={shouldReduceMotion ? { width: "100%" } : { width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.4,
                          delay: shouldReduceMotion ? 0 : step.connectorDelay,
                          ease: "easeInOut",
                        }}
                        className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 rounded-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE TIMELINE (Vertical Flow with No Horizontal Overflow)    */}
        {/* ============================================================== */}
        <div className="md:hidden flex flex-col gap-6 max-w-md mx-auto">
          {STEPS.map((step, idx) => {
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={step.number} className="flex flex-col items-center w-full">
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="w-full p-5 rounded-2xl border border-sky-200/80 dark:border-sky-800/80 bg-white dark:bg-[#0c141a] shadow-md ring-2 ring-sky-500/20"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-700 px-2.5 py-0.5 rounded-full">
                      {step.number}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {step.modalityBadge}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3.5 border border-slate-200/80 dark:border-slate-800">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Title & Statement */}
                  <h3 className="text-base font-extrabold uppercase text-slate-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {step.statement}
                  </p>
                </motion.div>

                {/* Mobile Connector Arrow */}
                {!isLast && (
                  <div className="flex flex-col items-center py-2.5">
                    <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-800 relative overflow-hidden rounded-full">
                      <motion.div
                        initial={shouldReduceMotion ? { height: "100%" } : { height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="w-full bg-gradient-to-b from-sky-500 to-blue-500"
                      />
                    </div>
                    <ArrowDown size={14} weight="bold" className="text-sky-500 -mt-0.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;
