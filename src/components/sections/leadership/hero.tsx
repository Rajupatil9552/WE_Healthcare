"use client";

import { motion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { HERO_HEADING_MOTION, MOTION, heroFadeIn } from "@/lib/motion";
import { LEADERS, LEADERSHIP_HERO as CONTENT } from "@/content/leadership";

/** CSS-driven entrance (no JS wait); see heroFadeIn. */
const fadeIn = heroFadeIn;

/**
 * Typographic hero (portraits live in the profiles below): full-width headline,
 * then the introduction beside a numbered index linking to each profile.
 */
export function LeadershipHero() {
  return (
    <section className="relative isolate overflow-clip bg-background pb-section pt-36 text-foreground lg:pb-section-lg lg:pt-44">
      {/* Dot grid + glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_30%,black_15%,transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute -right-40 top-0 -z-10 size-[640px] rounded-full bg-primary/10 blur-[120px]" />
      <DecorativeLines variant="top-right" />

      <Container className="relative">
        <motion.p {...fadeIn(0)} className="eyebrow">
          {CONTENT.eyebrow}
        </motion.p>
        <motion.h1 {...HERO_HEADING_MOTION} className="mt-6 max-w-[18ch] text-display-sm font-semibold text-balance sm:text-display">
          {CONTENT.heading}{" "}
          <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
            {CONTENT.accent}
          </span>
        </motion.h1>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-border pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-16 lg:pt-12">
          <motion.div {...fadeIn(0.12)} className="space-y-5 lg:col-span-6">
            {CONTENT.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 0 ? "text-lead text-foreground" : "text-base leading-relaxed text-foreground-muted lg:text-lg"}>
                {p}
              </p>
            ))}
          </motion.div>

          <nav aria-label="Leadership team" className="lg:col-span-5 lg:col-start-8">
            <motion.p {...fadeIn(0.18)} className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">
              {CONTENT.indexLabel}
            </motion.p>
            <ol className="mt-4 border-t border-border">
              {LEADERS.map((leader, i) => (
                <motion.li
                  key={leader.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: MOTION.easeOut }}
                  className="border-b border-border"
                >
                  <a
                    href={`#${leader.id}`}
                    className="group flex items-center gap-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-mono text-xs tabular-nums text-primary">0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {leader.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-foreground-muted">{leader.role}</span>
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary">
                      <ArrowDown size={14} aria-hidden="true" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}

export default LeadershipHero;
