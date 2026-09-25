"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";

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
    title: "Shift summary",
    subtitle: "Consolidated operational reporting delivered prior to daytime team arrival.",
    verificationNote: "[VERIFY: Shift summary format]",
  },
];

export function WhatsIncludedSection() {
  return (
    <section id="team-extension" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow">Operational Extension</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              A Practical Extension of Your Existing Team
            </RevealHeading>
            <p className="mt-6 text-base text-foreground-muted leading-relaxed">
              Overnight and weekend support can supplement your in-house operation without requiring the organization to redesign its daytime workflow.
            </p>
            <p className="mt-6 border-l-2 border-primary/40 pl-4 text-sm text-foreground-muted leading-relaxed">
              <strong className="font-semibold text-foreground">Zero Daytime Disruption:</strong> Technologists maintain established scanning routines directly into PACS.
            </p>
            <Figure
              className="mt-10"
              src="/images/overnight-weekend-coverage/weekend-hospital-imaging.jpg"
              alt="Modern hospital diagnostic imaging department with MRI and CT scanners operating on weekend shift"
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <ol className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-border">
            {CHECKLIST_ITEMS.map((item, idx) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: MOTION.easeOut }}
                className="py-7 border-b border-border"
              >
                <span className="font-mono text-xs text-primary tabular-nums">0{idx + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                {item.subtitle && (
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{item.subtitle}</p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default WhatsIncludedSection;
