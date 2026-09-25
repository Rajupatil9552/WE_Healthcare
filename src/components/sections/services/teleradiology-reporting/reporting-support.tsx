"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const INDICATORS = [
  { title: "Coverage Gaps", description: "Scheduled staff leave, vacancies, and unexpected shortfalls" },
  { title: "Changing Volumes", description: "Sudden volume surges, backlogs, and seasonal demand" },
  { title: "After-Hours Demand", description: "Emergency overnight, weekend, and holiday interpretations" },
];

export function ReportingSupportSection() {
  return (
    <section id="reporting-support" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Reporting Support</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              The Reporting Support Your Operation Needs
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">
            Radiology operations do not always have a predictable workload. Coverage gaps, changing imaging volumes, and after-hours demand can create pressure on in-house teams. WE Healthcare provides additional reporting capacity around the way your organization already operates.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ol className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
            {INDICATORS.map((indicator, idx) => (
              <li key={indicator.title} className="relative pt-6">
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: MOTION.easeOut }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-foreground/25"
                />
                <span className="block font-mono text-sm text-primary tabular-nums">0{idx + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{indicator.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{indicator.description}</p>
              </li>
            ))}
          </ol>

          <Figure
            className="lg:col-span-5"
            src="/images/teleradiology-reporting/reporting-support-radiology-room.jpg"
            alt="Modern radiology department reading room equipped with diagnostic medical imaging workstations"
            aspect="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 40vw"
            caption="Adaptive Department Support — Scalable preliminary and final reading coverage matched to your operational schedule."
          />
        </div>
      </Container>
    </section>
  );
}

export default ReportingSupportSection;
