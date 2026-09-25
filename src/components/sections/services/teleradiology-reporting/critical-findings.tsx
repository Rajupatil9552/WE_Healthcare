"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  UserCheck,
  WarningCircle,
  PhoneCall,
  UsersThree,
  ClipboardText,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// Internal verification tracking:
// [VERIFY: exact communication and documentation protocol]
// Must not appear on public UI.

interface EscalationStep {
  step: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "duotone" }>;
  activationDelay: number;
  connectorDelay: number;
  isSpecial?: boolean;
}

const ESCALATION_STEPS: EscalationStep[] = [
  {
    step: "01",
    title: "Radiologist",
    description: "Identifies urgent, unexpected, or critical pathology during study interpretation.",
    tag: "Diagnostic Detection",
    icon: UserCheck,
    activationDelay: 0.1,
    connectorDelay: 0.45,
  },
  {
    step: "02",
    title: "Critical Finding",
    description: "Study immediately classified for priority clinical notification under protocol criteria.",
    tag: "Priority Classification",
    icon: WarningCircle,
    activationDelay: 0.8,
    connectorDelay: 1.15,
    isSpecial: true,
  },
  {
    step: "03",
    title: "Clinical Escalation Process",
    description: "Direct telephonic outreach initiated through defined facility escalation pathways.",
    tag: "Direct Telephonic Pathway",
    icon: PhoneCall,
    activationDelay: 1.5,
    connectorDelay: 1.85,
  },
  {
    step: "04",
    title: "Care Team",
    description: "Attending physician, emergency staff, or charge nurse confirms verbal receipt.",
    tag: "Closed-Loop Receipt",
    icon: UsersThree,
    activationDelay: 2.2,
    connectorDelay: 2.55,
  },
  {
    step: "05",
    title: "Documentation",
    description: "Recipient details, contact timestamp, and read-back acknowledgment permanently logged.",
    tag: "Permanent Audit Trail",
    icon: ClipboardText,
    activationDelay: 2.9,
    connectorDelay: 3.2,
  },
];

