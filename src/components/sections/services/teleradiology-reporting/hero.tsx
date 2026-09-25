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

const WORKFLOW_STEPS = [
  { step: "01", label: "Study Received" },
  { step: "02", label: "Study Routed" },
  { step: "03", label: "Radiologist Review" },
  { step: "04", label: "Report Returned" },
];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function TeleradiologyHero() {
  return (
    <section className="relative bg-background pt-36 lg:pt-44">
      <Container>
        <p className="eyebrow">Teleradiology Reporting</p>

        <motion.h1
          {...HERO_HEADING_MOTION}
          className="mt-6 max-w-[14ch] text-display font-semibold text-foreground text-balance"
        >
          Teleradiology Reporting Services
        </motion.h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          <motion.p {...fadeIn(0.1)} className="lg:col-span-5 text-lead font-medium text-primary-strong">
            Remote radiology reporting that fits your existing workflow.
          </motion.p>
          <motion.div {...fadeIn(0.18)} className="lg:col-span-7">
            <p className="text-base text-foreground-muted leading-relaxed max-w-[60ch]">
              WE Healthcare provides teleradiology reporting support for hospitals, imaging centers, emergency departments, and healthcare networks across the United States. Extend reporting capacity for routine, overnight, weekend, overflow, and time-sensitive imaging needs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>Request a Consultation</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#workflow" className={buttonVariants({ variant: "outline", size: "lg" })}>
                See How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Full-width photographic band with the four-step rail on its lower edge */}
      <div className="mt-16 lg:mt-20">
        <Container>
          <div className="relative overflow-hidden rounded-lg bg-slate-950">
            <motion.div
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: MOTION.easeOut }}
              className="relative aspect-[4/3] sm:aspect-[21/9]"
            >
              <Image
                src="/images/teleradiology-reporting/hero-radiologist-workstation.jpg"
                alt="Board-certified diagnostic radiologist reviewing cross-sectional medical scans at a high-resolution PACS workstation"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden sm:block h-2/3 bg-gradient-to-t from-slate-950/85 to-transparent" />

            <ol className="sm:absolute sm:inset-x-0 sm:bottom-0 grid grid-cols-2 sm:grid-cols-4 border-t border-white/15">
              {WORKFLOW_STEPS.map((item, idx) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.5 + idx * 0.08, ease: MOTION.easeOut }}
                  className={cn(
                    "px-5 py-4 sm:py-5 text-white",
                    idx > 0 && "sm:border-l sm:border-white/15",
                    idx % 2 === 1 && "border-l border-white/15 sm:border-l",
                    idx > 1 && "border-t border-white/15 sm:border-t-0"
                  )}
                >
                  <span className="block font-mono text-xs text-white/60 tabular-nums">{item.step}</span>
                  <span className="mt-1 block text-sm sm:text-base font-medium">{item.label}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default TeleradiologyHero;
