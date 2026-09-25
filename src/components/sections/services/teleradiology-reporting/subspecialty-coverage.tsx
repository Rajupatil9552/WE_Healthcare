"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

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
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="subspecialty-coverage"
      className="py-20 lg:py-28 bg-white dark:bg-[#080e11] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <span>BUILT AROUND YOUR RADIOLOGY OPERATION</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Subspecialty Reporting and Flexible Coverage
          </motion.h2>
        </div>

        {/* Two Large Premium Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.18, // 150-200ms stagger
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-slate-950 shadow-xl shadow-slate-300/30 dark:shadow-black/60 min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex flex-col justify-end"
            >
              {/* Card Image with subtle 1 -> 1.04 scale on hover */}
              <div className="absolute inset-0 size-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Dark Gradient Overlay with subtle opacity transition on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/20 transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />

              {/* Content Panel */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {card.title}
                </h3>

                <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-lg">
                  {card.description}
                </p>

                {/* Interactive Action Link with 0 -> 4px arrow translate */}
                <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 group-hover:text-sky-300 transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1" // 4px translate
                    />
                  </Link>
                  <div className="size-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 transition-all duration-300">
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SubspecialtyCoverageSection;
