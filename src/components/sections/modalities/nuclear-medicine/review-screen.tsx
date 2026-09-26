"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useAutoCycle } from "@/components/sections/modalities/shared/use-auto-cycle";
import { FusionPanel } from "@/components/sections/modalities/pet-ct/fusion-panel";
import { MipRotator } from "@/components/sections/modalities/pet-ct/mip-rotator";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { NM_IMAGES, NM_STUDIES_CONTENT as CONTENT, type NmStudyId } from "@/content/nuclear-medicine";
import { Renogram } from "./renogram";

/**
 * Nuclear Medicine Reporting + Studies We Report as a multi-pane review
 * screen (how nuclear medicine is read): one pane per study, each with its
 * label always visible. Focus moves across the panes on its own while the
 * section is in view; any pane can be selected.
 */
export function ReviewScreenSection() {
  const ref = useRef<HTMLUListElement>(null);
  const [active, select] = useAutoCycle(CONTENT.studies.length, ref, 3000);

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>
          </div>
          <ul className="grid grid-cols-1 gap-3 self-end sm:grid-cols-2 lg:col-span-6">
            {CONTENT.requirements.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: MOTION.easeOut }}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
              >
                <Check size={16} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                {r}
              </motion.li>
            ))}
          </ul>
        </div>

        <h3 className="mt-16 text-xl font-semibold text-foreground">{CONTENT.studiesHeading}</h3>
        <div className="mt-5 rounded-xl bg-slate-900 p-2 shadow-lg sm:p-3">
          <ul ref={ref} className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
            {CONTENT.studies.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-label={`${s.label}, ${s.acquisition}`}
                    onClick={() => select(i)}
                    className={cn(
                      "group block w-full overflow-hidden rounded-lg text-left ring-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-sky-300",
                      on ? "ring-sky-300/90" : "ring-transparent hover:ring-white/20"
                    )}
                  >
                    <div className={cn("relative aspect-[4/3]", PANE_BG[s.id])}>
                      <Pane id={s.id} active={on} />
                    </div>
                    <div className={cn("flex items-baseline justify-between gap-2 px-3 py-2.5 transition-colors", on ? "bg-slate-800" : "bg-slate-950")}>
                      <span className={cn("text-sm font-semibold sm:text-base", on ? "text-white" : "text-white/75")}>{s.label}</span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.1em] text-sky-200/70 sm:inline">{s.acquisition}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-3 text-[13px] text-foreground-subtle">Illustrative images, non-PHI.</p>
      </Container>
    </section>
  );
}

const PANE_BG: Record<NmStudyId, string> = {
  "pet-ct": "bg-black",
  bone: "bg-white",
  thyroid: "bg-[#d6d6d6]",
  cardiac: "bg-black",
  renal: "bg-white",
  oncology: "bg-white",
};

function Pane({ id, active }: { id: NmStudyId; active: boolean }): ReactNode {
  switch (id) {
    case "pet-ct":
      return (
        <div className="absolute inset-0 flex justify-center">
          <FusionPanel view="fused" sizes="12rem" className="h-full" />
        </div>
      );
    case "bone":
      return (
        <div className="absolute inset-0 flex justify-center gap-1 py-1">
          {[NM_IMAGES.boneAnterior, NM_IMAGES.bonePosterior].map((img) => (
            <div key={img.src} className="relative h-full" style={{ aspectRatio: img.ratio }}>
              <Image src={img.src} alt={img.alt} fill sizes="6rem" className="object-contain" />
            </div>
          ))}
        </div>
      );
    case "thyroid":
      return <Image src={NM_IMAGES.thyroid.src} alt={NM_IMAGES.thyroid.alt} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-contain" />;
    case "cardiac":
      return (
        <div className="absolute inset-0 flex flex-col justify-center px-2">
          <div className="relative w-full" style={{ aspectRatio: NM_IMAGES.cardiac.ratio }}>
            <Image src={NM_IMAGES.cardiac.src} alt={NM_IMAGES.cardiac.alt} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-contain" />
          </div>
          <div aria-hidden="true" className="mt-1 flex justify-between px-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">
            <span>Stress ↑ · Rest ↓</span>
            <span>Short axis</span>
          </div>
        </div>
      );
    case "renal":
      return <Renogram key={active ? "on" : "off"} animate={active} className="absolute inset-0 h-full w-full" />;
    case "oncology":
      return (
        <div className="absolute inset-0 flex justify-center py-2">
          <MipRotator playing={active} showAngle={false} className="h-full" />
        </div>
      );
  }
}

export default ReviewScreenSection;
