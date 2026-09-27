"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, IdentificationBadge, Pulse, Siren, FileText, ShieldCheck, Info } from "@phosphor-icons/react";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SECURITY as CONTENT } from "@/content/technology-security";
import { ChapterHeader } from "./chapter-layout";

const PILLAR_ICONS = [IdentificationBadge, Pulse, Siren, FileText];

/**
 * Chapter 04: four security pillars around a central shield. Cards get a
 * rotating gradient border on hover; documentation links to the request flow.
 */
export function SecurityComplianceChapter() {
  return (
    <section id="security-compliance" className="scroll-mt-28 py-16 lg:py-24">
      <ChapterHeader id="security-compliance" title={CONTENT.heading} body={CONTENT.body} />

      <div className="relative mt-12">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {CONTENT.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            const isDocs = i === CONTENT.pillars.length - 1;
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: MOTION.easeOut }}
                className="group relative rounded-lg p-px"
              >
                {/* Gradient border on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-border opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="absolute -inset-[60%] animate-[spin_4s_linear_infinite] [background:conic-gradient(from_0deg,transparent_0deg,#0ea5e9_60deg,#22d3ee_120deg,transparent_180deg)] motion-reduce:animate-none" />
                </span>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[calc(var(--radius-lg)-1px)] bg-card p-6 lg:p-7",
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon size={22} weight="duotone" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-foreground-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-foreground-muted">{p.body}</p>
                  {isDocs && (
                    <Link
                      href={CONTENT.documentationCta.href}
                      className="group/link mt-5 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {CONTENT.documentationCta.label}
                      <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Central shield tying the pillars together (md+) */}
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.4 }}
          className="pointer-events-none absolute left-1/2 top-1/2 hidden size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-sky-500 to-cyan-400 text-slate-950 shadow-lg md:flex"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/30 motion-reduce:hidden" />
          <ShieldCheck size={28} weight="fill" className="relative" />
        </motion.span>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary-soft px-5 py-4">
        <Info size={18} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-foreground">{CONTENT.notice}</p>
      </div>
    </section>
  );
}

export default SecurityComplianceChapter;
