"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { US_STUDIES_CONTENT as CONTENT } from "@/content/ultrasound";
import { SectorViewer } from "./sector-viewer";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";

/**
 * Studies We Report as an ultrasound console: each study is a preset key,
 * and the sector display shows the selected preset. Cycles on its own while
 * in view; any key can be chosen directly. The list beside it is the plain
 * text equivalent.
 */
export function StudiesConsoleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId();
  const [active, select] = useAutoCycle(CONTENT.studies.length, ref);
  const study = CONTENT.studies[active];

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>

            <h3 className="mt-12 text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
            <ul className="mt-4 border-t border-border">
              {CONTENT.studies.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: MOTION.easeOut }}
                  className="flex items-baseline gap-4 border-b border-border py-2.5"
                >
                  <span aria-hidden="true" className="w-11 font-mono text-[11px] tabular-nums text-foreground-subtle">
                    {s.code}
                  </span>
                  <span
                    className={cn(
                      "text-base font-medium transition-colors",
                      s.urgent ? "text-urgent" : i === active ? "text-foreground" : "text-foreground-muted"
                    )}
                  >
                    {s.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Console: sector display + preset keys */}
          <div ref={ref} className="lg:col-span-7">
            <div className="rounded-xl bg-slate-900 p-3 shadow-lg sm:p-4 lg:sticky lg:top-28">
              <div id={`${uid}-display`}>
                <SectorViewer
                  image={study.image}
                  label={`US · ${study.code}`}
                  detail={study.id === "vascular" ? "Color Doppler" : study.label}
                  tone={study.urgent ? "urgent" : "default"}
                />
              </div>
              <div role="group" aria-label="Ultrasound study presets" className="mt-3 grid grid-cols-4 gap-2">
                {CONTENT.studies.map((s, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      aria-controls={`${uid}-display`}
                      aria-label={s.label}
                      onClick={() => select(i)}
                      className={cn(
                        "rounded-md border px-2 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:py-3",
                        s.urgent && "col-span-2",
                        on
                          ? s.urgent
                            ? "border-rose-400/70 bg-rose-500/25 text-rose-100 shadow-[0_0_14px_rgb(251_113_133/0.35)]"
                            : "border-sky-300/70 bg-sky-400/20 text-sky-100 shadow-[0_0_14px_rgb(56_189_248/0.35)]"
                          : s.urgent
                            ? "border-rose-400/25 bg-white/[0.03] text-rose-200/70 hover:text-rose-100"
                            : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {s.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudiesConsoleSection;
