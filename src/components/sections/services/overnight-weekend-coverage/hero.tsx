"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

const HIGHLIGHTS = [
  "U.S. board-certified diagnostic radiologists on nocturnal duty",
  "Direct telephone escalation for acute and emergent STAT findings",
  "Clean morning worklist handover with zero unread patient backlog",
];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function OvernightHero() {
  return (
    <section className="relative bg-background pt-36 pb-section lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          <div className="lg:col-span-6 xl:col-span-5 relative z-10 lg:pr-10">
            <p className="eyebrow">Overnight &amp; Weekend Radiology Coverage</p>

            <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 text-display-sm font-semibold text-foreground text-balance">
              Overnight and Weekend Radiology Coverage
            </motion.h1>

            <motion.p {...fadeIn(0.1)} className="mt-6 text-lead font-medium text-primary-strong">
              Keep radiology reporting moving when your in-house team is off.
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 text-base text-foreground-muted leading-relaxed max-w-[52ch]">
              Extend your radiology coverage beyond regular business hours with flexible overnight and weekend reporting support for hospitals, imaging centers, and emergency departments.
            </motion.p>

            <motion.ul {...fadeIn(0.22)} className="mt-8 border-t border-border">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="py-3 border-b border-border text-sm text-foreground">
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fadeIn(0.28)} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>Request a Consultation</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#coverage-timeline" className={buttonVariants({ variant: "outline", size: "lg" })}>
                See How Coverage Works
              </Link>
            </motion.div>
          </div>

          <figure className="lg:col-span-6 xl:col-span-7 lg:-ml-6">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden rounded-lg bg-slate-950">
              <motion.div
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: MOTION.easeOut }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/overnight-weekend-coverage/overnight-radiology-workstation.jpg"
                  alt="Board-certified diagnostic radiologist reviewing diagnostic medical scans at night in hospital reading room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
              {/* Dusk falls once on load: the night tint deepens over the photo. */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.3, ease: MOTION.easeOut }}
                className="absolute inset-0 bg-gradient-to-t from-primary-strong/70 via-slate-950/20 to-transparent"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-foreground-subtle">
              Radiology Continues After Hours — Seamless reporting coverage when in-house teams conclude daytime shifts.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

export default OvernightHero;
