"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  WarningOctagon,
  PhoneCall,
  CheckCircle,
  ShieldCheck,
  CaretRight,
  FileText,
  Clock,
  ArrowsSplit,
  LockKey,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { CRITICAL_FINDINGS_PROTOCOL_CONTENT } from "@/content/emergency-stat-reporting";

export function CriticalFindingsProtocolSection() {
  const shouldReduceMotion = useReducedMotion();

  // Controlled scroll-triggered reveal animations
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.55,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  const nodeAnim = (index: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, x: 12 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : 0.15 + index * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      id="critical-findings-protocol"
      className="relative overflow-hidden bg-slate-50/60 dark:bg-[#040c16] text-slate-900 dark:text-white py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* EDITORIAL SPLIT LAYOUT: Narrative + Findings Report / Pathway  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT ~45%: Editorial Narrative & Conceptual Report (~5 cols)   */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Eyebrow */}
            <motion.span
              {...fadeUp(0.04)}
              className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400"
            >
              {CRITICAL_FINDINGS_PROTOCOL_CONTENT.eyebrow}
            </motion.span>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              {CRITICAL_FINDINGS_PROTOCOL_CONTENT.heading}
            </motion.h2>

            {/* Body */}
            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {CRITICAL_FINDINGS_PROTOCOL_CONTENT.body}
            </motion.p>

            {/* Conceptual Diagnostic Findings Snapshot (No Real Patient Data) */}
            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] shadow-lg shadow-slate-200/40 dark:shadow-black/50 overflow-hidden"
            >
              {/* Report Header */}
              <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-rose-600 dark:text-rose-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Diagnostic Findings Record
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
                  Illustrative UI
                </span>
              </div>

              {/* Workstation Snapshot Header Image */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-950">
                <Image
                  src={CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.image}
                  alt={CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-300 drop-shadow-xs">
                    {CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.examTitle}
                  </span>
                  <span className="font-mono text-[11px] text-slate-300">
                    STAT Priority
                  </span>
                </div>
              </div>

              {/* Findings Data Body */}
              <div className="p-4 sm:p-5 space-y-3.5 bg-white dark:bg-[#07131e]">
                
                {/* Critical Finding Highlight Banner */}
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
                  <WarningOctagon size={18} weight="fill" className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">
                      {CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.findingFlag}
                    </span>
                    <span className="text-[11px] text-rose-700 dark:text-rose-300 block mt-0.5 font-medium">
                      Status: {CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.actionStatus}
                    </span>
                  </div>
                </div>

                {/* Clinical Indication */}
                <div className="text-xs">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-medium">
                    Clinical Indication
                  </span>
                  <p className="mt-0.5 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {CRITICAL_FINDINGS_PROTOCOL_CONTENT.report.indication}
                  </p>
                </div>

                {/* Footer Protocol Badge */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={13} weight="fill" />
                    Agreed Clinical Notification Pathway
                  </span>
                  <span className="font-mono text-[10px]">
                    Non-Clinical Demo
                  </span>
                </div>

              </div>

              {/* Internal verification audit: [VERIFY: exact communication protocol] */}
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT ~55%: Connected Communication Escalation Pathway (~7 cols)*/}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050e18] p-5 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/60">
              
              {/* Pathway Panel Header */}
              <div className="pb-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                  <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                    Clinical Escalation Pathway
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                  <ShieldCheck size={14} className="text-rose-600 dark:text-rose-400" />
                  <span>Closed-Loop Clinical Governance</span>
                </div>
              </div>

              {/* Connected Vertical Pathway Nodes */}
              <div className="relative mt-8 pl-4 sm:pl-6 space-y-8">
                
                {/* Continuous Vertical Connecting Line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[27px] sm:left-[35px] top-4 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800 z-0"
                />

                {CRITICAL_FINDINGS_PROTOCOL_CONTENT.nodes.map((node, index) => {
                  const isDocumentation = node.id === "node-documentation";

                  return (
                    <motion.div
                      key={node.id}
                      {...nodeAnim(index)}
                      className="relative z-10 flex items-start gap-4 sm:gap-6 group"
                    >
                      {/* Node Indicator Circle */}
                      <div
                        className={cn(
                          "size-8 sm:size-9 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors border-2 shadow-xs",
                          isDocumentation
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : index === 0
                            ? "bg-rose-600 text-white border-rose-600"
                            : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-rose-300 dark:border-rose-900/80"
                        )}
                      >
                        {isDocumentation ? (
                          <CheckCircle size={16} weight="fill" />
                        ) : (
                          node.number
                        )}
                      </div>

                      {/* Node Content Card */}
                      <div className="flex-1 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 sm:p-5 transition-colors group-hover:bg-white dark:group-hover:bg-slate-900">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {node.title}
                          </h3>
                          <span
                            className={cn(
                              "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit",
                              isDocumentation
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            )}
                          >
                            {node.stateLabel}
                          </span>
                        </div>

                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {node.description}
                        </p>

                      </div>
                    </motion.div>
                  );
                })}

              </div>

              {/* Bottom Clinical Assurance Bar */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <PhoneCall size={14} className="text-rose-600 dark:text-rose-400" />
                  Verbal communication pathway aligned with hospital protocol
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Audit Timestamp Logged
                </span>
              </div>

            </div>

            {/* Explanatory Protocol Note */}
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 px-2">
              Critical findings communication is structured according to the agreed client escalation matrix. Specific clinical contact points, hierarchy, and read-back documentation are defined during operational onboarding.
            </p>

          </div>

        </div>

        {/* ============================================================== */}
        {/* SUBTLE DIRECTIONAL BRIDGE TO SERVICE LEVELS                    */}
        {/* ============================================================== */}
        <motion.div
          {...fadeUp(0.32)}
          className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs"
        >
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-semibold text-slate-900 dark:text-white">
              {CRITICAL_FINDINGS_PROTOCOL_CONTENT.transition.message}
            </span>
            <CaretRight size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />
            <span className="text-rose-700 dark:text-rose-300 font-semibold">
              Operational Configuration
            </span>
          </div>

          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Upcoming: {CRITICAL_FINDINGS_PROTOCOL_CONTENT.transition.nextSectionName}
          </span>
        </motion.div>

      </Container>
    </section>
  );
}

export default CriticalFindingsProtocolSection;
