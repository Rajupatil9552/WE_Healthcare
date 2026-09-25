"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { WHATS_INCLUDED_CONTENT } from "@/content/stroke-imaging-protocol";

export function WhatsIncludedSection() {
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
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-[#06101c] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Subtle ambient lighting tone */}
      <div 
        className="absolute bottom-0 right-1/4 w-[50vw] max-w-[600px] h-[350px] bg-gradient-to-t from-sky-100/30 to-transparent dark:from-sky-950/20 dark:to-transparent pointer-events-none -z-0" 
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
              {WHATS_INCLUDED_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            {...fadeIn(0.12)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
          >
            {WHATS_INCLUDED_CONTENT.heading}
          </motion.h2>

          <motion.p
            {...fadeIn(0.2)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {WHATS_INCLUDED_CONTENT.supportingCopy}
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* 4-Column Horizontal Capability Specification Deck               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHATS_INCLUDED_CONTENT.capabilities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              tabIndex={0}
              className="group rounded-2xl bg-white dark:bg-[#07131e] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-800 transition-all duration-200 ease-out flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <div>
                {/* Top Colored Accent Hairline */}
                <div 
                  className="h-[2px] w-full bg-gradient-to-r from-sky-500 to-sky-200 dark:to-sky-900 mb-5 rounded-full" 
                  aria-hidden="true" 
                />

                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase">
                    SPEC // {item.number}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 shrink-0">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-sky-950 dark:group-hover:text-sky-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Implementation Standard</span>
                <span className="text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Bar with Contextual Scan Thumbnail */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-9 rounded overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-950">
              <Image
                src={WHATS_INCLUDED_CONTENT.image}
                alt={WHATS_INCLUDED_CONTENT.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <span>
              {WHATS_INCLUDED_CONTENT.caption}
            </span>
          </div>

          <span className="font-mono text-[11px] text-slate-400">
            STROKE CAPABILITY MATRIX • NON-PHI
          </span>
        </div>

      </Container>
    </section>
  );
}
