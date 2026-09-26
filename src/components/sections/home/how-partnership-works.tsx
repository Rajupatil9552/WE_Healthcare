"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MagnifyingGlass,
  GearSix,
  ShareNetwork,
  ChartBar,
  Headset,
  ArrowRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { routes } from "@/config/routes";

interface PartnershipStep {
  stepNumber: number;
  title: string;
  description: string;
  checklist: string[];
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "light" | "regular" | "bold" | "fill" }>;
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
    image: "/images/general/accuray-nhZWIUJBVVc-unsplash.jpg",
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
    image: "/images/general/accuray-eRJCXdb3Q48-unsplash.jpg",
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

export function HowPartnershipWorks() {
  return (
    <section id="our-approach" className="relative overflow-hidden bg-surface py-section lg:py-section-lg scroll-mt-24">
      <DecorativeLines variant="top-right" />
      <div id="how-it-works" className="scroll-mt-24" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">How Partnership Works</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              A Simple Process.
              <span className="block text-primary">A Stronger Partnership.</span>
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">
            We work closely with your team to ensure a smooth and efficient implementation, with support at every step.
          </p>
        </div>

        <div className="mt-14 lg:mt-16 grid grid-cols-1 xl:grid-cols-[1fr_14rem] gap-8 xl:gap-10">
          {/* Four steps on a shared rule */}
          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: MOTION.easeOut }}
              className="absolute inset-x-0 -top-6 hidden lg:block h-px origin-left bg-primary"
            />
            {PARTNERSHIP_STEPS.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              return (
                <motion.li
                  key={stepItem.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: MOTION.easeOut }}
                  className="flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-muted">
                    <Image
                      src={stepItem.image}
                      alt={stepItem.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="font-mono text-sm text-primary tabular-nums">
                      {String(stepItem.stepNumber).padStart(2, "0")}
                    </span>
                    <StepIcon size={18} weight="light" aria-hidden="true" className="text-foreground-subtle" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{stepItem.title}</h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{stepItem.description}</p>
                  <ul className="mt-4 border-t border-border">
                    {stepItem.checklist.map((item) => (
                      <li key={item} className="flex gap-2.5 border-b border-border py-2.5 text-sm text-foreground">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ol>

          <blockquote className="self-start border-l-2 border-primary/40 pl-4 xl:mt-10">
            <p className="text-base italic text-foreground-muted leading-relaxed">
              &ldquo;A collaborative approach from day one helps ensure a smooth transition and long-term success.&rdquo;
            </p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
              Built Around Your Team
            </footer>
          </blockquote>
        </div>

        {/* Consultation band */}
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-lg bg-primary-soft px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Headset size={30} weight="light" aria-hidden="true" className="shrink-0 text-primary" />
            <div>
              <p className="eyebrow">Ready to Get Started?</p>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-foreground text-balance">
                Let&apos;s discuss how we can support your radiology needs.
              </h3>
            </div>
          </div>
          <Link href={routes.contact} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group shrink-0")}>
            <span>Request a Demo</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default HowPartnershipWorks;
