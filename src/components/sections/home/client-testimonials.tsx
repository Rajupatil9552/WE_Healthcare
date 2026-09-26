"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { Quotes, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface TestimonialSlide {
  id: string;
  slideNumber: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  category: string;
  avatar: string;
  isPlaceholder?: boolean;
}

export const TESTIMONIALS: TestimonialSlide[] = [
  {
    id: "hospital-leadership",
    slideNumber: "01",
    quote:
      "The consistent radiology coverage and clear communication have made a real difference for our clinical team.",
    authorName: "Physician Leader",
    authorRole: "Emergency Department",
    organization: "U.S. Healthcare Facility",
    category: "Hospitals & Health Systems",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&h=200&q=80",
    isPlaceholder: true,
  },
  {
    id: "emergency-department",
    slideNumber: "02",
    quote:
      "Having a dependable radiology workflow helps our emergency team coordinate care and access imaging interpretations when they are needed.",
    authorName: "Emergency Department Leader",
    authorRole: "Clinical Operations",
    organization: "Regional Trauma Center",
    category: "Emergency Departments",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&h=200&q=80",
    isPlaceholder: true,
  },
  {
    id: "imaging-center",
    slideNumber: "03",
    quote:
      "Flexible radiology support can help imaging centers manage changing study volumes and maintain an efficient reporting workflow.",
    authorName: "Imaging Center Director",
    authorRole: "Outpatient Imaging",
    organization: "Diagnostic Imaging Network",
    category: "Imaging Centers",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&h=200&q=80",
    isPlaceholder: true,
  },
  {
    id: "radiology-group",
    slideNumber: "04",
    quote:
      "Collaborative coverage and communication are valuable when supporting a busy radiology practice and its changing operational needs.",
    authorName: "Radiology Group Leader",
    authorRole: "Clinical Practice President",
    organization: "Specialty Radiology Group",
    category: "Radiology Groups",
    avatar:
      "https://images.unsplash.com/photo-1594824813583-42eb4d57a97a?auto=format&fit=crop&w=200&h=200&q=80",
    isPlaceholder: true,
  },
  {
    id: "clinical-collaboration",
    slideNumber: "05",
    quote:
      "Clear communication between radiologists and the care team plays an important role in coordinating the interpretation and follow-up of imaging findings.",
    authorName: "Clinical Physician Leader",
    authorRole: "Care Team Coordination",
    organization: "Integrated Health Network",
    category: "Clinical Collaboration",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200&q=80",
    isPlaceholder: true,
  },
];

export function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  const totalSlides = TESTIMONIALS.length;
  const currentSlide = TESTIMONIALS[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelect = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Automatic scrolling every 3.2 seconds (paused when offscreen, hovered, focused, or prefers-reduced-motion)
  useEffect(() => {
    if (isPaused || shouldReduceMotion || !isInView) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion, isInView, handleNext]);

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  return (
    <section
      id="resources"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Client Stories and Testimonials"
      className="relative overflow-hidden bg-background py-section lg:py-section-lg scroll-mt-24 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    >
      <DecorativeLines variant="top-right" />
      <div id="testimonials" className="scroll-mt-24" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Client Stories</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Trusted partnerships.
              <span className="block text-primary">Meaningful impact.</span>
            </RevealHeading>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-foreground-muted leading-relaxed">
              Hear from healthcare leaders about their experience working with our teleradiology team.
            </p>
            <p className="mt-2 text-xs text-foreground-subtle">
              These are placeholder testimonials and can be updated with real client stories.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[300px] border-t border-border-strong pt-12">
          {/* Oversized slide number */}
          <div className="md:col-span-4 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentSlide.slideNumber}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: MOTION.easeOut }}
                aria-hidden="true"
                className="select-none font-sans text-[120px] font-extralight leading-none tracking-tighter text-primary/25 tabular-nums sm:text-[160px] lg:text-[200px]"
              >
                {currentSlide.slideNumber}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={currentSlide.id}
                initial={{ opacity: 0, x: direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 16 }}
                transition={{ duration: 0.3, ease: MOTION.easeOut }}
              >
                <Quotes size={32} weight="fill" aria-hidden="true" className="mb-4 text-primary/40" />
                <blockquote className="text-xl sm:text-2xl lg:text-[1.625rem] font-normal leading-relaxed tracking-tight text-foreground text-pretty">
                  &ldquo;{currentSlide.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-surface-muted">
                    <Image src={currentSlide.avatar} alt={currentSlide.authorName} fill sizes="56px" className="object-cover grayscale" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-foreground">{currentSlide.authorName}</span>
                    <span className="mt-0.5 text-sm text-foreground-muted">
                      {currentSlide.authorRole} &nbsp;/&nbsp; {currentSlide.organization}
                    </span>
                    {currentSlide.isPlaceholder && (
                      <span className="mt-1 text-xs italic text-foreground-subtle">
                        Placeholder testimonial – for design purposes only.
                      </span>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
              {TESTIMONIALS.map((t, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive ? "w-10 bg-foreground" : "w-5 bg-border-strong hover:bg-foreground-subtle"
                    )}
                  />
                );
              })}
            </div>
            <span className="ml-2 font-mono text-sm text-foreground-subtle tabular-nums">
              {currentSlide.slideNumber} / 0{totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:bg-surface-muted active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CaretLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CaretRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ClientTestimonials;
