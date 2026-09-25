"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  CheckCircle,
  Clock,
  PhoneCall,
  FileText,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STROKE_HERO_CONTENT } from "@/content/stroke-imaging-protocol";

export function StrokeHero() {
  const shouldReduceMotion = useReducedMotion();

  // Subtle editorial entrance transitions
  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 10 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50/80 dark:from-[#030914] dark:via-[#051120] dark:to-[#040c16] text-slate-900 dark:text-white pt-32 pb-20 lg:pt-38 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Subtle atmospheric ambient tint (restrained clinical gradient, non-glowing) */}
      <div 
        className="absolute top-0 right-0 w-[55vw] max-w-[700px] h-[500px] bg-gradient-to-bl from-sky-100/60 via-sky-50/20 to-transparent dark:from-sky-950/30 dark:via-transparent dark:to-transparent pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Authoritative Clinical Narrative (45% / 5.5 cols)       */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start">
            
            {/* 1. Eyebrow */}
            <motion.div
              {...fadeIn(0.04)}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {STROKE_HERO_CONTENT.eyebrow}
              </span>
            </motion.div>

            {/* 2. Primary H1 Headline */}
            <motion.h1
              {...fadeIn(0.12)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              {STROKE_HERO_CONTENT.heading}
            </motion.h1>

            {/* 3. Supporting Clinical Subheading */}
            <motion.p
              {...fadeIn(0.2)}
              className="mt-4 text-lg sm:text-xl font-semibold text-sky-900 dark:text-sky-200 leading-snug"
            >
              {STROKE_HERO_CONTENT.subheading}
            </motion.p>

            {/* 4. Verified Clinical Narrative Body */}
            <motion.p
              {...fadeIn(0.28)}
              className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              {STROKE_HERO_CONTENT.body}
            </motion.p>

            {/* 5. Primary CTA */}
            <motion.div
              {...fadeIn(0.36)}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href={STROKE_HERO_CONTENT.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-primary hover:bg-primary-strong text-white shadow-sm px-7 font-semibold rounded-full"
                )}
              >
                <span>{STROKE_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </Link>
            </motion.div>

            {/* 6. Protocol Trust Badges */}
            <motion.div
              {...fadeIn(0.44)}
              className="mt-9 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 gap-4 w-full text-xs text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Brain size={16} weight="bold" className="text-sky-700 dark:text-sky-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Diagnostic Neuroimaging
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} weight="bold" className="text-sky-700 dark:text-sky-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Facility-Specific Workflow
                </span>
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT: Diagnostic CT/CTA Visual & Protocol Overlay (55% / 7 cols)*/}
          {/* ============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col"
          >
            {/* Main Clinical Diagnostic Console Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#07131e] shadow-xl shadow-slate-200/50 dark:shadow-black/60 transition-all">
              
              {/* Header Bar */}
              <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" aria-hidden="true" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Stroke Protocol Reference Console
                  </span>
                  <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
                  <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-[11px]">
                    Neurovascular Diagnostic View
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <ShieldCheck size={14} className="text-sky-600 dark:text-sky-400" />
                  <span>Subspecialty Neuroradiology Support</span>
                </div>
              </div>

              {/* Diagnostic Neuroimaging Photograph */}
              <div className="relative aspect-[16/9.5] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <Image
                  src={STROKE_HERO_CONTENT.image}
                  alt={STROKE_HERO_CONTENT.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center filter brightness-95"
                />

                {/* Subtle gradient vignette to keep text readable */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" 
                  aria-hidden="true"
                />

                {/* Illustrative scan metadata badge on the image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="rounded-md bg-slate-900/80 backdrop-blur-xs border border-white/10 px-2.5 py-1 text-[11px] text-slate-200">
                    <span className="font-semibold text-sky-300">Axial CT Brain & CTA Head/Neck</span>
                    <span className="mx-1.5 text-slate-500">•</span>
                    <span className="text-slate-300">Time-Sensitive Protocol Review</span>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] text-slate-400/90 font-mono tracking-wider">
                    ILLUSTRATIVE NON-PHI
                  </span>
                </div>
              </div>

              {/* ============================================================== */}
              {/* Subtle Conceptual Protocol Overlay Pipeline                     */}
              {/* ============================================================== */}
              <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-[#07131e] border-t border-slate-200/80 dark:border-slate-800">
                
                {/* Desktop/Tablet 4-Node Sequence */}
                <div className="hidden sm:grid sm:grid-cols-4 gap-2 relative">
                  
                  {/* Subtle single-pass progression highlight line */}
                  {!shouldReduceMotion && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
                      className="absolute top-3.5 left-4 right-4 h-[1.5px] bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 dark:from-sky-600 dark:via-sky-400 dark:to-sky-300 origin-left pointer-events-none z-0 opacity-70"
                      aria-hidden="true"
                    />
                  )}

                  {STROKE_HERO_CONTENT.protocolStages.map((stage, idx) => (
                    <motion.div
                      key={stage.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: shouldReduceMotion ? 0 : 0.44 + idx * 0.1,
                      }}
                      className="relative z-10 flex flex-col items-start bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-lg p-2.5 shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 mb-1 w-full">
                        <span className="w-4 h-4 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {stage.step}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200 truncate">
                          {stage.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                        {stage.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Simplified Protocol Indicator */}
                <div className="sm:hidden flex flex-col gap-2">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Protocol Pathway:
                  </div>
                  <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
                    {STROKE_HERO_CONTENT.protocolStages.map((stage, idx) => (
                      <div key={stage.id} className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                          {stage.step}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                          {stage.shortLabel}
                        </span>
                        {idx < STROKE_HERO_CONTENT.protocolStages.length - 1 && (
                          <span className="text-slate-300 dark:text-slate-600 ml-1">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
