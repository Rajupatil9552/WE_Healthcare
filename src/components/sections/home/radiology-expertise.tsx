"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { WorksWheel } from "@/components/ui/works-wheel";
import {
  RADIOLOGY_SPECIALTIES,
  RADIOLOGY_EXPERTISE_HEADER,
} from "@/content/radiology-expertise";
import { cn } from "@/lib/utils";

export function RadiologyExpertise() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [targetIndex, setTargetIndex] = React.useState<number | undefined>(undefined);

  const activeSpecialty = RADIOLOGY_SPECIALTIES[activeIndex] || RADIOLOGY_SPECIALTIES[0];

  const handlePrev = () => {
    const nextIdx = activeIndex <= 0 ? RADIOLOGY_SPECIALTIES.length - 1 : activeIndex - 1;
    setTargetIndex(nextIdx + 1);
  };

  const handleNext = () => {
    const nextIdx = activeIndex >= RADIOLOGY_SPECIALTIES.length - 1 ? 0 : activeIndex + 1;
    setTargetIndex(nextIdx + 1);
  };

  return (
    <section
      id="radiology-expertise"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#f7fafc] dark:from-[#0b1416] dark:via-[#091114] dark:to-[#080e11] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300 scroll-mt-20"
    >
      {/* Target anchor for hero scroll button */}
      <span id="trust-credibility" className="sr-only" aria-hidden="true" />

      {/* Decorative background waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35 dark:opacity-20">
        <svg
          className="absolute -left-20 top-1/3 h-[420px] w-[500px] -translate-y-1/2 text-sky-200 dark:text-sky-900/30"
          viewBox="0 0 500 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 100 C150 20, 250 300, 450 180 C550 120, 450 350, 600 380"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-80 160 C120 80, 220 340, 420 220 C520 160, 420 390, 570 410"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <svg
          className="absolute -right-20 top-2/3 h-[420px] w-[500px] -translate-y-1/2 text-sky-200 dark:text-sky-900/30"
          viewBox="0 0 500 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M550 100 C350 20, 250 300, 50 180 C-50 120, 50 350, -100 380"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M580 160 C380 80, 280 340, 80 220 C-20 160, 80 390, -70 410"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
          >
            <span>{RADIOLOGY_EXPERTISE_HEADER.badge}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 sm:mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            {RADIOLOGY_EXPERTISE_HEADER.title}
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {RADIOLOGY_EXPERTISE_HEADER.description}
          </motion.p>
        </div>
      </Container>

      {/* Full-Width 3D WorksWheel Showcase (Edge-to-Edge) */}
      <div className="relative w-full overflow-hidden">
        <WorksWheel
          items={RADIOLOGY_SPECIALTIES}
          label={RADIOLOGY_EXPERTISE_HEADER.centerLabel}
          action="Explore"
          onActiveChange={setActiveIndex}
          targetIndex={targetIndex}
          className="h-[520px] sm:h-[600px] lg:h-[680px] xl:h-[720px] w-full"
        />
      </div>

      {/* Mobile Active Specialty Info & Navigation Controls (< 768px) */}
      <Container className="md:hidden mt-4 relative z-10">
        <div className="px-2 sm:px-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              {activeSpecialty.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
              {activeSpecialty.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mb-4">
              {activeSpecialty.description}
            </p>

            {/* Mobile Arrows & Dots */}
            <div className="flex items-center justify-between w-full max-w-xs gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous specialty"
                className="size-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm active:scale-95 hover:border-sky-400"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Specialty indicator dots */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {RADIOLOGY_SPECIALTIES.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetIndex(i + 1)}
                    aria-label={`Go to ${item.title}`}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      i === activeIndex
                        ? "w-5 bg-sky-500 rounded-full"
                        : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next specialty"
                className="size-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm active:scale-95 hover:border-sky-400"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RadiologyExpertise;
