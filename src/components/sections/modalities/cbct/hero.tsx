"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { CBCT_HERO_CONTENT as CONTENT, CBCT_VOLUME_SPRITE as SPRITE } from "@/content/cbct";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const FRAME_MS = 130;

/**
 * CBCT hero: the cone-beam volume turning in a cylindrical field of view
 * (the defining CBCT geometry), with dental / maxillofacial / ENT named on
 * the gantry ring. Rotates only while visible; reduced motion shows the
 * frontal frame.
 */
export function CbctHero() {
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
            <VolumeGantry />
          </div>
        </div>
      </Container>
    </section>
  );
}

function VolumeGantry() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(() => setFrame((f) => (f + 1) % SPRITE.count), FRAME_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const current = reduce ? 0 : frame;
  const col = current % SPRITE.columns;
  const row = Math.floor(current / SPRITE.columns);
  const angle = (current * 360) / SPRITE.count;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: MOTION.easeOut }}
      className="relative mx-auto aspect-square w-full max-w-[34rem] lg:mr-0"
    >
      {/* Gantry ring */}
      <div className="absolute inset-0 rounded-full border border-border-strong bg-surface" />
      <div className="absolute inset-[7%] rounded-full bg-slate-950 shadow-xl" />

      {/* Source (cone) + detector orbit the volume */}
      <div
        aria-hidden="true"
        className="absolute inset-[3%] transition-transform duration-150 ease-linear"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-12 -translate-x-1/2 rounded-sm bg-primary" />
        <span className="absolute bottom-0 left-1/2 h-2 w-32 -translate-x-1/2 rounded-sm bg-slate-400" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
          <path d="M50 3 L20 97 L80 97 Z" fill="rgb(56 189 248 / 0.07)" stroke="rgb(56 189 248 / 0.25)" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Volume */}
      <div
        role="img"
        aria-label={SPRITE.alt}
        className="absolute inset-[18%] rounded-full bg-no-repeat [mask-image:radial-gradient(circle,#000_58%,transparent_71%)]"
        style={{
          backgroundImage: `url(${SPRITE.src})`,
          backgroundSize: `${SPRITE.columns * 100}% ${SPRITE.rows * 100}%`,
          backgroundPosition: `${(col / (SPRITE.columns - 1)) * 100}% ${(row / (SPRITE.rows - 1)) * 100}%`,
        }}
      />

      {/* Areas on the ring */}
      <ul className="absolute inset-0" aria-label="CBCT imaging areas">
        {CONTENT.areas.map((area, i) => {
          const pos = ["left-[2%] top-[18%]", "right-[0%] top-[46%]", "left-[6%] bottom-[14%]"][i];
          return (
            <motion.li
              key={area}
              {...fadeIn(0.8 + i * 0.15)}
              className={cn("absolute rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md", pos)}
            >
              {area}
            </motion.li>
          );
        })}
      </ul>

      <p aria-hidden="true" className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
        CBCT · 3D · Illustrative
      </p>
    </motion.div>
  );
}

export default CbctHero;
