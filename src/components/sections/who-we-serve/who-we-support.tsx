"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowDown, Hospital, Scan, ShareNetwork, Siren } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AUDIENCES, WHO_WE_SUPPORT_INTRO as INTRO, type Audience } from "@/content/who-we-serve";

export const AUDIENCE_ICONS: Record<Audience["id"], typeof Hospital> = {
  hospitals: Hospital,
  "imaging-centers": Scan,
  "healthcare-networks": ShareNetwork,
  "emergency-departments": Siren,
};

type AudienceId = Audience["id"];

/**
 * Wraps the four audience sections: an intro with jump links, then the
 * sections. While they are on screen a section navigator appears away from
 * the site header (so the two never collide): a vertical rail on the right
 * edge on desktop, a pill bar at the bottom of the screen below lg.
 */
export function WhoWeSupport({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<AudienceId>(AUDIENCES[0].id);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 50%", "end 50%"] });

  // Show the navigator only while the audience sections cross mid-screen.
  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0 && v < 1));

  // Scrollspy: the section crossing the upper-middle of the viewport wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id as AudienceId));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    AUDIENCES.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="who-we-support" className="relative scroll-mt-24">
      <section className="relative overflow-clip bg-background pt-section pb-4 lg:pt-section-lg lg:pb-8">
        <DecorativeLines variant="top-right" />
        <Container className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">{INTRO.eyebrow}</p>
              <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{INTRO.heading}</RevealHeading>
            </div>
            <p className="max-w-[46ch] text-base leading-relaxed text-foreground-muted">{INTRO.body}</p>
          </div>

          {/* Static jump links */}
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => {
              const Icon = AUDIENCE_ICONS[a.id];
              return (
                <motion.li
                  key={a.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: MOTION.easeOut }}
                >
                  <a
                    href={`#${a.id}`}
                    className="group flex h-full items-center gap-3 rounded-lg border border-border bg-card p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] tabular-nums text-foreground-subtle">0{i + 1}</span>
                      <span className="block text-sm font-semibold leading-snug text-foreground sm:text-base">{a.title}</span>
                    </span>
                    <ArrowDown
                      size={15}
                      aria-hidden="true"
                      className="hidden shrink-0 text-foreground-subtle transition-transform group-hover:translate-y-0.5 group-hover:text-primary sm:block"
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </section>

      <div ref={wrapRef} className="relative">
        <AnimatePresence>
          {visible && (
            <>
              <SideRail key="rail" active={active} progress={scrollYProgress} />
              <BottomBar key="bar" active={active} />
            </>
          )}
        </AnimatePresence>
        {children}
      </div>
    </div>
  );
}

type Progress = ReturnType<typeof useScroll>["scrollYProgress"];

/** Desktop: fixed vertical rail on the right edge, labels on hover/focus. */
function SideRail({ active, progress }: { active: AudienceId; progress: Progress }) {
  return (
    <motion.nav
      aria-label="Organization types"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.35, ease: MOTION.easeOut }}
      className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative rounded-full border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur-xl">
        {/* Progress line behind the icons */}
        <span aria-hidden="true" className="absolute left-1/2 top-5 bottom-5 w-px -translate-x-1/2 bg-border">
          <motion.span style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-primary" />
        </span>
        <ul className="relative flex flex-col gap-2">
          {AUDIENCES.map((a) => {
            const Icon = AUDIENCE_ICONS[a.id];
            const on = active === a.id;
            return (
              <li key={a.id} className="group relative">
                <a
                  href={`#${a.id}`}
                  aria-label={a.title}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    on ? "text-slate-950" : "bg-card text-foreground-subtle hover:text-foreground"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="wws-rail-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon size={17} weight={on ? "fill" : "regular"} aria-hidden="true" className="relative" />
                </a>
                {/* Hover/focus label */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-background opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  {a.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}

/** Below lg: floating pill bar at the bottom of the screen. */
function BottomBar({ active }: { active: AudienceId }) {
  return (
    <motion.nav
      aria-label="Organization types"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: MOTION.easeOut }}
      className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 lg:hidden"
    >
      <ul className="flex w-full max-w-md gap-1 rounded-full border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur-xl">
        {AUDIENCES.map((a) => {
          const Icon = AUDIENCE_ICONS[a.id];
          const on = active === a.id;
          return (
            <li key={a.id} className={cn("relative", on ? "flex-1" : "flex-none sm:flex-1")}>
              {on && (
                <motion.span
                  layoutId="wws-bar-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <a
                href={`#${a.id}`}
                aria-label={a.title}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  on ? "text-slate-950" : "text-foreground-muted"
                )}
              >
                <Icon size={16} weight={on ? "fill" : "regular"} aria-hidden="true" />
                <span className={cn(!on && "hidden sm:inline")}>{a.short}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

/** "01 / 04 · Hospitals & Health Systems" style section label. */
export function AudienceEyebrow({ id, tone = "primary" }: { id: AudienceId; tone?: "primary" | "urgent" | "light" }) {
  const i = AUDIENCES.findIndex((a) => a.id === id);
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "urgent" && "[--eyebrow-color:var(--color-urgent)]",
        // On photo backgrounds, which stay dark in both themes
        tone === "light" && "[--eyebrow-color:#7dd3fc]"
      )}
    >
      <span className="font-mono tabular-nums">
        0{i + 1} / 0{AUDIENCES.length}
      </span>
      <span aria-hidden="true">·</span>
      {AUDIENCES[i].title}
    </p>
  );
}
