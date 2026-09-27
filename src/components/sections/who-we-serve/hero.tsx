"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown, Hospital, Scan, ShareNetwork, Siren } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { HERO_HEADING_MOTION, MOTION, heroFadeIn } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { AUDIENCES, WHO_WE_SERVE_HERO as CONTENT, type Audience } from "@/content/who-we-serve";

/** CSS-driven entrance (no JS wait); see heroFadeIn. */
const fadeIn = heroFadeIn;

/* Hub diagram geometry (SVG user units). Nodes are HTML overlays placed by %. */
const VIEW = { w: 600, h: 520 };
const HUB = { x: 300, y: 250 };

const NODES: Record<Audience["id"], { x: number; y: number; ctrl: [number, number]; icon: typeof Hospital }> = {
  hospitals: { x: 132, y: 104, ctrl: [160, 250], icon: Hospital },
  "imaging-centers": { x: 452, y: 124, ctrl: [440, 250], icon: Scan },
  "healthcare-networks": { x: 360, y: 440, ctrl: [300, 360], icon: ShareNetwork },
  "emergency-departments": { x: 120, y: 360, ctrl: [170, 300], icon: Siren },
};

/** Satellite sites hanging off the network node (multi-site). */
const SATELLITES = [
  { x: 236, y: 496 },
  { x: 462, y: 478 },
  { x: 520, y: 392 },
];

/** Faint ambient links that give the field depth. */
const AMBIENT = [
  { x: 575, y: 270 },
  { x: 250, y: 30 },
  { x: 40, y: 60 },
];

const pathFor = (id: Audience["id"]) => {
  const n = NODES[id];
  return `M${n.x} ${n.y} Q${n.ctrl[0]} ${n.ctrl[1]} ${HUB.x} ${HUB.y}`;
};

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Theme-aware hero with an interactive "reporting hub": studies travel in from each
 * audience, reports travel back. Hover/focus a node to trace its link; the
 * highlight cycles on its own otherwise. Clicking jumps to that audience.
 */
