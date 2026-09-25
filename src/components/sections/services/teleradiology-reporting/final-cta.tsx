"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChatCircleDots, ShieldCheck, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

export function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55 },
  };

  const imageAnim = {
    initial: shouldReduceMotion ? false : { opacity: 0, scale: 1.03 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-100/80 dark:from-[#071523] dark:via-[#05111c] dark:to-[#030910] text-slate-900 dark:text-white py-24 lg:py-32 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300"
    >
      {/* Ambient Deep Navy & Medical Blue Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 size-[600px] rounded-full bg-sky-500/10 dark:bg-sky-500/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[130px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Headline, Body, and Dual CTAs (~6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-400/30 bg-sky-50 dark:bg-sky-950/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <ShieldCheck size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>READY TO DISCUSS YOUR RADIOLOGY WORKFLOW?</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
            >
              Tell us about your reporting needs.
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Tell us about your radiology coverage needs.
            </motion.p>

            {/* Institutional Trust Bullets */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.22 }}
              className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5 w-full"
            >
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>U.S. board-certified, state-licensed fellowship radiologists</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Bi-directional PACS/RIS integration with zero technologist retraining</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle size={16} weight="fill" className="text-sky-600 dark:text-sky-400 mr-2.5 shrink-0" />
                <span>Custom coverage windows for 24/7, nights, weekends, and volume surges</span>
              </div>
            </motion.div>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Request a Consultation</span>
                <ArrowRight size={16} weight="bold" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/60 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200"
              >
                <ChatCircleDots size={16} weight="bold" className="text-sky-600 dark:text-sky-400" />
                <span>Contact Our Team</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Large Radiology Photography Asset (~6 cols) */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <motion.div
              {...imageAnim}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700/80 shadow-2xl shadow-slate-200/50 dark:shadow-black/60 bg-slate-100 dark:bg-slate-900 aspect-[16/10]"
            >
              <Image
                src="/images/teleradiology-reporting/final-cta-radiology.jpg"
                alt="Clinical radiology reading room and hospital leadership consultation at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle Medical Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quality Assurance Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 dark:bg-slate-950/85 border border-slate-200/90 dark:border-white/10 p-3.5 backdrop-blur-md shadow-lg shadow-slate-200/40 dark:shadow-none flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Diagnostic Reporting Partnership</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Tailored to your facility&apos;s medical bylaws &amp; SLAs</div>
                </div>
                <div className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0" />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCTASection;
