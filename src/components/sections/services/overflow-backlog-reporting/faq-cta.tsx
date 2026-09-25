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
  Sparkle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  OVERFLOW_FAQ_CONTENT,
  OVERFLOW_FINAL_CTA_CONTENT,
} from "@/content/overflow-backlog-support";

export function FAQCTASection() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<string | null>("faq-what-is-overflow");

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const fadeUp = (delay: number = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="faqs"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#050b11] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* ============================================================== */}
        {/* PART A: FAQ ACCORDION                                          */}
        {/* ============================================================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <Question size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            Overflow &amp; Backlog Reporting FAQs
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            Clear answers regarding capacity scaling, workflow integration, case prioritization, and critical notification.
          </motion.p>
        </div>

        {/* Minimal Editorial Accordion (Thin Separators) */}
        <div className="max-w-4xl divide-y divide-slate-200/80 dark:divide-slate-800/80 border-t border-b border-slate-200/80 dark:border-slate-800/80 mb-20 lg:mb-28">
          {OVERFLOW_FAQ_CONTENT.map((faq) => {
            const isOpen = openFaq === faq.id;

            return (
              <div key={faq.id} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left gap-4 py-2 group focus:outline-none"
                >
                  <span
                    className={cn(
                      "text-base sm:text-lg font-bold transition-colors",
                      isOpen
                        ? "text-sky-700 dark:text-sky-400"
                        : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                      isOpen
                        ? "rotate-180 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                    )}
                  >
                    <CaretDown size={16} weight="bold" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={faq.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* PART B: FINAL CALL TO ACTION                                   */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.18)}
          className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#071320] shadow-2xl shadow-slate-900/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* CTA Content (~7 cols on lg) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col items-start">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-400">
                {OVERFLOW_FINAL_CTA_CONTENT.eyebrow}
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                {OVERFLOW_FINAL_CTA_CONTENT.heading}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {OVERFLOW_FINAL_CTA_CONTENT.subheading}
              </p>

              {/* Trust Bullet Points */}
              <div className="mt-6 space-y-2.5 w-full">
                {OVERFLOW_FINAL_CTA_CONTENT.bulletPoints.map((point) => (
                  <div key={point} className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href={OVERFLOW_FINAL_CTA_CONTENT.primaryBtn.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 px-7 font-semibold"
                  )}
                >
                  <span>{OVERFLOW_FINAL_CTA_CONTENT.primaryBtn.label}</span>
                  <ArrowRight size={16} weight="bold" className="ml-2" />
                </Link>

                <Link
                  href={OVERFLOW_FINAL_CTA_CONTENT.secondaryBtn.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-6 font-medium"
                  )}
                >
                  <span>{OVERFLOW_FINAL_CTA_CONTENT.secondaryBtn.label}</span>
                </Link>
              </div>
            </div>

            {/* CTA Image Column (~5 cols on lg) */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[360px] w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
              <Image
                src={OVERFLOW_FINAL_CTA_CONTENT.image}
                alt={OVERFLOW_FINAL_CTA_CONTENT.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/20 via-transparent to-transparent dark:from-[#071320]/60" />
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
