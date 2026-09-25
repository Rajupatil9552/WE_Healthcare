"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { COMMON_OPERATIONAL_NEEDS_CONTENT } from "@/content/stroke-imaging-protocol";

export function OperationalNeedsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Subtle editorial entrance transitions
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
    <section className="relative overflow-hidden bg-white dark:bg-[#040c16] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <motion.div
            {...fadeIn(0.04)}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              {COMMON_OPERATIONAL_NEEDS_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...fadeIn(0.12)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
          >
            {COMMON_OPERATIONAL_NEEDS_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeIn(0.2)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {COMMON_OPERATIONAL_NEEDS_CONTENT.intro}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* Architectural 3x2 Framework Matrix (Thin Hairline Grid)        */}
        {/* ============================================================== */}
        <div className="border-t border-l border-slate-200/90 dark:border-slate-800/90 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {COMMON_OPERATIONAL_NEEDS_CONTENT.needs.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : 0.12 + idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              tabIndex={0}
              className="group border-r border-b border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 transition-colors duration-200 ease-out hover:bg-slate-50/70 dark:hover:bg-slate-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-sky-700 dark:text-sky-400 group-hover:text-sky-600 transition-colors">
                    OPERATIONAL NEED // {item.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-sky-500 transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-sky-950 dark:group-hover:text-sky-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Facility-Aligned Protocol</span>
                <span className="text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Active Review →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Bar with Small Contextual Scan Thumbnail */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-9 rounded overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-950">
              <Image
                src={COMMON_OPERATIONAL_NEEDS_CONTENT.image}
                alt={COMMON_OPERATIONAL_NEEDS_CONTENT.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <span>
              {COMMON_OPERATIONAL_NEEDS_CONTENT.caption}
            </span>
          </div>

          <span className="font-mono text-[11px] text-slate-400">
            STROKE PROTOCOL FRAMEWORK • NON-PHI
          </span>
        </div>

      </Container>
    </section>
  );
}
