"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

interface CoverageCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  /** Internal verification tracking; not displayed on public UI */
  verificationNote?: string;
}

const CARDS: CoverageCardData[] = [
  {
    id: "subspecialty-reporting",
    title: "Subspecialty Reporting",
    description:
      "Studies can be routed according to modality, priority, and the subspecialty requirements of your workflow.",
    image: "/images/teleradiology-reporting/subspecialty-mri.jpg",
    alt: "High-resolution diagnostic MRI and CT medical imaging scan",
    href: "/contact",
    verificationNote: "[VERIFY: subspecialty coverage and assignment model]",
  },
  {
    id: "flexible-coverage",
    title: "Flexible Coverage",
    description:
      "Use reporting support for defined coverage windows, overflow periods, overnight needs, weekends, or other operational requirements.",
    image: "/images/teleradiology-reporting/flexible-coverage-radiology.jpg",
    alt: "Clinical radiologist interpreting imaging studies at a diagnostic hospital workstation",
    href: "/contact",
    verificationNote: "[VERIFY: available coverage models]",
  },
];

export function SubspecialtyCoverageSection() {
  const root = useRef<HTMLElement>(null);

  // Image drifts inside each card as it crosses the viewport (desktop only).
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>(".js-card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".js-card-img"),
            { yPercent: -6 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="subspecialty-coverage" className="py-section lg:py-section-lg bg-surface">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">Built Around Your Radiology Operation</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
            Subspecialty Reporting and Flexible Coverage
          </RevealHeading>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {CARDS.map((card, idx) => (
            <Link
              key={card.id}
              href={card.href}
              className={cn(
                "js-card group relative flex flex-col justify-end overflow-hidden rounded-lg bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                idx === 0 ? "md:col-span-7 min-h-[420px] lg:min-h-[540px]" : "md:col-span-5 md:mt-24 min-h-[380px] lg:min-h-[460px]"
              )}
            >
              <div className="js-card-img absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes={idx === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{card.title}</h3>
                <p className="mt-3 text-base text-white/75 leading-relaxed max-w-[46ch]">{card.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">Learn more</span>
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SubspecialtyCoverageSection;
