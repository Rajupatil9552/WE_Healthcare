"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const COVERAGE_OCCASIONS = [
  "OVERNIGHT",
  "WEEKEND",
  "HOLIDAY",
  "EMERGENCY",
  "LEAVE COVERAGE",
  "CHANGING VOLUME",
];

export function CoverageNeedsSection() {
  return (
    <section id="coverage-needs" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <RevealHeading className="text-h2 font-semibold text-foreground text-balance">
              Coverage When Your Team Needs It
            </RevealHeading>
            <p className="mt-6 text-lead text-foreground-muted max-w-[48ch]">
              Imaging does not stop when regular business hours end. Overnight studies, weekend volume, holidays, leave coverage, and emergency demand can create gaps in reporting capacity.
            </p>
            <p className="mt-8 border-l-2 border-primary/40 pl-4 text-sm text-foreground-muted leading-relaxed max-w-[52ch]">
              Adaptive clinical support designed to integrate with your local PACS and worklist, providing board-certified interpretations without shifting burdens to on-call providers.
            </p>
          </div>

          <Figure
            className="lg:col-span-6"
            src="/images/overnight-weekend-coverage/night-radiology-reading-room.jpg"
            alt="Modern hospital radiology department and diagnostic reading room with dual-screen PACS workstations glowing softly at night"
            aspect="aspect-[16/11]"
            caption="Nocturnal Diagnostic Reading Suite — Board-certified radiologists interpreting high-acuity CT, MRI, and X-ray studies through the night."
          />
        </div>

        {/* The six coverage occasions as a large-type grid */}
        <ul className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {COVERAGE_OCCASIONS.map((item, idx) => (
            <motion.li
              key={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className={cn(
                "flex items-baseline gap-4 py-6 lg:py-8 border-b border-border sm:px-6",
                idx % 2 === 1 && "sm:border-l lg:border-l-0",
                idx % 3 !== 0 && "lg:border-l",
                "sm:first:pl-0 lg:[&:nth-child(3n+1)]:pl-0"
              )}
            >
              <span className="font-mono text-xs text-foreground-subtle tabular-nums">0{idx + 1}</span>
              <span className="block overflow-hidden">
                {/* Observed on the <li>: the word itself starts clipped by its mask, so it can't be observed directly */}
                <motion.span
                  variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                  transition={{ duration: 0.8, delay: idx * 0.06, ease: MOTION.easeOut }}
                  className="block text-2xl sm:text-3xl font-semibold tracking-tight text-foreground capitalize"
                >
                  {item.toLowerCase()}
                </motion.span>
              </span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default CoverageNeedsSection;
