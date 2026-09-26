"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { US_SUBSPECIALTY_CONTENT as CONTENT } from "@/content/ultrasound";
import { SectorViewer } from "./sector-viewer";

/**
 * Subspecialty Expertise as a row of sector thumbnails, with How It Works
 * kept deliberately compact underneath: the workflow is four steps and is
 * already shown in depth on the other modality pages.
 */
export function SubspecialtyWorkflowSection() {
  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
          {CONTENT.items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: MOTION.easeOut }}
            >
              <SectorViewer image={item.image} sweep={false} caption={false} labels={false} tone={item.id === "emergency" ? "urgent" : "default"} />
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-xs tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold tracking-tight text-foreground">{item.label}</span>
              </p>
            </motion.li>
          ))}
        </ul>

        {/* How It Works: compact strip */}
        <div className="mt-16 rounded-xl border border-border bg-surface p-6 sm:p-8 lg:mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{CONTENT.workflowHeading}</h2>
          <ol className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 1.4, ease: MOTION.easeOut }}
              className="absolute left-[7px] right-[25%] top-[7px] hidden h-px origin-left bg-primary md:block"
            />
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 1.4, ease: MOTION.easeOut }}
              className="absolute bottom-12 left-[7px] top-[7px] w-px origin-top bg-primary md:hidden"
            />
            {CONTENT.steps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.3 }}
                className="relative pl-8 md:pl-0 md:pr-4"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 size-[15px] rounded-full border-2 border-primary bg-surface" />
                <span className="block font-mono text-xs tabular-nums text-primary md:mt-7">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-base font-semibold leading-snug text-foreground">{step.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default SubspecialtyWorkflowSection;
