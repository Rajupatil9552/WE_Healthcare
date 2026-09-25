"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  HardDrives,
  ShieldCheck,
  Clock,
  Cpu,
  ArrowRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
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
  const shouldReduceMotion = useReducedMotion();

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

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-slate-50/50 dark:from-[#080e11] dark:via-[#0a1317] dark:to-[#080e11] py-16 sm:py-20 lg:py-28 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      {/* Decorative Wave Linework in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-15">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-sky-400"
        >
          <path
            d="M-100 200 C300 400, 700 50, 1100 250 C1300 350, 1500 200, 1600 280"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 250 C350 450, 750 100, 1150 300 C1350 400, 1550 250, 1650 330"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header Block */}
        <div className="relative mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          {/* Eyebrow Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300 shadow-sm backdrop-blur-sm"
          >
            <Cpu size={14} weight="bold" className="text-sky-500" />
            <span>Technology &amp; Workflow</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            Recruiting Radiologists Takes Time <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Your Imaging Volume Won't Wait
            </span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
             Subspecialty teleradiology support for hospitals, imaging centers, and emergency departments, when you need additional reporting capacity.
          </motion.p>
        </div>
      </Container>

      {/* Full-Width Seamless 3D Workflow Animation with Side Gradients */}
      <div className="relative w-full my-6 sm:my-10 overflow-hidden select-none">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 max-w-6xl mx-auto bg-gradient-to-r from-sky-500/20 via-cyan-400/15 to-blue-600/20 blur-3xl pointer-events-none rounded-full opacity-50 dark:opacity-40" />

        {/* Left Side Gradient Overlay (Seamless Edge Fade) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 md:w-56 lg:w-80 xl:w-96 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#080e11] dark:via-[#080e11]/85 dark:to-transparent z-10" />

        {/* Right Side Gradient Overlay (Seamless Edge Fade) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 md:w-56 lg:w-80 xl:w-96 bg-gradient-to-l from-white via-white/85 to-transparent dark:from-[#080e11] dark:via-[#080e11]/85 dark:to-transparent z-10" />

        {/* Top Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-white dark:from-[#080e11] to-transparent z-10" />

        {/* Bottom Gradient Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-white dark:from-[#080e11] to-transparent z-10" />

        {/* Full-Width Video Canvas */}
        <div className="relative w-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-auto min-h-[320px] max-h-[85vh] object-cover sm:object-contain mx-auto block cursor-pointer transition-all duration-500 mix-blend-multiply dark:[filter:invert(0.92)_hue-rotate(180deg)] dark:mix-blend-screen"
          >
            <source src="/videos/Workfow.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <Container className="relative z-10">
        {/* Interactive 8-Phase Step Stepper (Synchronized with Video) */}
        <div className="mt-8 sm:mt-12 lg:mt-16 mb-14 sm:mb-16">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pt-4 pb-4 px-1.5 scrollbar-none">
            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => seekToStep(idx)}
                  className={cn(
                    "flex-1 min-w-[110px] sm:min-w-0 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 cursor-pointer border",
                    isActive
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-950/70 shadow-lg shadow-sky-500/15 ring-2 ring-sky-500/30 -translate-y-1"
                      : "border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-sky-300 dark:hover:border-sky-800"
                  )}
                >
                  <span
                    className={cn(
                      "block font-mono text-[10px] font-bold",
                      isActive
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {step.num}
                  </span>
                  <span
                    className={cn(
                      "block text-xs font-bold leading-tight truncate mt-0.5",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Technology & Integrations Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70 dark:divide-slate-800/70">
            {CAPABILITIES.map((cap, idx) => {
              const CapIcon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={cn(
                    "flex items-start gap-3.5 px-3 py-2 transition-transform duration-200 hover:translate-y-[-2px]",
                    idx !== 0 && "pt-6 sm:pt-2 lg:pt-2"
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 text-sky-600 dark:text-sky-400">
                    <CapIcon size={20} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {cap.title}
                    </span>
                    <span className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug font-normal">
                      {cap.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default TechnologyWorkflow;
