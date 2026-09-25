"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { STROKE_PROTOCOL_WORKFLOW_CONTENT as CONTENT } from "@/content/stroke-imaging-protocol";

/**
 * Per-stage focus on the (illustrative) scan: the viewer zooms/pans to a
 * region and outlines it. Values are % of the viewport frame.
 */
const FOCUS = [
  { scale: 1, x: "0%", y: "0%", box: { left: "8%", top: "10%", width: "84%", height: "80%" } },
  { scale: 1.25, x: "-6%", y: "3%", box: { left: "36%", top: "22%", width: "38%", height: "46%" } },
  { scale: 1.5, x: "8%", y: "-4%", box: { left: "22%", top: "30%", width: "30%", height: "34%" } },
  { scale: 1.15, x: "0%", y: "-3%", box: { left: "14%", top: "16%", width: "72%", height: "62%" } },
];

export function StrokeProtocolWorkflowSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The stage whose card crosses the middle of the viewport drives the viewer.
  useGSAP(
    () => {
      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActiveStageIndex(idx),
          onLeaveBack: () => idx === 0 && setActiveStageIndex(0),
        });
      });
    },
    { scope: listRef },
  );

  const jumpTo = (idx: number) => {
    setActiveStageIndex(idx);
    stageRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const activeStage = CONTENT.stages[activeStageIndex];
  const focus = FOCUS[activeStageIndex] ?? FOCUS[0];

  return (
    <section id="stroke-protocol" className="py-section lg:py-section-lg bg-background">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">{CONTENT.eyebrow}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">{CONTENT.heading}</RevealHeading>
          <p className="mt-6 text-base text-foreground-muted leading-relaxed">{CONTENT.supportingText}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky scan viewer */}
          <figure className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-lg bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                <span className="font-medium text-white">Stroke Protocol Viewer</span>
                <span className="font-mono">
                  Stage {activeStage.step}/{String(CONTENT.stages.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  animate={{ scale: focus.scale, x: focus.x, y: focus.y }}
                  transition={{ duration: 0.9, ease: MOTION.easeOut }}
                  className="absolute inset-0"
                >
                  <Image src={CONTENT.image} alt={CONTENT.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  animate={focus.box}
                  transition={{ duration: 0.9, ease: MOTION.easeOut }}
                  className="absolute rounded-sm border border-white/70 shadow-[0_0_0_9999px_rgb(2_6_23/0.35)]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">{activeStage.detailBadge}</p>
                  <p className="mt-1 text-sm font-medium text-white">{activeStage.visualFocus}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
                <span className="text-xs text-white/60">Protocol Pathway Progression</span>
                <div className="flex gap-1.5">
                  {CONTENT.stages.map((stg, i) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`Jump to stage ${stg.step}: ${stg.title}`}
                      aria-current={activeStageIndex === i ? "step" : undefined}
                      className={cn(
                        "rounded-sm px-2 py-0.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                        activeStageIndex === i ? "bg-white text-slate-950" : "text-white/60 hover:text-white"
                      )}
                    >
                      {stg.step}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-[13px] text-foreground-subtle">Illustrative, non-PHI.</figcaption>
          </figure>

          {/* Stage list: scrolling it drives the viewer */}
          <ol ref={listRef} className="lg:col-span-6 border-t border-border-strong">
            {CONTENT.stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <li
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  className="border-b border-border lg:min-h-[42vh] lg:flex lg:items-center"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActiveStageIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStageIndex(idx);
                      }
                    }}
                    className="w-full cursor-pointer py-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className={cn("font-mono text-sm tabular-nums transition-colors", isActive ? "text-primary" : "text-foreground-subtle")}>
                        {stage.step}
                      </span>
                      <div>
                        <h3
                          className={cn(
                            "text-2xl font-semibold tracking-tight capitalize transition-colors",
                            isActive ? "text-foreground" : "text-foreground-subtle"
                          )}
                        >
                          {stage.title.toLowerCase()}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-primary">{stage.detailBadge}</p>
                        <p className={cn("mt-3 text-base leading-relaxed transition-colors", isActive ? "text-foreground-muted" : "text-foreground-subtle")}>
                          {stage.description}
                        </p>
                        {isActive && (
                          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                            Inspecting Scan
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default StrokeProtocolWorkflowSection;
