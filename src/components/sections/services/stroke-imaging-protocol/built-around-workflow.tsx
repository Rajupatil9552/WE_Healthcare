"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";
import { BUILT_AROUND_WORKFLOW_CONTENT as CONTENT } from "@/content/stroke-imaging-protocol";

export function BuiltAroundWorkflowSection() {
  return (
    <section className="relative overflow-clip py-section lg:py-section-lg bg-surface">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <RevealHeading className="text-h2 font-semibold text-foreground text-balance">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base text-foreground-muted leading-relaxed max-w-[60ch]">{CONTENT.body}</p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{CONTENT.tagline}</p>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed lg:ml-auto max-w-sm">
              Aligned with existing emergency pathways, stroke center guidelines, and hospital communication protocols.
            </p>
          </div>
        </div>

        {/* Three teams on one shared rule */}
        <ol className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: MOTION.easeOut }}
            className="absolute inset-x-0 top-0 hidden md:block h-px origin-left bg-primary"
          />
          {CONTENT.coordinationSteps.map((step, idx) => (
            <li key={step.id} className="relative border-t border-border md:border-transparent pt-8">
              {idx < CONTENT.coordinationSteps.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.35 + idx * 0.35 }}
                  className="absolute -right-5 -top-3 hidden md:flex size-6 items-center justify-center rounded-full border border-primary bg-surface text-primary"
                >
                  <ArrowRight size={12} weight="bold" />
                </motion.span>
              )}
              <span className="font-mono text-xs text-primary tabular-nums">{step.number}</span>
              <h3 className="mt-3 text-xl font-semibold text-foreground capitalize">{step.title.toLowerCase()}</h3>
              <p className="mt-1 text-sm font-medium text-primary-strong">{step.subtitle}</p>
              <p className="mt-3 text-sm text-foreground-muted leading-relaxed max-w-[36ch]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>

      <div className="mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8">
        <Figure
          src={CONTENT.image}
          alt={CONTENT.alt}
          aspect="aspect-[16/9] sm:aspect-[24/9] lg:aspect-[28/9]"
          sizes="100vw"
          parallax
          caption={`${CONTENT.caption} Clinical Care Coordination · Axial Brain CT & CTA Perfusion Review · Illustrative, non-PHI`}
          className="mx-auto max-w-[96rem]"
        />
      </div>
    </section>
  );
}

export default BuiltAroundWorkflowSection;
