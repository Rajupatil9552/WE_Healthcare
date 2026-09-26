"use client";

import { motion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";

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
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-slate-950 text-white">
      {/* Background video (always dark, in both themes) */}
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover object-center">
          <source src="/videos/Hero Video.mp4" type="video/mp4" />
          <source src="/videos/Hero%20Video.mp4" type="video/mp4" />
        </video>
        {/* Directional scrim keeps the left-aligned headline legible */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 via-45% to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/60 to-transparent" />
      </div>

      {/* Blend the video into the first section's surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-48 bg-gradient-to-b from-transparent via-surface/80 via-60% to-surface"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-max)] px-container pb-24 pt-28 sm:pb-28 lg:pb-32">
        <motion.h1
          {...HERO_HEADING_MOTION}
          className="max-w-[20ch] text-display font-semibold text-white text-balance [text-shadow:0_2px_24px_rgb(2_6_23/0.55)]"
        >
          Delivering Advanced <br />
          Radiology Care Nationwide. <br />
          <span className="text-sky-300">Anytime. Anywhere.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: MOTION.easeOut }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={scrollToExplore}
            aria-label="Scroll to explore"
            className="group inline-flex items-center gap-3 rounded-full bg-card/90 py-1.5 pl-1.5 pr-5 text-foreground shadow-md backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-on-primary transition-transform group-hover:translate-y-0.5">
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold">Scroll to Explore</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
