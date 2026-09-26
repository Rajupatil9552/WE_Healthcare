"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Lightning, MoonStars } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MRI_STUDIES_CONTENT as CONTENT, type BodyRegion, type MriStudy } from "@/content/mri";

const STUDIES: readonly MriStudy[] = CONTENT.studies;
const ANATOMY = STUDIES.filter((s) => s.kind === "anatomy");
const WORKFLOW = STUDIES.filter((s) => s.kind === "workflow");

const REGION_NAME: Record<BodyRegion, string> = {
  brain: "Brain",
  head: "Head",
  neck: "Neck",
  cspine: "Cervical spine",
  spine: "Spine",
  chest: "Chest",
  abdomen: "Abdomen",
  pelvis: "Pelvis",
  msk: "Muscles, bones & joints",
};

/** Radiograph-style skeleton (public domain, see MRI_IMAGE_CREDITS); 436 x 842 viewBox. */
const SKELETON = { src: "/images/modalities/mri/mri-skeleton-map.webp", width: 436, height: 842 };

/** Planning-box bounds per region, in the skeleton's viewBox. */
const BOUNDS: Record<BodyRegion | "all", { x: number; y: number; width: number; height: number }> = {
  brain: { x: 176, y: 4, width: 84, height: 58 },
  head: { x: 170, y: 2, width: 96, height: 104 },
  neck: { x: 184, y: 100, width: 68, height: 42 },
  cspine: { x: 200, y: 100, width: 28, height: 42 },
  spine: { x: 192, y: 100, width: 38, height: 286 },
  chest: { x: 138, y: 138, width: 150, height: 136 },
  abdomen: { x: 150, y: 262, width: 132, height: 76 },
  pelvis: { x: 124, y: 316, width: 168, height: 106 },
  msk: { x: 52, y: 136, width: 358, height: 704 },
  all: { x: 6, y: 2, width: 424, height: 838 },
};

/**
 * MRI Study Map: every study we report as an accessible list; choosing one
 * moves an MRI-localizer style planning box to that region on a conceptual
 * figure and shows the study -> area -> expertise pairing. Illustrative only.
 */
