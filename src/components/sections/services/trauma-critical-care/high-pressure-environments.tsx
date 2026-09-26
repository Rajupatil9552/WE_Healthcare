"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, CheckCircle, PhoneCall, ShieldCheck } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { HIGH_PRESSURE_ENVIRONMENTS_CONTENT as CONTENT } from "@/content/trauma-critical-care";

// Study rows are a fixed 80px rhythm so the SVG branches (viewBox 0 0 120 320)
// start exactly at each row's centre: y = 40, 120, 200, 280.
const BRANCHES = [
  "M 0 40 C 50 40, 60 160, 96 160",
  "M 0 120 C 40 120, 60 160, 96 160",
  "M 0 200 C 40 200, 60 160, 96 160",
  "M 0 280 C 50 280, 60 160, 96 160",
];

const VERIFICATION_POINTS = [
  { text: "Concurrent correlation across axial neuro, torso, and trauma skeletal series", icon: CheckCircle },
  { text: "Immediate escalation pathway aligned with institutional trauma protocols", icon: PhoneCall },
  { text: "Overnight volume coverage and capacity surge buffer support", icon: ShieldCheck },
];

export function HighPressureEnvironmentsSection() {
  const root = useRef<HTMLElement>(null);

  // Signature: branch paths draw from each study into the review node, a dot
  // travels along each path, and the review card lights up on arrival.
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const paths = gsap.utils.toArray<SVGPathElement>(".js-branch");
        const dots = gsap.utils.toArray<SVGCircleElement>(".js-dot");
        const primary = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".js-convergence", start: "top 70%", once: true } });
        tl.from(".js-study", { opacity: 0, x: -16, duration: 0.5, stagger: 0.08, ease: "expo.out" })
          .fromTo(paths, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, "-=0.2")
          .fromTo(".js-trunk", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.3 }, "-=0.2");
        dots.forEach((dot, i) => {
          tl.fromTo(
            dot,
            { opacity: 1 },
            {
              motionPath: { path: paths[i], align: paths[i], alignOrigin: [0.5, 0.5] },
              duration: 0.9,
              ease: "power1.inOut",
            },
            i === 0 ? ">-0.1" : "<0.08",
          );
        });
        tl.to(dots, { opacity: 0, duration: 0.2 }).to(
          ".js-review",
          { borderColor: primary, boxShadow: `0 0 0 3px color-mix(in oklab, ${primary} 18%, transparent)`, duration: 0.5 },
          "<",
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="high-pressure-environments" className="relative overflow-clip py-section lg:py-section-lg bg-surface">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="max-w-4xl">
          {/* Kicker line (visually secondary, so not the section heading) */}
          <p className="eyebrow">{CONTENT.heading}</p>
          <RevealHeading className="mt-3 text-h2 font-semibold text-foreground text-balance capitalize">
            {CONTENT.statement.map((line) => (
              <span key={line} className="block">
                {line.toLowerCase()}
              </span>
            ))}
          </RevealHeading>
          <p className="mt-6 text-base text-foreground-muted leading-relaxed max-w-3xl">{CONTENT.supportingCopy}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-primary">{CONTENT.microcopyLabel}</p>
        </div>

        <div className="js-convergence mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">
          <ul className="lg:col-span-5 flex flex-col">
            {CONTENT.studies.map((study) => (
              <li key={study.id} className="js-study relative flex h-20 items-center gap-4 border-b border-border first:border-t lg:pr-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-sm bg-slate-950">
                  <Image src={study.image} alt={study.alt} fill sizes="56px" className="object-cover object-center" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{study.name}</h3>
                    <span className="font-mono text-xs text-foreground-subtle">{study.modality}</span>
                  </div>
                  <p className="truncate text-xs text-foreground-muted">
                    {study.region} · {study.description}
                  </p>
                </div>
                <span aria-hidden="true" className="absolute -right-1 top-1/2 hidden lg:block size-2 -translate-y-1/2 rounded-full bg-primary" />
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="hidden lg:flex lg:col-span-2 justify-center">
            <svg viewBox="0 0 120 320" fill="none" className="h-80 w-full overflow-visible text-primary">
              {BRANCHES.map((d) => (
                <path key={d} d={d} className="js-branch" stroke="currentColor" strokeWidth="1.5" />
              ))}
              <line className="js-trunk" x1="96" y1="160" x2="120" y2="160" stroke="currentColor" strokeWidth="2" />
              {BRANCHES.map((d) => (
                <circle key={`dot-${d}`} className="js-dot" r="3.5" fill="currentColor" opacity="0" />
              ))}
            </svg>
          </div>

          <div className="flex justify-center py-2 text-primary lg:hidden" aria-hidden="true">
            <ArrowDown size={18} />
          </div>

          <div className="lg:col-span-5">
            <div className="js-review rounded-lg border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{CONTENT.reviewPoint.subtitle}</p>
                <p className="text-xs text-foreground-subtle">{CONTENT.reviewPoint.statusBadge}</p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground capitalize">
                {CONTENT.reviewPoint.title.toLowerCase()}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{CONTENT.reviewPoint.description}</p>
              <ul className="mt-6 space-y-3 border-t border-border pt-5">
                {VERIFICATION_POINTS.map(({ text, icon: Icon }) => (
                  <li key={text} className="flex gap-3 text-sm text-foreground">
                    <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HighPressureEnvironmentsSection;
