"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { PET_WORKFLOW_CONTENT as CONTENT } from "@/content/pet-ct";
import { FusionPanel } from "./fusion-panel";

/** Region of the coronal study each subspecialty thumbnail shows. */
const REGION = { nm: "50% 6%", body: "50% 55%", additional: "50% 28%" } as const;

const LAST = CONTENT.steps.length - 1;

/**
 * Subspecialty Expertise + How It Works. The workflow rail carries two
 * channels (PET warm, CT cool) that merge where the study is read, the
 * page's fusion motif. Steps highlight in sequence while in view; reduced
 * motion shows the whole path complete.
 */
export function SubspecialtyWorkflowSection() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const [step] = useAutoCycle(CONTENT.steps.length, ref, 1400, 1400);
  const current = reduce ? LAST : step;

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.subspecialtyHeading}</RevealHeading>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {CONTENT.subspecialties.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: MOTION.easeOut }}
              className="flex items-center gap-5 border-t border-border pt-6"
            >
              <FusionPanel view={s.view} position={REGION[s.id]} aspect={0.62} sizes="7rem" className="w-24 shrink-0 rounded-md shadow-md sm:w-28" />
              <div>
                <span className="font-mono text-xs tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-lg font-semibold leading-snug tracking-tight text-foreground">{s.label}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-subtle">{s.caption}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* How It Works */}
        <div className="mt-20 lg:mt-24">
          <h2 className="text-h2 font-semibold text-balance text-foreground">{CONTENT.workflowHeading}</h2>
          <div aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-foreground-muted">
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 rounded-full bg-orange-400" />PET · functional</span>
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 rounded-full bg-slate-400" />CT · anatomic</span>
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 rounded-full bg-primary" />Read together</span>
          </div>

          <ol ref={ref} className="mt-10 grid grid-cols-1 lg:grid-cols-6">
            {CONTENT.steps.map((s, i) => {
              const done = current >= i;
              const isCurrent = current === i;
              const dual = i < CONTENT.mergeAt;
              const segLit = current > i;
              return (
                <li key={s.id} aria-current={isCurrent ? "step" : undefined} className="relative pb-8 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-5">
                  {/* Connector to the next step */}
                  {i < LAST &&
                    (dual ? (
                      <>
                        <Seg lit={segLit} color="bg-orange-400" className="left-[6px] lg:top-[7px]" />
                        <Seg lit={segLit} color="bg-slate-400" className="left-[14px] lg:top-[13px]" />
                      </>
                    ) : (
                      <Seg lit={segLit} color="bg-primary" className="left-[10px] lg:top-[10px]" />
                    ))}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-0 grid size-[22px] place-items-center rounded-full border-2 bg-background font-mono text-[10px] transition-colors duration-300",
                      isCurrent ? "border-primary bg-primary text-on-primary" : done ? "border-primary text-primary" : "border-border-strong text-foreground-subtle"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "block text-base font-semibold leading-snug transition-colors duration-300 lg:mt-10",
                      done ? "text-foreground" : "text-foreground-subtle"
                    )}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * Connector from a step's dot to the next: vertical below lg (dot bottom to
 * the next item), horizontal from lg (dot right edge to the next column).
 */
function Seg({ lit, color, className }: { lit: boolean; color: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-[22px] h-[calc(100%-22px)] w-0.5 overflow-hidden rounded-full bg-border lg:left-[22px] lg:h-0.5 lg:w-[calc(100%-22px)]",
        className
      )}
    >
      <motion.span
        initial={false}
        animate={{ scaleX: lit ? 1 : 0, scaleY: lit ? 1 : 0 }}
        transition={{ duration: 0.5, ease: MOTION.easeOut }}
        className={cn("absolute inset-0 origin-top-left", color)}
      />
    </span>
  );
}

export default SubspecialtyWorkflowSection;
