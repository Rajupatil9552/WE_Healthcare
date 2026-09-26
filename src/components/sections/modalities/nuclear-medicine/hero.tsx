"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { NM_HERO_CONTENT as CONTENT, NM_IMAGES } from "@/content/nuclear-medicine";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const SWEEP_S = 3.2;
const PANES = [
  { id: "ant", label: "Anterior", image: NM_IMAGES.boneAnterior },
  { id: "post", label: "Posterior", image: NM_IMAGES.bonePosterior },
] as const;

/**
 * Nuclear medicine hero: a whole-body bone scan acquired the way a gamma
 * camera does it: the detector head travels head-to-toe and the anterior and
 * posterior images build up beneath it. Plays once; reduced motion shows the
 * finished acquisition.
 */
export function NuclearMedicineHero() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="relative overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 max-w-[16ch] text-display font-semibold text-balance text-foreground">
              {CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.12)} className="mt-7 max-w-[42ch] text-lead font-medium text-primary-strong">
              {CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.2)} className="mt-4 max-w-[58ch] text-base leading-relaxed text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.28)} className="mt-9">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: MOTION.easeOut }}
              className="mx-auto w-full max-w-[20rem] rounded-xl border border-border bg-surface p-4 shadow-xl lg:mr-0 xl:max-w-[21rem]"
            >
              <p className="px-1 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">Whole-body · Planar</p>

              <div className="relative grid grid-cols-2 gap-2">
                {PANES.map((pane) => (
                  <div key={pane.id} className="relative overflow-hidden rounded-md bg-white" style={{ aspectRatio: pane.image.ratio }}>
                    <motion.div
                      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      transition={{ duration: reduce ? 0 : SWEEP_S, delay: reduce ? 0 : 0.6, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <Image src={pane.image.src} alt={pane.image.alt} fill priority sizes="13rem" className="object-cover" />
                    </motion.div>
                  </div>
                ))}

                {/* Detector head travelling head-to-toe */}
                {!reduce && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ top: "0%", opacity: 1 }}
                    animate={{ top: "100%", opacity: [1, 1, 0] }}
                    transition={{ top: { duration: SWEEP_S, delay: 0.6, ease: "linear" }, opacity: { duration: SWEEP_S + 0.6, delay: 0.6, times: [0, 0.85, 1] } }}
                    className="pointer-events-none absolute -inset-x-2 -translate-y-1/2"
                  >
                    <div className="h-3 rounded-sm bg-slate-800 shadow-lg" />
                    <div className="mx-2 h-6 bg-gradient-to-b from-primary/25 to-transparent" />
                  </motion.div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {PANES.map((pane) => (
                  <p key={pane.id} className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                    {pane.label}
                  </p>
                ))}
              </div>
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">Illustrative · Non-PHI</p>
            </motion.figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NuclearMedicineHero;
