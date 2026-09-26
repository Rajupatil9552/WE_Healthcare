"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FILMS, XRAY_WORKFLOW_CONTENT as CONTENT } from "@/content/x-ray";
import { FILM_GRAIN } from "./radiograph";

const FILM = FILMS.shoulder;
const PRIORITY = ["STAT", "Routine"] as const;
const SUBSPECIALTY = ["MSK", "Emergency", "Neuro", "Body"] as const;
/** Skeleton line widths per report section (layout only, no findings text). */
const REPORT_LINES = [[62], [78], [92, 58], [84]];

/**
 * Per-step focus on the shoulder film: the viewer zooms/pans to a region and
 * outlines it. Values are % of the square frame (film is top-aligned cover).
 */
const FOCUS = [
  { scale: 1, x: "0%", y: "0%", box: { left: "6%", top: "6%", width: "88%", height: "88%" } },
  { scale: 1.15, x: "-6%", y: "7%", box: { left: "30%", top: "12%", width: "48%", height: "50%" } },
  { scale: 1.4, x: "-12%", y: "7%", box: { left: "26%", top: "36%", width: "48%", height: "28%" } },
  { scale: 1, x: "0%", y: "0%", box: { left: "10%", top: "10%", width: "80%", height: "46%" } },
];

/**
 * How-it-works, on the stroke protocol pattern: a sticky X-ray viewer beside
 * the step list. The step crossing mid-viewport drives the viewer's focus and
 * its overlays (routing chips at 02, the returned report at 04).
 */
export function ReportingWorkflowSection() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(
    () => {
      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(idx),
          onLeaveBack: () => idx === 0 && setActive(0),
        });
      });
    },
    { scope: listRef },
  );

  const jumpTo = (idx: number) => {
    setActive(idx);
    stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const step = CONTENT.steps[active];
  const focus = FOCUS[active] ?? FOCUS[0];
  const total = String(CONTENT.steps.length).padStart(2, "0");

  return (
    <section id="workflow" className="relative scroll-mt-24 overflow-clip bg-background py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{CONTENT.eyebrow}</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
          <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Sticky X-ray viewer */}
          <figure className="lg:sticky lg:top-28 lg:col-span-6">
            <div className="overflow-hidden rounded-lg bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                <span className="font-medium text-white">{CONTENT.viewerLabel}</span>
                <span className="font-mono">
                  Step {step.step}/{total}
                </span>
              </div>

              <div className="relative aspect-square overflow-hidden sm:aspect-[5/4]">
                <motion.div
                  animate={{ scale: focus.scale, x: focus.x, y: focus.y }}
                  transition={{ duration: 0.9, ease: MOTION.easeOut }}
                  className="absolute inset-0"
                >
                  <Image src={FILM.src} alt={FILM.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                  style={{ backgroundImage: FILM_GRAIN }}
                />
                <motion.div
                  aria-hidden="true"
                  animate={focus.box}
                  transition={{ duration: 0.9, ease: MOTION.easeOut }}
                  className="absolute rounded-sm border border-sky-200/80 shadow-[0_0_0_9999px_rgb(2_6_23/0.35)]"
                />

                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/90 to-transparent" />

                <p className="pointer-events-none absolute right-4 top-3 font-mono text-[11px] uppercase tracking-[0.16em] text-sky-100/80">
                  {FILM.view}
                </p>

                {/* 02: routing tags */}
                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: active === 1 ? 1 : 0, y: active === 1 ? 0 : -6 }}
                  transition={{ duration: 0.4, ease: MOTION.easeOut }}
                  className="pointer-events-none absolute left-4 top-3 flex flex-wrap gap-1.5"
                >
                  <Tag tone="urgent">{PRIORITY[0]}</Tag>
                  <Tag>{SUBSPECIALTY[0]}</Tag>
                </motion.div>

                {/* 04: the returned report slides over the film */}
                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: active === 3 ? 1 : 0, y: active === 3 ? 0 : 24 }}
                  transition={{ duration: 0.5, ease: MOTION.easeOut }}
                  className="pointer-events-none absolute inset-x-4 bottom-20 rounded-md bg-slate-50 p-4 text-slate-900 shadow-2xl sm:left-auto sm:w-72"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">Radiology Report</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">PACS / RIS</p>
                  </div>
                  <dl className="mt-2.5 space-y-2">
                    {CONTENT.reportSections.map((section, i) => (
                      <div key={section} className="grid grid-cols-[6rem_1fr] items-start gap-2">
                        <dt
                          className={cn(
                            "font-mono text-[9px] uppercase leading-4 tracking-[0.12em]",
                            section === "Impression" ? "font-semibold text-sky-800" : "text-slate-500"
                          )}
                        >
                          {section}
                        </dt>
                        <dd className="space-y-1 pt-1.5">
                          {REPORT_LINES[i].map((w, j) => (
                            <span
                              key={j}
                              className={cn("block h-1 rounded-full", section === "Impression" ? "bg-sky-700/60" : "bg-slate-300")}
                              style={{ width: `${w}%` }}
                            />
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>

                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">{step.detailBadge}</p>
                  <p className="mt-1 text-sm font-medium text-white">{step.visualFocus}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
                <span className="text-xs text-white/60">Reporting Workflow Progression</span>
                <div className="flex gap-1.5">
                  {CONTENT.steps.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`Jump to step ${s.step}: ${s.title}`}
                      aria-current={active === i ? "step" : undefined}
                      className={cn(
                        "rounded-sm px-2 py-0.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                        active === i ? "bg-white text-slate-950" : "text-white/60 hover:text-white"
                      )}
                    >
                      {s.step}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-[13px] text-foreground-subtle">Illustrative, non-PHI.</figcaption>
          </figure>

          {/* Step list: scrolling it drives the viewer */}
          <ol ref={listRef} className="border-t border-border-strong lg:col-span-6">
            {CONTENT.steps.map((s, idx) => {
              const isActive = active === idx;
              return (
                <li
                  key={s.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="border-b border-border lg:flex lg:min-h-[42vh] lg:items-center"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActive(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(idx);
                      }
                    }}
                    className="w-full cursor-pointer rounded-sm py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className={cn("font-mono text-sm tabular-nums transition-colors", isActive ? "text-primary" : "text-foreground-subtle")}>
                        {s.step}
                      </span>
                      <div>
                        <h3
                          className={cn(
                            "text-2xl font-semibold tracking-tight transition-colors",
                            isActive ? "text-foreground" : "text-foreground-subtle"
                          )}
                        >
                          {s.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-primary">{s.detailBadge}</p>
                        <p className={cn("mt-3 text-base leading-relaxed transition-colors", isActive ? "text-foreground-muted" : "text-foreground-subtle")}>
                          {s.description}
                        </p>
                        {isActive && (
                          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                            Viewing Study
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {CONTENT.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:text-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Tag({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "urgent" }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] backdrop-blur-sm",
        tone === "urgent" ? "border-rose-400/60 bg-rose-500/25 text-rose-100" : "border-sky-300/60 bg-sky-400/20 text-sky-100"
      )}
    >
      {children}
    </span>
  );
}

export default ReportingWorkflowSection;
