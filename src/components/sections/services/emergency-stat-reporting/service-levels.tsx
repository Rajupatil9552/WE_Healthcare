"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CaretRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowsSplit,
  Sliders,
  FileText,
  PhoneCall,
  Lightning,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { SERVICE_LEVELS_CONTENT } from "@/content/emergency-stat-reporting";

export function ServiceLevelsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeParamId, setActiveParamId] = useState<string>(
    SERVICE_LEVELS_CONTENT.parameters[0].id
  );

  // Controlled scroll-triggered reveal
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="service-levels"
      className="relative overflow-hidden bg-white dark:bg-[#030910] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* EDITORIAL SPECIFICATION SPLIT (~42% Left / ~58% Right)         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT ~42%: Editorial Narrative & Operating Principles (~5 cols)*/}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Eyebrow */}
            <motion.span
              {...fadeUp(0.04)}
              className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400"
            >
              {SERVICE_LEVELS_CONTENT.eyebrow}
            </motion.span>

            {/* Main Editorial Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {SERVICE_LEVELS_CONTENT.heading}
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {SERVICE_LEVELS_CONTENT.body}
            </motion.p>

            {/* Structured Governance Narrative Card */}
            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                <Sliders size={16} className="text-rose-600 dark:text-rose-400" />
                <span>Pre-Launch Clinical Alignment</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Priority reporting agreements are formal clinical partnerships. All triage protocols, credentialing parameters, and notification contact trees are mutually established and validated before study transmission begins.
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={14} className="text-rose-600 dark:text-rose-400" />
                  Facility Bylaw Compliance
                </span>
                <span className="font-mono text-[10px]">
                  Configured Prior to Launch
                </span>
              </div>
            </motion.div>

            {/* Internal verification audit: [VERIFY: service-level details] */}

            {/* Transition Bridge Toward FAQ */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {SERVICE_LEVELS_CONTENT.transition.message}
                </span>
                <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-300 font-semibold shrink-0">
                  <span>{SERVICE_LEVELS_CONTENT.transition.nextSectionName}</span>
                  <CaretRight size={13} />
                </span>
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT ~58%: Specification Operating Framework (~7 cols)        */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050e18] shadow-xl shadow-slate-200/40 dark:shadow-black/60 overflow-hidden">
              
              {/* Specification Panel Header */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                  <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                    Service Operating Framework
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  4 Operational Parameters
                </span>
              </div>

              {/* Vertically Stacked Specification Rows */}
              <div
                role="tablist"
                aria-label="Operating parameters defined prior to launch"
                className="divide-y divide-slate-200 dark:divide-slate-800"
              >
                {SERVICE_LEVELS_CONTENT.parameters.map((param, index) => {
                  const isActive = param.id === activeParamId;

                  return (
                    <motion.div
                      key={param.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.45,
                        delay: shouldReduceMotion ? 0 : 0.08 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      <button
                        type="button"
                        role="tab"
                        id={`tab-param-${param.id}`}
                        aria-selected={isActive}
                        aria-controls={`panel-param-${param.id}`}
                        tabIndex={0}
                        onClick={() => setActiveParamId(param.id)}
                        className={cn(
                          "w-full text-left p-5 sm:p-6 transition-all duration-200 relative flex flex-col focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500",
                          isActive
                            ? "bg-slate-50/80 dark:bg-slate-900/60"
                            : "hover:bg-slate-50/40 dark:hover:bg-slate-900/30"
                        )}
                      >
                        {/* Active Indicator Line */}
                        {isActive && (
                          <motion.span
                            layoutId="active-param-indicator"
                            className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-rose-600 dark:bg-rose-400"
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Parameter Header: Number + Title */}
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-baseline gap-3 sm:gap-4">
                            <span
                              className={cn(
                                "font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors",
                                isActive
                                  ? "text-rose-600 dark:text-rose-400"
                                  : "text-slate-400 dark:text-slate-500"
                              )}
                            >
                              {param.number}
                            </span>
                            <h3
                              className={cn(
                                "text-base sm:text-lg font-bold tracking-tight transition-colors",
                                isActive
                                  ? "text-slate-900 dark:text-white"
                                  : "text-slate-700 dark:text-slate-300"
                              )}
                            >
                              {param.title}
                            </h3>
                          </div>

                          <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">
                            {isActive ? "Configured" : "Expand"}
                          </span>
                        </div>

                        {/* Parameter Description */}
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-7 sm:pl-8 leading-relaxed font-normal">
                          {param.description}
                        </p>

                        {/* ============================================================== */}
                        {/* CONCEPTUAL PARAMETER VISUALIZATION (No Fake SLAs or Timers)   */}
                        {/* ============================================================== */}
                        {isActive && (
                          <motion.div
                            id={`panel-param-${param.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-param-${param.id}`}
                            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                            animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 pl-7 sm:pl-8 pr-2 overflow-hidden w-full"
                          >
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                              {param.detail}
                            </p>

                            {/* Parameter 01 Visual: Priority Categories */}
                            {param.visualType === "categories" && (
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {param.tiers.map((tier) => (
                                  <div
                                    key={tier.label}
                                    className="rounded-lg bg-white dark:bg-[#07131e] border border-slate-200 dark:border-slate-800 p-2.5 shadow-2xs"
                                  >
                                    <span
                                      className={cn(
                                        "block font-bold text-xs uppercase font-mono",
                                        tier.label === "STAT" && "text-rose-600 dark:text-rose-400",
                                        tier.label === "HIGH" && "text-amber-600 dark:text-amber-400",
                                        tier.label === "ROUTINE" && "text-slate-600 dark:text-slate-400"
                                      )}
                                    >
                                      {tier.label}
                                    </span>
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {tier.tag}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 02 Visual: Coverage Windows */}
                            {param.visualType === "windows" && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                                {param.windows.map((win) => (
                                  <div
                                    key={win.label}
                                    className="rounded-lg bg-white dark:bg-[#07131e] border border-slate-200 dark:border-slate-800 p-2 shadow-2xs"
                                  >
                                    <span className="block font-bold text-[11px] text-slate-900 dark:text-white uppercase">
                                      {win.label}
                                    </span>
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {win.desc}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 03 Visual: Escalation Rules */}
                            {param.visualType === "escalation" && (
                              <div className="flex items-center justify-between gap-1 p-2.5 rounded-lg bg-white dark:bg-[#07131e] border border-slate-200 dark:border-slate-800 text-xs">
                                {param.steps.map((st, sIdx) => (
                                  <div key={st} className="flex items-center gap-1.5 flex-1 justify-center">
                                    <span className="font-semibold text-[11px] text-slate-800 dark:text-slate-200 text-center">
                                      {st}
                                    </span>
                                    {sIdx < param.steps.length - 1 && (
                                      <CaretRight size={12} className="text-rose-600 dark:text-rose-400 shrink-0" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 04 Visual: Turnaround Commitments */}
                            {param.visualType === "commitments" && (
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {param.phases.map((ph) => (
                                  <div
                                    key={ph.phase}
                                    className="rounded-lg bg-white dark:bg-[#07131e] border border-slate-200 dark:border-slate-800 p-2.5 shadow-2xs"
                                  >
                                    <span className="block font-bold text-[11px] text-slate-900 dark:text-white uppercase font-mono">
                                      {ph.phase}
                                    </span>
                                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {ph.note}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                          </motion.div>
                        )}

                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Framework Annotation Bar */}
              <div className="px-5 py-3 bg-slate-100/70 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} weight="fill" className="text-emerald-600 dark:text-emerald-400" />
                  Service Level Commitments Codified in Written Client Agreement
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  Pre-Operational Onboarding
                </span>
              </div>

            </div>

            {/* Bottom Clarification Note */}
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 px-2">
              Parameters are agreed on a per-facility basis. WE Healthcare does not publish generic universal turnaround guarantees; all commitments reflect verified operational capacity.
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default ServiceLevelsSection;
