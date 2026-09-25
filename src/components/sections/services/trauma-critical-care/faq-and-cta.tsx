"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Plus,
  ShieldCheck,
  PhoneCall,
  CheckCircle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TRAUMA_FAQ_CONTENT,
  TRAUMA_FINAL_CTA_CONTENT,
} from "@/content/trauma-critical-care";

export function FAQAndCTASection() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    TRAUMA_FAQ_CONTENT.items[0].id
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 10 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.45,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeTransition,
    },
  });

  return (
    <section 
      id="faq-cta"
      className="relative overflow-hidden bg-white dark:bg-[#040c16] text-slate-900 dark:text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* PART 1 — FREQUENTLY ASKED QUESTIONS (EDITORIAL ACCORDION)       */}
        {/* ============================================================== */}
        <div className="pb-20 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80">
          
          {/* FAQ Header */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <motion.div
              {...fadeIn(0.04)}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
                {TRAUMA_FAQ_CONTENT.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              {...fadeIn(0.1)}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
            >
              {TRAUMA_FAQ_CONTENT.heading}
            </motion.h2>

            <motion.p
              {...fadeIn(0.16)}
              className="mt-3.5 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              Key operational, coverage model, and clinical escalation details for trauma and critical care radiology support.
            </motion.p>
          </div>

          {/* Clean Editorial Accordion with Thin Dividers */}
          <div 
            role="region" 
            aria-label="Frequently Asked Questions"
            className="border-t border-b border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 max-w-4xl"
          >
            {TRAUMA_FAQ_CONTENT.items.map((faq) => {
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
        {/* PART 2 — FINAL COMPACT REFINED LIGHT HEALTHCARE CTA PANEL      */}
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
              
              {/* Left Column (~58%): Consultation Narrative */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <motion.span 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: easeTransition }}
                  className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300 mb-3 block"
                >
                  {TRAUMA_FINAL_CTA_CONTENT.eyebrow}
                </motion.span>

                <motion.h2 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.18, ease: easeTransition }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.18]"
                >
                  {TRAUMA_FINAL_CTA_CONTENT.heading}
                </motion.h2>

                <motion.p 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.26, ease: easeTransition }}
                  className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
                >
                  {TRAUMA_FINAL_CTA_CONTENT.body}
                </motion.p>

                <motion.div 
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.34, ease: easeTransition }}
                  className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto"
                >
                  <Link
                    href={TRAUMA_FINAL_CTA_CONTENT.primaryCta.href}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-primary hover:bg-primary-strong text-white shadow-sm px-8 font-semibold rounded-full"
                    )}
                  >
                    <span>{TRAUMA_FINAL_CTA_CONTENT.primaryCta.label}</span>
                    <ArrowRight size={16} weight="bold" className="ml-2" />
                  </Link>
                </motion.div>

                {/* Assurance Trust Badges */}
                <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-sky-600 dark:text-sky-400" />
                    <span>Facility-Aligned Protocols</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PhoneCall size={16} className="text-sky-600 dark:text-sky-400" />
                    <span>Direct Trauma Outreach</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={16} className="text-sky-600 dark:text-sky-400" />
                    <span>Non-Disruptive Integration</span>
                  </div>
                </div>
              </div>

              {/* Right Column (~42%): Subtle Diagnostic Neuro Imaging Frame */}
              <div className="lg:col-span-5 flex flex-col">
                <motion.div 
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.28, ease: easeTransition }}
                  className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-md"
                >
                  <Image
                    src={TRAUMA_FINAL_CTA_CONTENT.image}
                    alt={TRAUMA_FINAL_CTA_CONTENT.alt}
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
                      Trauma Diagnostic Workstation
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
