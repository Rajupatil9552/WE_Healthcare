"use client";

import { motion } from "motion/react";
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
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";

interface ClinicalValueCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number; weight?: "light" | "regular" | "bold" | "fill" }>;
}

const CLINICAL_CARDS: ClinicalValueCard[] = [
  {
    id: "subspecialty",
    title: "Subspecialty Expertise",
    description: "Access to radiologists with expertise across relevant diagnostic imaging subspecialties.",
    icon: UserCheck,
  },
  {
    id: "quality",
    title: "Quality Assurance",
    description: "Quality-focused review processes designed to support accurate and consistent reporting.",
    icon: ShieldCheck,
  },
  {
    id: "peer-review",
    title: "Peer Review",
    description: "Structured peer review and case discussion, where included in the organization’s clinical processes.",
    icon: UsersThree,
  },
  {
    id: "communication",
    title: "Physician-to-Physician Communication",
    description: "Clear communication pathways for discussing critical or complex findings with the care team.",
    icon: ChatCircleDots,
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
  return (
    <section id="services" className="relative overflow-hidden bg-background py-section lg:py-section-lg scroll-mt-24">
      <DecorativeLines variant="right" />
      <div id="modalities" className="scroll-mt-24" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left: heading + ruled value list */}
          <div className="lg:col-span-6">
            <p className="eyebrow">Clinical Expertise &amp; Quality</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Expert Radiologists.
              <span className="block text-primary">Trusted Results.</span>
            </RevealHeading>
            <p className="mt-6 max-w-[58ch] text-base text-foreground-muted leading-relaxed">
              Our radiologists bring deep subspecialty expertise and a commitment to clinical excellence, supported by a rigorous quality assurance process and clear communication with your care team.
            </p>

            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-border">
              {CLINICAL_CARDS.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.li
                    key={card.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05, ease: MOTION.easeOut }}
                    className="border-b border-border py-6"
                  >
                    <CardIcon size={22} weight="light" aria-hidden="true" className="text-primary" />
                    <h3 className="mt-4 text-base font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">{card.description}</p>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Right: quote, photo, and the clinical panel overlapping the photo */}
          <div className="lg:col-span-6">
            <blockquote className="flex gap-3 border-l-2 border-primary/40 pl-4">
              <Quotes size={20} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-base font-medium italic text-foreground leading-snug">
                  &ldquo;Our focus is simple — accurate interpretation, clear communication, and better patient outcomes.&rdquo;
                </p>
                <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
                  Clinical Excellence In Every Study
                </footer>
              </div>
            </blockquote>

            <div className="relative mt-8">
              <Figure
                src="/images/general/accuray-6pQPFuD7nJY-unsplash.jpg"
                alt="Radiologist interpreting diagnostic studies across high-resolution monitors"
                aspect="aspect-[4/3] lg:aspect-[5/6]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                parallax
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: MOTION.easeOut }}
                className="relative -mt-16 ml-4 mr-4 rounded-lg border border-border bg-card p-5 shadow-lg sm:ml-auto sm:mr-6 sm:w-72 lg:absolute lg:-left-10 lg:bottom-10 lg:ml-0 lg:mt-0"
              >
                <div className="flex gap-3">
                  <Brain size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">Subspecialties</p>
                    <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
                      {SUBSPECIALTIES.map((sub) => (
                        <li key={sub}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="my-4 border-t border-border" />
                <div className="flex gap-3">
                  <Clock size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">24/7 Coverage</p>
                    <p className="text-xs text-foreground-muted">Radiologist Availability</p>
                  </div>
                </div>
                <div className="my-4 border-t border-border" />
                <div className="flex gap-3">
                  <Handshake size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Collaborative</p>
                    <p className="text-xs text-foreground-muted">Clinical Care Team Approach</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Commitment row: same palette as the page, ruled rather than a dark block */}
        <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-border-strong pt-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">Our Commitment</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground text-balance">
              A Culture of Quality and Safety
            </h3>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMMITMENT_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <li key={item.title}>
                  <ItemIcon size={22} weight="light" aria-hidden="true" className="text-primary" />
                  <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted leading-snug">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default ClinicalExpertise;
