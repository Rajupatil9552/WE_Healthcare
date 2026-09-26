"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { US_HERO_CONTENT as CONTENT } from "@/content/ultrasound";
import { SectorViewer } from "./sector-viewer";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const CYCLE_MS = 4200;

/**
 * Ultrasound hero: a sector display that cycles routine -> vascular (Doppler)
 * -> emergency, mirroring the subheading, with a beam sweep on each change.
 */
export function UltrasoundHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, select] = useAutoCycle(CONTENT.modes.length, ref, CYCLE_MS);
  const mode = CONTENT.modes[active];

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

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: MOTION.easeOut }}
            className="lg:col-span-7"
          >
            <div className="mx-auto w-full max-w-[40rem] lg:mr-0">
              <SectorViewer
                image={mode.image}
                label={`US · ${mode.label}`}
                detail={mode.id === "vascular" ? "Color Doppler" : undefined}
                tone={mode.id === "emergency" ? "urgent" : "default"}
                className="shadow-xl"
              />
              <div role="group" aria-label="Ultrasound imaging" className="mt-4 grid grid-cols-3 gap-2">
                {CONTENT.modes.map((m, i) => {
                  const on = i === active;
                  const urgent = m.id === "emergency";
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => select(i)}
                      className={cn(
                        "relative overflow-hidden rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        on
                          ? urgent
                            ? "border-urgent/40 bg-urgent-soft"
                            : "border-primary/40 bg-primary-soft"
                          : "border-border bg-card hover:border-border-strong"
                      )}
                    >
                      <span className={cn("block font-mono text-[10px] uppercase tracking-[0.14em]", urgent ? "text-urgent" : "text-primary")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-sm font-semibold text-foreground">{m.label}</span>
                      {on && (
                        <motion.span
                          key={`${m.id}-${active}`}
                          aria-hidden="true"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                          className={cn("absolute inset-x-0 bottom-0 h-0.5 origin-left motion-reduce:hidden", urgent ? "bg-urgent" : "bg-primary")}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default UltrasoundHero;
