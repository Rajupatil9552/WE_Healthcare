"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, Buildings, Desktop, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cn } from "@/lib/utils";
import { TECH_CTA as CONTENT } from "@/content/technology-security";

const SNAP = { type: "spring", stiffness: 140, damping: 16, delay: 0.3 } as const;

/** Closing band: facility and reading-environment connectors snap together in view. */
export function TechFinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const joined = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section id="consultation" className="relative overflow-clip border-t border-border bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">Get Connected</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-lead text-foreground-muted">{CONTENT.body}</p>
            <p className="mt-3 text-base text-foreground">{CONTENT.sub}</p>
            <Link href={CONTENT.cta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
              <span>{CONTENT.cta.label}</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Connector illustration */}
          <div ref={ref} className="lg:col-span-6" aria-hidden="true">
            <div className="relative flex items-center justify-center rounded-2xl border border-border bg-card px-4 py-16 shadow-md sm:px-8">
              <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,var(--color-border-strong)_0_6px,transparent_6px_12px)]" />

              <motion.div
                initial={{ x: -40 }}
                animate={{ x: joined ? 0 : -40 }}
                transition={SNAP}
                className="relative z-10 flex items-center"
              >
                <Node icon={Buildings} label="Your facility" />
                <span className="h-3 w-6 rounded-r-sm bg-border-strong sm:w-10" />
                <span className="flex flex-col gap-1.5">
                  <span className="h-1.5 w-3 rounded-r-full bg-primary" />
                  <span className="h-1.5 w-3 rounded-r-full bg-primary" />
                </span>
              </motion.div>

              {/* Snap flash */}
              <motion.span
                className="relative z-20 size-3 rounded-full bg-cyan-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={joined ? { scale: [0, 3.2, 1], opacity: [0, 0.8, 1] } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
              />

              <motion.div
                initial={{ x: 40 }}
                animate={{ x: joined ? 0 : 40 }}
                transition={SNAP}
                className="relative z-10 flex items-center"
              >
                <span className="h-5 w-3 rounded-l-sm border-2 border-r-0 border-primary" />
                <span className="h-3 w-6 rounded-l-sm bg-border-strong sm:w-10" />
                <Node icon={Desktop} label="WE Healthcare" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={joined ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap text-success"
              >
                <CheckCircle size={13} weight="fill" />
                Connected
              </motion.span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Node({ icon: Icon, label }: { icon: typeof Buildings; label: string }) {
  return (
    <span className="flex flex-col items-center gap-2">
      <span className="flex size-14 items-center justify-center rounded-xl border border-border bg-surface text-primary shadow-sm sm:size-16">
        <Icon size={28} weight="duotone" />
      </span>
      <span className="text-xs font-semibold whitespace-nowrap text-foreground">{label}</span>
    </span>
  );
}

export default TechFinalCta;
