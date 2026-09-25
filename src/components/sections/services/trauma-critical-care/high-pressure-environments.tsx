"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { HIGH_PRESSURE_ENVIRONMENTS_CONTENT } from "@/content/trauma-critical-care";

export function HighPressureEnvironmentsSection() {
  const shouldReduceMotion = useReducedMotion();

  const easeTransition = [0.16, 1, 0.3, 1] as const;

  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easeTransition,
    },
  });

  return (
    <section 
      id="high-pressure-environments"
      className="relative overflow-hidden bg-slate-50/70 dark:bg-[#030914] text-slate-900 dark:text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* TOP: EDITORIAL HEADLINE & SUPPORTING PROSE                     */}
        {/* ============================================================== */}
        <div className="max-w-4xl mb-14 lg:mb-18">
          
          {/* Eyebrow */}
          <motion.div
            {...fadeIn(0.04)}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-800 dark:text-sky-300">
              {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.eyebrow}
            </span>
          </motion.div>

          {/* Section Heading H2 */}
          <motion.h2
            {...fadeIn(0.1)}
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-300 mb-4"
          >
            {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.heading}
          </motion.h2>

          {/* Large Typographic Statement */}
          <motion.div
            {...fadeIn(0.16)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.16]"
          >
            {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.statement.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            {...fadeIn(0.24)}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl"
          >
            {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.supportingCopy}
          </motion.p>

          {/* Optional Microcopy Label */}
          <motion.div
            {...fadeIn(0.3)}
            className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/60 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 text-xs font-mono font-medium text-sky-800 dark:text-sky-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" aria-hidden="true" />
            <span>{HIGH_PRESSURE_ENVIRONMENTS_CONTENT.microcopyLabel}</span>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / TABLET: CONCURRENT MULTI-STUDY CONVERGENCE VISUAL    */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* LEFT: 4 Ingested Studies (~45% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.studies.map((study, idx) => {
              const delays = [0.22, 0.3, 0.38, 0.46];
              return (
                <motion.div
                  key={study.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : delays[idx],
                    ease: easeTransition,
                  }}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#07131e] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-sky-300 dark:hover:border-sky-800/80 transition-all flex items-center gap-3.5 relative group"
                >
                  {/* Local Scan Thumbnail */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-950">
                    <Image
                      src={study.image}
                      alt={study.alt}
                      fill
                      sizes="80px"
                      className="object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 left-1.5 text-[9px] font-mono font-bold text-sky-300">
                      {study.modality}
                    </span>
                  </div>

                  {/* Study Details */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {study.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                        {study.region}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Right Anchor Point for Connector Line */}
                  <div 
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 border border-white dark:border-slate-900" 
                    aria-hidden="true" 
                  />
                </motion.div>
              );
            })}
          </div>

          {/* MIDDLE: Converging Architectural Hairline Tree (~18% / 2 cols) */}
          <div className="lg:col-span-2 flex items-center justify-center relative h-full min-h-[360px]" aria-hidden="true">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.54, ease: "easeOut" }}
              className="origin-left w-full h-full flex items-center justify-center relative"
            >
              <svg 
                viewBox="0 0 120 320" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-[320px] text-sky-400 dark:text-sky-600 overflow-visible"
              >
                {/* 4 Inward branches converging into a single right trunk */}
                <path d="M 0 35 C 50 35, 60 160, 95 160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 0 118 C 40 118, 60 160, 95 160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 0 202 C 40 202, 60 160, 95 160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 0 285 C 50 285, 60 160, 95 160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Central Trunk to Review Node */}
                <line x1="95" y1="160" x2="118" y2="160" stroke="currentColor" strokeWidth="2" />
                <polygon points="120,160 112,156 112,164" fill="currentColor" />
              </svg>
            </motion.div>
          </div>

          {/* RIGHT: Central Coordinated Review Destination (~37% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.64, ease: easeTransition }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-sky-50/40 to-white dark:from-[#07131e] dark:via-[#091827] dark:to-[#05111d] border border-sky-200/90 dark:border-sky-900/60 shadow-lg shadow-sky-950/5 relative"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-sky-100 dark:border-slate-800">
                <span className="text-[11px] font-mono font-bold tracking-widest text-sky-800 dark:text-sky-300 uppercase">
                  {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.subtitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-[10px] font-mono font-semibold">
                  {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.statusBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.description}
              </p>

              {/* Clinical Verification Points */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle size={15} weight="fill" className="text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                  <span>Concurrent correlation across axial neuro, torso, and trauma skeletal series</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <PhoneCall size={15} className="text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                  <span>Immediate escalation pathway aligned with institutional trauma protocols</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={15} className="text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                  <span>Overnight volume coverage and capacity surge buffer support</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET VERTICAL STACK (Responsive Flow)               */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-3 lg:hidden pt-4">
          
          {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.studies.map((study, idx) => (
            <div key={study.id} className="flex flex-col items-center">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.08 }}
                className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#07131e] border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-3.5"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-950">
                  <Image
                    src={study.image}
                    alt={study.alt}
                    fill
                    sizes="60px"
                    className="object-cover object-center filter brightness-95"
                  />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-mono font-bold text-sky-300">
                    {study.modality}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {study.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {study.region}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {study.description}
                  </p>
                </div>
              </motion.div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center py-1.5 text-sky-400 dark:text-sky-600" aria-hidden="true">
                <ArrowDown size={14} weight="bold" />
              </div>
            </div>
          ))}

          {/* Mobile Destination Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.5 }}
            className="w-full p-5 rounded-2xl bg-gradient-to-br from-white via-sky-50/50 to-white dark:from-[#07131e] dark:via-[#091827] dark:to-[#05111d] border border-sky-200 dark:border-sky-900/60 shadow-md"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-100 dark:border-slate-800">
              <span className="text-[10px] font-mono font-bold tracking-wider text-sky-800 dark:text-sky-300 uppercase">
                {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.subtitle}
              </span>
              <span className="px-2 py-0.2 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-[10px] font-mono">
                {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.statusBadge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
              {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {HIGH_PRESSURE_ENVIRONMENTS_CONTENT.reviewPoint.description}
            </p>
          </motion.div>

        </div>

      </Container>
    </section>
  );
}
