"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Buildings,
  CirclesThreePlus,
  Ambulance,
  UsersThree,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { routes } from "@/config/routes";

interface AudienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
}

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    id: "hospitals",
    title: "Hospitals & Health Systems",
    description:
      "Comprehensive teleradiology coverage to support inpatient, outpatient, and critical care needs with fast, accurate reporting.",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern hospital building exterior and medical health system entrance",
    href: routes.audience("hospitals-health-systems"),
    icon: Buildings,
  },
  {
    id: "imaging-centers",
    title: "Imaging Centers",
    description:
      "Flexible and scalable radiology support to help imaging centers maintain high turnaround times and deliver exceptional patient care.",
    image: "/images/general/accuray-36i9vuZrVjc-unsplash.jpg",
    alt: "Modern MRI and CT scanner suite inside an outpatient imaging center",
    href: routes.audience("imaging-centers"),
    icon: CirclesThreePlus,
  },
  {
    id: "emergency-departments",
    title: "Emergency Departments",
    description:
      "24/7 STAT radiology coverage for time-sensitive cases, ensuring rapid turnaround and real-time physician-to-physician communication.",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    alt: "Hospital emergency department clinical care and trauma triage",
    href: routes.audience("emergency-departments"),
    icon: Ambulance,
  },
  {
    id: "radiology-groups",
    title: "Radiology Groups",
    description:
      "Trusted partnership for overflow coverage, subspecialty reads, and workforce optimization to help radiology groups focus on what they do best.",
    image: "/images/general/accuray-6pQPFuD7nJY-unsplash.jpg",
    alt: "Board-certified radiologist analyzing diagnostic scans on multi-monitor workstation",
    href: routes.whoWeServe, // no "Radiology Groups" page in the nav yet
    icon: UsersThree,
  },
];

export function WhoWeServe() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update carousel scroll state
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calculate active slide index based on card width
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = (firstChild?.offsetWidth ?? 300) + 24; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(index, AUDIENCE_CARDS.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;

    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = (firstChild?.offsetWidth ?? 300) + 24;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollToSlide(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    scrollToSlide(Math.min(AUDIENCE_CARDS.length - 1, currentIndex + 1));
  };

  return (
    <section id="who-we-serve" className="relative overflow-hidden bg-background py-section lg:py-section-lg scroll-mt-24">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Who We Serve</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Supporting the Entire <br />
              Care Continuum
            </RevealHeading>
            <p className="mt-5 max-w-[60ch] text-base text-foreground-muted leading-relaxed">
              We partner with healthcare organizations across the continuum to provide reliable, high-quality radiology services tailored to their unique needs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous audience card"
              className="flex size-11 items-center justify-center rounded-full border border-border-strong text-foreground transition-[background-color,opacity,transform] duration-200 hover:bg-surface-muted active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next audience card"
              className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-14">
          <div
            ref={carouselRef}
            tabIndex={0}
            aria-label="Audience categories carousel"
            className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {AUDIENCE_CARDS.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: MOTION.easeOut }}
                  className="group relative flex h-[460px] w-[82vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-lg bg-slate-950 p-6 sm:w-[340px] md:p-7 lg:w-[calc(25%-18px)]"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 340px, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent" />

                  <div className="relative">
                    <IconComponent size={26} weight="light" aria-hidden="true" className="text-white/80" />
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{card.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/75 line-clamp-3">{card.description}</p>
                    <Link
                      href={card.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white">
                        Learn more
                      </span>
                      <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {AUDIENCE_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${card.title}`}
                aria-current={currentIndex === idx ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  currentIndex === idx ? "w-8 bg-foreground" : "w-3 bg-border-strong hover:bg-foreground-subtle"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServe;
