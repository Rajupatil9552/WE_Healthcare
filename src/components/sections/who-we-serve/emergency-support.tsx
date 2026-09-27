"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EMERGENCY_SUPPORT as CONTENT } from "@/content/who-we-serve";
import { AudienceEyebrow } from "./who-we-support";

/** One heartbeat, repeated across the band's width. */
const ECG_BEAT = "h40 l8 -10 l6 10 h10 l6 18 l8 -62 l8 58 l6 -14 h12 q10 -16 20 0 h40";
const ECG_PATH = `M0 60 ${Array.from({ length: 10 }, () => ECG_BEAT).join(" ")}`;

/** Illustrative priority worklist rows (examples of study types, not live data). */
const QUEUE = [
  { priority: "STAT", study: "CT Head without contrast" },
  { priority: "Trauma", study: "CT Cervical Spine" },
  { priority: "Stroke", study: "CTA Head & Neck" },
];

/**
 * Emergency Departments (audience 04): a band with a running ECG trace in the
 * urgent token,
 * time-sensitive workflow links, and an illustrative priority queue.
 */
export function EmergencySupport() {
  const reduce = usePrefersReducedMotion();
  return (
    <section id="emergency-departments" className="relative isolate scroll-mt-28 overflow-clip bg-surface py-section text-foreground lg:py-section-lg">
      <DecorativeLines variant="left" className="top-2/3" />
      {/* ECG trace */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-10 -z-10 h-24 w-full opacity-50"
        fill="none"
      >
        <path d={ECG_PATH} stroke="var(--color-urgent)" strokeOpacity="0.15" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {!reduce && (
        <motion.path
          d={ECG_PATH}
          stroke="var(--color-urgent)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0.12, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        )}
      </svg>
      <div aria-hidden="true" className="absolute -left-32 bottom-0 -z-10 size-[520px] rounded-full bg-urgent/5 blur-[120px]" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <AudienceEyebrow id="emergency-departments" tone="urgent" />
            <RevealHeading className="mt-5 max-w-[18ch] text-h2 font-semibold text-balance">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {CONTENT.workflows.map((w, i) => (
                <motion.li
                  key={w.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: MOTION.easeOut }}
                >
                  <Link
                    href={w.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-urgent/40 hover:bg-urgent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="size-1.5 rounded-full bg-urgent transition-transform group-hover:scale-150" />
                    {w.label}
                    <ArrowUpRight size={13} aria-hidden="true" className="text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-urgent" />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link
              href={CONTENT.cta.href}
              className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}
            >
              {CONTENT.cta.label}
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative lg:col-span-6">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, ease: MOTION.easeOut }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
            >
              <Image src={CONTENT.image.src} alt={CONTENT.image.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-transparent" />
            </motion.div>

            {/* Illustrative priority queue */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: MOTION.easeOut }}
              className="relative -mt-16 ml-4 w-[min(22rem,88%)] rounded-lg border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:-mt-24 sm:ml-auto sm:mr-6 lg:-ml-10 lg:mr-0"
              aria-label="Example priority worklist"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">Priority worklist</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-urgent">
                  <span className="size-1.5 animate-pulse rounded-full bg-urgent" />
                  Example
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {QUEUE.map((row, i) => (
                  <motion.li
                    key={row.study}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.12, ease: MOTION.easeOut }}
                    className="flex items-center gap-3 rounded-md bg-surface px-3 py-2.5"
                  >
                    <span className="w-14 shrink-0 rounded bg-urgent-soft py-0.5 text-center font-mono text-[10px] font-semibold uppercase text-urgent">
                      {row.priority}
                    </span>
                    <span className="truncate text-sm text-foreground">{row.study}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EmergencySupport;
