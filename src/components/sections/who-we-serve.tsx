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
import { cn } from "@/lib/utils";

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
    href: "/solutions/hospitals",
    icon: Buildings,
  },
  {
    id: "imaging-centers",
    title: "Imaging Centers",
    description:
      "Flexible and scalable radiology support to help imaging centers maintain high turnaround times and deliver exceptional patient care.",
    image: "/images/accuray-36i9vuZrVjc-unsplash.jpg",
    alt: "Modern MRI and CT scanner suite inside an outpatient imaging center",
    href: "/solutions/imaging-centers",
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
    href: "/services/emergency-reads",
    icon: Ambulance,
  },
  {
    id: "radiology-groups",
    title: "Radiology Groups",
    description:
      "Trusted partnership for overflow coverage, subspecialty reads, and workforce optimization to help radiology groups focus on what they do best.",
    image: "/images/accuray-6pQPFuD7nJY-unsplash.jpg",
    alt: "Board-certified radiologist analyzing diagnostic scans on multi-monitor workstation",
    href: "/solutions/radiology-groups",
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
    <section className="relative overflow-hidden bg-[#f7fafc] dark:bg-[#080e11] py-20 lg:py-28 transition-colors duration-300">
      {/* Subtle decorative wave pattern in top right */}
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[500px] overflow-hidden opacity-30 dark:opacity-15">
        <svg
          viewBox="0 0 500 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-sky-400"
        >
          <path
            d="M50 0 C200 120, 350 80, 500 240 M100 0 C250 160, 400 120, 500 300 M150 0 C300 200, 450 160, 500 360"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M0 50 C180 180, 320 140, 500 280 M0 100 C150 220, 300 180, 500 340"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Section Header with Eyebrow, Title and Carousel Controls */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm"
            >
              Who We Serve
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl leading-[1.12]"
            >
              Supporting the Entire <br />
              Care Continuum
            </motion.h2>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              We partner with healthcare organizations across the continuum to provide reliable, high-quality radiology services tailored to their unique needs.
            </motion.p>
          </div>

          {/* Right-side navigation arrow controls */}
          <div className="flex items-center lg:items-end justify-start lg:justify-end">
            {/* Circular Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canScrollLeft}
                aria-label="Previous audience card"
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95",
                  !canScrollLeft
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canScrollRight}
                aria-label="Next audience card"
                className={cn(
                  "flex size-11 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-md shadow-slate-900/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95",
                  !canScrollRight
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#152a45]"
                )}
              >
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Audience Cards Carousel */}
        <div className="relative mt-12 lg:mt-16">
          <div
            ref={carouselRef}
            tabIndex={0}
            aria-label="Audience categories carousel"
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-3xl"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {AUDIENCE_CARDS.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative flex h-[480px] w-[82vw] sm:w-[340px] lg:w-[calc(25%-18px)] shrink-0 flex-col justify-end overflow-hidden rounded-3xl p-6 md:p-7 shadow-lg shadow-slate-900/10 snap-start transition-all duration-300 hover:shadow-2xl hover:shadow-sky-950/20"
                >
                  {/* Background Photography with Ken-Burns zoom on hover */}
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 340px, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Vignette and Gradient Overlay for Pristine Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09131a] via-[#09131a]/65 to-transparent transition-opacity duration-300 group-hover:from-[#060c11]" />

                  {/* Subtle top subtle border sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 transition-colors group-hover:border-white/20" />

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col">
                    {/* Frosted Glass Icon Badge */}
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <IconComponent size={24} weight="bold" />
                    </div>

                    {/* Audience Title */}
                    <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                      {card.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-slate-200/90 font-normal line-clamp-3">
                      {card.description}
                    </p>

                    {/* Learn More Action Link */}
                    <Link
                      href={card.href}
                      className="mt-5 inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white transition-colors duration-200 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
                    >
                      <span>Learn more</span>
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {AUDIENCE_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${card.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                  currentIndex === idx
                    ? "w-7 bg-[#1e3a5f] dark:bg-sky-400"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
