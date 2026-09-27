"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Plugs, FileImage, ShieldCheck, LockKey } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { CHAPTERS, type ChapterId } from "@/content/technology-security";
import { JourneyChip, JourneyProvider, JourneyStations, StudyCard } from "./journey";

export const CHAPTER_ICONS: Record<ChapterId, typeof Plugs> = {
  "pacs-ris-integration": Plugs,
  "dicom-workflow": FileImage,
  "secure-image-transfer": LockKey,
  "security-compliance": ShieldCheck,
};

/**
 * The four technology chapters plus report delivery, told as one study's
 * journey. Desktop: a sticky study card (whose state follows the chapter in
 * view) above clickable stations. Below lg: a floating journey chip at the
 * bottom of the screen, clear of the site header.
 */
export function ChapterLayout({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inRange, setInRange] = useState(false);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 60%", "end 60%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setInRange(v > 0 && v < 1));

  return (
    <JourneyProvider>
      <div ref={wrapRef} className="relative overflow-clip border-t border-border bg-background">
        <DecorativeLines variant="right" className="top-[12%]" />
        <DecorativeLines variant="left" className="top-[38%]" />
        <DecorativeLines variant="right" className="top-[64%]" />
        <DecorativeLines variant="left" className="top-[90%]" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
            <aside className="hidden lg:col-span-3 lg:block" aria-label="Study journey">
              <div className="sticky top-28 py-16 lg:py-24">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">Follow the study</p>
                <StudyCard />
                <nav aria-label="On this page">
                  <JourneyStations />
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9">{children}</div>
          </div>
        </Container>

        <AnimatePresence>
          {inRange && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
              <JourneyChip />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </JourneyProvider>
  );
}

/** Shared chapter header: number, icon, title, intro. */
export function ChapterHeader({ id, title, body }: { id: ChapterId; title: string; body: string }) {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  const Icon = CHAPTER_ICONS[id];
  return (
    <header>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon size={20} weight="duotone" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          Chapter 0{i + 1} / 0{CHAPTERS.length}
        </span>
      </div>
      <RevealHeading className="mt-5 text-h2 font-semibold text-balance text-foreground">{title}</RevealHeading>
      <p className="mt-5 max-w-[62ch] text-lead text-foreground-muted">{body}</p>
    </header>
  );
}

/** Small "confirm during assessment" footnote under a chapter. */
export function ChapterNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 flex max-w-[70ch] items-start gap-2.5 rounded-lg border border-dashed border-border-strong px-4 py-3 text-sm leading-relaxed text-foreground-muted">
      <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
      {children}
    </p>
  );
}
