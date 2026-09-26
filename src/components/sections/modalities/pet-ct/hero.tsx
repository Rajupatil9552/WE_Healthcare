"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PET_HERO_CONTENT as CONTENT } from "@/content/pet-ct";
import { MipRotator } from "./mip-rotator";
import { FusionPanel } from "./fusion-panel";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

/**
 * PET-CT hero: a rotating whole-body MIP on a white reading panel (how
 * PET is first reviewed), with a fused coronal PET-CT panel layered over it.
 */
export function PetCtHero() {
  return (
    <section className="relative overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display font-semibold text-balance text-foreground">
              {CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.12)} className="mt-7 max-w-[40ch] text-lead font-medium text-primary-strong">
              {CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.2)} className="mt-4 max-w-[56ch] text-base leading-relaxed text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.28)} className="mt-9">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[30rem] pb-10 pr-10 sm:pb-12 sm:pr-24 lg:mr-0">
              {/* MIP reading panel */}
              <motion.figure
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: MOTION.easeOut }}
                className="rounded-lg border border-border bg-white p-5 shadow-xl sm:p-6"
              >
                <div className="border-b border-slate-200 pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-700">PET · Whole-body MIP</span>
                </div>
                <MipRotator className="mx-auto mt-4 w-[78%]" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Illustrative · Non-PHI</p>
              </motion.figure>

              {/* Fused coronal, layered over the corner */}
              <motion.figure
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: MOTION.easeOut }}
                className="absolute bottom-0 right-0 w-[34%] overflow-hidden rounded-lg border-4 border-background shadow-xl sm:w-[36%]"
              >
                <FusionPanel view="fused" sizes="12rem" className="w-full" />
                <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-2.5 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-orange-200">PET-CT · Fused</span>
                </div>
              </motion.figure>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PetCtHero;
