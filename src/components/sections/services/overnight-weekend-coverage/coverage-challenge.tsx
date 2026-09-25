"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { WarningCircle, UserFocus, TrendUp, ClockCounterClockwise } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { COVERAGE_CHALLENGE_CONTENT } from "@/content/overnight-weekend-coverage";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const PRESSURE_ICONS = [UserFocus, TrendUp, ClockCounterClockwise];

export function CoverageChallengeSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="coverage-challenge"
      className="py-20 lg:py-28 bg-white dark:bg-[#080e12] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container>
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50/90 dark:bg-amber-950/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300 shadow-xs"
          >
            <WarningCircle size={14} weight="bold" className="text-amber-600 dark:text-amber-400" />
            <span>{COVERAGE_CHALLENGE_CONTENT.eyebrow}</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            {COVERAGE_CHALLENGE_CONTENT.heading}
          </motion.h2>

          {/* Pull Quote Callout */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-6 pl-5 border-l-2 border-amber-500/70 dark:border-amber-400/80 italic text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed"
          >
            &ldquo;{COVERAGE_CHALLENGE_CONTENT.quote}&rdquo;
          </motion.div>
        </div>

        {/* Asymmetrical Split: Left Visual Narrative + Right Typographic Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Hospital Night Reading Room Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-200/40 dark:shadow-black/60 bg-slate-100 dark:bg-slate-900">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={COVERAGE_CHALLENGE_CONTENT.image}
                  alt={COVERAGE_CHALLENGE_CONTENT.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Clinical Context Caption */}
              <div className="p-4 sm:p-5 bg-white/95 dark:bg-[#0c141a]/95 border-t border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Continuous Off-Hours Operation
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Supporting emergency and inpatient clinical services when daytime departments transition.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Typography-Led Operational Pressure Points (NO Box Cards!) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {COVERAGE_CHALLENGE_CONTENT.pressurePoints.map((item, idx) => {
              const Icon = PRESSURE_ICONS[idx % PRESSURE_ICONS.length];

              return (
                <div
                  key={item.number}
                  className="py-6 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Subtle Index Identifier */}
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500">
                      {item.number}
                    </span>
                    <div className="mt-2 size-8 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-300 dark:group-hover:border-sky-700 transition-colors">
                      <Icon size={16} weight="bold" />
                    </div>
                  </div>

                  {/* Narrative Text */}
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
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

export default CoverageChallengeSection;
