"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowsClockwise, UserCheck, PhoneCall, FileText } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useScrubSequence } from "@/lib/use-scrub-sequence";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  isSpecial?: boolean;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "HANDOVER",
    description: "Team transition / study queue.",
    image: "/images/overnight-weekend-coverage/workflow-radiology.jpg",
    alt: "Hospital PACS study queue and automated worklist ingestion network",
    icon: ArrowsClockwise,
  },
  {
    number: "02",
    title: "OVERNIGHT READS",
    description: "Radiologist reviews overnight studies.",
    image: "/images/overnight-weekend-coverage/radiologist-reading-study.jpg",
    alt: "Board-certified diagnostic radiologist reviewing cross-sectional imaging scans during night shift",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "ESCALATION",
    description: "Time-sensitive findings follow the agreed escalation pathway.",
    image: "/images/overnight-weekend-coverage/escalation-critical-finding.jpg",
    alt: "Emergency radiologist communicating critical STAT findings on telephone directly to care team",
    icon: PhoneCall,
    isSpecial: true,
  },
  {
    number: "04",
    title: "MORNING SUMMARY",
    description: "Agreed handoff/summary for the next operating period.",
    image: "/images/overnight-weekend-coverage/morning-radiology-handoff.jpg",
    alt: "Radiology team and hospital physician reviewing morning handoff summary",
    icon: FileText,
  },
];

export function CoverageTimelineSection() {
  const section = useRef<HTMLElement>(null);
  const timeline = useRef<HTMLOListElement>(null);
  useScrubSequence(timeline);

  // Signature: as the timeline is scrolled, the section tint deepens toward
  // "night" mid-way and lifts again at the morning summary.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: section.current, start: "top 60%", end: "bottom 40%", scrub: true },
          })
          .fromTo(".js-night", { opacity: 0 }, { opacity: 1, ease: "sine.inOut", duration: 1 })
          .to(".js-night", { opacity: 0, ease: "sine.inOut", duration: 1 });
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} id="coverage-timeline" className="relative py-section lg:py-section-lg bg-surface scroll-mt-20">
      <div aria-hidden="true" className="js-night pointer-events-none absolute inset-0 bg-primary-strong/[0.07] opacity-0" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">How It Works</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              From Handover to Morning Summary
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">
            The workflow is configured around the agreed coverage window and escalation requirements.
          </p>
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">Night Coverage</p>

        <ol ref={timeline} className="relative mt-6 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div aria-hidden="true" className="hidden lg:block absolute left-8 right-8 top-8 h-px bg-border-strong">
            <div className="js-track h-full w-full bg-primary" />
          </div>
          <div aria-hidden="true" className="lg:hidden absolute left-8 top-8 bottom-8 w-px bg-border-strong" />

          {TIMELINE_STEPS.map(({ number, title, description, image, alt, icon: Icon, isSpecial }) => (
            <li key={number} className="relative grid grid-cols-[4rem_1fr] lg:block gap-5">
              <span
                className={cn(
                  "js-node relative z-10 flex size-16 items-center justify-center rounded-full border bg-surface",
                  isSpecial ? "border-warning text-warning" : "border-primary text-primary"
                )}
              >
                <Icon size={24} aria-hidden="true" />
              </span>
              <div className="lg:mt-8">
                <span className="font-mono text-xs text-foreground-subtle tabular-nums">Step {number}</span>
                <h3 className={cn("mt-2 text-xl font-semibold capitalize", isSpecial ? "text-warning" : "text-foreground")}>
                  {title.toLowerCase()}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed max-w-[30ch]">{description}</p>
                <div className="relative mt-6 aspect-[16/10] max-w-xs overflow-hidden rounded-md bg-surface-muted">
                  <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 80vw, 280px" className="object-cover object-center" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default CoverageTimelineSection;
