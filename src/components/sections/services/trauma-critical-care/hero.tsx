"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Stack,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TRAUMA_HERO_CONTENT } from "@/content/trauma-critical-care";

export function TraumaHero() {
  const shouldReduceMotion = useReducedMotion();

  // Subtle editorial entrance transitions
  const easeTransition = [0.16, 1, 0.3, 1] as const;

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeTransition,
    },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50/80 dark:from-[#030914] dark:via-[#051120] dark:to-[#040c16] text-slate-900 dark:text-white pt-32 pb-20 lg:pt-38 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Subtle atmospheric ambient tint (restrained clinical gradient, non-glowing) */}
      <div 
        className="absolute top-0 right-0 w-[55vw] max-w-[700px] h-[520px] bg-gradient-to-bl from-sky-100/50 via-sky-50/20 to-transparent dark:from-sky-950/25 dark:via-transparent dark:to-transparent pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Authoritative Clinical Narrative (~42% / 5 cols)         */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* 1. Eyebrow */}
            <motion.div
              {...fadeIn(0.04)}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {TRAUMA_HERO_CONTENT.eyebrow}
              </span>
            </motion.div>

            {/* 2. Primary H1 Headline */}
            <motion.h1
              {...fadeIn(0.12)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              {TRAUMA_HERO_CONTENT.heading}
            </motion.h1>

            {/* 3. Supporting Clinical Subheading */}
            <motion.p
              {...fadeIn(0.2)}
              className="mt-4 text-lg sm:text-xl font-semibold text-sky-900 dark:text-sky-200 leading-snug"
            >
              {TRAUMA_HERO_CONTENT.subheading}
            </motion.p>

            {/* 4. Verified Clinical Narrative Body */}
            <motion.p
              {...fadeIn(0.28)}
              className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {TRAUMA_HERO_CONTENT.body}
            </motion.p>

            {/* 5. Primary CTA */}
            <motion.div
              {...fadeIn(0.36)}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href={TRAUMA_HERO_CONTENT.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-primary hover:bg-primary-strong text-white shadow-sm px-7 font-semibold rounded-full"
                )}
              >
                <span>{TRAUMA_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </Link>
            </motion.div>

            {/* Subtle Operational Pillars */}
            <motion.div
              {...fadeIn(0.44)}
              className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <Stack size={14} className="text-sky-600 dark:text-sky-400" />
                <span>Multi-Study Batch Ingestion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-sky-600 dark:text-sky-400" />
                <span>Facility Protocol Aligned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall size={14} className="text-sky-600 dark:text-sky-400" />
                <span>Trauma Team Communication</span>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Multi-Study Trauma Workstation Visual (~58% / 7 cols)   */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            <div className="relative w-full max-w-2xl">
              
              {/* Main Workstation Diagnostic Display Container */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.24, ease: easeTransition }}
                className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/5"
              >
                <Image
                  src={TRAUMA_HERO_CONTENT.image}
                  alt={TRAUMA_HERO_CONTENT.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center filter brightness-95"
                />

                {/* Subtle dark vignette to emphasize diagnostic focus */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Header telemetry badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs border border-white/10 text-[11px] font-mono text-slate-300">
                    <span className="text-sky-400 font-bold mr-1.5">MODALITY</span>
                    <span>MULTI-STUDY TRAUMA WORKUP</span>
                  </div>
                  <div className="hidden sm:flex px-2 py-0.5 rounded bg-slate-900/70 border border-white/10 text-[10px] font-mono text-slate-400">
                    <span>NON-PHI ILLUSTRATIVE</span>
                  </div>
                </div>

                {/* Lower subtle workstation info bar */}
                <div className="absolute bottom-3 left-3.5 right-3.5 hidden sm:flex items-center justify-between text-[11px] text-slate-400 pointer-events-none">
                  <span>Diagnostic Reading Room Environment</span>
                  <span className="font-mono text-sky-300">PACS Concurrent Intake</span>
                </div>
              </motion.div>

              {/* ========================================================== */}
              {/* MULTI-STUDY CONCEPTUAL OVERLAY DECK                        */}
              {/* ========================================================== */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.4, ease: easeTransition }}
                className="mt-4 sm:-mt-10 sm:relative sm:z-20 sm:ml-4 sm:mr-4 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#07131e]/95 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg shadow-slate-950/5"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Stack size={16} className="text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                      Concurrent Trauma Studies
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Coordinated Batch Workup
                  </span>
                </div>

                {/* 4 Conceptual Studies */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {TRAUMA_HERO_CONTENT.multiStudies.map((study, idx) => (
                    <motion.div
                      key={study.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion ? 0 : 0.48 + idx * 0.08,
                        ease: easeTransition,
                      }}
                      className={cn(
                        "p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors",
                        study.status === "Priority"
                          ? "bg-sky-50/60 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/60"
                          : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          {study.modality}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-1.5 py-0.2 rounded-full",
                            study.status === "Priority"
                              ? "bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300"
                              : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {study.status}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {study.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {study.region}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Coordinated Review Connection Footer */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1 }}
                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.8, ease: easeTransition }}
                  className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400"
                >
                  <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-300 font-medium">
                    <CheckCircle size={14} weight="fill" className="text-sky-600 dark:text-sky-400" />
                    <span>Grouped Polytrauma Intake</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-mono text-[10px]">
                    <span>ROUTED FOR COGNITIVE REVIEW</span>
                    <ArrowRight size={11} className="text-sky-600 dark:text-sky-400" />
                  </div>
                </motion.div>

              </motion.div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
