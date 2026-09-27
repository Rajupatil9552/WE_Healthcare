"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CaretRight } from "@phosphor-icons/react";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DICOM as CONTENT } from "@/content/technology-security";
import { ChapterHeader, ChapterNote } from "./chapter-layout";
import { useJourney, useScrollStep } from "./journey";

const CAPS = CONTENT.capabilities;

/**
 * Chapter 02: capabilities on the left drive an illustrative DICOM study
 * header on the right; the field each capability relies on lights up.
 * Advances with scroll; clicking a capability selects it.
 */
export function DicomWorkflowChapter() {
  const ref = useRef<HTMLElement>(null);
  // Capabilities advance with scroll; the study card mirrors the lit field.
  const [active, select] = useScrollStep(ref, CAPS.length);
  const { setDicomIndex } = useJourney();
  useEffect(() => setDicomIndex(active), [active, setDicomIndex]);
  const field = CAPS[active].field;

  return (
    <section ref={ref} id="dicom-workflow" className="scroll-mt-28 border-b border-border py-16 lg:py-24">
      <ChapterHeader id="dicom-workflow" title={CONTENT.heading} body={CONTENT.body} />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Capabilities */}
        <ul className="space-y-2 md:col-span-5" aria-label="DICOM workflow capabilities">
          {CAPS.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className={cn(
                    "group relative flex w-full items-center gap-4 overflow-hidden rounded-lg border px-4 py-3.5 text-left transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    on ? "border-primary/50 bg-primary-soft" : "border-border bg-card hover:border-border-strong"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="dicom-cap-rail"
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-500 to-cyan-400"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={cn("font-mono text-xs tabular-nums", on ? "text-primary" : "text-foreground-subtle")}>0{i + 1}</span>
                  <span className={cn("flex-1 text-[15px] font-medium", on ? "text-foreground" : "text-foreground-muted group-hover:text-foreground")}>
                    {c.label}
                  </span>
                  <CaretRight
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className={cn("transition-[transform,opacity] duration-300", on ? "translate-x-0 text-primary" : "-translate-x-1 opacity-0 group-hover:opacity-60")}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Illustrative study header */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-md md:col-span-7" aria-live="polite">
          <div className="flex items-center gap-4 border-b border-border bg-surface p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-slate-950">
              <Image src="/images/modalities/ct/ct-head-axial.webp" alt="" fill sizes="64px" className="object-cover" />
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent"
                animate={{ top: ["-20%", "110%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">Study header · Example data</p>
              <p className="mt-1 truncate text-base font-semibold text-foreground">CT Head without contrast</p>
            </div>
            <span className="hidden rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted sm:inline">
              DICOM
            </span>
          </div>

          <dl className="divide-y divide-border">
            {CONTENT.header.map((row) => {
              const on = row.field === field;
              return (
                <div
                  key={row.field}
                  className={cn(
                    "relative grid grid-cols-[6.5rem_1fr] items-center gap-3 px-4 py-3 transition-colors duration-300 sm:grid-cols-[7.5rem_1fr_auto]",
                    on ? "bg-primary-soft" : ""
                  )}
                >
                  <dt className="font-mono text-[11px] text-foreground-subtle">{row.tag}</dt>
                  <dd className="min-w-0">
                    <span className={cn("block text-xs transition-colors", on ? "text-foreground-muted" : "text-foreground-subtle")}>{row.name}</span>
                    <span className={cn("block truncate font-mono text-sm transition-colors", on ? "font-semibold text-primary" : "text-foreground-muted")}>
                      {row.value}
                    </span>
                  </dd>
                  <span className="hidden sm:block">
                    {on && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: MOTION.easeOut }}
                        className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-on-primary"
                      >
                        In use
                      </motion.span>
                    )}
                  </span>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <ChapterNote>{CONTENT.note}</ChapterNote>
    </section>
  );
}

export default DicomWorkflowChapter;
