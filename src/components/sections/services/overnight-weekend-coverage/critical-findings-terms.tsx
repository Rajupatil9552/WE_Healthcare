"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  WarningCircle,
  PhoneCall,
  UsersThree,
  ClipboardText,
  SlidersHorizontal,
  Clock,
  ShieldCheck,
  Handshake,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// Internal verification tracking:
// [VERIFY: exact protocol and response commitments]
// [VERIFY: available service levels and commitments]
// Must not appear on public UI.

interface FlowNode {
  step: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  activationDelay: number;
}

const FLOW_NODES: FlowNode[] = [
  {
    step: "01",
    title: "Finding Identified",
    description: "Radiologist detects urgent or unexpected critical pathology during study interpretation.",
    tag: "Diagnostic Detection",
    icon: WarningCircle,
    activationDelay: 0.1,
  },
  {
    step: "02",
    title: "Escalation Pathway",
    description: "Direct clinical notification initiated immediately through your agreed facility protocol.",
    tag: "Priority Triage",
    icon: PhoneCall,
    activationDelay: 0.45,
  },
  {
    step: "03",
    title: "Clinical Team",
    description: "Attending physician, emergency staff, or charge nurse receives direct verbal communication.",
    tag: "Closed-Loop Receipt",
    icon: UsersThree,
    activationDelay: 0.8,
  },
  {
    step: "04",
    title: "Documentation",
    description: "Recipient details, contact timestamp, and verbal read-back confirmation permanently recorded.",
    tag: "Audit Trail Log",
    icon: ClipboardText,
    activationDelay: 1.15,
  },
];

const ONBOARDING_PILLARS = [
  {
    title: "Coverage Hours",
    description: "Shift boundaries configured around your exact off-hours needs—overnight, weekends, or holidays.",
    icon: Clock,
  },
  {
    title: "Reporting Priorities",
    description: "Clear clinical triage rules differentiating emergent STAT requests from routine queues.",
    icon: SlidersHorizontal,
  },
  {
    title: "Service Levels",
    description: "Mutually defined turnaround expectations and clinical escalation protocols formalizing quality.",
    icon: ShieldCheck,
  },
  {
    title: "Commercial Terms",
    description: "Transparent, flexible engagement models tailored to your volume without punitive commitments.",
    icon: Handshake,
  },
];

export function CriticalFindingsTermsSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      id="critical-findings-terms"
      className="py-24 lg:py-32 bg-slate-50/80 dark:bg-[#040c14] border-b border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Soft Glow (Adaptive for Light and Dark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(14,165,233,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(14,165,233,0.12),transparent_70%)]"
      />

      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* PART A: CRITICAL FINDINGS PROTOCOL                             */}
        {/* ============================================================== */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50/90 dark:bg-amber-950/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300 shadow-xs"
          >
            <WarningCircle size={14} weight="bold" className="text-amber-600 dark:text-amber-400" />
            <span>CRITICAL FINDINGS PROTOCOL</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]"
          >
            A Clear Path for Time-Sensitive Findings
          </motion.h2>

          {/* Body */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Time-sensitive findings are communicated through the agreed escalation pathway and documented according to the client’s protocol.
          </motion.p>
        </div>

        {/* CLINICAL FLOW: CONNECTED NODES AND TYPOGRAPHY (NO LARGE CARDS!) */}
        <div className="relative max-w-5xl mx-auto mb-20 lg:mb-28">
          
          {/* Desktop Horizontal Connecting Track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? { width: "100%" } : { width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-400"
            />
          </div>

          {/* Four Connected Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10 items-start">
            {FLOW_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isAlert = idx === 0;

              return (
                <div key={node.step} className="flex flex-col items-center text-center group">
                  
                  {/* Station Circular Beacon */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : node.activationDelay,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className={cn(
                      "size-14 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#07131d] shadow-md relative z-10 transition-transform duration-300 group-hover:scale-105",
                      isAlert
                        ? "border-amber-500 text-amber-500 shadow-amber-500/20"
                        : "border-sky-500 text-sky-500 shadow-sky-500/20"
                    )}
                  >
                    <Icon size={22} weight="bold" />
                  </motion.div>

                  {/* Node Index */}
                  <span className="mt-3.5 font-mono text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    NODE {node.step}
                  </span>

                  {/* Node Title */}
                  <h3 className="mt-1 text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {node.title}
                  </h3>

                  {/* Node Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-[220px]">
                    {node.description}
                  </p>

                  {/* Status Pill */}
                  <span
                    className={cn(
                      "mt-3.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      isAlert
                        ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                        : "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                    )}
                  >
                    {node.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider hairline between Part A and Part B */}
        <div className="w-full border-t border-slate-200/80 dark:border-slate-800 mb-16 lg:mb-20" />

        {/* ============================================================== */}
        {/* PART B: SERVICE LEVELS & TERMS (Editorial Text Section)        */}
        {/* ============================================================== */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
            >
              <ShieldCheck size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
              <span>SERVICE LEVELS &amp; TERMS</span>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Defined During Onboarding
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              Coverage hours, reporting priorities, service levels, and commercial terms should be defined during onboarding.
            </motion.p>
          </div>

          {/* Four Onboarding Alignment Pillars (Clean Editorial Flow, NO Pricing Cards!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {ONBOARDING_PILLARS.map((pillar, idx) => {
              const PillarIcon = pillar.icon;

              return (
                <motion.div
                  key={pillar.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#08121a]/80 backdrop-blur-sm shadow-xs flex items-start gap-4 group"
                >
                  <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
                    <PillarIcon size={20} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CriticalFindingsTermsSection;