export function WhoWeServeHero() {
  return (
    <section className="relative isolate overflow-clip bg-background pt-36 pb-20 text-foreground lg:pt-44 lg:pb-28">
      <DecorativeLines variant="left" className="top-3/4" />
      {/* Dot grid + glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 size-[640px] rounded-full bg-primary/10 blur-[120px]" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 size-[420px] rounded-full bg-primary/5 blur-[110px]" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <motion.h1
              {...HERO_HEADING_MOTION}
              className="mt-6 max-w-[14ch] text-display-sm font-semibold text-balance sm:text-display"
            >
              Teleradiology Built Around{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text dark:from-sky-300 dark:to-cyan-200 text-transparent">
                Your Organization
              </span>
            </motion.h1>
            <motion.p {...fadeIn(0.12)} className="mt-7 max-w-[56ch] text-lead text-foreground-muted">
              {CONTENT.body}
            </motion.p>

            <motion.div {...fadeIn(0.2)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={CONTENT.secondaryCta.href}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
              >
                {CONTENT.secondaryCta.label}
                <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <ReportingHub />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReportingHub() {
  const reduce = usePrefersReducedMotion();
  const [auto, setAuto] = useState(0);
  const [hovered, setHovered] = useState<Audience["id"] | null>(null);
  const active = hovered ?? AUDIENCES[auto].id;
  const activeAudience = AUDIENCES.find((a) => a.id === active)!;

  // Cycle the highlight while nobody is pointing at a node.
  useEffect(() => {
    if (reduce || hovered) return;
    const t = window.setTimeout(() => setAuto((i) => (i + 1) % AUDIENCES.length), 3200);
    return () => window.clearTimeout(t);
  }, [auto, hovered, reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: MOTION.easeOut }}
      className="relative mx-auto w-full max-w-[40rem]"
    >
      <div className="relative" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
          <defs>
            <radialGradient id="wws-hub-glow">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient + satellite links */}
          {AMBIENT.map((p) => (
            <line key={`a${p.x}`} x1={p.x} y1={p.y} x2={HUB.x} y2={HUB.y} stroke="var(--color-primary)" strokeOpacity="0.18" strokeDasharray="2 6" />
          ))}
          {SATELLITES.map((s) => (
            <motion.line
              key={`s${s.x}`}
              x1={s.x}
              y1={s.y}
              x2={NODES["healthcare-networks"].x}
              y2={NODES["healthcare-networks"].y}
              stroke="var(--color-primary)"
              strokeDasharray="3 5"
              animate={{ strokeOpacity: active === "healthcare-networks" ? 0.7 : 0.25 }}
              transition={{ duration: 0.4 }}
            />
          ))}

          {/* Audience links */}
          {AUDIENCES.map((a, i) => {
            const on = a.id === active;
            return (
              <g key={a.id}>
                <motion.path
                  id={`wws-link-${a.id}`}
                  d={pathFor(a.id)}
                  stroke="var(--color-primary)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, strokeOpacity: on ? 0.95 : 0.35, strokeWidth: on ? 2 : 1.2 }}
                  transition={{ pathLength: { duration: 1.4, delay: 0.3 + i * 0.15, ease: MOTION.easeOut }, default: { duration: 0.4 } }}
                />
                {!reduce && (
                  <>
                    {/* Study in */}
                    <circle r="3.5" fill="var(--color-primary)">
                      <animateMotion dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                        <mpath href={`#wws-link-${a.id}`} />
                      </animateMotion>
                    </circle>
                    {/* Report back */}
                    <circle r="2.5" fill="var(--color-success)">
                      <animateMotion
                        dur={`${3.2 + i * 0.3}s`}
                        repeatCount="indefinite"
                        begin={`${1.2 + i * 0.4}s`}
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#wws-link-${a.id}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
              </g>
            );
          })}

          {/* Satellite + ambient points */}
          {[...SATELLITES, ...AMBIENT].map((p) => (
            <circle key={`p${p.x}${p.y}`} cx={p.x} cy={p.y} r="3" fill="var(--color-card)" stroke="var(--color-primary)" strokeOpacity="0.5" />
          ))}

          {/* Hub */}
          <circle cx={HUB.x} cy={HUB.y} r="110" fill="url(#wws-hub-glow)" />
          {!reduce &&
            [0, 1].map((k) => (
              <motion.circle
                key={k}
                cx={HUB.x}
                cy={HUB.y}
                r="46"
                stroke="var(--color-primary)"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 2.8, repeat: Infinity, delay: k * 1.4, ease: "easeOut" }}
                style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
              />
            ))}
        </svg>

        {/* Hub label */}
        <div
          className="pointer-events-none absolute flex size-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-card/90 text-center shadow-lg backdrop-blur"
          style={{ left: pct(HUB.x, VIEW.w), top: pct(HUB.y, VIEW.h) }}
        >
          <span className="text-[11px] font-semibold tracking-tight sm:text-sm">WE Healthcare</span>
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-primary sm:text-[10px]">Reporting</span>
        </div>

        {/* Audience nodes */}
        {AUDIENCES.map((a) => {
          const n = NODES[a.id];
          const Icon = n.icon;
          const on = a.id === active;
          return (
            <a
              key={a.id}
              href={`#${a.id}`}
              onMouseEnter={() => setHovered(a.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(a.id)}
              onBlur={() => setHovered(null)}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold whitespace-nowrap backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:py-2.5 sm:text-sm",
                on
                  ? "scale-105 border-primary bg-primary-soft text-foreground shadow-md"
                  : "border-border bg-card/80 text-foreground-muted hover:text-foreground"
              )}
              style={{ left: pct(n.x, VIEW.w), top: pct(n.y, VIEW.h) }}
            >
              <Icon size={18} weight={on ? "fill" : "regular"} aria-hidden="true" className="text-primary" />
              {a.short}
            </a>
          );
        })}
      </div>

      {/* Live readout for the highlighted link */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/80 px-4 py-3 text-sm backdrop-blur">
        <div className="flex items-center gap-3" aria-live="polite">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <motion.span key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-medium">
            {activeAudience.title}
            <span className="ml-2 font-mono text-xs text-foreground-subtle">{activeAudience.tag}</span>
          </motion.span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-subtle">
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" />Study</span>
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-success" />Report</span>
        </div>
      </div>
    </motion.div>
  );
}

export default WhoWeServeHero;
