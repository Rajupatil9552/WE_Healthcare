"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { Quotes, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
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

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Client Stories and Testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-sky-50/20 dark:from-[#080e11] dark:via-[#0a1317] dark:to-[#080e11] py-20 lg:py-28 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
    >
      {/* Decorative Large Circular Wave on Left Side */}
      <div className="pointer-events-none absolute -left-48 lg:-left-32 top-1/2 -translate-y-1/2 size-[500px] lg:size-[680px] rounded-full border border-sky-100/70 dark:border-sky-900/20 bg-gradient-to-br from-sky-50/30 via-transparent to-transparent opacity-60 dark:opacity-20" />
      <div className="pointer-events-none absolute -left-28 lg:-left-12 top-1/2 -translate-y-1/2 size-[360px] lg:size-[480px] rounded-full border border-sky-200/40 dark:border-sky-900/30 opacity-40 dark:opacity-10" />

      {/* Decorative Subtle Radiology Workstation Image on Far Right */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden select-none opacity-25 dark:opacity-10">
        <Image
          src="/images/accuray-6pQPFuD7nJY-unsplash.jpg"
          alt="Radiology diagnostics environment"
          fill
          sizes="(max-width: 1024px) 50vw, 42vw"
          className="object-cover object-left"
          priority={false}
        />
        {/* Horizontal Smooth Fade Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-35% to-transparent dark:from-[#080e11] dark:via-[#080e11]/80 dark:via-35% dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white dark:from-[#080e11]/70 dark:via-transparent dark:to-[#080e11]" />
      </div>

      {/* Outer Edge Accent Labels (Desktop only) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-start text-left pointer-events-none z-10">
        <span className="h-px w-6 bg-sky-300 dark:bg-sky-700 mb-3" />
        <span className="font-mono text-[9px] font-semibold tracking-[0.24em] text-slate-400 dark:text-slate-500 uppercase leading-relaxed">
          People <br />
          Technology <br />
          Better Care
        </span>
      </div>

      <div className="hidden xl:flex absolute right-8 top-12 flex-row items-center gap-3 text-right pointer-events-none z-10">
        <span className="font-mono text-[9px] font-semibold tracking-[0.22em] text-slate-400 dark:text-slate-500 uppercase">
          Radiology <br />
          Without <br />
          Boundaries
        </span>
        <span className="h-px w-6 bg-sky-300 dark:bg-sky-700" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge with Flanking Lines */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 justify-center"
          >
            <span className="h-px w-6 bg-sky-200 dark:bg-sky-800 hidden sm:inline-block" />
            <span className="inline-flex items-center rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm">
              Client Stories
            </span>
            <span className="h-px w-6 bg-sky-200 dark:bg-sky-800 hidden sm:inline-block" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            Trusted partnerships. <br />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Meaningful impact.
            </span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Hear from healthcare leaders about their experience working with our teleradiology team.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.25 }}
            className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-normal"
          >
            These are placeholder testimonials and can be updated with real client stories.
          </motion.p>
        </div>

        {/* Main Testimonial Stage */}
        <div className="mt-14 md:mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center min-h-[300px]">
            {/* Oversized Slide Number on Left */}
            <div className="md:col-span-4 lg:col-span-4 flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.slideNumber}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="font-extralight tracking-tighter select-none font-sans text-sky-200/80 dark:text-sky-900/50 text-[120px] sm:text-[160px] lg:text-[210px] leading-none"
                >
                  {currentSlide.slideNumber}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Central Testimonial Quote & Attribution */}
            <div className="md:col-span-8 lg:col-span-8 flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: direction * 24 }
                  }
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  exit={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, x: -direction * 24 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  {/* Quote Icon */}
                  <Quotes
                    size={40}
                    weight="fill"
                    className="text-sky-300 dark:text-sky-700/60 mb-3 sm:mb-4"
                  />

                  {/* Testimonial Quote Text */}
                  <blockquote className="text-xl sm:text-2xl lg:text-[26px] font-normal text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight">
                    &ldquo;{currentSlide.quote}&rdquo;
                  </blockquote>

                  {/* Author Attribution Block */}
                  <div className="mt-8 flex items-center gap-4">
                    {/* Circular Grayscale Avatar */}
                    <div className="relative size-13 sm:size-14 shrink-0 rounded-full overflow-hidden border-2 border-slate-200/90 dark:border-slate-700/90 shadow-sm bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={currentSlide.avatar}
                        alt={currentSlide.authorName}
                        fill
                        sizes="56px"
                        className="object-cover grayscale"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                          {currentSlide.authorName}
                        </span>
                      </div>
                      <span className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                        {currentSlide.authorRole} &nbsp;/&nbsp; {currentSlide.organization}
                      </span>
                      {currentSlide.isPlaceholder && (
                        <span className="mt-1 text-[11px] italic text-slate-400 dark:text-slate-500">
                          Placeholder testimonial – for design purposes only.
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Controls Bottom Row */}
          <div className="mt-12 sm:mt-16 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/70 pt-6">
            {/* Pagination Indicators & Counter */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Testimonial slides"
              >
                {TESTIMONIALS.map((t, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelect(idx)}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                        isActive
                          ? "w-8 sm:w-10 bg-[#1c4d74] dark:bg-sky-400"
                          : "w-5 sm:w-6 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                      )}
                    />
                  );
                })}
              </div>

              {/* Counter Display */}
              <span className="ml-2 font-mono text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {currentSlide.slideNumber} / 0{totalSlides}
              </span>
            </div>

            {/* Next and Previous Arrow Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <CaretLeft size={18} weight="bold" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex size-10 items-center justify-center rounded-full bg-[#1c4d74] hover:bg-[#153a57] dark:bg-sky-600 dark:hover:bg-sky-500 text-white transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
