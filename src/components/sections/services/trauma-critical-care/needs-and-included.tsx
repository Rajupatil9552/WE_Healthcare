"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { OPERATIONAL_NEEDS_INCLUDED_CONTENT as CONTENT } from "@/content/trauma-critical-care";

const rowFade = (idx: number) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: idx * 0.04, ease: MOTION.easeOut },
});

export function NeedsAndIncludedSection() {
  const needs = CONTENT.needsSection.items;
  const included = CONTENT.includedSection.items;

  return (
    <section id="operational-needs-included" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">{CONTENT.heading}</RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">{CONTENT.supportingText}</p>
        </div>

        {/* Needs → capacity → support */}
        <ol className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-y border-border py-5">
          {CONTENT.conceptualConnector.map((item, idx) => (
            <li key={item.label} className="flex flex-1 items-center gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">{item.label}</p>
                <p className="text-sm text-foreground-muted">{item.sub}</p>
              </div>
              {idx < CONTENT.conceptualConnector.length - 1 && (
                <span aria-hidden="true" className="hidden sm:flex flex-1 items-center text-primary">
                  <span className="h-px flex-1 bg-primary/30" />
                  <ArrowRight size={12} weight="bold" className="-ml-1" />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="relative mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: MOTION.easeOut }}
            className="absolute inset-y-0 left-1/2 hidden lg:block w-px origin-top bg-border-strong"
          />

          <div className="lg:pr-12 xl:pr-16">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{CONTENT.needsSection.eyebrow}</h3>
              <span className="text-xs text-foreground-subtle">
                {String(needs.length).padStart(2, "0")} Operational Considerations
              </span>
            </div>
            <ul>
              {needs.map((item, idx) => (
                <motion.li key={item.id} {...rowFade(idx)} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 border-b border-border">
                  <span className="pt-0.5 font-mono text-sm text-foreground-subtle tabular-nums">{item.number}</span>
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-12 xl:pl-16">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{CONTENT.includedSection.eyebrow}</h3>
              <span className="text-xs text-foreground-subtle">
                {String(included.length).padStart(2, "0")} Integrated Capabilities
              </span>
            </div>
            <ul>
              {included.map((item, idx) => (
                <motion.li key={item.id} {...rowFade(idx)} className="flex items-start justify-between gap-4 py-5 border-b border-border">
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                  </div>
                  <span className="shrink-0 pt-1 font-mono text-xs text-primary">{item.badge}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-foreground-subtle">Tailored to facility bylaws &amp; clinical escalation pathways</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NeedsAndIncludedSection;
