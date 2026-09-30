"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SPINAL_WHAT_CONTENT as CONTENT, SPINE_IMAGES } from "@/content/spinal-annotation";
import { AnnotatedSpine } from "./annotated-spine";

const IMAGE = SPINE_IMAGES.cervicalXray;

/**
 * What Is Spinal Annotation? The approved copy beside a before/after
 * comparison: the same lateral cervical spine unannotated and annotated,
 * split by a slider (a native range input, so it works with keyboard and
 * touch). It sweeps once when first seen, then stays under user control.
 */
export function WhatIsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = usePrefersReducedMotion();
  const sliderId = useId();
  const [split, setSplit] = useState(50);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || reduce || touched) return;
    const controls = animate(50, [50, 86, 12, 60], {
      duration: 3.2,
      ease: "easeInOut",
      onUpdate: (v) => setSplit(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, touched]);

  return (
    <section id="about" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <div className="mt-6 space-y-4">
              {CONTENT.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: MOTION.easeOut }}
                  className={i === 0 ? "text-lead text-foreground" : "text-base leading-relaxed text-foreground-muted"}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <div ref={ref} className="lg:col-span-6">
            <figure className="mx-auto w-full max-w-[24rem] lg:mr-0">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                {/* Unannotated (full) */}
                <div className="relative w-full" style={{ aspectRatio: IMAGE.ratio }}>
                  <Image src={IMAGE.src} alt={IMAGE.alt} fill sizes="(max-width: 1024px) 90vw, 24rem" className="object-cover" />
                </div>
                {/* Annotated, revealed left of the split (the labels sit on the left) */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                  <AnnotatedSpine image={IMAGE} stagger={false} sizes="(max-width: 1024px) 90vw, 24rem" className="w-full" />
                </div>
                {/* Divider */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgb(0_0_0/0.6)]" style={{ left: `${split}%` }}>
                  <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-mono text-[10px] font-semibold text-slate-900 shadow">
                    ⇆
                  </span>
                </div>
                <span aria-hidden="true" className="absolute left-3 top-3 rounded-sm bg-sky-300 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-950">
                  {CONTENT.compare.after}
                </span>
                <span aria-hidden="true" className="absolute right-3 top-3 rounded-sm bg-black/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                  {CONTENT.compare.before}
                </span>
              </div>
              <label htmlFor={sliderId} className="sr-only">
                Compare annotated and unannotated image
              </label>
              <input
                id={sliderId}
                type="range"
                min={0}
                max={100}
                value={split}
                onChange={(e) => {
                  setTouched(true);
                  setSplit(Number(e.target.value));
                }}
                className="mt-4 w-full cursor-pointer accent-sky-600"
              />
              <figcaption className="mt-1 text-[13px] text-foreground-subtle">Drag to compare. Illustrative, non-PHI.</figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhatIsSection;
