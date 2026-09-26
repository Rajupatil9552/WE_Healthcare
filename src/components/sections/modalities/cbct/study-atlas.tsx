"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CBCT_STUDIES_CONTENT as CONTENT, type CbctStudy } from "@/content/cbct";

const STUDIES: readonly CbctStudy[] = CONTENT.studies;

/**
 * Study atlas: a viewer that frames the region each CBCT application looks
 * at, cycling on its own while visible. The numbered list is the text
 * equivalent and also selects a study.
 */
export function StudyAtlasSection() {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId();
  const [active, select] = useAutoCycle(STUDIES.length, ref, 3400);
  const study = STUDIES[active];

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>
            <p className="mt-3 text-sm text-foreground-subtle">{CONTENT.scopeNote}</p>

            <h3 className="mt-12 text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
            <ol className="mt-4 border-t border-border">
              {STUDIES.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.id} className="border-b border-border">
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-controls={`${uid}-viewer`}
                      onClick={() => select(i)}
                      className="group flex w-full items-center gap-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className={cn("font-mono text-xs tabular-nums transition-colors", on ? "text-primary" : "text-foreground-subtle")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("flex-1 text-lg font-semibold tracking-tight transition-colors", on ? "text-foreground" : "text-foreground-muted group-hover:text-foreground")}>
                        {s.label}
                      </span>
                      <span className={cn("font-mono text-[11px] uppercase tracking-[0.1em] transition-colors", on ? "text-primary" : "text-foreground-subtle")}>
                        {s.view}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div ref={ref} className="lg:col-span-7">
            <figure id={`${uid}-viewer`} className="overflow-hidden rounded-xl bg-slate-950 shadow-lg lg:sticky lg:top-28">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                <span className="font-medium text-white">CBCT · {study.label}</span>
                <span className="font-mono uppercase tracking-[0.12em]">{study.view}</span>
              </div>
              <div className="relative aspect-[4/3]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={study.image.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <ImageWithRegion study={study} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-1 border-t border-white/10 px-4 py-3">
                {STUDIES.map((s, i) => (
                  <span key={s.id} aria-hidden="true" className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    {i === active && (
                      <motion.span
                        key={`${s.id}-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 3.4, ease: "linear" }}
                        className="block h-full origin-left bg-sky-300 motion-reduce:scale-x-100"
                      />
                    )}
                  </span>
                ))}
              </div>
            </figure>
            <p className="mt-3 text-[13px] text-foreground-subtle">Illustrative, non-PHI.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The image letterboxed to its own ratio, with the study's region framed. */
function ImageWithRegion({ study }: { study: CbctStudy }) {
  const { image, region } = study;
  return (
    <div className="relative max-h-full max-w-full" style={{ aspectRatio: image.ratio, height: image.ratio < 4 / 3 ? "100%" : "auto", width: image.ratio >= 4 / 3 ? "100%" : "auto" }}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="rounded-sm object-contain" />
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ left: `${region.x}%`, top: `${region.y}%`, width: `${region.w}%`, height: `${region.h}%` }}
        transition={{ duration: 0.7, ease: MOTION.easeOut }}
        className="absolute rounded-sm border border-sky-300 shadow-[0_0_0_9999px_rgb(2_6_23/0.5)]"
      >
        {["-left-px -top-px border-l-2 border-t-2", "-right-px -top-px border-r-2 border-t-2", "-bottom-px -left-px border-b-2 border-l-2", "-bottom-px -right-px border-b-2 border-r-2"].map((c) => (
          <span key={c} className={cn("absolute size-3 border-sky-200", c)} />
        ))}
      </motion.div>
    </div>
  );
}

export default StudyAtlasSection;
