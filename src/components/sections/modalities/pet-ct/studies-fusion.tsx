"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PET_STUDIES_CONTENT as CONTENT } from "@/content/pet-ct";
import { FusionPanel } from "./fusion-panel";

/**
 * PET-CT Reporting Support + Studies We Report: a CT | PET | Fused triptych
 * (the layout PET-CT is read in) that cycles its focus on its own, beside the
 * oncology pathway of studies we report.
 */
export function StudiesFusionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, select] = useAutoCycle(CONTENT.views.length, ref, 3200);

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>

            {/* Studies We Report: oncology pathway */}
            <h3 className="mt-12 text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
            <div className="mt-5 rounded-lg border border-border bg-card p-5 sm:p-6">
              <p className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-gradient-to-br from-amber-300 to-orange-600" />
                {CONTENT.umbrella}
              </p>
              <ol className="relative mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 1.2, ease: MOTION.easeOut }}
                  className="absolute left-[5px] right-[33%] top-[5px] hidden h-px origin-left bg-gradient-to-r from-orange-400 to-primary sm:block"
                />
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 1.2, ease: MOTION.easeOut }}
                  className="absolute bottom-10 left-[5px] top-[5px] w-px origin-top bg-gradient-to-b from-orange-400 to-primary sm:hidden"
                />
                {CONTENT.pathway.map((step, i) => (
                  <motion.li
                    key={step.id}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.35 }}
                    className="relative pl-6 sm:pl-0"
                  >
                    <span aria-hidden="true" className="absolute left-0 top-0 size-[11px] rounded-full border-2 border-primary bg-card" />
                    <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-subtle sm:mt-5">{step.time}</span>
                    <span className="mt-1 block text-base font-semibold leading-snug text-foreground">{step.label}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          {/* CT | PET | Fused triptych */}
          <div ref={ref} className="lg:col-span-6">
            <figure className="overflow-hidden rounded-xl bg-slate-950 p-3 shadow-lg sm:p-4 lg:sticky lg:top-28">
              <div className="flex items-center justify-between px-1 pb-3 text-xs text-white/70">
                <span className="font-medium text-white">PET-CT · Coronal</span>
                <span className="font-mono uppercase tracking-[0.12em]">Illustrative · Non-PHI</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {CONTENT.views.map((v, i) => {
                  const on = i === active;
                  return (
                    <div key={v.id}>
                      <motion.div
                        animate={{ opacity: on ? 1 : 0.45, scale: on ? 1 : 0.97 }}
                        transition={{ duration: 0.5, ease: MOTION.easeOut }}
                        className={cn("overflow-hidden rounded-md ring-2 transition-colors", on ? "ring-orange-300/80" : "ring-transparent")}
                      >
                        <FusionPanel view={v.id} sizes="(max-width: 1024px) 30vw, 14rem" className="w-full" />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              <div role="group" aria-label="PET-CT view" className="mt-3 grid grid-cols-3 gap-2">
                {CONTENT.views.map((v, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => select(i)}
                      className={cn(
                        "rounded-md border px-2 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
                        on ? "border-orange-300/60 bg-orange-400/15" : "border-white/10 hover:border-white/25"
                      )}
                    >
                      <span className={cn("block font-mono text-xs font-semibold uppercase tracking-[0.12em]", on ? "text-orange-100" : "text-white/70")}>
                        {v.label}
                      </span>
                      <span className="block text-[11px] text-white/50">{v.detail}</span>
                    </button>
                  );
                })}
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudiesFusionSection;
