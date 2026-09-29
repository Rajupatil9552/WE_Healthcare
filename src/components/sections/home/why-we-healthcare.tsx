"use client";

import { motion } from "motion/react";
import {
  ChatCircleText,
  CheckCircle,
  Clock,
  FileText,
  TrendUp,
  UserPlus,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";

interface Reason {
  title: string;
  description: string;
  icon: Icon;
}

const REASONS: Reason[] = [
  {
    title: "No headcount expansion",
    description: "Flexible radiologist capacity without growing your permanent staff.",
    icon: UserPlus,
  },
  {
    title: "Two credentialed reading teams",
    description:
      "ABR-certified U.S. radiologists for final reads, with an India-based team for preliminary reads.",
    icon: CheckCircle,
  },
  {
    title: "Coverage on your hours",
    description: "Designed around your actual volume and operating hours, not ours.",
    icon: Clock,
  },
  {
    title: "Your report format",
    description: "Report formats and workflow requirements agreed to your standard.",
    icon: FileText,
  },
  {
    title: "Scales with your volume",
    description: "Support that flexes up or down as imaging demand changes.",
    icon: TrendUp,
  },
  {
    title: "Dedicated coordination",
    description: "Ongoing operational support throughout the engagement.",
    icon: ChatCircleText,
  },
];

export function WhyWeHealthcare() {
  return (
    <section
      id="why-we-healthcare"
      className="relative overflow-hidden bg-background py-section lg:py-section-lg scroll-mt-24"
    >
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Why WE Healthcare</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Built Around
              <span className="block text-primary">How You Already Work.</span>
            </RevealHeading>
          </div>
          <p className="max-w-[46ch] text-base leading-relaxed text-foreground-muted">
            Reliable radiology coverage that fits your team, your hours and your
            reporting standards, without the overhead of hiring.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-14">
          {REASONS.map(({ title, description, icon: Icon }, idx) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: MOTION.easeOut }}
              className="group flex gap-5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                <Icon size={22} weight="duotone" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-foreground-muted">{description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default WhyWeHealthcare;
