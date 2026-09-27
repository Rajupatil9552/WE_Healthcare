"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Tray, ShieldCheck, ArrowsSplit, UserCircle, Eye, SealCheck, PaperPlaneTilt } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { REPORTING_WORKFLOW as CONTENT } from "@/content/quality";
import { SectionNote } from "./section-note";

const ICONS = [Tray, ShieldCheck, ArrowsSplit, UserCircle, Eye, SealCheck, PaperPlaneTilt];
const STEPS = CONTENT.steps;

/**
 * Zig-zag timeline: the centre line fills with scroll and each stage lights
 * up as the line reaches it. Single column below md.
 */
export function ReportingWorkflowSection() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.floor(v * STEPS.length + 0.3) - 1));
  const lit = reduce ? STEPS.length - 1 : reached;

  return (
    <section id="reporting-workflow" className="relative overflow-clip scroll-mt-24 bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">03 · {CONTENT.eyebrow}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
        </div>

        <ol ref={ref} className="relative mx-auto mt-14 max-w-4xl lg:mt-20">
          {/* Track */}
          <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2 rounded-full bg-border md:left-1/2">
            <motion.span style={{ scaleY: reduce ? 1 : fill }} className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-sky-500 to-cyan-400" />
          </span>

          {STEPS.map((label, i) => {
            const Icon = ICONS[i];
            const on = i <= lit;
            const right = i % 2 === 1;
            const last = i === STEPS.length - 1;
            return (
              <li key={label} className="relative grid grid-cols-[3rem_1fr] items-center gap-4 pb-8 last:pb-0 md:grid-cols-[1fr_4rem_1fr] md:gap-0 md:pb-10">
                {/* Node */}
                <span className="relative z-10 row-start-1 flex justify-center md:col-start-2">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,box-shadow] duration-500",
                      on
                        ? last
                          ? "border-success bg-success text-white shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-success)_15%,transparent)]"
                          : "border-primary bg-primary text-on-primary shadow-[0_0_0_6px_var(--color-primary-soft)]"
                        : "border-border-strong bg-card text-foreground-subtle"
                    )}
                  >
                    <Icon size={20} weight={on ? "fill" : "regular"} aria-hidden="true" />
                  </span>
                </span>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: right ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: MOTION.easeOut }}
                  className={cn(
                    "row-start-1 col-start-2 md:col-start-auto",
                    right ? "md:col-start-3 md:pl-6" : "md:col-start-1 md:pr-6 md:text-right"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg border bg-card px-5 py-4 transition-[border-color,box-shadow] duration-500",
                      on ? "border-primary/40 shadow-md" : "border-border"
                    )}
                  >
                    <p className="font-mono text-[11px] tabular-nums text-foreground-subtle">Step {String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">{label}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto mt-10 flex max-w-4xl justify-center">
          <SectionNote>{CONTENT.note}</SectionNote>
        </div>
      </Container>
    </section>
  );
}

export default ReportingWorkflowSection;
