"use client";

import type { MouseEvent } from "react";
import { motion } from "motion/react";
import { ChartLineUp, Compass, Heartbeat } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { KEY_FUNCTIONS as CONTENT, type KeyFunction } from "@/content/leadership";

const ICONS: Record<KeyFunction["id"], typeof Compass> = {
  finance: ChartLineUp,
  strategy: Compass,
  operations: Heartbeat,
};

/** Track the pointer so each card's spotlight follows it. */
const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

export function KeyFunctions() {
  return (
    <section className="relative overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{CONTENT.eyebrow}</p>
          <RevealHeading className="mx-auto mt-4 max-w-[20ch] text-h2 font-semibold text-balance text-foreground">
            {CONTENT.heading}
          </RevealHeading>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {CONTENT.functions.map((f, i) => {
            const Icon = ICONS[f.id];
            return (
              <motion.li
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: MOTION.easeOut }}
                onMouseMove={trackPointer}
                className="group relative isolate overflow-hidden rounded-lg border border-border bg-card p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg lg:p-8"
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
                <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground lg:text-2xl">{f.title}</h3>
                <p className="mt-3 text-base text-foreground-muted">{f.body}</p>
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

export default KeyFunctions;
