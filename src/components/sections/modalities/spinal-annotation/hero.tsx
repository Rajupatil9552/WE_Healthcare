"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { SPINAL_HERO_CONTENT as CONTENT, SPINE_IMAGES } from "@/content/spinal-annotation";
import { AnnotatedSpine } from "./annotated-spine";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const IMAGE = SPINE_IMAGES.lumbarMri;
const STEP_MS = 420;

/**
 * Spinal annotation hero: a sagittal lumbar MRI labelled level by level
 * (disc lines first, then L2...S1), with the label set building beside it.
 * Plays once; reduced motion shows the finished annotation.
 */
export function SpinalAnnotationHero() {
  const reduce = usePrefersReducedMotion();
  const total = IMAGE.levels.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce || count >= total) return;
    const timer = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 900 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [count, reduce, total]);

  const shown = reduce ? total : count;
  const done = shown >= total;

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
            <motion.div {...fadeIn(0.22)} className="mt-9">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: MOTION.easeOut }}
            className="lg:col-span-6"
          >
            <div className="mx-auto flex w-full max-w-[34rem] overflow-hidden rounded-xl bg-slate-950 shadow-xl lg:mr-0">
              <AnnotatedSpine image={IMAGE} shown={shown} discs priority sizes="(max-width: 1024px) 65vw, 22rem" className="w-[64%] shrink-0" />

              {/* Label set */}
              <div className="flex flex-1 flex-col p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">Sagittal · Lumbar</p>
                <p className="mt-3 text-sm font-semibold text-white">Levels</p>
                <ol className="mt-2 space-y-1.5">
                  {IMAGE.levels.map((l, i) => (
                    <li
                      key={l.label}
                      className={cn(
                        "flex items-center justify-between rounded-sm px-2 py-1 font-mono text-xs transition-colors duration-300",
                        i < shown ? "bg-sky-300/15 text-sky-100" : "bg-white/5 text-white/30"
                      )}
                    >
                      {l.label}
                      <span aria-hidden="true" className={cn("size-1.5 rounded-full", i < shown ? "bg-sky-300" : "bg-white/20")} />
                    </li>
                  ))}
                </ol>
                <p className={cn("mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors", done ? "text-emerald-300" : "text-white/40")}>
                  {done ? "Annotation set complete" : "Annotating…"}
                </p>
              </div>
            </div>
            <p className="mx-auto mt-3 max-w-[34rem] text-[13px] text-foreground-subtle lg:mr-0">Illustrative, non-PHI.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default SpinalAnnotationHero;
