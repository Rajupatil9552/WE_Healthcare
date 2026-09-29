"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "motion/react";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { RADIOLOGY_SPECIALTIES as ITEMS, RADIOLOGY_EXPERTISE_HEADER as HEADER } from "@/content/radiology-expertise";

const AUTO_MS = 4500;
/** Tailwind `lg` breakpoint: panels are a horizontal row from here up. */
const DESKTOP = "(min-width: 64rem)";

/**
 * Expanding specialty panels.
 * - lg and up: one row; the active panel grows wide (image, description, link)
 *   while the rest collapse to slim strips with vertical titles. Hover, focus
 *   or click opens a panel; it auto-advances while in view and not hovered.
 * - Below lg: the same panels stack as a vertical accordion; tap to open. No
 *   auto-advance on touch screens, so content never moves under a thumb.
 */
export function RadiologyExpertise() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const [desktop, setDesktop] = React.useState(false);
  const uid = React.useId();

  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP);
    const sync = () => setDesktop(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!desktop || !inView || hovering || reduce) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % ITEMS.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [active, desktop, inView, hovering, reduce]);

  return (
    <section id="radiology-expertise" className="relative scroll-mt-20 overflow-hidden bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <DecorativeLines variant="right" />
      {/* Target anchor for the hero scroll button */}
      <span id="trust-credibility" className="sr-only" aria-hidden="true" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{HEADER.badge}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{HEADER.title}</RevealHeading>
          <p className="mx-auto mt-5 max-w-[56ch] text-base leading-relaxed text-pretty text-foreground-muted">{HEADER.description}</p>
        </div>

        <div
          ref={ref}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="mt-12 flex flex-col gap-2 lg:mt-16 lg:h-[34rem] lg:flex-row lg:gap-3"
        >
          {ITEMS.map((item, i) => {
            const on = i === active;
            const panelId = `${uid}-panel-${i}`;
            return (
              <article
                key={item.id}
                data-active={on}
                onMouseEnter={() => desktop && setActive(i)}
                className={cn(
                  "group relative isolate overflow-hidden rounded-lg bg-slate-950 text-white shadow-md",
                  "transition-[height,flex-grow,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  // Mobile/tablet: accordion heights. Desktop: flex-grow in one row.
                  on ? "h-[22rem] shadow-xl sm:h-[24rem]" : "h-[4.25rem]",
                  "lg:h-auto lg:min-w-0 lg:basis-0",
                  on ? "lg:grow-[7]" : "lg:grow"
                )}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn(
                    "-z-10 object-cover transition-[transform,filter] duration-700",
                    on ? "scale-100" : "scale-110 grayscale-[60%]"
                  )}
                />
                {/* Legibility scrims */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 -z-10 transition-opacity duration-500",
                    on ? "bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10" : "bg-slate-950/70"
                  )}
                />

                {/* Whole panel is the toggle (links inside sit above it) */}
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
                >
                  <span className="sr-only">{item.title}</span>
                </button>

                {/* Collapsed label: horizontal strip on mobile, vertical title on desktop */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-300",
                    "lg:flex-col-reverse lg:items-center lg:justify-start lg:gap-4 lg:px-0 lg:py-6",
                    on ? "opacity-0" : "opacity-100 delay-200"
                  )}
                >
                  <span className="flex items-center gap-3 lg:flex-col-reverse">
                    <span className="font-mono text-[11px] tabular-nums text-sky-300">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base font-semibold whitespace-nowrap lg:[writing-mode:vertical-rl] lg:rotate-180">{item.shortTitle}</span>
                  </span>
                  <Plus size={16} weight="bold" className="text-white/70 lg:hidden" />
                </div>

                {/* Expanded content */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={item.title}
                  hidden={!on}
                  className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:max-w-xl"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-300 motion-safe:animate-[hero-in_0.5s_0.15s_both]">
                    {String(i + 1).padStart(2, "0")} · {item.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight motion-safe:animate-[hero-in_0.5s_0.22s_both] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-slate-200 motion-safe:animate-[hero-in_0.5s_0.3s_both]">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="group/link mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 motion-safe:animate-[hero-in_0.5s_0.38s_both]"
                  >
                    Learn more
                    <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

                {/* Auto-advance progress (desktop, active panel) */}
                {on && desktop && !reduce && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/15">
                    <span
                      key={`${active}-${hovering}`}
                      className={cn(
                        "block h-full origin-left bg-gradient-to-r from-sky-400 to-cyan-300",
                        inView && !hovering && "animate-[expertise-progress_linear_forwards]"
                      )}
                      style={{ animationDuration: `${AUTO_MS}ms`, transform: "scaleX(0)" }}
                    />
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default RadiologyExpertise;
