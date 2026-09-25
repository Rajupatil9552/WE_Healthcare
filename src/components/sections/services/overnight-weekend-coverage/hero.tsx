"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MoonStars, ShieldCheck, Clock, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

export function OvernightHero() {
  const shouldReduceMotion = useReducedMotion();

  // Controlled entrance animations respecting prefers-reduced-motion
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/30 to-white dark:from-[#051019] dark:via-[#071624] dark:to-[#091f33] text-slate-900 dark:text-white pt-36 pb-20 lg:pt-44 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Subtle ambient nocturnal monitor glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 size-[600px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 size-[420px] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]"
      />

      <Container className="relative z-10">
        {/* Asymmetrical Editorial Composition: ~42% Content / ~58% Large Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Editorial Narrative Column (~5 cols on xl, ~6 on lg)    */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-20 flex flex-col items-start pr-0 lg:pr-6 xl:pr-8">
            
            {/* 1. Eyebrow Badge */}
            <motion.div
              {...fadeUp(0.06)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <MoonStars size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>OVERNIGHT &amp; WEEKEND RADIOLOGY COVERAGE</span>
            </motion.div>

            {/* 2. Primary H1 Headline */}
            <motion.h1
              {...fadeUp(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Overnight and Weekend Radiology Coverage
            </motion.h1>

            {/* 3. Supporting Heading */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-200/90 leading-snug"
            >
              Keep radiology reporting moving when your in-house team is off.
            </motion.p>

            {/* 4. Body Copy */}
            <motion.p
              {...fadeUp(0.28)}
              className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Extend your radiology coverage beyond regular business hours with flexible overnight and weekend reporting support for hospitals, imaging centers, and emergency departments.
            </motion.p>

            {/* Shift Continuity Highlights */}
            <motion.div
              {...fadeUp(0.34)}
              className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2.5 w-full"
            >
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>U.S. board-certified diagnostic radiologists on nocturnal duty</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Direct telephone escalation for acute and emergent STAT findings</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Clean morning worklist handover with zero unread patient backlog</span>
              </div>
            </motion.div>

            {/* 5. Primary and Secondary CTAs */}
            <motion.div
              {...fadeUp(0.4)}
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
                href="#coverage-timeline"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/90 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white backdrop-blur-sm justify-center text-center"
                )}
              >
                See How Coverage Works
              </Link>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Large Editorial Image (~58% visual area, overlapping)   */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-7 relative z-10 lg:-ml-4 xl:-ml-6 mt-4 lg:mt-0">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700/70 shadow-2xl shadow-slate-200/50 dark:shadow-black/75 bg-slate-950"
            >
              {/* Primary Night-Shift Clinical Workstation Asset */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/overnight-weekend-coverage/overnight-radiology-workstation.jpg"
                  alt="Board-certified diagnostic radiologist reviewing diagnostic medical scans at night in hospital reading room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />

                {/* Atmospheric nocturnal vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Floating Badge: Shift Continuity */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 border border-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-md shadow-lg">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-sky-300">
                    Active Nocturnal Reading Queue
                  </span>
                </div>

                {/* Bottom Overlay Card: Radiology Continues After Business Hours */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 rounded-2xl bg-white/95 dark:bg-slate-950/90 border border-slate-200/90 dark:border-white/10 p-4 sm:p-4.5 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                      <Clock size={20} weight="bold" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        Radiology Continues After Hours
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        Seamless reporting coverage when in-house teams conclude daytime shifts.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={14} weight="bold" />
                      <span>24/7/365 On-Call</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OvernightHero;
