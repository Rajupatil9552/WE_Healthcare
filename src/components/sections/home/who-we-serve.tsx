"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Buildings,
  CirclesThreePlus,
  Ambulance,
  ShareNetwork,
  ArrowRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { routes } from "@/config/routes";

interface AudienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  }>;
}

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    id: "hospitals",
    title: "Hospitals & Health Systems",
    description:
      "Inpatient, outpatient and critical care reads, reported fast and accurately.",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern hospital building exterior and medical health system entrance",
    href: `${routes.whoWeServe}#hospitals`,
    icon: Buildings,
  },
  {
    id: "imaging-centers",
    title: "Imaging Centers",
    description:
      "Flexible reading capacity that keeps your turnaround times on target.",
    image: "/images/general/accuray-36i9vuZrVjc-unsplash.webp",
    alt: "Modern MRI and CT scanner suite inside an outpatient imaging center",
    href: `${routes.whoWeServe}#imaging-centers`,
    icon: CirclesThreePlus,
  },
  {
    id: "healthcare-networks",
    title: "Healthcare Networks",
    description:
      "One reporting partner for imaging across all your hospitals and sites.",
    image: "/images/who-we-serve/healthcare-network-city-lights.webp",
    alt: "Aerial night view of a metropolitan area with lit roads connecting neighborhoods",
    href: `${routes.whoWeServe}#healthcare-networks`,
    icon: ShareNetwork,
  },
  {
    id: "emergency-departments",
    title: "Emergency Departments",
    description:
      "24x7 STAT reads with critical findings phoned directly to your physicians.",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    alt: "Hospital emergency department clinical care and trauma triage",
    href: `${routes.whoWeServe}#emergency-departments`,
    icon: Ambulance,
  },
];

export function WhoWeServe() {
  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden bg-background py-section lg:py-section-lg scroll-mt-24"
    >
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Who We Serve</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
            Supporting the Entire <br />
            Care Continuum
          </RevealHeading>
          <p className="mt-5 max-w-[60ch] text-base text-foreground-muted leading-relaxed">
            We partner with healthcare organizations across the continuum to
            provide reliable, high-quality radiology services tailored to their
            unique needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {AUDIENCE_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: MOTION.easeOut,
                }}
                className="group relative flex h-[460px] flex-col justify-end overflow-hidden rounded-lg bg-slate-950 p-6 md:p-7"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent"
                />

                <div className="relative">
                  <IconComponent
                    size={26}
                    weight="light"
                    aria-hidden="true"
                    className="text-white/80"
                  />
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white">
                      Learn more
                    </span>
                    <ArrowRight
                      size={15}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServe;
