"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { getAudience } from "@/content/who-we-serve";
import { AudienceEyebrow } from "./who-we-support";

const AUDIENCE = getAudience("imaging-centers");

/** Where the scanner bore sits in the photo (percent of frame). */
const BORE = { x: 62, y: 36 };

/**
 * Imaging Centers: needs as a numbered list on the left; the scanner suite on
 * the right with a rotating scan ring around the bore and a looping sweep.
 */
export function ImagingCentersSection() {
  return (
    <section id={AUDIENCE.id} className="relative scroll-mt-28 overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <AudienceEyebrow id={AUDIENCE.id} />
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{AUDIENCE.title}</RevealHeading>
            <p className="mt-5 text-lead text-foreground-muted">{AUDIENCE.body}</p>

            <ol className="mt-10 border-t border-border">
              {AUDIENCE.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: MOTION.easeOut }}
                  className="group relative flex items-center gap-5 border-b border-border py-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0 bg-primary-soft transition-[width] duration-500 ease-out group-hover:w-full"
                  />
                  <span className="relative font-mono text-xs tabular-nums text-primary">0{i + 1}</span>
                  <span className="relative flex-1 text-base font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
                    {b}
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="relative mr-2 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </motion.li>
              ))}
            </ol>

            <Link
              href={AUDIENCE.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">{AUDIENCE.cta.label}</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              whileInView={{ clipPath: "inset(0 0 0 0%)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: MOTION.easeOut }}
              className="relative aspect-[3/2] overflow-hidden rounded-lg bg-slate-900 shadow-lg"
            >
              <Image src={AUDIENCE.image.src} alt={AUDIENCE.image.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />

              {/* Scan ring around the bore */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute w-[46%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${BORE.x}%`, top: `${BORE.y}%` }}
                fill="none"
              >
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "50px 50px" }}
                >
                  <circle cx="50" cy="50" r="46" stroke="#0ea5e9" strokeOpacity="0.7" strokeWidth="0.6" strokeDasharray="1.5 3" />
                  <circle cx="50" cy="4" r="1.6" fill="#22d3ee" />
                </motion.g>
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#38bdf8"
                  strokeWidth="0.4"
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                />
              </svg>

              {/* Horizontal sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-sky-300/25 to-transparent motion-safe:animate-[wws-scan_4.5s_ease-in-out_infinite] motion-reduce:hidden"
              />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-950/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap text-white backdrop-blur">
                  {AUDIENCE.tag}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ImagingCentersSection;
