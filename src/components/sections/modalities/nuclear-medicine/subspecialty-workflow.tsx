"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { FusionPanel } from "@/components/sections/modalities/pet-ct/fusion-panel";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { NM_IMAGES, NM_WORKFLOW_CONTENT as CONTENT } from "@/content/nuclear-medicine";

const N = CONTENT.steps.length;
const LAST = N - 1;

/* Workflow drawn as a time-activity curve (the nuclear medicine motif): the
   steps sit on a rising curve. Coordinates rounded for SSR/CSR parity. */
const VW = 1000;
const VH = 220;
const round = (n: number) => Math.round(n * 10) / 10;
const curveY = (t: number) => round(VH - 30 - (1 - Math.exp(-3.2 * t)) * (VH - 70));
const CURVE = Array.from({ length: 81 }, (_, i) => {
  const t = i / 80;
  return `${i ? "L" : "M"}${round(40 + t * (VW - 80))} ${curveY(t)}`;
}).join(" ");
const STOPS = CONTENT.steps.map((_, i) => {
  const t = 0.06 + (i / LAST) * 0.88;
  return { x: round(40 + t * (VW - 80)), y: curveY(t) };
});

/**
 * Subspecialty Expertise + How It Works. The five workflow steps are points
 * on an uptake curve; focus steps along it while in view. Below lg the curve
 * gives way to a vertical list. Reduced motion shows the path complete.
 */
export function NmSubspecialtyWorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [step] = useAutoCycle(N, ref, 1400, 1400);
  const current = reduce ? LAST : step;

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.subspecialtyHeading}</RevealHeading>

        <ul className="mt-10 grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {CONTENT.subspecialties.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: MOTION.easeOut }}
              className="flex items-center gap-5 border-b border-border py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <Thumb id={s.id} />
              <div>
                <span className="font-mono text-xs tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-lg font-semibold leading-snug tracking-tight text-foreground">{s.label}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div ref={ref} className="mt-20 lg:mt-24">
          <RevealHeading className="text-h2 font-semibold text-balance text-foreground">{CONTENT.workflowHeading}</RevealHeading>

          {/* Curve (lg+) */}
          <div className="relative mt-10 hidden lg:block">
            <svg aria-hidden="true" viewBox={`0 0 ${VW} ${VH}`} className="h-auto w-full" fill="none">
              {Array.from({ length: 5 }, (_, i) => (
                <line key={i} x1="40" x2={VW - 40} y1={30 + i * 40} y2={30 + i * 40} stroke="var(--color-border)" strokeDasharray="3 6" />
              ))}
              <path d={CURVE} stroke="var(--color-border-strong)" strokeWidth="2" />
              <motion.path
                d={CURVE}
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: Math.min(1, (0.06 + (current / LAST) * 0.88) + 0.02) }}
                transition={{ duration: 0.7, ease: MOTION.easeOut }}
              />
              {STOPS.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={current === i ? 11 : 8}
                  fill={current >= i ? "var(--color-primary)" : "var(--color-background)"}
                  stroke="var(--color-primary)"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />
              ))}
            </svg>
            <ol className="relative mt-4 h-16">
              {CONTENT.steps.map((s, i) => (
                <li
                  key={s.id}
                  aria-current={current === i ? "step" : undefined}
                  className="absolute w-44 -translate-x-1/2 text-center"
                  style={{ left: `${round((STOPS[i].x / VW) * 100)}%` }}
                >
                  <span className={cn("block font-mono text-xs tabular-nums", current >= i ? "text-primary" : "text-foreground-subtle")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("mt-1 block text-base font-semibold leading-snug transition-colors", current >= i ? "text-foreground" : "text-foreground-subtle")}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* List (below lg) */}
          <ol className="relative mt-8 lg:hidden">
            <span aria-hidden="true" className="absolute bottom-4 left-[11px] top-3 w-0.5 bg-border" />
            {CONTENT.steps.map((s, i) => (
              <li key={s.id} className="relative flex items-center gap-4 pb-6 last:pb-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative size-6 shrink-0 rounded-full border-2 border-primary transition-colors duration-300",
                    current >= i ? "bg-primary" : "bg-background"
                  )}
                />
                <span className={cn("text-base font-semibold transition-colors", current >= i ? "text-foreground" : "text-foreground-subtle")}>{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Thumb({ id }: { id: string }) {
  const cls = "w-20 shrink-0 overflow-hidden rounded-md shadow-md";
  if (id === "nm")
    return (
      <div aria-hidden="true" className={cn(cls, "relative aspect-[3/4] bg-white")}>
        <Image src={NM_IMAGES.boneAnterior.src} alt="" fill sizes="5rem" className="object-cover object-top" />
      </div>
    );
  return (
    <div aria-hidden="true" className={cls}>
      <FusionPanel view={id === "body" ? "ct" : "fused"} aspect={3 / 4} position={id === "body" ? "50% 55%" : "50% 30%"} sizes="5rem" className="w-full" />
    </div>
  );
}

export default NmSubspecialtyWorkflowSection;
