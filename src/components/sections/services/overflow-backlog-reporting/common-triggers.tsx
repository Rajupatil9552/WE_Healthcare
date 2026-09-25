"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Lightning, ArrowUpRight, CaretRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { COMMON_TRIGGERS_CONTENT, type CommonTrigger } from "@/content/overflow-backlog-support";

export function CommonTriggersSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTrigger, setActiveTrigger] = useState<number>(0);

  const fadeUp = (delay: number = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="common-triggers"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#050b10] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Header Block: Editorial Presentation */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <Lightning size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>OPERATIONAL CATALYSTS</span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            Common Triggers for Reporting Backlog
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            Imaging backlogs rarely stem from operational inefficiency—they emerge from predictable inflection points in hospital volume and clinical staffing.
          </motion.p>
        </div>

        {/* Numbered Editorial List with Hairline Separators (NO 6 CARDS!) */}
        <div className="border-t border-slate-200/80 dark:border-slate-800/80 divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {COMMON_TRIGGERS_CONTENT.map((trigger: CommonTrigger, index: number) => {
            const isActive = activeTrigger === index;

            return (
              <motion.div
                key={trigger.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                }}
                onMouseEnter={() => setActiveTrigger(index)}
                onClick={() => setActiveTrigger(index)}
                className={cn(
                  "group relative py-6 sm:py-8 px-3 sm:px-6 transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-white/80 dark:bg-sky-950/20 shadow-xs"
                    : "hover:bg-slate-100/60 dark:hover:bg-slate-900/40"
                )}
              >
                {/* Active indicator bar on desktop */}
                <div
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 bg-sky-600 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start sm:items-center">
                  
                  {/* Number & Primary Title (7 cols on lg) */}
                  <div className="lg:col-span-6 flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={cn(
                        "font-mono text-base sm:text-lg font-bold transition-colors duration-300",
                        isActive
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400"
                      )}
                    >
                      {trigger.number}
                    </span>

                    <h3
                      className={cn(
                        "text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-transform duration-300",
                        isActive
                          ? "text-slate-900 dark:text-white sm:translate-x-1"
                          : "text-slate-800 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                      )}
                    >
                      {trigger.title}
                    </h3>
                  </div>

                  {/* Context and Operational Impact (6 cols on lg) */}
                  <div className="lg:col-span-6 pl-8 sm:pl-10 lg:pl-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="max-w-md">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {trigger.context}
                      </p>
                      <p className="text-xs text-sky-700 dark:text-sky-400 font-medium mt-1">
                        Operational Impact: {trigger.impact}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors shrink-0">
                      <ArrowUpRight size={18} weight="bold" />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Operational Note Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <span>Targeted engagement models scale to match these specific triggers without permanent full-time hiring.</span>
          <span className="font-mono text-sky-600 dark:text-sky-400 mt-2 sm:mt-0">Zero minimum study penalty</span>
        </div>
      </Container>
    </section>
  );
}
