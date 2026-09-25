"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  ClockCounterClockwise,
  Article,
  PhoneCall,
  ShieldCheck,
  HardDrives,
  ChartBar,
  CheckCircle,
  SlidersHorizontal,
  LockKey,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

interface IncludedCapability {
  number: string;
  title: string;
  description: string;
  scopeTag: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "duotone" }>;
  /** Internal verification metadata; must NOT appear on public UI */
  verificationNote: string;
}

const INCLUDED_CAPABILITIES: IncludedCapability[] = [
  {
    number: "01",
    title: "Reporting",
    description: "Final or preliminary reporting",
    scopeTag: "Core Reporting",
    icon: FileText,
    verificationNote: "[VERIFY: final or preliminary reporting]",
  },
  {
    number: "02",
    title: "Prior Studies",
    description: "Access to priors",
    scopeTag: "Clinical Context",
    icon: ClockCounterClockwise,
    verificationNote: "[VERIFY: access to priors]",
  },
  {
    number: "03",
    title: "Structured Reporting",
    description: "Structured reporting",
    scopeTag: "ACR Templates",
    icon: Article,
    verificationNote: "[VERIFY: structured reporting]",
  },
  {
    number: "04",
    title: "Critical Findings Communication",
    description: "Direct and rapid communication for urgent findings",
    scopeTag: "Direct Escalation",
    icon: PhoneCall,
    verificationNote: "[VERIFY: critical findings communication escalation protocol]",
  },
  {
    number: "05",
    title: "Quality Control",
    description: "Quality control",
    scopeTag: "Peer Review QA",
    icon: ShieldCheck,
    verificationNote: "[VERIFY: quality control]",
  },
  {
    number: "06",
    title: "Connectivity",
    description: "PACS/RIS connectivity",
    scopeTag: "Encrypted DICOM / HL7",
    icon: HardDrives,
    verificationNote: "[VERIFY: PACS/RIS connectivity]",
  },
  {
    number: "07",
    title: "Reporting Visibility",
    description: "Client performance reporting",
    scopeTag: "Operational Metrics",
    icon: ChartBar,
    verificationNote: "[VERIFY: client performance reporting]",
  },
];

const ENGAGEMENT_ASSURANCES = [
  {
    title: "Configurable Scope",
    detail: "Aligned to routine, overnight, weekend, or surge volumes",
    icon: SlidersHorizontal,
  },
  {
    title: "Hospital Bylaw Alignment",
    detail: "Credentialed to your facility's medical staff bylaws and SLAs",
    icon: CheckCircle,
  },
  {
    title: "Zero-Disruption Integration",
    detail: "Connects to your local PACS/RIS without altering technologist workflow",
    icon: LockKey,
  },
];

export function WhatsIncludedSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="whats-included"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#070d11] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Editorial Context & Engagement Scope Anchor (~5 cols, sticky on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
            >
              <span>WHAT&apos;S INCLUDED</span>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              What&apos;s Included
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              Depending on the engagement, reporting support may include:
            </motion.p>

            {/* Scope of Engagement Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.24 }}
              className="mt-8 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#0c141a]/90 backdrop-blur-sm shadow-sm"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Service Scope Guarantees
              </div>

              <div className="space-y-4">
                {ENGAGEMENT_ASSURANCES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="size-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                        <Icon size={16} weight="bold" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Executive Service Scope Ledger (~7 cols, sleek horizontal rows) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {INCLUDED_CAPABILITIES.map((item, idx) => {
              const ItemIcon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : 0.05 + idx * 0.09, // 80-120ms stagger (90ms)
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0e161c] shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700/80 hover:-translate-y-[2px] transition-all duration-200"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Index Number */}
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider shrink-0 w-5">
                      {item.number}
                    </span>

                    {/* Subtle Blue Icon Container */}
                    <div className="size-11 rounded-xl bg-sky-50 dark:bg-sky-950/70 border border-sky-100 dark:border-sky-900/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 group-hover:scale-[1.08] transition-transform duration-200 ease-out">
                      <ItemIcon size={22} weight="bold" />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Scope Tag Pill */}
                  <div className="flex items-center gap-1.5 self-start sm:self-center pl-9 sm:pl-0 shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                      <CheckCircle size={14} weight="bold" className="text-sky-600 dark:text-sky-400" />
                      <span>{item.scopeTag}</span>
                    </span>
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

export default WhatsIncludedSection;
