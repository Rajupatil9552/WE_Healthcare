"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const WORKFLOW_STEPS = [
  { step: "01", label: "Study Received" },
  { step: "02", label: "Study Routed" },
  { step: "03", label: "Radiologist Review" },
  { step: "04", label: "Report Returned" },
];

export function TeleradiologyHero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting prefers-reduced-motion
  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/40 to-white dark:from-[#061421] dark:via-[#071927] dark:to-[#091f30] text-slate-900 dark:text-white pt-36 pb-20 lg:pt-44 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[140px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT COLUMN: 50% Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* 1. Eyebrow Badge */}
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <span>TELERADIOLOGY REPORTING</span>
            </motion.div>

            {/* 2. Main H1 Headline */}
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Teleradiology Reporting Services
            </motion.h1>

            {/* 3. Subheading */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-4 text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-200/90 leading-snug"
            >
              Remote radiology reporting that fits your existing workflow.
            </motion.p>

            {/* 4. Body Paragraph */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.24 }}
              className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              WE Healthcare provides teleradiology reporting support for hospitals, imaging centers, emergency departments, and healthcare networks across the United States. Extend reporting capacity for routine, overnight, weekend, overflow, and time-sensitive imaging needs.
            </motion.p>

            {/* 5. CTA Buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.32 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "accent", size: "lg" }),
                  "group justify-center text-center shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/40"
                )}
              >
                <span>Request a Consultation</span>
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#workflow"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/90 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white backdrop-blur-sm justify-center text-center"
                )}
              >
                See How It Works
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 50% Visual Artwork with Floating Workflow Card */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* 6. Hero Image Container */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.03 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700/60 shadow-2xl shadow-slate-200/60 dark:shadow-black/70 bg-white dark:bg-slate-950"
            >
              <Image
                src="/images/teleradiology-reporting/hero-radiologist-workstation.jpg"
                alt="Board-certified diagnostic radiologist reviewing cross-sectional medical scans at a high-resolution PACS workstation"
                width={800}
                height={560}
                priority
                className="w-full h-auto object-cover object-center max-h-[460px] sm:max-h-[500px]"
              />
              {/* Subtle vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* 7. Floating Workflow Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35 }}
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6 sm:max-w-xs w-full rounded-xl border border-slate-200/90 dark:border-white/15 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md p-4 shadow-xl shadow-slate-300/40 dark:shadow-black/60 z-20"
            >
              <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10">
                <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                  RADIOLOGY WORKFLOW
                </span>
              </div>

              {/* Sequential Staggered Workflow Steps */}
              <div className="space-y-2">
                {WORKFLOW_STEPS.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : 0.45 + idx * 0.12,
                    }}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-400">
                        {item.step}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {item.label}
                      </span>
                    </div>
                    <CheckCircle size={14} weight="fill" className="text-emerald-500 dark:text-emerald-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TeleradiologyHero;
