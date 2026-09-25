"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, ShieldCheck, SquaresFour } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

interface ChecklistItem {
  id: string;
  title: string;
  subtitle?: string;
  /** Internal verification tracking; not displayed on public UI */
  verificationNote?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "coverage-windows",
    title: "Defined coverage windows",
    subtitle: "Customized shift parameters matched precisely to your operational off-hours.",
    verificationNote: "[VERIFY: exact coverage windows]",
  },
  {
    id: "routing-prioritization",
    title: "Study routing and prioritization",
    subtitle: "Automated triage distinguishing emergent STAT studies from routine evening queues.",
  },
  {
    id: "radiologist-assignment",
    title: "Radiologist assignment",
    subtitle: "Subspecialty matching across neuroradiology, body, musculoskeletal, and pediatric cases.",
    verificationNote: "[VERIFY: radiologist assignment model]",
  },
  {
    id: "critical-findings",
    title: "Critical findings communication",
    subtitle: "Direct telephone notification and closed-loop verbal confirmation for acute pathology.",
  },
  {
    id: "handoff-processes",
    title: "Agreed handoff processes",
    subtitle: "Formalized shift changeover protocols safeguarding uninterrupted case momentum.",
  },
  {
    id: "shift-summary",
    title: "Morning or shift summary",
    subtitle: "Consolidated operational reporting delivered prior to daytime team arrival.",
    verificationNote: "[VERIFY: morning or shift summary format]",
  },
];

export function WhatsIncludedSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="whats-included"
      className="py-20 lg:py-28 bg-white dark:bg-[#070e13] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <Container>
        {/* Large Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: Eyebrow, Heading, and Typographic Checklist (NO BOXES!) */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <SquaresFour size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>WHAT&apos;S INCLUDED</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
            >
              Coverage Designed Around Your Operation
            </motion.h2>

            {/* Typographic Checklist (Clean vertical rhythm with zero rectangular boxes) */}
            <div className="mt-8 sm:mt-10 w-full divide-y divide-slate-100 dark:divide-slate-800/70 border-y border-slate-200/80 dark:border-slate-800/80">
              {CHECKLIST_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : 0.12 + idx * 0.07, // sequential reveal
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="py-4.5 sm:py-5 flex items-start gap-4 group"
                >
                  {/* Subtle Checkmark Glyph */}
                  <div className="size-6 rounded-full bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors duration-200">
                    <CheckCircle size={15} weight="fill" />
                  </div>

                  {/* Typographic Content */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Heading, Body, and Large Clinical Imaging Visual        */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            {/* Right Sub-Heading */}
            <motion.h3
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              A Practical Extension of Your Existing Team
            </motion.h3>

            {/* Right Body Text */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.18 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              Overnight and weekend support can supplement your in-house operation without requiring the organization to redesign its daytime workflow.
            </motion.p>
            {/* Internal verification note: [VERIFY: exact engagement model] */}

            {/* Large Radiology Visual */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              className="mt-8 relative w-full rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-200/50 dark:shadow-black/60 bg-slate-100 dark:bg-slate-900"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/overnight-weekend-coverage/weekend-hospital-imaging.jpg"
                  alt="Modern hospital diagnostic imaging department with MRI and CT scanners operating on weekend shift"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Assurance Banner */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/85 border border-white/10 p-3.5 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Zero Daytime Disruption
                    </span>
                    <span className="text-[11px] text-slate-300 block mt-0.5">
                      Technologists maintain established scanning routines directly into PACS.
                    </span>
                  </div>
                  <ShieldCheck size={20} weight="fill" className="text-sky-400 shrink-0 ml-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhatsIncludedSection;
