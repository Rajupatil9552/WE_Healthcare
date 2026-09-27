"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { getAudience } from "@/content/who-we-serve";
import { AudienceEyebrow } from "./who-we-support";

const AUDIENCE = getAudience("healthcare-networks");

/**
 * Pin positions (% of the map canvas) for each bullet, in content order.
 * Bullet 2 ("Centralized reporting workflows") is the hub the others join.
 */
const PINS = [
  { x: 14, y: 20 },
  { x: 50, y: 50 },
  { x: 86, y: 18 },
  { x: 18, y: 82 },
  { x: 84, y: 80 },
];
const HUB = 1;

/** Faint unlabelled sites that twinkle across the city for depth. */
const SPARKS = [
  { x: 32, y: 34 }, { x: 66, y: 30 }, { x: 40, y: 68 }, { x: 70, y: 64 },
  { x: 8, y: 50 }, { x: 94, y: 48 }, { x: 56, y: 90 }, { x: 28, y: 6 },
];

/**
 * Healthcare Networks: full-bleed night-city map. The heading and an
 * interactive legend sit on the left; connected sites fill the right. Hovering
 * (or focusing) a pin or its legend row traces that link to the hub.
 */
export function HealthcareNetworksSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id={AUDIENCE.id} className="relative isolate scroll-mt-28 overflow-hidden bg-slate-950 text-white">
      {/* Full-bleed background map */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={AUDIENCE.image.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80 motion-safe:animate-[hero-kenburns_24s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/55 to-slate-950/90 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/60 lg:to-slate-950/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      <Container className="py-section lg:py-section-lg">
        <div className="grid grid-cols-1 items-center gap-10 lg:min-h-[640px] lg:grid-cols-12 lg:gap-8">
          {/* Copy + legend */}
          <div className="lg:col-span-5">
            <AudienceEyebrow id={AUDIENCE.id} tone="light" />
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance">{AUDIENCE.title}</RevealHeading>
            <p className="mt-5 max-w-[48ch] text-lead text-slate-300">{AUDIENCE.body}</p>

            <ul className="mt-10 space-y-1.5">
              {AUDIENCE.bullets.map((b, i) => {
                const on = hovered === i;
                return (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: MOTION.easeOut }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "flex cursor-default items-center gap-4 rounded-lg border px-4 py-3 text-[15px] font-medium backdrop-blur-sm transition-[background-color,border-color,transform] duration-300",
                      on ? "translate-x-1.5 border-sky-300/60 bg-white/10" : "border-white/10 bg-slate-950/30 hover:bg-white/5"
                    )}
                  >
                    <span className={cn("font-mono text-xs tabular-nums", on ? "text-cyan-300" : "text-sky-300/80")}>0{i + 1}</span>
                    <span className="flex-1">{b}</span>
                    {i === HUB && (
                      <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-300">Hub</span>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <Link
              href={AUDIENCE.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <span className="underline decoration-sky-300/40 underline-offset-4 group-hover:decoration-sky-300">{AUDIENCE.cta.label}</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Map canvas (no frame: pins float over the full-bleed photo) */}
          <div className="relative -mx-container aspect-[4/3] sm:mx-0 sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
              {PINS.map((p, i) => {
                if (i === HUB) return null;
                const on = hovered === null || hovered === i || hovered === HUB;
                const d = `M${p.x} ${p.y} L${PINS[HUB].x} ${PINS[HUB].y}`;
                return (
                  <g key={i}>
                    <motion.path
                      d={d}
                      stroke="#7dd3fc"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      animate={{ strokeOpacity: on ? 0.8 : 0.12 }}
                      transition={{ pathLength: { duration: 1.2, delay: 0.3 + i * 0.12, ease: MOTION.easeOut }, default: { duration: 0.3 } }}
                    />
                    {/* Data flowing toward the hub */}
                    <motion.path
                      d={d}
                      stroke="#e0f2fe"
                      strokeWidth="2"
                      strokeDasharray="2 14"
                      vectorEffect="non-scaling-stroke"
                      animate={{ strokeDashoffset: [0, -32], strokeOpacity: on ? 0.9 : 0 }}
                      transition={{ strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" }, strokeOpacity: { duration: 0.3 } }}
                      className="motion-reduce:hidden"
                    />
                  </g>
                );
              })}
            </svg>

            {SPARKS.map((s, i) => (
              <span
                key={`${s.x}-${s.y}`}
                aria-hidden="true"
                className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/70 motion-safe:animate-pulse"
                style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${i * 0.35}s` }}
              />
            ))}

            {PINS.map((p, i) => {
              const hub = i === HUB;
              const on = hovered === i;
              return (
                <button
                  key={AUDIENCE.bullets[i]}
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className="relative flex">
                    {hub && <span className="absolute -inset-4 animate-ping rounded-full bg-sky-400/30 motion-reduce:hidden" />}
                    {hub && <span className="absolute -inset-8 rounded-full border border-sky-300/20" />}
                    <span
                      className={cn(
                        "relative rounded-full border-2 border-white shadow-[0_0_18px_rgba(56,189,248,0.7)] transition-transform duration-300",
                        hub ? "size-6 bg-cyan-400" : "size-4 bg-sky-500",
                        on && "scale-125"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "absolute top-1/2 hidden -translate-y-1/2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur transition-colors duration-300 sm:inline",
                      p.x > 60 ? "right-full mr-3" : "left-full ml-3",
                      hub && "top-full left-1/2 mt-5 -translate-x-1/2 translate-y-0 ml-0",
                      on || hub ? "bg-white text-slate-900" : "bg-slate-950/70 text-white group-hover:bg-white group-hover:text-slate-900"
                    )}
                  >
                    <span className="mr-1.5 font-mono text-[10px] text-sky-500">0{i + 1}</span>
                    {AUDIENCE.bullets[i]}
                  </span>
                  <span className="sr-only sm:hidden">{AUDIENCE.bullets[i]}</span>
                </button>
              );
            })}

            <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] backdrop-blur sm:right-0 sm:bottom-0">
              {AUDIENCE.tag}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HealthcareNetworksSection;
