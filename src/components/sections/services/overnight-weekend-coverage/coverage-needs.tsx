"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ClockAfternoon, ShieldCheck } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const COVERAGE_OCCASIONS = [
  "OVERNIGHT",
  "WEEKEND",
  "HOLIDAY",
  "EMERGENCY",
  "LEAVE COVERAGE",
  "CHANGING VOLUME",
];

export function CoverageNeedsSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="coverage-needs"
      className="py-20 lg:py-28 bg-white dark:bg-[#070e13] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Large Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Large Heading and Paragraph */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <ClockAfternoon size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>COVERAGE WHEN YOUR TEAM NEEDS IT</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
            >
              Coverage When Your Team Needs It
            </motion.h2>

            {/* Body */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Imaging does not stop when regular business hours end. Overnight studies, weekend volume, holidays, leave coverage, and emergency demand can create gaps in reporting capacity.
            </motion.p>

            {/* Editorial Context Indicator */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.24 }}
              className="mt-8 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-start gap-3.5"
            >
              <div className="size-8 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                <ShieldCheck size={18} weight="bold" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Adaptive clinical support designed to integrate with your local PACS and worklist, providing board-certified interpretations without shifting burdens to on-call providers.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Large Image Showing Radiology Reading Room & Diagnostic Monitors */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-200/50 dark:shadow-black/60 bg-slate-100 dark:bg-slate-900"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/overnight-weekend-coverage/night-radiology-reading-room.jpg"
                  alt="Modern hospital radiology department and diagnostic reading room with dual-screen PACS workstations glowing softly at night"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Inset Label Badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 border border-white/10 p-3.5 backdrop-blur-md">
                  <span className="text-xs font-bold text-white block">
                    Nocturnal Diagnostic Reading Suite
                  </span>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Board-certified radiologists interpreting high-acuity CT, MRI, and X-ray studies through the night.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: Simple Typographic List with Separators (NO individual cards) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-2 sm:gap-x-4 md:gap-x-6 text-center">
            {COVERAGE_OCCASIONS.map((item, idx) => {
              const isLast = idx === COVERAGE_OCCASIONS.length - 1;

              return (
                <div key={item} className="inline-flex items-center">
                  <motion.span
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : 0.25 + idx * 0.08,
                    }}
                    className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </motion.span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="ml-2 sm:ml-4 md:ml-6 text-sky-500 font-bold select-none text-xs sm:text-sm"
                    >
                      &bull;
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CoverageNeedsSection;
