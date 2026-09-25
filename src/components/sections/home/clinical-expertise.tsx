"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  ShieldCheck,
  UserCheck,
  UsersThree,
  ChatCircleDots,
  Clock,
  Article,
  GraduationCap,
  Quotes,
  Handshake,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface ClinicalValueCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "bold" | "regular" | "fill" }>;
  bgClass: string;
  iconColorClass: string;
}

const CLINICAL_CARDS: ClinicalValueCard[] = [
  {
    id: "subspecialty",
    title: "Subspecialty Expertise",
    description: "Access to radiologists with expertise across relevant diagnostic imaging subspecialties.",
    icon: UserCheck,
    bgClass: "bg-sky-100/90 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/40",
    iconColorClass: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "quality",
    title: "Quality Assurance",
    description: "Quality-focused review processes designed to support accurate and consistent reporting.",
    icon: ShieldCheck,
    bgClass: "bg-sky-100/90 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/40",
    iconColorClass: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "peer-review",
    title: "Peer Review",
    description: "Structured peer review and case discussion, where included in the organization’s clinical processes.",
    icon: UsersThree,
    bgClass: "bg-sky-100/90 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/40",
    iconColorClass: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "communication",
    title: "Physician-to-Physician Communication",
    description: "Clear communication pathways for discussing critical or complex findings with the care team.",
    icon: ChatCircleDots,
    bgClass: "bg-sky-100/90 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/40",
    iconColorClass: "text-sky-600 dark:text-sky-400",
  },
];

const SUBSPECIALTIES = [
  "Neuroradiology",
  "Body Imaging",
  "Musculoskeletal",
  "Cardiothoracic",
  "Pediatric Radiology",
  "Emergency Radiology",
];

const COMMITMENT_ITEMS = [
  {
    title: "Case Review",
    description: "Structured review processes",
    icon: Article,
  },
  {
    title: "Continuous Learning",
    description: "Ongoing education and training",
    icon: GraduationCap,
  },
  {
    title: "Clinical Guidelines",
    description: "Evidence-based interpretation",
    icon: ShieldCheck,
  },
  {
    title: "Better Outcomes",
    description: "Supporting confident clinical decisions",
    icon: UsersThree,
  },
];

export function ClinicalExpertise() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#080e11] py-16 lg:py-24 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Integrated Right-Side Medical Photo with Seamless Gradient Blend */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-24 lg:bottom-28 w-full md:w-[62%] lg:w-[58%] select-none overflow-hidden hidden md:block z-0">
        <Image
          src="/images/accuray-6pQPFuD7nJY-unsplash.jpg"
          alt="Radiologist interpreting diagnostic studies across high-resolution monitors"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-right-top lg:object-center"
          priority={false}
        />
        {/* Horizontal Gradient Mask: Seamless white fade on the left blending into the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-35% to-transparent dark:from-[#080e11] dark:via-[#080e11]/85 dark:via-35% dark:to-transparent" />
        {/* Top and bottom subtle vignettes for soft section boundaries */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/95 dark:from-[#080e11]/80 dark:via-transparent dark:to-[#080e11]/95" />
      </div>

      {/* Background Subtle Wave Linework */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25 dark:opacity-10 z-0">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-sky-400"
        >
          <path
            d="M-50 180 C320 380, 720 80, 1120 220 C1320 320, 1500 180, 1600 240"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-100 240 C280 440, 780 120, 1180 280 C1380 380, 1580 220, 1680 300"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Main Editorial Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start min-h-[540px]">
          {/* Left Column: Heading & 2x2 Value Cards */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-between z-10">
            <div>
              {/* Pill Eyebrow */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
              >
                Clinical Expertise &amp; Quality
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
              >
                Expert Radiologists. <br />
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Trusted Results.
                </span>
              </motion.h2>

              {/* Supporting Description */}
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
              >
                Our radiologists bring deep subspecialty expertise and a commitment to clinical excellence, supported by a rigorous quality assurance process and clear communication with your care team.
              </motion.p>
            </div>

            {/* 2x2 Clinical Value Cards Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {CLINICAL_CARDS.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.15 + idx * 0.08,
                    }}
                    className="flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-3.5 mb-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform duration-300 group-hover:scale-105",
                          card.bgClass
                        )}
                      >
                        <CardIcon size={20} weight="bold" className={card.iconColorClass} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Quote on Top & Floating Panel over Image */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-between items-end h-full min-h-[440px] lg:min-h-[520px] relative z-10 pointer-events-auto">
            {/* Top-Right Quote Banner */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.15 }}
              className="w-full max-w-sm ml-auto text-left lg:text-left mb-6"
            >
              <div className="flex items-start gap-2.5">
                <Quotes size={24} weight="fill" className="text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs md:text-sm italic text-slate-700 dark:text-slate-300 leading-snug font-medium">
                    &ldquo;Our focus is simple — accurate interpretation, clear communication, and better patient outcomes.&rdquo;
                  </p>
                  <span className="block mt-1 font-mono text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                    Clinical Excellence In Every Study
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mobile Fallback Image Container (for screens < 768px where absolute background is hidden) */}
            <div className="md:hidden relative h-64 w-full rounded-2xl overflow-hidden my-4 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <Image
                src="/images/accuray-6pQPFuD7nJY-unsplash.jpg"
                alt="Radiologist interpreting diagnostic studies"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating Clinical Information Panel (Right-aligned, seamlessly overlaid over monitors) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.35 }}
              className="mt-auto w-full sm:w-[260px] md:w-[280px] ml-auto rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md"
            >
              {/* 1. Subspecialty Coverage List */}
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
                  <Brain size={18} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Subspecialties
                  </span>
                  <ul className="mt-1.5 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
                    {SUBSPECIALTIES.map((sub) => (
                      <li key={sub} className="flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-sky-500" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="my-3.5 border-t border-slate-200/70 dark:border-slate-800/70" />

              {/* 2. Availability */}
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
                  <Clock size={18} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    24/7 Coverage
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                    Radiologist Availability
                  </span>
                </div>
              </div>

              <div className="my-3.5 border-t border-slate-200/70 dark:border-slate-800/70" />

              {/* 3. Collaborative Clinical Approach */}
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
                  <Handshake size={18} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Collaborative
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                    Clinical Care Team Approach
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navy Commitment Strip */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-16 md:mt-20 rounded-2xl border border-sky-950/60 bg-[#081724] dark:bg-[#07131e] p-6 sm:p-8 text-white shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
            {/* Left Header in Commitment Band */}
            <div className="flex flex-col shrink-0 lg:max-w-[260px]">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-400">
                Our Commitment
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                A Culture of Quality and Safety
              </h3>
            </div>

            {/* Desktop Vertical Separator */}
            <div className="hidden lg:block w-px h-16 bg-slate-700/60 shrink-0" />

            {/* 4 Commitment Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 flex-1 items-start">
              {COMMITMENT_ITEMS.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5 group">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/10 text-sky-400 transition-transform duration-200 group-hover:scale-105">
                      <ItemIcon size={20} weight="bold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white leading-tight">
                        {item.title}
                      </span>
                      <span className="mt-1 text-xs text-slate-300 leading-snug font-normal">
                        {item.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
