"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Lightning } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CT_STUDIES_CONTENT as CONTENT } from "@/content/ct";

/**
 * CT capability map: a typographic index of every study type we report.
 * Hovering or focusing a study sweeps the preview viewport to that region
 * (the list is the content; the viewport is a visual aid).
 */
export function StudiesCapabilityMapSection() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const study = CONTENT.studies[active];
  const { image, scale = 1, origin = "50% 50%" } = study.preview;

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading + preview viewport */}
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>

            <figure className="mt-10 lg:sticky lg:top-28">
              <div id={`${uid}-viewport`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black shadow-lg">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: MOTION.easeOut }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0" style={{ transform: `scale(${scale})`, transformOrigin: origin }}>
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain" />
                    </div>
                    {/* Scan line sweeps once per change */}
                    <motion.span
                      aria-hidden="true"
                      initial={{ top: "0%", opacity: 1 }}
                      animate={{ top: "100%", opacity: 0 }}
                      transition={{ duration: 0.9, ease: MOTION.easeOut }}
                      className="absolute inset-x-0 h-px bg-sky-300 shadow-[0_0_14px_2px_rgb(125_211_252/0.6)]"
                    />
                  </motion.div>
                </AnimatePresence>

                <p className="pointer-events-none absolute left-3 top-3 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-sky-100/90">
                  CT · {image.plane}
                </p>
                <p className="pointer-events-none absolute right-3 top-3 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                  {study.label}
                </p>
                {"urgent" in study && study.urgent && (
                  <p className="pointer-events-none absolute right-4 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-rose-400/60 bg-rose-500/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-rose-100">
                    <Lightning size={11} weight="fill" aria-hidden="true" /> Priority
                  </p>
                )}
                <p className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                  Illustrative · Non-PHI
                </p>
              </div>
            </figure>
          </div>

          {/* Study index */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-border-strong pb-4">
              <h3 className="text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
              <p className="font-mono text-xs tabular-nums text-foreground-subtle">
                {String(CONTENT.studies.length).padStart(2, "0")} study types
              </p>
            </div>
            <ol aria-label={CONTENT.studiesHeading}>
              {CONTENT.studies.map((item, i) => {
                const isActive = i === active;
                const urgent = "urgent" in item && item.urgent;
                return (
                  <li key={item.id} className="border-b border-border">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls={`${uid}-viewport`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex w-full items-center gap-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-8 sm:py-5"
                    >
                      <span className={cn("w-7 font-mono text-xs tabular-nums transition-colors", isActive ? "text-primary" : "text-foreground-subtle")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-2xl font-semibold uppercase tracking-tight transition-colors sm:text-3xl",
                          urgent ? "text-urgent" : isActive ? "text-foreground" : "text-foreground-muted group-hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                      {urgent && <Lightning size={18} weight="fill" aria-hidden="true" className="text-urgent" />}
                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                        className={cn("shrink-0 transition-all duration-300", isActive ? "translate-x-0 text-primary opacity-100" : "-translate-x-2 opacity-0")}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudiesCapabilityMapSection;
