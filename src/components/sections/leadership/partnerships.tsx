"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { PARTNERSHIPS as CONTENT } from "@/content/leadership";

/** Closing statement: centered type with generous whitespace. */
export function Partnerships() {
  return (
    <section className="relative overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">{CONTENT.eyebrow}</p>
          <RevealHeading className="mx-auto mt-4 max-w-[18ch] text-h2 font-semibold text-balance text-foreground lg:text-[3.25rem] lg:leading-tight">
            {CONTENT.heading}
          </RevealHeading>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: MOTION.easeOut }}
            className="mx-auto mt-8 max-w-[60ch] text-lead text-foreground-muted"
          >
            {CONTENT.body}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

export default Partnerships;
