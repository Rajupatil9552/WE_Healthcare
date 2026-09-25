"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface HowItWorksStep {
  number: string;
  title: string;
  statement: string;
  image: string;
  alt: string;
  modalityBadge: string;
}

const STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "SEND",
    statement: "Studies are received through the agreed workflow.",
    image: "/images/teleradiology-reporting/send-ct-mri-study.jpg",
    alt: "Clinical CT and MRI scanning suite with diagnostic technologist console",
    modalityBadge: "CT / MRI Study",
  },
  {
    number: "02",
    title: "ROUTE",
    statement: "Studies are routed according to defined rules.",
    image: "/images/teleradiology-reporting/workflow-radiology.jpg",
    alt: "Automated PACS network and intelligent clinical study routing interface",
    modalityBadge: "Workflow & Routing",
  },
  {
    number: "03",
    title: "READ",
    statement: "The assigned radiologist reviews the study.",
    image: "/images/teleradiology-reporting/radiologist-reading-study.jpg",
    alt: "Board-certified radiologist reviewing diagnostic imaging scans at clinical workstation",
    modalityBadge: "Radiologist Review",
  },
  {
    number: "04",
    title: "REVIEW & RETURN",
    statement: "The report is returned through the connected reporting workflow.",
    image: "/images/teleradiology-reporting/radiology-report.jpg",
    alt: "Signed diagnostic radiology report with structured impression findings",
    modalityBadge: "Radiology Report",
  },
];

export function HowItWorksSection() {
  const pinRef = useRef<HTMLDivElement>(null);

  // Desktop: pin the frame strip and translate it horizontally with scroll,
  // snapping to each step. Mobile / reduced motion: a plain vertical stack.
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const track = pinRef.current?.querySelector<HTMLElement>(".js-htrack");
        if (!track || !pinRef.current) return;
        const distance = () => track.scrollWidth - pinRef.current!.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / (STEPS.length - 1), duration: 0.4, ease: "power2.inOut" },
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: pinRef },
  );

  return (
    <section id="how-it-works" className="py-section lg:py-section-lg bg-surface overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow">Send · Route · Read · Review &amp; Return</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">How It Works</RevealHeading>
          </div>
          <p className="lg:col-span-6 text-base text-foreground-muted leading-relaxed">
            Studies are received through the agreed workflow, routed according to defined rules, reviewed by the assigned radiologist, and returned through the connected reporting workflow.
          </p>
        </div>

        <div ref={pinRef} className="mt-14 lg:mt-16">
          <ol className="js-htrack flex flex-col lg:flex-row gap-10 lg:gap-8 lg:w-max">
            {STEPS.map((step) => (
              <li key={step.number} className="lg:w-[34rem] shrink-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-muted">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 544px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-6 grid grid-cols-[4.5rem_1fr] gap-4 items-baseline">
                  <span className="font-mono text-4xl font-light text-primary tabular-nums leading-none">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground capitalize">{step.title.toLowerCase()}</h3>
                    <p className="mt-2 text-base text-foreground-muted leading-relaxed">{step.statement}</p>
                    <p className="mt-3 font-mono text-xs text-foreground-subtle">{step.modalityBadge}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorksSection;
