"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Brain, SlidersHorizontal } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { STROKE_HERO_CONTENT } from "@/content/stroke-imaging-protocol";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function StrokeHero() {
  return (
    <section className="relative bg-background pt-36 pb-section lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">{STROKE_HERO_CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display-sm font-semibold text-foreground text-balance">
              {STROKE_HERO_CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-6 text-lead font-medium text-primary-strong">
              {STROKE_HERO_CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 text-base text-foreground-muted leading-relaxed">
              {STROKE_HERO_CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.22)} className="mt-8">
              <Link href={STROKE_HERO_CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{STROKE_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.ul {...fadeIn(0.28)} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-foreground">
              <li className="inline-flex items-center gap-2">
                <Brain size={18} aria-hidden="true" className="text-primary" /> Diagnostic Neuroimaging
              </li>
              <li className="inline-flex items-center gap-2">
                <SlidersHorizontal size={18} aria-hidden="true" className="text-primary" /> Facility-Specific Workflow
              </li>
            </motion.ul>
          </div>

          <figure className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-950">
              <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: MOTION.easeOut }} className="absolute inset-0">
                <Image
                  src={STROKE_HERO_CONTENT.image}
                  alt={STROKE_HERO_CONTENT.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Protocol pathway rail */}
            <ol className="relative mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: MOTION.easeOut }}
                className="absolute inset-x-0 top-0 hidden sm:block h-px origin-left bg-primary"
              />
              {STROKE_HERO_CONTENT.protocolStages.map((stage, idx) => (
                <motion.li
                  key={stage.id}
                  {...fadeIn(0.55 + idx * 0.1)}
                  className="border-t border-border sm:border-transparent pt-4"
                >
                  <span className="font-mono text-xs text-primary tabular-nums">{stage.step}</span>
                  <p className="mt-1 text-sm font-semibold text-foreground">{stage.label}</p>
                  <p className="mt-1 text-[13px] text-foreground-muted leading-snug">{stage.description}</p>
                </motion.li>
              ))}
            </ol>

            <figcaption className="mt-6 text-[13px] text-foreground-subtle">
              Axial CT Brain &amp; CTA Head/Neck · Time-Sensitive Protocol Review · Illustrative, non-PHI
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

export default StrokeHero;
