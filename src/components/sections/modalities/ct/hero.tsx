"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Pause, Play } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { CT_HERO_CONTENT as CONTENT, CT_IMAGES, CT_SLICE_STACK as STACK } from "@/content/ct";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

const REST_SLICE = 8; // lateral ventricles: the slice the cine settles on
const FRAME_MS = 140;
const WORKLIST = [
  { id: "head", label: "Head / Brain", image: CT_IMAGES.head, active: true },
  { id: "spine", label: "C-Spine", image: CT_IMAGES.spine },
  { id: "abdomen", label: "Abd / Pelvis", image: CT_IMAGES.abdomenPelvis },
];

/**
 * CT hero: a study viewer that cines through an axial head series once on
 * load (then rests), with a slice scrubber, a small worklist of other series,
 * and the CT study → subspecialty review → reporting strip underneath.
 */
export function CtHero() {
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
            <motion.p {...fadeIn(0.1)} className="mt-7 max-w-[40ch] text-lead font-medium text-primary-strong">
              {CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 max-w-[56ch] text-base leading-relaxed text-foreground-muted">
              {CONTENT.body}
            </motion.p>
            <motion.div {...fadeIn(0.22)} className="mt-9">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <CtStudyViewer />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CtStudyViewer() {
  const reduce = usePrefersReducedMotion();
  const sliderId = useId();
  // intro: one cine pass on load, then rest · loop: user pressed play · paused: user control
  const [mode, setMode] = useState<"intro" | "loop" | "paused">("intro");
  const [slice, setSlice] = useState(0);

  const introDone = mode === "intro" && (reduce || slice >= STACK.count - 1);
  const current = introDone ? REST_SLICE : slice;
  const isPlaying = !reduce && (mode === "loop" || (mode === "intro" && !introDone));

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setSlice((s) => (mode === "loop" ? (s + 1) % STACK.count : Math.min(s + 1, STACK.count - 1)));
    }, FRAME_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, mode]);

  const togglePlay = () => {
    setSlice(current);
    setMode(isPlaying ? "paused" : "loop");
  };

  // Pipeline follows the first cine pass, then stays complete.
  const stage = mode !== "intro" || introDone ? 2 : current < 5 ? 0 : current < 11 ? 1 : 2;
  const col = current % STACK.columns;
  const row = Math.floor(current / STACK.columns);
  const step = 100 / (STACK.columns - 1);

  return (
    <figure className="mx-auto w-full max-w-[38rem] lg:mr-0">
      <div className="overflow-hidden rounded-lg bg-slate-950 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
          <span className="font-medium text-white">CT Study Viewer</span>
          <span className="font-mono uppercase tracking-[0.12em]">
            Axial · Head · IM {String(current + 1).padStart(2, "0")}/{STACK.count}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_7.5rem]">
          {/* Main viewport: one sprite frame per slice */}
          <div className="relative aspect-square">
            <div
              role="img"
              aria-label={STACK.alt}
              className="absolute inset-0 bg-black bg-no-repeat"
              style={{
                backgroundImage: `url(${STACK.src})`,
                backgroundSize: `${STACK.columns * 100}% ${STACK.columns * 100}%`,
                backgroundPosition: `${col * step}% ${row * step}%`,
              }}
            />
            {/* Crosshair ticks + corner readouts */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-6">
              <span className="absolute left-1/2 top-0 h-3 w-px bg-sky-300/60" />
              <span className="absolute bottom-0 left-1/2 h-3 w-px bg-sky-300/60" />
              <span className="absolute left-0 top-1/2 h-px w-3 bg-sky-300/60" />
              <span className="absolute right-0 top-1/2 h-px w-3 bg-sky-300/60" />
            </div>
            <p aria-hidden="true" className="pointer-events-none absolute left-4 top-3 font-mono text-[11px] uppercase tracking-[0.14em] text-sky-100/80">
              Brain window
            </p>
            <p aria-hidden="true" className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
              Illustrative · Non-PHI
            </p>
            {/* Slice position rail */}
            <div aria-hidden="true" className="pointer-events-none absolute bottom-8 right-3 top-8 w-1 rounded-full bg-white/10">
              <span
                className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_10px_rgb(125_211_252/0.7)]"
                style={{ top: `${(current / (STACK.count - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Worklist of series (other planes) */}
          <ul aria-label="Worklist" className="hidden border-l border-white/10 sm:block">
            {WORKLIST.map((item) => (
              <li key={item.id} className={cn("border-b border-white/10 p-2.5", item.active && "bg-white/5")}>
                <div className={cn("relative aspect-square overflow-hidden rounded-sm bg-black", item.active && "ring-1 ring-sky-300/70")}>
                  <Image src={item.image.src} alt="" fill sizes="120px" className="object-contain" />
                </div>
                <p className={cn("mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em]", item.active ? "text-sky-100" : "text-white/50")}>
                  {item.label}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">{item.image.plane}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Scrubber */}
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause slice cine" : "Play slice cine"}
            className="grid size-7 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {isPlaying ? <Pause size={12} weight="fill" /> : <Play size={12} weight="fill" />}
          </button>
          <label htmlFor={sliderId} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
            Slice
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={STACK.count - 1}
            value={current}
            onChange={(e) => {
              setMode("paused");
              setSlice(Number(e.target.value));
            }}
            className="h-1 w-full cursor-pointer accent-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          />
        </div>
      </div>

      {/* CT study → subspecialty review → reporting */}
      <ol className="mt-5 grid grid-cols-3 gap-3">
        {CONTENT.pipeline.map((item, i) => {
          const on = stage >= i;
          return (
            <li key={item.id} className="relative">
              <span className="block h-0.5 overflow-hidden rounded-full bg-border">
                <span
                  className={cn("block h-full origin-left bg-primary transition-transform duration-500 ease-out", on ? "scale-x-100" : "scale-x-0")}
                />
              </span>
              <p className={cn("mt-3 font-mono text-xs tabular-nums transition-colors", on ? "text-primary" : "text-foreground-subtle")}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className={cn("mt-0.5 text-sm font-semibold transition-colors", on ? "text-foreground" : "text-foreground-subtle")}>{item.label}</p>
              <p className="text-xs text-foreground-muted">{item.detail}</p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

export default CtHero;
