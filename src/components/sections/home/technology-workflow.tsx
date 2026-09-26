"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  FileText,
  HardDrives,
  ShieldCheck,
  Clock,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PIPELINE_STEPS = [
  { num: "01", title: "Study Scan", desc: "Imaging at facility" },
  { num: "02", title: "Image Upload", desc: "Encrypted transfer" },
  { num: "03", title: "Statim PACS", desc: "Automated routing" },
  { num: "04", title: "Assigned Radiologist", desc: "Subspecialty match" },
  { num: "05", title: "Radiologist Review", desc: "Diagnostic read" },
  { num: "06", title: "QC Checking", desc: "Clinical QA review" },
  { num: "07", title: "Final Report", desc: "Structured documentation" },
  { num: "08", title: "PACS Delivery", desc: "Delivered to EHR" },
];

const CAPABILITIES = [
  {
    title: "12–24h Turnaround",
    description: "Guaranteed turnaround for routine cases, with 24/7 emergency STAT coverage.",
    icon: Clock,
  },
  {
    title: "Pre-Read & Final-Read",
    description: "Flexible preliminary and final-read models tailored to your clinical workflow.",
    icon: FileText,
  },
  {
    title: "PACS & RIS Integrations",
    description: "Seamless bi-directional integration with your existing imaging and EHR systems.",
    icon: HardDrives,
  },
  {
    title: "Secure & Protected",
    description: "HIPAA-compliant, encrypted transmission and SOC2-aligned infrastructure.",
    icon: ShieldCheck,
  },
];

export function TechnologyWorkflow() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 12;
    const stepIdx = Math.min(7, Math.floor((current / total) * 8));
    setActiveStep(stepIdx);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekToStep = (index: number) => {
    if (!videoRef.current) return;
    const total = videoRef.current.duration || 12;
    const targetTime = (index / 8) * total + 0.1;
    videoRef.current.currentTime = targetTime;
    setActiveStep(index);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="technology" className="relative overflow-hidden bg-surface py-section lg:py-section-lg scroll-mt-24">
      <DecorativeLines variant="wide" className="hidden sm:block" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">Technology &amp; Workflow</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Recruiting Radiologists Takes Time
              <span className="block text-primary">Your Imaging Volume Won&apos;t Wait</span>
            </RevealHeading>
          </div>
          <p className="lg:col-span-4 text-base text-foreground-muted leading-relaxed">
            Subspecialty teleradiology support for hospitals, imaging centers, and emergency departments, when you need additional reporting capacity.
          </p>
        </div>
      </Container>

      {/* Workflow animation, masked into the section surface at the edges */}
      <div className="relative my-8 w-full select-none overflow-hidden sm:my-12 lg:my-16">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          aria-label={isPlaying ? "Workflow animation (click to pause)" : "Workflow animation (click to play)"}
          className="mx-auto block h-auto max-h-[95vh] sm:min-h-[480px] w-full cursor-pointer object-contain [--fade-x:3%] sm:[--fade-x:9%] lg:scale-[1.12] mix-blend-multiply dark:mix-blend-screen dark:[filter:invert(1)_hue-rotate(180deg)_contrast(1.15)]"
          style={{
            // Dissolve all four edges into the section surface in either theme
            // (a thinner side fade on phones, where the video spans edge to edge)
            maskImage:
              "linear-gradient(to right, transparent, #000 var(--fade-x), #000 calc(100% - var(--fade-x)), transparent), linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 var(--fade-x), #000 calc(100% - var(--fade-x)), transparent), linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskComposite: "source-in",
          }}
        >
          <source src="/videos/Workfow.mp4" type="video/mp4" />
        </video>
      </div>

      <Container className="relative">
        {/* 8-phase rail, synced with the video; click a phase to seek */}
        <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border-t border-border-strong">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <li key={step.num}>
                <button
                  type="button"
                  onClick={() => seekToStep(idx)}
                  aria-current={isActive ? "step" : undefined}
                  className="relative w-full py-4 pr-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 right-3 -top-px h-0.5 origin-left bg-primary transition-transform duration-500",
                      idx <= activeStep ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                  <span className={cn("block font-mono text-xs tabular-nums", isActive ? "text-primary" : "text-foreground-subtle")}>
                    {step.num}
                  </span>
                  <span className={cn("mt-1 block text-sm font-semibold leading-tight", isActive ? "text-foreground" : "text-foreground-muted")}>
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Capabilities: ruled row, no card */}
        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 border-t border-border">
          {CAPABILITIES.map((cap, idx) => {
            const CapIcon = cap.icon;
            return (
              <motion.li
                key={cap.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: MOTION.easeOut }}
                className="border-b border-border py-7 lg:border-b-0"
              >
                <CapIcon size={22} weight="light" aria-hidden="true" className="text-primary" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">{cap.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export default TechnologyWorkflow;
