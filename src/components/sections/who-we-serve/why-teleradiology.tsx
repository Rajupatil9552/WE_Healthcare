"use client";

import type { MouseEvent } from "react";
import { motion } from "motion/react";
import { TrendUp, MoonStars, Brain, Stack, Plugs } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { WHY_TELERADIOLOGY as CONTENT } from "@/content/who-we-serve";

const ICONS = [TrendUp, MoonStars, Brain, Stack, Plugs];

/** Bento layout: two wide cards on top, three below (desktop). */
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

/** Track the pointer so each card's spotlight follows it. */
const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

export function WhyTeleradiology() {
  return (
    <section className="relative overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <p className="eyebrow">{CONTENT.eyebrow}</p>
        <RevealHeading className="mt-4 max-w-[20ch] text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-5">
          {CONTENT.reasons.map((r, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: MOTION.easeOut }}
                onMouseMove={trackPointer}
                className={cn(
                  "group relative isolate overflow-hidden rounded-lg border border-border bg-card p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg lg:p-8",
                  i === 4 && "sm:col-span-2 lg:col-span-2",
                  SPANS[i]
                )}
              >
                {/* Pointer spotlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_srgb,var(--color-primary)_12%,transparent),transparent_70%)]"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon size={24} weight="duotone" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tabular-nums text-foreground-subtle">0{i + 1}</span>
                </div>
                <h3 className={cn("mt-10 font-semibold tracking-tight text-foreground", i < 2 ? "text-2xl lg:text-3xl" : "text-xl")}>
                  {r.title}
                </h3>
                <p className="mt-2 text-base text-foreground-muted">{r.detail}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export default WhyTeleradiology;
