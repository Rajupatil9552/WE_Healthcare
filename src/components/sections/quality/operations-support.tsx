"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Kanban, ArrowsLeftRight, WifiHigh, TrendUp, NotePencil, Info } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { OPERATIONS as CONTENT } from "@/content/quality";

const ICONS = [Kanban, ArrowsLeftRight, WifiHigh, TrendUp, NotePencil];

/**
 * Full-bleed photo section: heading over a dark gradient, the five support
 * areas as a row of glass tiles along the bottom. The photo band stays dark
 * in both themes, like the site's other photo areas.
 */
export function OperationsSupportSection() {
  return (
    <section id="operations-support" className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 text-white">
      <motion.div
        aria-hidden="true"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: MOTION.easeOut }}
        className="absolute inset-0 -z-10"
      >
        <Image src={CONTENT.image.src} alt="" fill sizes="100vw" className="object-cover object-[60%_40%]" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />
      <span className="sr-only">{CONTENT.image.alt}</span>

      <Container className="flex min-h-[44rem] flex-col justify-between gap-16 py-section lg:min-h-[48rem] lg:py-section-lg">
        <div className="max-w-xl">
          <p className="eyebrow [--eyebrow-color:#7dd3fc]">06 · Operations Support</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance">{CONTENT.heading}</RevealHeading>
          <p className="mt-5 text-lead text-slate-200">{CONTENT.body}</p>
        </div>

        <div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CONTENT.items.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: MOTION.easeOut }}
                  className="group flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-white/15 lg:flex-col lg:items-start lg:gap-5 lg:p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-400/20 text-sky-200 transition-colors duration-300 group-hover:bg-sky-400 group-hover:text-slate-950">
                    <Icon size={20} weight="duotone" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="hidden font-mono text-[10px] tabular-nums text-white/50 lg:block">0{i + 1}</span>
                    <span className="block text-[15px] font-semibold leading-snug">{item}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
          <p className="mt-6 flex max-w-[70ch] items-start gap-2.5 text-sm leading-relaxed text-slate-300">
            <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            {CONTENT.note}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default OperationsSupportSection;
