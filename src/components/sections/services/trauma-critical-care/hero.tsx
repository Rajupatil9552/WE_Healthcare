"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Stack, ShieldCheck, PhoneCall } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { TRAUMA_HERO_CONTENT } from "@/content/trauma-critical-care";

const PILLARS = [
  { label: "Multi-Study Batch Ingestion", icon: Stack },
  { label: "Facility Protocol Aligned", icon: ShieldCheck },
  { label: "Trauma Team Communication", icon: PhoneCall },
];
const STACK_ROTATION = [-4, 2.5, -1.5, 3.5];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function TraumaHero() {
  const deckRef = useRef<HTMLDivElement>(null);

  // Signature: the four studies start stacked like films on a lightbox,
  // then fan out into the grid. Offsets are measured, so any breakpoint works.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tiles = gsap.utils.toArray<HTMLElement>(".js-film");
        if (tiles.length < 2) return;
        const origin = tiles[0].getBoundingClientRect();
        tiles.forEach((tile, i) => {
          const r = tile.getBoundingClientRect();
          gsap.from(tile, {
            x: origin.left - r.left,
            y: origin.top - r.top,
            rotation: STACK_ROTATION[i % STACK_ROTATION.length],
            duration: 1,
            delay: 0.45 + i * 0.06,
            ease: "expo.out",
          });
        });
      });
    },
    { scope: deckRef },
  );

  return (
    <section className="relative bg-background pt-36 pb-section lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">{TRAUMA_HERO_CONTENT.eyebrow}</p>
            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display-sm font-semibold text-foreground text-balance">
              {TRAUMA_HERO_CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-6 text-lead font-medium text-primary-strong">
              {TRAUMA_HERO_CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 text-base text-foreground-muted leading-relaxed">
              {TRAUMA_HERO_CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.22)} className="mt-8">
              <Link href={TRAUMA_HERO_CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{TRAUMA_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.ul {...fadeIn(0.28)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-foreground">
              {PILLARS.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" className="text-primary" /> {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-950">
              <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: MOTION.easeOut }} className="absolute inset-0">
                <Image
                  src={TRAUMA_HERO_CONTENT.image}
                  alt={TRAUMA_HERO_CONTENT.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Concurrent studies deck, overlapping the photo */}
            <div ref={deckRef} className="relative z-10 -mt-10 mx-3 sm:mx-6 rounded-lg border border-border bg-card p-4 sm:p-5 shadow-md">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">Concurrent Trauma Studies</p>
                <p className="text-xs text-foreground-subtle">Coordinated Batch Workup</p>
              </div>
              <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TRAUMA_HERO_CONTENT.multiStudies.map((study) => (
                  <li
                    key={study.id}
                    className={cn(
                      "js-film rounded-md border p-3 bg-card",
                      study.status === "Priority" ? "border-urgent/30" : "border-border"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-foreground-subtle">{study.modality}</span>
                      <span className={cn("text-xs font-semibold", study.status === "Priority" ? "text-urgent" : "text-foreground-subtle")}>
                        {study.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{study.name}</p>
                    <p className="text-xs text-foreground-muted truncate">{study.region}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-3 text-xs text-foreground-subtle">
                Grouped Polytrauma Intake · Multi-Study Trauma Workup · Illustrative, non-PHI
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TraumaHero;
