"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "next-themes";
import {
  FileText,
  HardDrives,
  ShieldCheck,
  Clock,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { VideoSources } from "@/components/ui/video-sources";
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

/** Theme-specific renders of the workflow animation. */
const WORKFLOW_VIDEO = {
  light: "/videos/Workflow_White.mp4",
  dark: "/videos/Workflow_Black.mp4",
} as const;

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true after: keeps the server-rendered video src stable. */
const useMounted = () => React.useSyncExternalStore(noopSubscribe, () => true, () => false);

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
  // Lazy-load: attach the video source only once the section is ~400px from the
  // viewport, so ~800 KB of video doesn't compete with the hero at page load.
  const videoWrapRef = React.useRef<HTMLDivElement>(null);
  const nearView = useInView(videoWrapRef, { once: true, margin: "400px 0px" });
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const videoSrc = mounted && resolvedTheme === "dark" ? WORKFLOW_VIDEO.dark : WORKFLOW_VIDEO.light;
  // Playback position carried across a theme switch (the video remounts with the new file).
  const resumeAt = React.useRef(0);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !resumeAt.current) return;
    video.currentTime = resumeAt.current;
    if (!isPlaying) video.pause();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    resumeAt.current = current;
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
      <div ref={videoWrapRef} className="relative my-8 w-full select-none overflow-hidden sm:my-12 lg:my-16">
        <video
          key={nearView ? videoSrc : "idle"}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload={nearView ? "auto" : "none"}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          aria-label={isPlaying ? "Workflow animation (click to pause)" : "Workflow animation (click to play)"}
          // Box is exactly 16:9 (the videos are 1920x1080) so the edge mask lands on the
          // picture itself, never on letterbox bars. Width is capped so height stays ~106vh max.
          className="mx-auto block aspect-video h-auto w-full max-w-[calc(106vh*16/9)] cursor-pointer object-cover [--fade-x:3%] [--fade-y:8%] sm:[--fade-x:9%] mix-blend-multiply dark:mix-blend-screen dark:[--fade-x:14%] dark:[--fade-y:14%]"
          style={{
            // Dissolve all four edges into the section surface in either theme. The dark
            // render has a navy backdrop (not pure black), so it gets a wider fade.
            maskImage:
              "linear-gradient(to right, transparent, #000 var(--fade-x), #000 calc(100% - var(--fade-x)), transparent), linear-gradient(to bottom, transparent, #000 var(--fade-y), #000 calc(100% - var(--fade-y)), transparent)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 var(--fade-x), #000 calc(100% - var(--fade-x)), transparent), linear-gradient(to bottom, transparent, #000 var(--fade-y), #000 calc(100% - var(--fade-y)), transparent)",
            WebkitMaskComposite: "source-in",
          }}
        >
          {nearView && <VideoSources src={videoSrc} />}
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
