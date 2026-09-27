"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { MOTION } from "@/lib/motion";
import { OUR_COMMITMENT as CONTENT } from "@/content/about";

/** Mission-style statement: large centered type and generous whitespace, no imagery. */
export function OurCommitment() {
  return (
    <section id="our-commitment" className="scroll-mt-24 bg-background py-section lg:py-section-lg">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">{CONTENT.eyebrow}</p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: MOTION.easeOut }}
            className="mt-8 text-h2 font-semibold leading-tight tracking-tight text-balance text-foreground lg:text-[3.25rem]"
          >
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
              {CONTENT.lead}
            </span>
            {CONTENT.rest}
          </motion.p>
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

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {CONTENT.pillars.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: MOTION.easeOut }}
              className="flex items-center justify-center gap-3 px-4 py-5 text-center text-sm font-semibold text-foreground sm:text-base"
            >
              <span className="font-mono text-xs tabular-nums text-primary">0{i + 1}</span>
              {p}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default OurCommitment;
