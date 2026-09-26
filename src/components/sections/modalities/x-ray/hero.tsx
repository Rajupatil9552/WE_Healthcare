"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FILMS, XRAY_HERO_CONTENT as CONTENT } from "@/content/x-ray";
import { Radiograph } from "./radiograph";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const TICKS = Array.from({ length: 21 }, (_, i) => i);

const VIEWS = [FILMS.chestPa, FILMS.chestLateral] as const;
const VIEW_LABELS = ["PA", "Lateral"] as const;
/** Front film sits in place; the back film peeks out to the right. */
const CARD = {
  front: { x: "0%", y: "0%", rotate: 0, scale: 1, opacity: 1 },
  back: { x: "30%", y: "6%", rotate: 3, scale: 0.86, opacity: 0.8 },
};

/**
 * Hero on the site's light surface: the two-view chest pair in dark film
 * frames. The front film carries anatomy callouts; clicking the back film,
 * the PA / Lateral toggle, or scrolling past the pair brings the other
 * view forward with its own callouts.
 */
export function XRayHero() {
  return (
    <section className="relative overflow-clip bg-background pt-36 pb-section lg:pt-44">
      <DecorativeLines variant="top-right" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1
              {...HERO_HEADING_MOTION}
              className="mt-6 max-w-[12ch] text-display font-semibold text-balance text-foreground"
            >
              {CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-7 max-w-[40ch] text-lead font-medium text-primary-strong">
              {CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 max-w-[58ch] text-base leading-relaxed text-foreground-muted">
              {CONTENT.body}
            </motion.p>

            <motion.div {...fadeIn(0.22)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={CONTENT.primaryCta.href}
                className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}
              >
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={CONTENT.secondaryCta.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}>
                {CONTENT.secondaryCta.label}
                <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>

            {/* Viewport-style readouts */}
            <motion.dl
              {...fadeIn(0.3)}
              className="mt-12 grid grid-cols-1 gap-y-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-x-6"
            >
              {CONTENT.readouts.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Two-view chest pair: click or scroll brings the other view forward */}
          <div className="relative lg:col-span-6 lg:pl-6">
            <ChestFilmDeck />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ChestFilmDeck() {
  const [front, setFront] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const lastSide = useRef(0);

  // Crossing the deck's midpoint while scrolling swaps the views (both ways).
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const side = v > 0.56 ? 1 : 0;
    if (side !== lastSide.current) {
      lastSide.current = side;
      setFront(side);
    }
  });

  return (
    <div ref={deckRef} className="relative mx-auto w-full max-w-[36rem] lg:mr-0">
      {/* Measurement ruler down the viewer's edge */}
      <div aria-hidden="true" className="absolute -left-5 top-0 hidden h-[88%] flex-col justify-between py-2 lg:flex">
        {TICKS.map((i) => (
          <span key={i} className={cn("block h-px bg-border-strong", i % 5 === 0 ? "w-3" : "w-1.5")} />
        ))}
      </div>

      <div className="relative aspect-square">
        {VIEWS.map((film, i) => {
          const isFront = i === front;
          return (
            <motion.div
              key={film.src}
              initial={false}
              animate={isFront ? CARD.front : CARD.back}
              transition={{ duration: 0.7, ease: MOTION.easeOut }}
              style={{ zIndex: isFront ? 2 : 1, transformOrigin: "left center" }}
              className={cn(
                "absolute left-0 top-0 aspect-[5/6] w-[80%] overflow-hidden rounded-lg bg-slate-950",
                isFront ? "shadow-xl" : "shadow-md"
              )}
            >
              <Radiograph
                film={film}
                priority={i === 0}
                sweep={i === 0}
                annotate={isFront}
                compactLabels
                sizes="(max-width: 1024px) 80vw, 29rem"
              />
              {!isFront && (
                <button
                  type="button"
                  onClick={() => setFront(i)}
                  aria-label={`Show the ${VIEW_LABELS[i]} chest view`}
                  className="absolute inset-0 cursor-pointer rounded-lg transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-4">
        <div role="group" aria-label="Chest X-ray view" className="inline-flex rounded-full border border-border bg-card p-1">
          {VIEW_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={front === i}
              onClick={() => setFront(i)}
              className={cn(
                "rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                front === i ? "bg-primary text-on-primary" : "text-foreground-muted hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-foreground-subtle">Click the film or scroll to switch views</p>
      </div>
    </div>
  );
}

export default XRayHero;