export function StudyMapSection() {
  const [activeId, setActiveId] = useState(STUDIES[0].id);
  const uid = useId();
  const active = STUDIES.find((s) => s.id === activeId) ?? STUDIES[0];

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>
          </div>

          {/* Map panel */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div id={`${uid}-map`} className="overflow-hidden rounded-lg bg-slate-950 shadow-lg lg:sticky lg:top-28">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-white/70">
                <span className="font-medium text-white">MRI Study Map</span>
                <span className="font-mono uppercase tracking-[0.12em]">Localizer · Illustrative</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                <Figure study={active} />

                <div className="p-4 sm:border-l sm:border-white/10 sm:p-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-black">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0"
                      >
                        <Image src={active.image.src} alt={active.image.alt} fill sizes="(max-width: 640px) 90vw, 20rem" className="object-contain" />
                      </motion.div>
                    </AnimatePresence>
                    <p className="absolute left-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sky-100">
                      MRI · {active.image.plane}
                    </p>
                  </div>

                  <MappingChain study={active} />
                </div>
              </div>
            </div>
          </div>

          {/* Study list (the accessible equivalent of the map) */}
          <div className="lg:col-span-5 lg:row-start-2">
            <h3 className="border-b border-border-strong pb-3 text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
            <StudyGroup
              label={CONTENT.anatomyLabel}
              studies={ANATOMY}
              activeId={activeId}
              onSelect={setActiveId}
              controls={`${uid}-map`}
            />
            <StudyGroup
              label={CONTENT.workflowLabel}
              studies={WORKFLOW}
              activeId={activeId}
              onSelect={setActiveId}
              controls={`${uid}-map`}
              offset={ANATOMY.length}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function StudyGroup({
  label,
  studies,
  activeId,
  onSelect,
  controls,
  offset = 0,
}: {
  label: string;
  studies: readonly MriStudy[];
  activeId: string;
  onSelect: (id: string) => void;
  controls: string;
  offset?: number;
}) {
  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">{label}</p>
      <ul className="mt-2">
        {studies.map((study, i) => {
          const isActive = study.id === activeId;
          const urgent = study.id === "emergency";
          const Icon = urgent ? Lightning : study.id === "night" ? MoonStars : null;
          return (
            <motion.li
              key={study.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (offset + i) * 0.04, ease: MOTION.easeOut }}
              className="border-b border-border"
            >
              <button
                type="button"
                aria-pressed={isActive}
                aria-controls={controls}
                onClick={() => onSelect(study.id)}
                onMouseEnter={() => onSelect(study.id)}
                onFocus={() => onSelect(study.id)}
                className="group flex w-full items-center gap-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  aria-hidden="true"
                  className={cn("h-5 w-0.5 shrink-0 rounded-full transition-colors", isActive ? (urgent ? "bg-urgent" : "bg-primary") : "bg-transparent")}
                />
                <span
                  className={cn(
                    "flex flex-1 items-center gap-2 text-lg font-semibold tracking-tight transition-colors",
                    urgent ? "text-urgent" : isActive ? "text-foreground" : "text-foreground-muted group-hover:text-foreground"
                  )}
                >
                  {Icon && <Icon size={16} weight="fill" aria-hidden="true" />}
                  {study.label}
                </span>
                <span className={cn("text-right font-mono text-[11px] uppercase tracking-[0.1em] transition-colors", isActive ? "text-primary" : "text-foreground-subtle")}>
                  {study.expertise ?? study.note}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function Figure({ study }: { study: MriStudy }) {
  const uid = useId().replace(/:/g, "");
  const box = BOUNDS[study.region ?? "all"];
  const workflow = study.kind === "workflow";
  const urgent = study.id === "emergency";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative hidden w-full p-5 sm:block"
    >
      <svg viewBox={`0 0 ${SKELETON.width} ${SKELETON.height}`} className="mx-auto h-auto w-full max-w-[17rem]" fill="none">
        <defs>
          <pattern id={`${uid}-slices`} width="9" height="9" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="9" y2="0.5" stroke="rgb(125 211 252)" strokeWidth="0.9" />
          </pattern>
          <clipPath id={`${uid}-focus`}>
            <motion.rect initial={false} animate={box} transition={{ duration: 0.6, ease: MOTION.easeOut }} rx="5" />
          </clipPath>
        </defs>

        {/* Localizer grid */}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1="0" x2={SKELETON.width} y1={30 + i * 60} y2={30 + i * 60} stroke="rgb(255 255 255 / 0.05)" />
        ))}

        {/* Scout skeleton, dimmed; the planning box brings its region to full strength */}
        <image href={SKELETON.src} width={SKELETON.width} height={SKELETON.height} opacity={workflow ? 0.85 : 0.35} style={{ mixBlendMode: "screen" }} className="transition-opacity duration-500" />
        {!workflow && (
          <image href={SKELETON.src} width={SKELETON.width} height={SKELETON.height} clipPath={`url(#${uid}-focus)`} style={{ mixBlendMode: "screen" }} />
        )}

        {/* Planning box */}
        <motion.rect
          initial={false}
          animate={box}
          transition={{ duration: 0.6, ease: MOTION.easeOut }}
          fill={`url(#${uid}-slices)`}
          fillOpacity={workflow ? 0.12 : 0.3}
          stroke={urgent ? "rgb(251 113 133)" : "rgb(125 211 252)"}
          strokeWidth="2"
          strokeDasharray={workflow ? "4 6" : "10 6"}
          rx="5"
        />
      </svg>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-sky-100/70">
        {study.region ? REGION_NAME[study.region] : CONTENT.workflowLabel}
      </p>
    </motion.div>
  );
}

function MappingChain({ study }: { study: MriStudy }) {
  const steps = [
    { label: "Study", value: study.label },
    { label: study.kind === "anatomy" ? "Anatomical area" : "Workflow", value: study.region ? REGION_NAME[study.region] : (study.note ?? "") },
    { label: "Reporting expertise", value: study.expertise ?? "Routed by priority and available expertise" },
    { label: "Output", value: "MRI reporting" },
  ];
  return (
    <ol className="relative mt-4 space-y-2.5 pl-5">
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: MOTION.easeOut }}
        className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-sky-300/50"
      />
      {steps.map((step, i) => (
        <li key={step.label} className="relative">
          <span aria-hidden="true" className={cn("absolute -left-5 top-1.5 size-[7px] rounded-full", i === 3 ? "bg-sky-300" : "border border-sky-300 bg-slate-950")} />
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">{step.label}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={step.value}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={cn("text-sm font-semibold", i === 2 ? "text-sky-200" : "text-white")}
            >
              {step.value}
            </motion.p>
          </AnimatePresence>
        </li>
      ))}
    </ol>
  );
}

export default StudyMapSection;
