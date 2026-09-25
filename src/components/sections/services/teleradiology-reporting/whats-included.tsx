"use client";

import { motion } from "motion/react";
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
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";

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
  return (
    <section id="whats-included" className="py-section lg:py-section-lg bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <RevealHeading className="text-h2 font-semibold text-foreground text-balance">
              What&apos;s Included
            </RevealHeading>
            <p className="mt-5 text-base text-foreground-muted leading-relaxed">
              Depending on the engagement, reporting support may include:
            </p>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
                Service Scope Guarantees
              </p>
              <ul className="mt-4 space-y-5">
                {ENGAGEMENT_ASSURANCES.map(({ title, detail, icon: Icon }) => (
                  <li key={title} className="flex gap-3">
                    <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="mt-0.5 text-sm text-foreground-muted">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Spec sheet: index | capability | scope, on hairline rows */}
          <ol className="lg:col-span-8 border-t border-border-strong">
            {INCLUDED_CAPABILITIES.map((item, idx) => (
              <motion.li
                key={item.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: MOTION.easeOut }}
                className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 gap-y-2 py-6 border-b border-border"
              >
                <span className="pt-0.5 font-mono text-sm text-foreground-subtle tabular-nums">{item.number}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                </div>
                <span className="col-start-2 sm:col-start-3 sm:pt-1 font-mono text-xs text-primary sm:text-right">
                  {item.scopeTag}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default WhatsIncludedSection;
