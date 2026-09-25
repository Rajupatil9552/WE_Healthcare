"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Plus,
  Minus,
  Question,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-overnight-coverage",
    question: "Do you provide overnight radiology coverage?",
    answer:
      "Yes. WE Healthcare provides dedicated overnight teleradiology coverage for hospitals, health systems, outpatient imaging centers, and emergency departments across the United States. Radiologists interpret routine, acute, and emergency studies during off-hours to prevent overnight backlog.",
  },
  {
    id: "faq-weekend-schedule",
    question: "Can weekend coverage be scheduled separately?",
    answer:
      "Yes. Coverage models are modular and flexible. You can engage our reporting team specifically for weekend coverage—including Saturday and Sunday shifts, holiday weekends, or partial weekend blocks—without requiring a full weekday contract.",
  },
  {
    id: "faq-ed-support",
    question: "Can overnight coverage support emergency departments?",
    answer:
      "Yes. Our overnight coverage is structured to support high-acuity emergency department imaging. Emergency studies flagged as STAT receive immediate priority routing, expedited interpretation, and direct clinical escalation for acute findings.",
  },
  {
    id: "faq-team-handover",
    question: "How are studies handed over between teams?",
    answer:
      "Studies transition automatically via standard DICOM and HL7 connections established with your local PACS and RIS. At the beginning of the coverage window, pending studies and new orders route directly to our worklist. At morning shift handoff, completed reports and a shift summary are returned to your in-house team.",
  },
  {
    id: "faq-urgent-escalation",
    question: "How are urgent or critical findings escalated?",
    answer:
      "When critical or unexpected acute pathology is identified, our radiologist or clinical coordination desk directly initiates telephone contact with the ordering physician or emergency department care team, securing verbal confirmation and documenting a verified read-back in the EHR.",
  },
  {
    id: "faq-duration-model",
    question: "Can coverage be temporary or ongoing?",
    answer:
      "Yes. We support both temporary engagements (such as interim coverage for radiologist leave, vacancies, seasonal surges, or system migrations) as well as standing, long-term 24/7/365 coverage partnerships.",
  },
];

export function FAQCTASection() {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = React.useState<string | null>("faq-overnight-coverage");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="faq-cta"
      className="py-24 lg:py-32 bg-slate-50/70 dark:bg-[#070d11] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        
        {/* ============================================================== */}
        {/* PART 1: FREQUENTLY ASKED QUESTIONS                             */}
        {/* ============================================================== */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <Question size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
          >
            Overnight &amp; Weekend Coverage FAQs
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Common operational and clinical questions regarding our off-hours radiology reporting support.
          </motion.p>
        </div>

        {/* Accessible Accordion (NO card grid, clean accordion items) */}
        <div className="max-w-3xl mx-auto space-y-3.5 mb-24 lg:mb-32">
          {FAQ_LIST.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0c141a] overflow-hidden shadow-xs transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:text-sky-600 dark:hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </span>

                  {/* Plus / Minus Icon */}
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 transition-colors">
                    {isOpen ? (
                      <Minus size={16} weight="bold" className="text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Plus size={16} weight="bold" />
                    )}
                  </div>
                </button>

                {/* Animated Accordion Body (250–350ms duration) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3, // 300ms, strictly within 250-350ms
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/60 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* PART 2: FINAL CTA (Strong Editorial Ending, NO Card Grid)      */}
        {/* ============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-100/90 dark:from-[#071523] dark:via-[#05111c] dark:to-[#030910] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 lg:p-14 shadow-2xl shadow-slate-200/60 dark:shadow-black/70"
        >
          {/* Ambient Lighting Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-1/4 size-[500px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-10 size-[420px] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Narrative & Action */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-400/30 bg-sky-50 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs">
                <ShieldCheck size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
                <span>OFF-HOURS CLINICAL PARTNERSHIP</span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]">
                Extend Your Radiology Coverage
              </h2>

              {/* Body */}
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                Tell us about your radiology coverage needs.
              </p>

              {/* Trust Guarantees */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5 w-full">
                <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                  <span>U.S. board-certified, fellowship-trained radiologists</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                  <span>Seamless PACS/RIS interoperability with zero technologist retraining</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                  <span>Customizable shifts for night, weekend, holiday, and surge support</span>
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/35 hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>

            {/* Right Wide Clinical Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700/80 shadow-xl shadow-slate-200/50 dark:shadow-black/70 bg-slate-950 aspect-[16/10] w-full">
                <Image
                  src="/images/overnight-weekend-coverage/final-cta-radiology.jpg"
                  alt="Clinical radiology reading room and hospital leadership consultation at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Status Pill */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/85 border border-white/10 p-3.5 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Dependable Off-Hours Support
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Protecting on-site teams from burnout around the clock.
                    </span>
                  </div>
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FAQCTASection;
