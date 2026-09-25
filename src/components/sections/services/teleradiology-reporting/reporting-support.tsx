"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ClockCountdown, TrendUp, MoonStars } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const INDICATORS = [
  {
    title: "Coverage Gaps",
    description: "Scheduled staff leave, vacancies, and unexpected shortfalls",
    icon: ClockCountdown,
  },
  {
    title: "Changing Volumes",
    description: "Sudden volume surges, backlogs, and seasonal demand",
    icon: TrendUp,
  },
  {
    title: "After-Hours Demand",
    description: "Emergency overnight, weekend, and holiday interpretations",
    icon: MoonStars,
  },
];

export function ReportingSupportSection() {
  const shouldReduceMotion = useReducedMotion();

  // On viewport entry animation variants
  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const imageAnim = {
    initial: shouldReduceMotion ? false : { opacity: 0, scale: 1.03 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="reporting-support"
      className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-sky-50/60 via-sky-50/20 to-white dark:from-[#061117] dark:via-[#08151c] dark:to-[#07131b] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Eyebrow, Heading, Paragraph, Three Visual Indicators */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
            >
              <span>REPORTING SUPPORT</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              The Reporting Support Your Operation Needs
            </motion.h2>

            {/* Paragraph Body */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              Radiology operations do not always have a predictable workload. Coverage gaps, changing imaging volumes, and after-hours demand can create pressure on in-house teams. WE Healthcare provides additional reporting capacity around the way your organization already operates.
            </motion.p>

            {/* Three Visual Indicators (Staggered 100-150ms) */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
              {INDICATORS.map((indicator, idx) => {
                const IconComponent = indicator.icon;
                return (
                  <motion.div
                    key={indicator.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.24 + idx * 0.12,
                    }}
                    className="p-4 sm:p-4.5 rounded-2xl border border-sky-200/70 dark:border-sky-900/50 bg-white/90 dark:bg-slate-900/70 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-start"
                  >
                    <div className="size-9 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3 shrink-0">
                      <IconComponent size={18} weight="bold" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {indicator.title}
                    </span>
                    <span className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-normal">
                      {indicator.description}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Large Radiology Department / Workstation Image */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <motion.div
              {...imageAnim}
              className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 bg-slate-100 dark:bg-slate-900"
            >
              <Image
                src="/images/teleradiology-reporting/reporting-support-radiology-room.jpg"
                alt="Modern radiology department reading room equipped with diagnostic medical imaging workstations"
                width={700}
                height={520}
                className="w-full h-auto object-cover max-h-[460px] sm:max-h-[500px]"
              />
              {/* Subtle visual gradient edge */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Inset badge pill */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 p-3.5 backdrop-blur-md shadow-lg">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Adaptive Department Support
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Scalable preliminary and final reading coverage matched to your operational schedule.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReportingSupportSection;
