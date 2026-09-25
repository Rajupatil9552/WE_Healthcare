"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";
import { WHATS_INCLUDED_ITEMS } from "@/content/overflow-backlog-support";

export function WhatsIncludedChallengeSection() {
  return (
    <section id="whats-included" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Operational Scope</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              What&apos;s Included in Overflow Support
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">
            Comprehensive backlog interpretation protocols built to adapt directly to your facility&apos;s clinical workflow and volume fluctuations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Core Deliverables</p>
            <ol className="mt-4 border-t border-border-strong">
              {WHATS_INCLUDED_ITEMS.map((item, idx) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: MOTION.easeOut }}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-border"
                >
                  <span className="pt-1 font-mono text-sm text-foreground-subtle tabular-nums">0{idx + 1}</span>
                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 text-lg font-semibold text-foreground">
                      {item.title}
                      {item.verificationNote && (
                        <span className="font-mono text-xs font-normal text-primary">Configurable</span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-foreground-subtle">
              Full compliance with your facility&apos;s credentialing bylaws, dictation templates, and local RIS/PACS.
            </p>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Operational Framework</p>
            <Figure
              className="mt-4"
              src="/images/overflow-backlog-reporting/reporting-workflow.jpg"
              alt="Diagnostic radiologist interpreting overflow cases on hospital PACS workstation"
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              caption="Direct PACS Integration — Reports route into your dictation templates without dual entry."
            />
            <div className="mt-8 border-l-2 border-primary/40 pl-4">
              <p className="text-sm font-semibold text-foreground">Seamless Operational Fit</p>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                Overflow and backlog coverage supplements your on-site team during acute volume spikes without requiring system redesign or long-term FTE commitments.
              </p>
              <p className="mt-3 text-sm text-foreground">Subspecialty Radiologists · Zero Minimum Study Penalties</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhatsIncludedChallengeSection;
