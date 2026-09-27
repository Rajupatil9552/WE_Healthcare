"use client";

import { useRef, useState } from "react";
import { ArrowRight, Buildings, LockKey, ArrowsSplit, Desktop, FileText, Database } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { IMAGING_WORKFLOW as CONTENT } from "@/content/technology-security";

const ICONS = [Buildings, LockKey, ArrowsSplit, Desktop, FileText, Database];
const STEPS = CONTENT.steps;

/**
 * End-to-end workflow. On desktop (motion allowed) the section pins and the
 * step cards travel sideways as the page scrolls; elsewhere they are a grid.
 */
export function ImagingWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;
        setPinned(true);
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
        return () => setPinned(false);
      });
    },
    { scope: sectionRef }
  );

  const current = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-surface lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
      <DecorativeLines variant="top-right" />
      <Container className="relative pt-section lg:pt-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 max-w-[20ch] text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          </div>
          {pinned && (
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle" aria-hidden="true">
              Step {String(current + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · Scroll to follow the study
            </p>
          )}
        </div>
      </Container>

      <div ref={viewportRef} className="mt-12 pb-section lg:mt-14 lg:pb-24">
        <Container className="relative lg:max-w-none lg:px-0">
          <ol
            ref={trackRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:w-max lg:gap-6 lg:pl-[max(var(--space-container-x),calc((100vw_-_var(--container-max))/2_+_var(--space-container-x)))] lg:pr-[var(--space-container-x)]"
          >
            {STEPS.map((label, i) => {
              const Icon = ICONS[i];
              const on = pinned ? i <= current : true;
              const last = i === STEPS.length - 1;
              return (
                <li key={label} className="relative flex items-center lg:gap-6">
                  <div
                    className={cn(
                      "relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card p-6 transition-[border-color,box-shadow] duration-500 lg:h-[21rem] lg:w-[22rem] lg:p-8",
                      on ? "border-primary/40 shadow-md" : "border-border"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -right-3 -top-6 font-mono text-[7rem] leading-none font-semibold tabular-nums transition-colors duration-500 lg:text-[9rem]",
                        on ? "text-primary/10" : "text-foreground/5"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "relative flex size-12 items-center justify-center rounded-lg transition-colors duration-500 lg:size-14",
                        on ? "bg-gradient-to-br from-sky-500 to-cyan-400 text-slate-950" : "bg-surface-muted text-foreground-subtle"
                      )}
                    >
                      <Icon size={26} weight="duotone" aria-hidden="true" />
                    </span>
                    <span className="relative mt-auto pt-10 font-mono text-xs text-foreground-subtle">Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-balance text-foreground lg:text-2xl">{label}</h3>
                    {last && (
                      <span className="relative mt-3 inline-flex self-start rounded-full bg-success/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-success">
                        Report returned
                      </span>
                    )}
                  </div>
                  {!last && (
                    <ArrowRight
                      size={22}
                      weight="bold"
                      aria-hidden="true"
                      className={cn("hidden shrink-0 transition-colors duration-500 lg:block", on ? "text-primary" : "text-border-strong")}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </Container>

        {pinned && (
          <Container className="relative mt-10">
            <div className="h-1 overflow-hidden rounded-full bg-border" aria-hidden="true">
              <div className="h-full origin-left rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ transform: `scaleX(${progress})` }} />
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}

export default ImagingWorkflow;
