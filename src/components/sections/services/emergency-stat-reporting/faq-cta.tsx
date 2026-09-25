"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CaretDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Question,
  PhoneCall,
  LockKey,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EMERGENCY_FAQ_CONTENT,
  EMERGENCY_FINAL_CTA_CONTENT,
} from "@/content/emergency-stat-reporting";

export function EmergencyFAQCTASection() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    EMERGENCY_FAQ_CONTENT.items[0].id
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Controlled scroll entrance
  const fadeUp = (delay: number = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="faqs"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#030910] text-slate-900 dark:text-white transition-colors duration-300 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <Container>
        
        {/* ============================================================== */}
        {/* PART 01: FREQUENTLY ASKED QUESTIONS (EDITORIAL ACCORDION)       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 lg:mb-28">
          
          {/* Left Column (~40%): Title & Context */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            <motion.div
              {...fadeUp(0.04)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300 shadow-2xs"
            >
              <Question size={14} weight="bold" className="text-rose-600 dark:text-rose-400" />
              <span>{EMERGENCY_FAQ_CONTENT.eyebrow}</span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.1)}
              className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {EMERGENCY_FAQ_CONTENT.heading}
            </motion.h2>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {EMERGENCY_FAQ_CONTENT.supportingText}
            </motion.p>

            <motion.div
              {...fadeUp(0.22)}
              className="mt-6 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 w-full text-xs text-slate-600 dark:text-slate-400"
            >
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Clinical Workflow Governance
              </span>
              Detailed turnaround targets, emergency escalation pathways, and medical staff credentialing guidelines are mutually formalized prior to launch.
            </motion.div>
          </div>

          {/* Right Column (~60%): Minimalist Accordion */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <div
              role="region"
              aria-label="Frequently Asked Questions list"
              className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800"
            >
              {EMERGENCY_FAQ_CONTENT.items.map((faq, index) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : 0.06 * index,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="py-4 sm:py-5"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left gap-4 py-2 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500 rounded-md"
                    >
                      <span
                        className={cn(
                          "text-base sm:text-lg font-bold transition-colors duration-200",
                          isOpen
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                        )}
                      >
                        {faq.question}
                      </span>

                      <div
                        className={cn(
                          "size-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300",
                          isOpen
                            ? "border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rotate-180"
                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:border-slate-300"
                        )}
                      >
                        <CaretDown size={14} weight="bold" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.id}`}
                          initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
                          exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2 pb-3 pr-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* PART 02: FINAL CONSULTATION CTA (LIGHT CLINICAL ENDING)        */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.18)}
          className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] shadow-xl shadow-slate-200/50 dark:shadow-black/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* CTA Narrative Column (~7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col items-start">
              
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
                {EMERGENCY_FINAL_CTA_CONTENT.eyebrow}
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                {EMERGENCY_FINAL_CTA_CONTENT.heading}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {EMERGENCY_FINAL_CTA_CONTENT.supportingText}
              </p>

              {/* Clinical Confidence Pillars */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2.5 w-full">
                <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} weight="fill" className="text-rose-600 dark:text-rose-400 mr-2.5 shrink-0" />
                  <span>Dedicated priority triage mapping for acute trauma &amp; emergent protocols</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} weight="fill" className="text-rose-600 dark:text-rose-400 mr-2.5 shrink-0" />
                  <span>Direct radiologist-to-physician telephone consultation for critical findings</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href={EMERGENCY_FINAL_CTA_CONTENT.primaryBtn.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 px-7 font-semibold"
                  )}
                >
                  <span>{EMERGENCY_FINAL_CTA_CONTENT.primaryBtn.label}</span>
                  <ArrowRight size={16} weight="bold" className="ml-2" />
                </Link>

                <Link
                  href={EMERGENCY_FINAL_CTA_CONTENT.secondaryBtn.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-6 font-medium"
                  )}
                >
                  <span>{EMERGENCY_FINAL_CTA_CONTENT.secondaryBtn.label}</span>
                </Link>
              </div>

            </div>

            {/* Subtle Radiology Workstation Visual Column (~5 cols) */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[360px] w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-slate-950">
              <Image
                src={EMERGENCY_FINAL_CTA_CONTENT.image}
                alt={EMERGENCY_FINAL_CTA_CONTENT.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-rose-400" />
                  <span className="font-medium drop-shadow-xs">
                    Board-Certified Diagnostic Teleradiology
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 font-mono hidden sm:inline drop-shadow-xs">
                  Emergency Support
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  );
}

export default EmergencyFAQCTASection;
