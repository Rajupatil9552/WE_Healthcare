"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MoonStars, Siren, Stack, Brain, Buildings } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { MOTION } from "@/lib/motion";
import { getAudience } from "@/content/who-we-serve";
import { AudienceEyebrow } from "./who-we-support";

const AUDIENCE = getAudience("hospitals");
/** One icon per bullet, in content order. */
const BULLET_ICONS = [MoonStars, Siren, Stack, Brain, Buildings];
const DEPARTMENTS = ["Inpatient", "Emergency", "Outpatient"];

/** Hospitals & Health Systems: large photo left, needs as icon tiles right. */
export function HospitalsSection() {
  return (
    <section id={AUDIENCE.id} className="relative overflow-clip scroll-mt-28 bg-background pt-16 pb-section lg:pt-24 lg:pb-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <Figure
              src={AUDIENCE.image.src}
              alt={AUDIENCE.image.alt}
              aspect="aspect-[4/3] lg:aspect-[5/6]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              imageClassName={AUDIENCE.image.position}
              parallax
            />
            {/* Department chips */}
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
              className="absolute bottom-5 left-5 flex flex-wrap gap-2"
            >
              {DEPARTMENTS.map((d) => (
                <motion.li
                  key={d}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-900 shadow-md backdrop-blur"
                >
                  {d}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-6">
            <AudienceEyebrow id={AUDIENCE.id} />
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{AUDIENCE.title}</RevealHeading>
            <p className="mt-5 max-w-[56ch] text-lead text-foreground-muted">{AUDIENCE.body}</p>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AUDIENCE.bullets.map((b, i) => {
                const Icon = BULLET_ICONS[i];
                return (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: MOTION.easeOut }}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md last:sm:col-span-2"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon size={22} weight="duotone" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-medium text-foreground">{b}</span>
                  </motion.li>
                );
              })}
            </ul>

            <Link
              href={AUDIENCE.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">{AUDIENCE.cta.label}</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HospitalsSection;
