"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, LayoutGroup } from "motion/react";
import { PhoneCall } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { TRAUMA_HOW_IT_WORKS_CONTENT as CONTENT } from "@/content/trauma-critical-care";

const STAGE_BADGE = ["FLAGGED", "BATCHED", "IN REVIEW", "VERBAL OUTREACH"];
/** Slight scatter for the "flagged" state: studies arrive separately. */
const SCATTER = [
  { rotate: -2.5, y: -6 },
  { rotate: 2, y: 8 },
  { rotate: 1.5, y: -4 },
  { rotate: -2, y: 6 },
];
const layoutTransition = { layout: { duration: 0.7, ease: MOTION.easeOut } };

export function HowItWorksSection() {
  const [stage, setStage] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(
    () => {
      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setStage(idx),
          onLeaveBack: () => idx === 0 && setStage(0),
        });
      });
    },
    { scope: listRef },
  );

  const activeStage = CONTENT.stages[stage];

  return (
    <section id="how-it-works" className="py-section lg:py-section-lg bg-surface">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">{CONTENT.eyebrow}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">{CONTENT.heading}</RevealHeading>
          <p className="mt-6 text-base text-foreground-muted leading-relaxed">{CONTENT.supportingText}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Multi-study console: the four studies re-arrange per stage */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="rounded-lg border border-border bg-card p-5 sm:p-7 shadow-md">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">Multi-Study Trauma Workup</p>
                <p className="font-mono text-xs text-primary">Stage {activeStage.step} / 04</p>
              </div>

              <LayoutGroup>
                <div className="relative mt-6 min-h-[18rem] flex items-center">
                  <motion.div
                    layout
                    transition={layoutTransition}
                    className={cn(
                      "grid w-full",
                      stage === 0 && "grid-cols-2 gap-6",
                      stage === 1 && "grid-cols-2 gap-1.5 rounded-md border border-primary/40 p-1.5",
                      stage === 2 && "grid-cols-3 gap-2",
                      stage === 3 && "grid-cols-4 gap-1.5 rounded-md border border-primary/40 p-1.5 sm:mr-28"
                    )}
                  >
                    {CONTENT.studies.map((study, idx) => {
                      const isFocus = stage === 2 && idx === 0;
                      const isDimmed = stage === 2 && idx !== 0;
                      return (
                        <motion.div
                          layout
                          key={study.id}
                          transition={layoutTransition}
                          animate={{
                            rotate: stage === 0 ? SCATTER[idx].rotate : 0,
                            y: stage === 0 ? SCATTER[idx].y : 0,
                            opacity: isDimmed ? 0.45 : 1,
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-md border border-border bg-card p-2.5",
                            isFocus && "col-span-3 border-primary p-3",
                            stage === 3 && "flex-col items-start gap-2"
                          )}
                        >
                          <motion.div
                            layout
                            transition={layoutTransition}
                            className={cn("relative shrink-0 overflow-hidden rounded-sm bg-slate-950", isFocus ? "size-24" : "size-11")}
                          >
                            <Image src={study.image} alt={study.alt} fill sizes="96px" className="object-cover object-center" />
                          </motion.div>
                          <motion.div layout="position" transition={layoutTransition} className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">{study.name}</p>
                            <p className="truncate text-xs text-foreground-muted">{study.region}</p>
                            <p className="mt-1 font-mono text-xs text-primary">{STAGE_BADGE[stage]}</p>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Stage 4: the group connects to the care team */}
                  <motion.div
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: stage === 3 ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: stage === 3 ? 0.4 : 0 }}
                    className="pointer-events-none absolute right-0 top-1/2 hidden sm:flex -translate-y-1/2 items-center"
                  >
                    <motion.span
                      initial={false}
                      animate={{ scaleX: stage === 3 ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: stage === 3 ? 0.5 : 0, ease: MOTION.easeOut }}
                      className="block h-px w-10 origin-left bg-primary"
                    />
                    <span className="flex size-16 flex-col items-center justify-center rounded-full border border-primary bg-primary-soft text-primary">
                      <PhoneCall size={18} />
                      <span className="mt-0.5 text-[11px] font-medium leading-none">Care team</span>
                    </span>
                  </motion.div>
                </div>
              </LayoutGroup>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-sm font-semibold text-foreground capitalize">{activeStage.title.toLowerCase()}</p>
                  <p className="text-xs text-foreground-muted">{activeStage.detailBadge}</p>
                </div>
                <p className="hidden sm:block font-mono text-xs text-foreground-subtle">Step {activeStage.step} of 04</p>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-foreground-subtle">{CONTENT.disclaimer} Illustrative, non-PHI.</p>
          </div>

          {/* Stage list: scrolling (or selecting) drives the console */}
          <ol ref={listRef} className="lg:col-span-5 border-t border-border-strong">
            {CONTENT.stages.map((s, idx) => {
              const isActive = stage === idx;
              return (
                <li
                  key={s.id}
                  ref={(el) => {
                    stageRefs.current[idx] = el;
                  }}
                  className="border-b border-border lg:min-h-[38vh] lg:flex lg:items-center"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setStage(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setStage(idx);
                      }
                    }}
                    className="w-full cursor-pointer py-8 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className={cn("font-mono text-sm tabular-nums", isActive ? "text-primary" : "text-foreground-subtle")}>{s.step}</span>
                      <div>
                        <h3 className={cn("text-2xl font-semibold tracking-tight capitalize transition-colors", isActive ? "text-foreground" : "text-foreground-subtle")}>
                          {s.title.toLowerCase()}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-primary">{s.detailBadge}</p>
                        <p className={cn("mt-3 text-base leading-relaxed transition-colors", isActive ? "text-foreground-muted" : "text-foreground-subtle")}>
                          {s.description}
                        </p>
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

export default HowItWorksSection;
