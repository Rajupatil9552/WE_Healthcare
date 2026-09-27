"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Monitor, Receipt, UsersThree } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { WHAT_WE_DO as CONTENT, type AboutService } from "@/content/about";

const ICONS: Record<AboutService["id"], typeof Monitor> = {
  teleradiology: Monitor,
  "revenue-cycle": Receipt,
  staffing: UsersThree,
};

/** Sticky intro on the left, editorial service rows on the right. */
export function WhatWeDo() {
  return (
    <section className="relative overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="right" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{CONTENT.eyebrow}</p>
              <RevealHeading className="mt-4 max-w-[18ch] text-h2 font-semibold text-balance text-foreground">
                {CONTENT.heading}
              </RevealHeading>
              <p className="mt-6 text-lead text-foreground-muted">{CONTENT.body}</p>
            </div>
          </div>

          <ul className="border-t border-border lg:col-span-7">
            {CONTENT.services.map((s, i) => {
              const Icon = ICONS[s.id];
              const row = (
                <>
                  <span className="font-mono text-sm tabular-nums text-foreground-subtle">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Icon size={26} weight="duotone" aria-hidden="true" className="shrink-0 text-primary" />
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">{s.title}</h3>
                    </div>
                    <p className="mt-3 max-w-[52ch] text-base text-foreground-muted">{s.body}</p>
                  </div>
                  {s.href && (
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary">
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  )}
                </>
              );
              const rowClass = "group flex items-start gap-6 py-9 lg:gap-10 lg:py-11";

              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: MOTION.easeOut }}
                  className="border-b border-border"
                >
                  {s.href ? (
                    <Link href={s.href} className={`${rowClass} rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}>
                      {row}
                    </Link>
                  ) : (
                    <div className={rowClass}>{row}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default WhatWeDo;
