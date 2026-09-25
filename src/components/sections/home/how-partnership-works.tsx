"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  MagnifyingGlass,
  GearSix,
  ShareNetwork,
  ChartBar,
  CheckCircle,
  Headset,
  ArrowRight,
  ArrowDown,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface PartnershipStep {
  stepNumber: number;
  title: string;
  description: string;
  checklist: string[];
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
}

const PARTNERSHIP_STEPS: PartnershipStep[] = [
  {
    stepNumber: 1,
    title: "Discovery",
    description: "We learn about your organization, goals, and current radiology workflow.",
    checklist: [
      "Understand your needs",
      "Discuss coverage goals",
      "Align on expectations",
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    alt: "Healthcare leadership in a discovery and consultation meeting",
    icon: MagnifyingGlass,
  },
  {
    stepNumber: 2,
    title: "Workflow Assessment",
    description: "We evaluate your clinical, technical, and operational requirements.",
    checklist: [
      "Review current systems",
      "Map workflows",
      "Identify integration needs",
    ],
    image: "/images/accuray-nhZWIUJBVVc-unsplash.jpg",
    alt: "Clinical and IT teams reviewing medical imaging workflows on diagnostic screens",
    icon: GearSix,
  },
  {
    stepNumber: 3,
    title: "Integration & Onboarding",
    description: "Our team works with your IT and clinical staff to ensure a smooth, secure setup.",
    checklist: [
      "PACS/RIS integration",
      "Testing and validation",
      "Training and go-live support",
    ],
    image: "/images/accuray-eRJCXdb3Q48-unsplash.jpg",
    alt: "Healthcare IT and radiology staff collaborating at medical workstation",
    icon: ShareNetwork,
  },
  {
    stepNumber: 4,
    title: "Ongoing Coverage",
    description: "We provide reliable radiology coverage with continuous operational support.",
    checklist: [
      "Responsive support",
      "Performance monitoring",
      "Ongoing partnership and growth",
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    alt: "Clinical support professional providing ongoing responsive healthcare communication",
    icon: ChartBar,
  },
];

/**
 * Animated Step Badge:
 * Smooth count-up from "00" to target number ("01", "02", etc.)
 * with sequential delay and guaranteed settling.
 */
function AnimatedStepBadge({
  targetNumber,
  delay = 0,
  shouldReduceMotion = false,
}: {
  targetNumber: number;
  delay?: number;
  shouldReduceMotion?: boolean;
}) {
  const [currentNum, setCurrentNum] = useState(shouldReduceMotion ? targetNumber : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentNum(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, [shouldReduceMotion, targetNumber, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || shouldReduceMotion) return;

    const timeout = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        if (count >= targetNumber) {
          setCurrentNum(targetNumber);
          clearInterval(interval);
        } else {
          setCurrentNum(count);
        }
      }, 140);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [hasAnimated, targetNumber, delay, shouldReduceMotion]);

  const formatted = String(currentNum).padStart(2, "0");

  return (
    <div
      ref={badgeRef}
      className="flex size-10 items-center justify-center rounded-full bg-sky-50/95 dark:bg-slate-900 border border-sky-300 dark:border-sky-700/80 text-xs font-bold text-sky-700 dark:text-sky-300 shadow-md backdrop-blur-md transition-transform duration-300"
    >
      <span className="font-mono tracking-tight">{formatted}</span>
    </div>
  );
}

export function HowPartnershipWorks() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-slate-50/50 dark:from-[#080e11] dark:via-[#091419] dark:to-[#080e11] py-20 lg:py-28 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Background Subtle Gradient Curve Linework */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-15">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-sky-400"
        >
          <path
            d="M-50 200 C320 400, 720 100, 1120 260 C1320 360, 1500 200, 1600 280"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-100 260 C280 460, 780 140, 1180 320 C1380 420, 1580 260, 1680 340"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
          >
            How Partnership Works
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            A Simple Process. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              A Stronger Partnership.
            </span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            We work closely with your team to ensure a smooth and efficient implementation, with support at every step.
          </motion.p>
        </div>

        {/* Main Content Area: 4 Cards Row + Right Supporting Quote Block */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col xl:flex-row items-stretch gap-6 xl:gap-8 relative">
            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 flex-1 relative">
              {PARTNERSHIP_STEPS.map((stepItem, idx) => {
                const isLast = idx === PARTNERSHIP_STEPS.length - 1;
                const StepIcon = stepItem.icon;

                return (
                  <div key={stepItem.title} className="relative flex flex-col">
                    {/* Card Container */}
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: shouldReduceMotion ? 0 : idx * 0.12,
                      }}
                      className="flex flex-col h-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-700/60 overflow-hidden group"
                    >
                      {/* Top Image Container with Overlapping Number Badge */}
                      <div className="relative h-44 sm:h-46 w-full overflow-hidden bg-slate-900">
                        <Image
                          src={stepItem.image}
                          alt={stepItem.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                        {/* Numbered Animated Badge at Top-Left */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <AnimatedStepBadge
                            targetNumber={stepItem.stepNumber}
                            delay={idx * 0.18}
                            shouldReduceMotion={shouldReduceMotion ?? false}
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        {/* Circular Transition Icon Badge Overlapping Image Edge */}
                        <div className="-mt-11 mb-3 relative z-10">
                          <div className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400 shadow-md transition-transform duration-200 group-hover:scale-105">
                            <StepIcon size={18} weight="bold" />
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {stepItem.title}
                        </h3>

                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {stepItem.description}
                        </p>

                        {/* Checklist with Solid Filled Blue Check Icons */}
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex-1">
                          <ul className="space-y-2">
                            {stepItem.checklist.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug"
                              >
                                <CheckCircle
                                  size={15}
                                  weight="fill"
                                  className="text-sky-500 shrink-0 mt-0.5"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    {/* Desktop Connecting Arrow between cards */}
                    {!isLast && (
                      <div className="hidden lg:flex absolute -right-3 top-24 z-20 items-center justify-center pointer-events-none">
                        <div className="flex items-center text-sky-400/80 dark:text-sky-500/80">
                          <span className="w-3 border-t-2 border-dashed border-sky-400/60 dark:border-sky-500/60 inline-block" />
                          <ArrowRight size={14} weight="bold" className="-ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Mobile Connecting Arrow (Vertical Downward) */}
                    {!isLast && (
                      <div className="flex sm:hidden items-center justify-center py-3 text-sky-400/80 dark:text-sky-500/80">
                        <div className="flex flex-col items-center">
                          <span className="h-4 border-l-2 border-dashed border-sky-400/60 dark:border-sky-500/60 inline-block" />
                          <ArrowDown size={14} weight="bold" className="-mt-1 text-sky-500" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right-Side Supporting Quote Block */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
              className="hidden xl:flex w-56 shrink-0 flex-col justify-center py-4 pl-4 border-l border-slate-200/70 dark:border-slate-800/70"
            >
              {/* Quote & Subtitle */}
              <div>
                <span className="text-3xl text-slate-800 dark:text-slate-300 font-serif leading-none block select-none">
                  &ldquo;
                </span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  A collaborative approach from day one helps ensure a smooth transition and long-term success.
                </p>
                <div className="mt-2 h-px w-10 bg-slate-300 dark:bg-slate-700" />
                <span className="block mt-3 font-mono text-[9px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                  Built Around Your Team
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile / Tablet Supporting Quote Banner */}
        <div className="xl:hidden mt-10 text-center max-w-xl mx-auto px-4">
          <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
            &ldquo;A collaborative approach from day one helps ensure a smooth transition and long-term success.&rdquo;
          </p>
          <span className="block mt-1.5 font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Built Around Your Team
          </span>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-16 md:mt-20 rounded-3xl border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/80 dark:bg-sky-950/40 p-6 sm:p-8 lg:p-9 shadow-sm backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sky-100/90 dark:bg-sky-900/60 text-sky-600 dark:text-sky-400 shadow-sm">
                <Headset size={26} weight="bold" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-sky-600 dark:text-sky-400">
                  Ready to Get Started?
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Let&apos;s discuss how we can support your radiology needs.
                </h3>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1c4d74] hover:bg-[#153a57] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold text-sm px-7 py-3.5 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Request a Demo</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
