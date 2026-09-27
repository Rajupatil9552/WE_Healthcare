"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { COVERAGE_MODEL as CONTENT } from "@/content/about";

/** Closing full-bleed band on a dark photo (both themes): centered heading, factors, CTA. */
export function CoverageModel() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-section text-white lg:py-section-lg">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={CONTENT.image.src} alt={CONTENT.image.alt} fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(14_165_233/0.18),transparent_60%)]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">{CONTENT.eyebrow}</p>
          <RevealHeading className="mx-auto mt-4 max-w-[18ch] text-h2 font-semibold text-balance text-white">
            {CONTENT.heading}
          </RevealHeading>
          <p className="mt-6 text-lead text-slate-300">{CONTENT.body}</p>
        </div>

        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {CONTENT.factors.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: MOTION.easeOut }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-sm sm:text-base"
            >
              <CheckCircle size={18} weight="duotone" aria-hidden="true" className="shrink-0 text-sky-300" />
              {f}
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link href={CONTENT.cta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
            <span>{CONTENT.cta.label}</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default CoverageModel;