export function CriticalFindingsSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="critical-findings"
      className="relative overflow-hidden py-24 lg:py-32 bg-slate-50/80 dark:bg-[#040c14] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300"
    >
      {/* Background Soft Glow & Ambient Linework (Adaptive for Light and Dark) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_35%_60%,rgba(251,191,36,0.04),transparent_60%)] dark:bg-[radial-gradient(ellipse_40%_30%_at_35%_60%,rgba(251,191,36,0.06),transparent_60%)]" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-400/30 bg-sky-50 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-xs"
          >
            <ShieldCheck size={14} weight="bold" className="text-sky-500" />
            <span>CRITICAL FINDINGS COMMUNICATION</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Critical Findings Communication
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Critical findings should be communicated through the agreed clinical escalation process and documented according to the client&apos;s protocol.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP: CONTINUOUS CLINICAL PIPELINE (No Box Cards!)          */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Continuous Glowing Signal Pathway */}
          <div className="relative pt-6 pb-4">
            {/* The 5 Stations Grid */}
            <div className="grid grid-cols-5 gap-6 xl:gap-8 relative z-10">
              {ESCALATION_STEPS.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === ESCALATION_STEPS.length - 1;

                return (
                  <div key={item.step} className="relative flex flex-col items-center text-center group">
                    {/* Node Beacon (Circular Telemetry Station) */}
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 0.88,
                            }
                      }
                      whileInView={
                        shouldReduceMotion
                          ? {}
                          : {
                              opacity: 1,
                              scale: 1,
                            }
                      }
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.45,
                        delay: shouldReduceMotion ? 0 : item.activationDelay,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="relative z-20"
                    >
                      <div
                        className={cn(
                          "size-18 xl:size-20 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md relative",
                          item.isSpecial
                            ? "bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-400/80 shadow-md shadow-amber-500/15 dark:shadow-[0_0_25px_rgba(251,191,36,0.35)] text-amber-600 dark:text-amber-300 group-hover:scale-105"
                            : "bg-white dark:bg-[#06141f] border-2 border-sky-400/80 dark:border-sky-400/60 shadow-md shadow-sky-500/10 dark:shadow-[0_0_20px_rgba(14,165,233,0.25)] text-sky-600 dark:text-sky-400 group-hover:border-sky-500 dark:group-hover:border-sky-300 group-hover:scale-105"
                        )}
                      >
                        {/* Soft attention glow for Critical Finding node */}
                        {item.isSpecial && !shouldReduceMotion && (
                          <motion.div
                            animate={{
                              scale: [1, 1.15, 1],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-2xl bg-amber-400/25 blur-md pointer-events-none"
                          />
                        )}

                        <Icon size={28} weight="bold" />

                        {/* Step Pill Anchor at top of node */}
                        <span
                          className={cn(
                            "absolute -top-2.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold border uppercase tracking-wider",
                            item.isSpecial
                              ? "bg-amber-400 text-slate-950 border-amber-300 shadow-xs"
                              : "bg-sky-50 dark:bg-[#081d2c] text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40 shadow-xs"
                          )}
                        >
                          {item.step}
                        </span>
                      </div>
                    </motion.div>

                    {/* Animated Connector Segment to Next Station */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="absolute top-9 xl:top-10 left-[60%] w-[80%] h-[2px] bg-slate-200 dark:bg-slate-800 z-10 overflow-hidden"
                      >
                        <motion.div
                          initial={shouldReduceMotion ? { width: "100%" } : { width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: shouldReduceMotion ? 0 : item.connectorDelay,
                            ease: "easeInOut",
                          }}
                          className={cn(
                            "h-full",
                            item.isSpecial
                              ? "bg-gradient-to-r from-amber-500 via-amber-400 to-sky-500 dark:from-amber-400 dark:via-amber-300 dark:to-sky-400"
                              : "bg-gradient-to-r from-sky-500 to-sky-400 dark:from-sky-400 dark:to-sky-300"
                          )}
                        />
                      </div>
                    )}

                    {/* Open Typographic Narrative (Zero Box Enclosure) */}
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: shouldReduceMotion ? 0 : item.activationDelay + 0.15,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="mt-6 flex flex-col items-center max-w-[210px]"
                    >
                      {/* Sub-tag badge */}
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider mb-1.5",
                          item.isSpecial
                            ? "text-amber-600 dark:text-amber-300"
                            : "text-sky-600 dark:text-sky-400"
                        )}
                      >
                        {item.tag}
                      </span>

                      {/* Title */}
                      <h3
                        className={cn(
                          "text-base font-extrabold tracking-tight leading-snug transition-colors",
                          item.isSpecial
                            ? "text-amber-800 dark:text-amber-200"
                            : "text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300"
                        )}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET: VERTICAL TELEMETRY STREAM (No Box Cards!)     */}
        {/* ============================================================== */}
        <div className="lg:hidden relative max-w-md mx-auto pl-6 sm:pl-8">
          {/* Continuous Left Vertical Glowing Track */}
          <div className="absolute left-[39px] sm:left-[47px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={shouldReduceMotion ? { height: "100%" } : { height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-sky-500 via-amber-500 to-sky-500 dark:from-sky-400 dark:via-amber-400 dark:to-sky-400"
            />
          </div>

          <div className="space-y-10 relative">
            {ESCALATION_STEPS.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="relative flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Circular Node Beacon */}
                  <div
                    className={cn(
                      "size-14 sm:size-16 rounded-2xl shrink-0 flex items-center justify-center backdrop-blur-md relative z-10",
                      item.isSpecial
                        ? "bg-amber-50/90 dark:bg-amber-950/50 border-2 border-amber-400 shadow-md shadow-amber-500/15 dark:shadow-[0_0_20px_rgba(251,191,36,0.3)] text-amber-600 dark:text-amber-300"
                        : "bg-white dark:bg-[#06141f] border-2 border-sky-400/80 dark:border-sky-400/70 shadow-md shadow-sky-500/10 dark:shadow-[0_0_15px_rgba(14,165,233,0.2)] text-sky-600 dark:text-sky-400"
                    )}
                  >
                    <Icon size={24} weight="bold" />
                    <span
                      className={cn(
                        "absolute -top-2 px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold border",
                        item.isSpecial
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-xs"
                          : "bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40 shadow-xs"
                      )}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Open Typographic Narrative */}
                  <div className="pt-0.5">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider block",
                        item.isSpecial ? "text-amber-600 dark:text-amber-300" : "text-sky-600 dark:text-sky-400"
                      )}
                    >
                      {item.tag}
                    </span>
                    <h3
                      className={cn(
                        "text-base font-bold tracking-tight leading-snug mt-0.5",
                        item.isSpecial ? "text-amber-800 dark:text-amber-200" : "text-slate-900 dark:text-white"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
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

export default CriticalFindingsSection;
