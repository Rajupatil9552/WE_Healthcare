"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, UserFocus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { Radiograph } from "@/components/sections/modalities/x-ray/radiograph";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { MRI_HERO_CONTENT as CONTENT, MRI_IMAGES } from "@/content/mri";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const FILM = {
  src: MRI_IMAGES.sagittalHead.src,
  alt: MRI_IMAGES.sagittalHead.alt,
  ratio: MRI_IMAGES.sagittalHead.ratio,
  view: "MRI · Sagittal",
  points: CONTENT.points,
};

/*
 * Composition geometry (sm+), in % of a 10:9 box. The frame's brain level
 * (26% down the image) sits at ~19.6% of the box; the axial slice tile and
 * the localizer line are centred on it.
 */
const SLICE_Y = "19.6%";
const LAYER_TOP = ["0%", "33%", "61%"];

/**
 * MRI hero: a central sagittal study with anatomy labels, an axial slice
 * referenced by a localizer line, spine / MSK / body layers around it, and a
 * connection down to subspecialty interpretation. One entrance, no loop.
 */
export function MriHero() {
  const reduce = usePrefersReducedMotion();
  const [labelsOn, setLabelsOn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLabelsOn(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display font-semibold text-balance text-foreground">
              {CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.15)} className="mt-7 max-w-[40ch] text-lead font-medium text-primary-strong">
              {CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.22)} className="mt-4 max-w-[56ch] text-base leading-relaxed text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.3)} className="mt-9">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[40rem] sm:aspect-[10/9]">
              {/* Central sagittal study */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: MOTION.easeOut }}
                className="relative overflow-hidden rounded-lg bg-black shadow-xl sm:absolute sm:left-[22%] sm:top-[2%] sm:w-[56%]"
                style={{ aspectRatio: FILM.ratio }}
              >
                <Radiograph film={FILM} priority annotate={reduce || labelsOn} compactLabels sizes="(max-width: 640px) 90vw, 22rem" />
              </motion.div>

              {/* Axial slice layer + localizer line through the brain */}
              <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: MOTION.easeOut }}
                  className="absolute left-[20%] h-px w-[58%] origin-left bg-sky-300 shadow-[0_0_10px_rgb(125_211_252/0.8)]"
                  style={{ top: SLICE_Y }}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1, ease: MOTION.easeOut }}
                  className="absolute left-0 w-[19%] -translate-y-1/2"
                  style={{ top: SLICE_Y }}
                >
                  <Layer label="Brain · Axial" image={MRI_IMAGES.brain} />
                </motion.div>

                {/* Spine / MSK / Body layers */}
                {CONTENT.layers.map((layer, i) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + i * 0.12, ease: MOTION.easeOut }}
                    className="absolute right-0 w-[19%]"
                    style={{ top: LAYER_TOP[i] }}
                  >
                    <Layer label={`${layer.label} · ${layer.image.plane}`} image={layer.image} />
                  </motion.div>
                ))}

                {/* Study → interpretation connector */}
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 1.9, ease: MOTION.easeOut }}
                  className="absolute left-1/2 top-[71%] h-[13%] w-px origin-top border-l border-dashed border-primary/70"
                />
              </div>

              {/* Subspecialty interpretation */}
              <div className="mt-5 flex justify-center sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.1, ease: MOTION.easeOut }}
                  className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-card py-2 pl-2 pr-5 shadow-md"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-primary">
                    <UserFocus size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{CONTENT.interpretation.label}</span>
                    <span className="block text-xs text-foreground-muted">{CONTENT.interpretation.detail}</span>
                  </span>
                </motion.div>
              </div>

              {/* Mobile: layers as a row */}
              <ul aria-hidden="true" className="mt-5 grid grid-cols-4 gap-2 sm:hidden">
                {[{ id: "brain", label: "Brain", image: MRI_IMAGES.brain }, ...CONTENT.layers].map((layer) => (
                  <li key={layer.id}>
                    <div className="relative aspect-square overflow-hidden rounded-md bg-black">
                      <Image src={layer.image.src} alt="" fill sizes="25vw" className="object-cover" />
                    </div>
                    <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">{layer.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Layer({ label, image }: { label: string; image: { src: string; ratio: number } }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-md bg-black shadow-lg ring-1 ring-black/10" style={{ aspectRatio: image.ratio }}>
        <Image src={image.src} alt="" fill sizes="8rem" className="object-cover" />
      </div>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">{label}</p>
    </div>
  );
}

export default MriHero;
