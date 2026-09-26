"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WorksWheel } from "@/components/ui/works-wheel";
import {
  RADIOLOGY_SPECIALTIES,
  RADIOLOGY_EXPERTISE_HEADER,
} from "@/content/radiology-expertise";
import { cn } from "@/lib/utils";

export function RadiologyExpertise() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [targetIndex, setTargetIndex] = React.useState<{ index: number; id: number } | undefined>(undefined);

  const activeSpecialty = RADIOLOGY_SPECIALTIES[activeIndex] || RADIOLOGY_SPECIALTIES[0];

  const handlePrev = () => {
    const nextIdx = activeIndex <= 0 ? RADIOLOGY_SPECIALTIES.length - 1 : activeIndex - 1;
    setTargetIndex({ index: nextIdx + 1, id: Date.now() });
  };

  const handleNext = () => {
    const nextIdx = activeIndex >= RADIOLOGY_SPECIALTIES.length - 1 ? 0 : activeIndex + 1;
    setTargetIndex({ index: nextIdx + 1, id: Date.now() });
  };

  return (
    <section
      id="radiology-expertise"
      className="relative overflow-hidden bg-surface pt-section pb-16 lg:pb-24 scroll-mt-20"
    >
      <DecorativeLines variant="left" />
      <DecorativeLines variant="right" />
      {/* Target anchor for hero scroll button */}
      <span id="trust-credibility" className="sr-only" aria-hidden="true" />

      <Container className="relative">
        {/* Centered header: the wheel below is radially symmetric */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{RADIOLOGY_EXPERTISE_HEADER.badge}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
            {RADIOLOGY_EXPERTISE_HEADER.title}
          </RevealHeading>
          <p className="mx-auto mt-5 max-w-[56ch] text-base text-foreground-muted leading-relaxed text-pretty">
            {RADIOLOGY_EXPERTISE_HEADER.description}
          </p>
        </div>
      </Container>

      {/* Full-Width 3D WorksWheel Showcase (Edge-to-Edge) */}
      <div className="relative mt-6 w-full overflow-hidden lg:mt-10">
        <WorksWheel
          items={RADIOLOGY_SPECIALTIES}
          label={RADIOLOGY_EXPERTISE_HEADER.centerLabel}
          action="Explore"
          onActiveChange={setActiveIndex}
          targetIndex={targetIndex}
          className="h-[520px] sm:h-[600px] lg:h-[680px] xl:h-[720px] w-full"
        />
      </div>

      {/* Mobile Active Specialty Info & Navigation Controls (< 768px) */}
      <Container className="md:hidden mt-4 relative z-10">
        <div className="px-2 sm:px-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1">
              {activeSpecialty.category}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-1.5">
              {activeSpecialty.title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-sm mb-4">
              {activeSpecialty.description}
            </p>

            {/* Mobile Arrows & Dots */}
            <div className="flex items-center justify-between w-full max-w-xs gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous specialty"
                className="size-10 rounded-full border border-border-strong bg-card flex items-center justify-center text-foreground active:scale-95 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Specialty indicator dots */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {RADIOLOGY_SPECIALTIES.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetIndex({ index: i + 1, id: Date.now() })}
                    aria-label={`Go to ${item.title}`}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      i === activeIndex
                        ? "w-5 bg-primary rounded-full"
                        : "bg-border-strong hover:bg-foreground-subtle"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next specialty"
                className="size-10 rounded-full border border-border-strong bg-card flex items-center justify-center text-foreground active:scale-95 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RadiologyExpertise;
