"use client";

import { motion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const scrollToExplore = () => {
    const nextSection =
      document.getElementById("radiology-expertise") ||
      document.getElementById("trust-credibility");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-[#03070b] text-white">
      {/* Background Video Layer - Playing the user's realistic hospital/radiology video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/Hero Video.mp4" type="video/mp4" />
          <source src="/videos/Hero%20Video.mp4" type="video/mp4" />
        </video>

        {/* Directional Vignette: soft contrast on the left for crisp text readability while leaving center & right video crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Smooth high-opacity white gradient blending Hero into the Trust section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 bg-gradient-to-b from-transparent via-slate-50/50 via-30% via-slate-50/85 via-60% to-slate-50 dark:from-transparent dark:via-[#0b1416]/75 dark:via-30% dark:via-[#0b1416]/95 dark:via-60% dark:to-[#0b1416] z-[5]"
      />

      {/* Main Content Area: Placed slightly towards the left with wider text measure */}
      <div className="relative z-10 w-full pb-12 sm:pb-16 lg:pb-20 pt-28">
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-left">
            {/* Headline scaled and widened to match the reference composition */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-[2.85rem] lg:text-[3.45rem] xl:text-[3.9rem] font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
            >
              Delivering Advanced <br />
              Radiology Care Nationwide. <br />
              <span className="text-sky-400 drop-shadow-[0_2px_12px_rgba(56,189,248,0.35)]">Anytime. Anywhere.</span>
            </motion.h1>

            {/* "Scroll to Explore" control with crisp contrast across both light gradient and dark video */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 sm:mt-8"
            >
              <button
                type="button"
                onClick={scrollToExplore}
                aria-label="Scroll to explore"
                className="inline-flex items-center gap-3 text-slate-900 dark:text-white/95 hover:text-sky-600 dark:hover:text-white group cursor-pointer transition-colors select-none"
              >
                <span className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/90 text-slate-800 shadow-md backdrop-blur-sm group-hover:border-sky-500 group-hover:bg-white dark:border-white/40 dark:bg-black/40 dark:text-white dark:group-hover:border-white dark:group-hover:bg-black/60 transition-all">
                  <ArrowDown size={16} weight="bold" className="group-hover:translate-y-0.5 transition-transform" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-800 dark:text-white drop-shadow-sm">
                  Scroll to Explore
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
