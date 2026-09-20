"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  LockKey,
  UsersThree,
  FileText,
  CloudArrowUp,
  HardDrives,
  ShieldCheck,
  Clock,
  GearSix,
  ArrowRight,
  ArrowDown,
  RadioButton,
  Waves,
  Scan,
  CircleDashed,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  badge?: {
    text: string;
    icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  };
  modalities?: string[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Imaging at Your Facility",
    description:
      "Patient scans are performed at your hospital, imaging center, or emergency department using your existing imaging equipment.",
    image: "/images/accuray-36i9vuZrVjc-unsplash.jpg",
    alt: "Modern CT and MRI scanner suite at a healthcare imaging facility",
    modalities: ["CT", "MRI", "X-Ray", "US", "PET"],
  },
  {
    step: "02",
    title: "Secure Image Transfer",
    description:
      "Studies are securely transferred through supported connections to the radiology workflow for review.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "High-security encrypted healthcare cloud servers and data network",
    badge: {
      text: "Secure & Encrypted Transfer",
      icon: LockKey,
    },
  },
  {
    step: "03",
    title: "Expert Radiologist Review",
    description:
      "Studies are reviewed by qualified radiologists with the appropriate subspecialty expertise and quality processes.",
    image: "/images/accuray-6pQPFuD7nJY-unsplash.jpg",
    alt: "Radiologist interpreting complex diagnostic studies across high-resolution monitors",
    badge: {
      text: "Subspecialty Coverage",
      icon: UsersThree,
    },
  },
  {
    step: "04",
    title: "Structured Reporting",
    description:
      "Flexible pre-read preliminary reports or comprehensive final reads delivered in line with your clinical protocols.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    alt: "Diagnostic radiology reporting software interface and clinical documentation",
    badge: {
      text: "Pre-Read & Final-Read Workflows",
      icon: FileText,
    },
  },
  {
    step: "05",
    title: "Rapid Report Delivery",
    description:
      "Reliable delivery within 12–24 hours for routine cases and sub-30 minute STAT coverage directly to your PACS/RIS.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    alt: "Physician reviewing delivered radiology report on clinical workstation",
    badge: {
      text: "12–24h Turnaround · 24/7 STAT",
      icon: Clock,
    },
  },
];

const CAPABILITIES = [
  {
    title: "12–24h Turnaround",
    description: "Guaranteed turnaround for routine cases, with 24/7 emergency STAT coverage.",
    icon: Clock,
  },
  {
    title: "Pre-Read & Final-Read",
    description: "Flexible preliminary and final-read models tailored to your clinical workflow.",
    icon: FileText,
  },
  {
    title: "PACS & RIS Integrations",
    description: "Seamless bi-directional integration with your existing imaging and EHR systems.",
    icon: HardDrives,
  },
  {
    title: "Secure & Protected",
    description: "HIPAA-compliant, encrypted transmission and SOC2-aligned infrastructure.",
    icon: ShieldCheck,
  },
];

export function TechnologyWorkflow() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-slate-50/50 dark:from-[#080e11] dark:via-[#0a1317] dark:to-[#080e11] py-20 lg:py-28 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Decorative Wave Linework in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-15">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-sky-400"
        >
          <path
            d="M-100 200 C300 400, 700 50, 1100 250 C1300 350, 1500 200, 1600 280"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 250 C350 450, 750 100, 1150 300 C1350 400, 1550 250, 1650 330"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header Block */}
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Subtle Top-Right Tagline Indicator on large screens */}
          <div className="hidden lg:flex absolute -right-48 -top-2 items-center gap-2 text-right">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Connected Radiology — Without Boundaries
            </span>
            <span className="h-px w-6 bg-slate-300 dark:bg-slate-700 inline-block" />
          </div>

          {/* Eyebrow Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
          >
            Technology &amp; Workflow
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            Seamless Workflow. Faster Answers. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Better Patient Care.
            </span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Our secure, technology-enabled workflow helps ensure imaging studies reach the right radiologists quickly and reports are delivered back to your systems reliably and efficiently.
          </motion.p>
        </div>

        {/* 5-Step Visual Workflow */}
        <div className="mt-16 md:mt-20">
          {/* Desktop & Tablet Layout: 5 connected step cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative">
            {WORKFLOW_STEPS.map((stepItem, idx) => {
              const isLast = idx === WORKFLOW_STEPS.length - 1;
              const BadgeIcon = stepItem.badge?.icon;

              return (
                <div key={stepItem.step} className="relative flex flex-col">
                  {/* Step Card */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                    className="flex flex-col h-full group"
                  >
                    {/* Image Container with Number Badge */}
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-900 shadow-md shadow-slate-200/40 dark:shadow-none transition-transform duration-300 group-hover:scale-[1.02]">
                      <Image
                        src={stepItem.image}
                        alt={stepItem.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                      {/* Number Badge at Top-Left */}
                      <div className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-xs font-bold text-sky-600 dark:text-sky-400 shadow-md">
                        {stepItem.step}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="mt-4 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {stepItem.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Modality Indicators or Feature Badge */}
                    <div className="mt-4 pt-1">
                      {stepItem.modalities ? (
                        <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 shadow-xs">
                          {stepItem.modalities.map((mod) => (
                            <span
                              key={mod}
                              className="font-mono text-[10px] font-semibold tracking-wider text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      ) : stepItem.badge ? (
                        <div className="flex items-center gap-2 p-2 rounded-xl border border-sky-200/60 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-950/50 shadow-xs text-left">
                          {BadgeIcon && (
                            <BadgeIcon
                              size={16}
                              weight="bold"
                              className="text-sky-600 dark:text-sky-400 shrink-0"
                            />
                          )}
                          <span className="text-[11px] font-semibold text-sky-800 dark:text-sky-300 leading-tight">
                            {stepItem.badge.text}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>

                  {/* Desktop Step Connector Line & Arrow */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-3.5 top-20 z-20 items-center justify-center pointer-events-none">
                      <div className="flex items-center text-sky-400/80 dark:text-sky-500/80">
                        <span className="w-3 border-t-2 border-dashed border-sky-400/60 dark:border-sky-500/60 inline-block" />
                        <ArrowRight size={14} weight="bold" className="-ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Mobile Downward Connector Arrow */}
                  {!isLast && (
                    <div className="flex md:hidden items-center justify-center py-3 text-sky-400/80 dark:text-sky-500/80">
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
        </div>

        {/* Bottom Technology & Integrations Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70 dark:divide-slate-800/70">
            {CAPABILITIES.map((cap, idx) => {
              const CapIcon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={cn(
                    "flex items-start gap-3.5 px-3 py-2 transition-transform duration-200 hover:translate-y-[-2px]",
                    idx !== 0 && "pt-6 sm:pt-2 lg:pt-2"
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
                    <CapIcon size={20} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {cap.title}
                    </span>
                    <span className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug font-normal">
                      {cap.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
