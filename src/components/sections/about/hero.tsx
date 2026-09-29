"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION, heroFadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ABOUT_HERO as CONTENT, WHAT_WE_DO } from "@/content/about";

/** CSS-driven entrance (no JS wait); see heroFadeIn. */
const fadeIn = heroFadeIn;

/**
 * Editorial hero: headline and intro split across the top, then a wide
 * photographic panel with floating service and reach cards. Theme-aware.
 */
export function AboutHero() {
  return (
    <section className="relative isolate overflow-clip bg-background pt-36 text-foreground lg:pt-44">
      {/* Dot grid + glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[70%] opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_30%_20%,black_15%,transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 size-[620px] rounded-full bg-primary/10 blur-[120px]" />

      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p {...fadeIn(0)} className="eyebrow">
              {CONTENT.eyebrow}
            </motion.p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 max-w-[20ch] text-display-sm font-semibold text-balance sm:text-display">
              A Dependable Extension of Your Radiology Team.{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
                Built Around You.
              </span>
            </motion.h1>
          </div>

          <div className="lg:col-span-5 lg:pb-3">
            <motion.p {...fadeIn(0.12)} className="max-w-[48ch] text-lead text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.2)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={CONTENT.secondaryCta.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}>
                {CONTENT.secondaryCta.label}
                <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Photographic panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: MOTION.easeOut }}
          className="relative mt-14 overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-border lg:mt-20"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: MOTION.easeOut }}
            className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            <Image
              src={CONTENT.image.src}
              alt={CONTENT.image.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-[60%_50%]"
            />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Reach pill */}
          <motion.div
            {...fadeIn(0.7)}
            className="absolute right-4 top-4 flex items-center gap-2.5 rounded-full bg-slate-950/60 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md sm:right-6 sm:top-6 sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-300 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-sky-300" />
            </span>
            United States &amp; International
          </motion.div>

          {/* Services card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: MOTION.easeOut }}
            className="absolute inset-x-4 bottom-4 rounded-xl bg-slate-950/55 p-2 text-white ring-1 ring-white/15 backdrop-blur-md sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:left-8 lg:bottom-8 lg:w-[26rem]"
          >
            <p className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sky-300">Teleradiology Services</p>
            <ul className="divide-y divide-white/10">
              {WHAT_WE_DO.services.slice(0, 4).map((s, i) => {
                const inner = (
                  <>
                    <span className="font-mono text-xs tabular-nums text-slate-400">0{i + 1}</span>
                    <span className="flex-1 text-sm font-semibold sm:text-base">{s.title}</span>
                    {s.href && <ArrowUpRight size={16} aria-hidden="true" className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </>
                );
                const rowClass = "group flex items-center gap-4 rounded-lg px-3 py-3";
                return (
                  <li key={s.id}>
                    {s.href ? (
                      <Link href={s.href} className={cn(rowClass, "transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300")}>
                        {inner}
                      </Link>
                    ) : (
                      <div className={rowClass}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AboutHero;
