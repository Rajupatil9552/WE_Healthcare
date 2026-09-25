"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Buildings } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

interface FacilitySupportCard {
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  highlights: string[];
}

const SUPPORTED_FACILITIES: FacilitySupportCard[] = [
  {
    number: "01",
    title: "Hospitals",
    tagline: "Inpatient, Emergency & Surgical Coverage",
    description:
      "Scalable 24/7/365 diagnostic reporting support tailored to hospital medical staff bylaws and complex case mix.",
    image: "/images/audiences/hospital.jpg",
    alt: "Modern hospital health system clinical facility",
    highlights: ["24/7/365 Inpatient & ER", "Subspecialty Consultations", "Hospital EHR/PACS Integration"],
  },
  {
    number: "02",
    title: "Imaging Centers",
    tagline: "Outpatient Multi-Modality Turnaround",
    description:
      "High-quality subspecialty reads across MRI, CT, and ultrasound delivered with dependable routine turnaround.",
    image: "/images/audiences/imaging-center.jpg",
    alt: "Outpatient medical imaging center diagnostic suite",
    highlights: ["Specialized MSK & Neuro", "Referring Physician Retention", "Elastic Volume Scaling"],
  },
  {
    number: "03",
    title: "Emergency Departments",
    tagline: "High-Acuity STAT Interpretation",
    description:
      "Rapid diagnostic preliminary and final interpretations with immediate escalation pathways for acute trauma care.",
    image: "/images/audiences/emergency-department.jpg",
    alt: "Hospital emergency department clinical triage setting",
    highlights: ["STAT Prioritization", "Direct Physician Telephone", "Closed-Loop Escalations"],
  },
  {
    number: "04",
    title: "Healthcare Networks",
    tagline: "Regional Multi-Site Standardization",
    description:
      "Centralized reporting infrastructure standardizing diagnostic quality across regional ambulatory centers and clinics.",
    image: "/images/audiences/healthcare-network.jpg",
    alt: "Regional healthcare network clinical facilities",
    highlights: ["Unified Multi-Site Worklist", "Consistent Report Templates", "Consolidated Operational Visibility"],
  },
];

export function WhoWeSupportSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="who-we-support"
      className="py-20 lg:py-28 bg-white dark:bg-[#080e12] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <Buildings size={14} weight="bold" className="text-sky-500" />
            <span>TELERADIOLOGY SUPPORT FOR HEALTHCARE ORGANIZATIONS</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Supporting a Wide Range of Healthcare Providers
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Tailored coverage models engineered around the clinical acuity and volume requirements of your facility.
          </motion.p>
        </div>

        {/* 4 Cards Grid (01 -> 02 -> 03 -> 04 Reveal with 120ms Stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPORTED_FACILITIES.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : 0.08 + idx * 0.12, // 100-150ms stagger
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0c141a] overflow-hidden shadow-xs hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-700/80 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Visual Image Container with Subtle Scale on Hover */}
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Gradient & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-85" />

                  {/* Top Numeric Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                      {card.number}
                    </span>
                  </div>

                  {/* Floating Tagline at Bottom of Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-semibold text-sky-200 uppercase tracking-wide">
                      {card.tagline}
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6 text-left">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  {/* Key Operational Highlights */}
                  <ul className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    {card.highlights.map((item) => (
                      <li key={item} className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span className="size-1.5 rounded-full bg-sky-500 dark:bg-sky-400 mr-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Consultation Link with Arrow translateX(0 -> 4px) */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors"
                >
                  <span>Explore Coverage</span>
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhoWeSupportSection;
