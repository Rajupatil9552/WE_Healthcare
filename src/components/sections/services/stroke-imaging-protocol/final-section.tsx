"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Plus,
  ArrowDown,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CRITICAL_FINDINGS_CONTENT,
  STROKE_FAQ_CONTENT,
  STROKE_FINAL_CTA_CONTENT,
} from "@/content/stroke-imaging-protocol";

export function StrokeFinalSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    STROKE_FAQ_CONTENT.items[0].id
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Base transition helper
  const easeTransition = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="critical-findings-faq-cta"
      className="relative overflow-hidden bg-white dark:bg-[#040c16] text-slate-900 dark:text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* PART 1 — CRITICAL FINDINGS: CALM CLINICAL COMMUNICATION PATHWAY  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80">
          
          {/* Left Column (~45%): Eyebrow, Heading, Supporting Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeTransition }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {CRITICAL_FINDINGS_CONTENT.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08, ease: easeTransition }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
            >
              {CRITICAL_FINDINGS_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.16, ease: easeTransition }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {CRITICAL_FINDINGS_CONTENT.content}
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.24, ease: easeTransition }}
              className="mt-3.5 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {CRITICAL_FINDINGS_CONTENT.supportingCopy}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.32, ease: easeTransition }}
              className="mt-8 p-4 sm:p-5 rounded-xl bg-sky-50/50 dark:bg-[#07131e]/70 border border-sky-100 dark:border-slate-800 w-full text-xs sm:text-sm text-slate-600 dark:text-slate-400"
            >
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Facility Governance Alignment
              </span>
              Communication protocols, designated escalation contacts, and documentation standards are configured per institutional bylaws prior to operational launch.
            </motion.div>
          </div>

          {/* Right Column (~55%): Conceptual Communication Pathway */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <div className="rounded-2xl bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 dark:from-[#07131e] dark:via-[#081726] dark:to-[#05111d] border border-sky-100 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                  Communication Pathway
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Defined Clinical Sequence
                </span>
              </div>

              {/* Sequential nodes & animated connector lines */}
              <div className="flex flex-col">
                
                {/* Step 1: CRITICAL FINDING */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.24, ease: easeTransition }}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-4 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                    01
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                      CRITICAL FINDING
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Acute imaging finding identified during interpretation
                    </p>
                  </div>
                </motion.div>

                {/* Connector Line 1 */}
                <div className="flex justify-center items-center py-2 relative">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.36, ease: "easeOut" }}
                    className="origin-top flex flex-col items-center text-sky-500 dark:text-sky-400"
                  >
                    <div className="w-px h-5 bg-sky-300 dark:bg-sky-800" />
                    <ArrowDown size={14} weight="bold" className="-mt-1" />
                  </motion.div>
                </div>

                {/* Step 2: FACILITY-ESTABLISHED PATHWAY */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.48, ease: easeTransition }}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-4 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                    02
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                      FACILITY-ESTABLISHED PATHWAY
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Initiates facility-agreed clinical escalation workflow
                    </p>
                  </div>
                </motion.div>

                {/* Connector Line 2 */}
                <div className="flex justify-center items-center py-2 relative">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.60, ease: "easeOut" }}
                    className="origin-top flex flex-col items-center text-sky-500 dark:text-sky-400"
                  >
                    <div className="w-px h-5 bg-sky-300 dark:bg-sky-800" />
                    <ArrowDown size={14} weight="bold" className="-mt-1" />
                  </motion.div>
                </div>

                {/* Step 3: CLINICAL COMMUNICATION */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.72, ease: easeTransition }}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-4 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                    03
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                      CLINICAL COMMUNICATION
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Direct telephone outreach to treating physician or care team
                    </p>
                  </div>
                </motion.div>

                {/* Connector Line 3 */}
                <div className="flex justify-center items-center py-2 relative">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.84, ease: "easeOut" }}
                    className="origin-top flex flex-col items-center text-sky-500 dark:text-sky-400"
                  >
                    <div className="w-px h-5 bg-sky-300 dark:bg-sky-800" />
                    <ArrowDown size={14} weight="bold" className="-mt-1" />
                  </motion.div>
                </div>

                {/* Step 4: DOCUMENTATION */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.96, ease: easeTransition }}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-start gap-4 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                    04
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                      DOCUMENTATION
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Closed-loop verbal read-back documented in report and EHR
                    </p>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* PART 2 — FREQUENTLY ASKED QUESTIONS (EDITORIAL ACCORDION)       */}
        {/* ============================================================== */}
        <div className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80">
          
          <div className="max-w-3xl mb-12 lg:mb-16">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeTransition }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {STROKE_FAQ_CONTENT.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08, ease: easeTransition }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
            >
              {STROKE_FAQ_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.16, ease: easeTransition }}
              className="mt-3.5 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              Key operational, protocol alignment, and onboarding considerations for facility stroke imaging support.
            </motion.p>
          </div>

          {/* Clean Editorial Accordion with Thin Dividers */}
          <div 
            role="region" 
            aria-label="Frequently Asked Questions"
            className="border-t border-b border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 max-w-4xl"
          >
            {STROKE_FAQ_CONTENT.items.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const buttonId = `faq-trigger-${faq.id}`;
              const contentId = `faq-content-${faq.id}`;

              return (
                <div key={faq.id} className="py-2 transition-colors">
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-4 sm:py-5 flex items-start justify-between gap-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-sky-700 dark:text-sky-400 pt-1 shrink-0">
                        {faq.number}
                      </span>
                      <span
                        className={cn(
                          "text-base sm:text-lg font-bold leading-snug transition-colors",
                          isOpen
                            ? "text-sky-800 dark:text-sky-300"
                            : "text-slate-900 dark:text-white group-hover:text-sky-950 dark:group-hover:text-sky-200"
                        )}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Smooth rotating plus icon into close/minus state */}
                    <span
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-all duration-300 ease-out",
                        isOpen
                          ? "bg-sky-600 border-sky-600 text-white rotate-45"
                          : "border-slate-300 dark:border-slate-700 text-slate-500 group-hover:border-sky-500 group-hover:text-sky-600 rotate-0"
                      )}
                      aria-hidden="true"
                    >
                      <Plus size={14} weight="bold" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: easeTransition }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 sm:pl-10 pr-4 pb-6 pt-1">
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* ============================================================== */}
        {/* PART 3 — FINAL REFINED LIGHT HEALTHCARE CTA PANEL               */}
        {/* ============================================================== */}
        <div className="pt-20 lg:pt-28">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: easeTransition }}
            className="rounded-3xl bg-gradient-to-br from-sky-50/90 via-white to-sky-100/50 dark:from-[#07131e] dark:via-[#091827] dark:to-[#05111d] border border-sky-200/70 dark:border-slate-800 p-8 sm:p-12 lg:p-14 shadow-lg shadow-sky-500/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column (~55%): Eyebrow, Heading, Copy, Action Button */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <motion.span 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: easeTransition }}
                  className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300 mb-3 block"
                >
                  {STROKE_FINAL_CTA_CONTENT.eyebrow}
                </motion.span>

                <motion.h2 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.18, ease: easeTransition }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
                >
                  {STROKE_FINAL_CTA_CONTENT.heading}
                </motion.h2>

                <motion.p 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.26, ease: easeTransition }}
                  className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
                >
                  {STROKE_FINAL_CTA_CONTENT.body}
                </motion.p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.34, ease: easeTransition }}
                  className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto"
                >
                  <Link
                    href={STROKE_FINAL_CTA_CONTENT.primaryCta.href}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-primary hover:bg-primary-strong text-white shadow-sm px-8 font-semibold rounded-full"
                    )}
                  >
                    <span>{STROKE_FINAL_CTA_CONTENT.primaryCta.label}</span>
                    <ArrowRight size={16} weight="bold" className="ml-2" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column (~45%): Subtle Diagnostic Neuro Imaging Frame */}
              <div className="lg:col-span-5 flex flex-col">
                <motion.div 
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.28, ease: easeTransition }}
                  className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-md"
                >
                  <Image
                    src={STROKE_FINAL_CTA_CONTENT.image}
                    alt={STROKE_FINAL_CTA_CONTENT.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter brightness-95"
                  />
                  
                  {/* Subtle dark vignette */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" 
                    aria-hidden="true" 
                  />

                  {/* Micro label */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 pointer-events-none">
                    <span className="font-medium text-sky-200">
                      Diagnostic Workstation Reference
                    </span>
                    <span className="font-mono text-slate-400">
                      ILLUSTRATIVE NON-PHI
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
