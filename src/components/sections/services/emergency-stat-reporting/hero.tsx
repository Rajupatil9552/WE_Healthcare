"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Lightning,
  ArrowRight,
  PhoneCall,
  CheckCircle,
  Eye,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EMERGENCY_HERO_CONTENT } from "@/content/emergency-stat-reporting";

// Conceptual acute care studies demonstrating priority routing
interface ConceptualStudy {
  id: string;
  exam: string;
  modality: "CT" | "MRI" | "XR";
  priority: "STAT" | "High" | "Routine";
  status: "Communication" | "In Review" | "Pending" | "Completed";
  location: string;
}

const CONCEPTUAL_STUDIES: ConceptualStudy[] = [
  {
    id: "case-stat-head",
    exam: "CT Head w/o Contrast (Acute Neuro)",
    modality: "CT",
    priority: "STAT",
    status: "Communication",
    location: "Trauma Bay / ED",
  },
  {
    id: "case-stat-chest",
    exam: "CT Chest / Abdomen (Trauma Protocol)",
    modality: "CT",
    priority: "STAT",
    status: "In Review",
    location: "Emergency Suite",
  },
  {
    id: "case-urg-brain",
    exam: "MRI Brain w/ & w/o IV Contrast",
    modality: "MRI",
    priority: "High",
    status: "Pending",
    location: "Inpatient Neuro",
  },
  {
    id: "case-rout-xr",
    exam: "X-Ray Chest 2-Views PA & Lateral",
    modality: "XR",
    priority: "Routine",
    status: "Completed",
    location: "Urgent Care",
  },
];

export function EmergencyHero() {
  const shouldReduceMotion = useReducedMotion();

  // Subtle editorial entrance
  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#040c16] text-slate-900 dark:text-white pt-32 pb-20 lg:pt-40 lg:pb-24 border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Authoritative Clinical Narrative (~5 cols)                */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start">
            
            {/* 1. Primary H1 Headline (Starts cleanly without redundant eyebrow) */}
            <motion.h1
              {...fadeIn(0.04)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              {EMERGENCY_HERO_CONTENT.heading}
            </motion.h1>

            {/* 2. Supporting Clinical Heading */}
            <motion.p
              {...fadeIn(0.12)}
              className="mt-4 text-lg sm:text-xl font-semibold text-rose-700 dark:text-rose-300 leading-snug"
            >
              {EMERGENCY_HERO_CONTENT.subheading}
            </motion.p>

            {/* 3. Clinical Context Body */}
            <motion.p
              {...fadeIn(0.18)}
              className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {EMERGENCY_HERO_CONTENT.body}
            </motion.p>

            {/* 4. Structured Clinical Operations Points */}
            <motion.div
              {...fadeIn(0.24)}
              className="mt-6 pt-6 border-t border-slate-200/90 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
            >
              <div className="rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Priority Triage
                </span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Immediate worklist elevation for high-acuity studies
                </p>
              </div>

              <div className="rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Direct Outreach
                </span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Radiologist telephone call for critical findings
                </p>
              </div>

              <div className="rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Closed-Loop
                </span>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Verbal read-back documented directly into the EHR
                </p>
              </div>
            </motion.div>

            {/* 5. CTAs */}
            <motion.div
              {...fadeIn(0.3)}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <Link
                href={EMERGENCY_HERO_CONTENT.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-rose-600 hover:bg-rose-500 text-white shadow-sm px-6 font-semibold"
                )}
              >
                <span>{EMERGENCY_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </Link>
              <Link
                href={EMERGENCY_HERO_CONTENT.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-6 font-medium"
                )}
              >
                <span>{EMERGENCY_HERO_CONTENT.secondaryCta.label}</span>
              </Link>
            </motion.div>

            {/* Supporting note */}
            <motion.p
              {...fadeIn(0.36)}
              className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-normal"
            >
              {EMERGENCY_HERO_CONTENT.primaryCta.supportingText}
            </motion.p>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Authentic Diagnostic Priority Interface (~7 cols)        */}
          {/* ============================================================== */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4"
          >
            {/* Main Clinical Diagnostic Console Frame */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07131e] shadow-xl shadow-slate-200/50 dark:shadow-black/60">
              
              {/* Header Bar */}
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Emergency Teleradiology Console
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Acute Priority Worklist
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck size={14} className="text-rose-600 dark:text-rose-400" />
                  <span>U.S. Board-Certified Radiologists</span>
                </div>
              </div>

              {/* Workstation Photograph */}
              <div className="relative aspect-[16/8] sm:aspect-[16/7.5] w-full overflow-hidden bg-slate-950">
                <Image
                  src={EMERGENCY_HERO_CONTENT.image}
                  alt={EMERGENCY_HERO_CONTENT.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <span className="font-medium drop-shadow-xs">
                    Diagnostic Multi-Monitor Reading Room
                  </span>
                  <span className="text-[11px] text-slate-300 drop-shadow-xs">
                    Direct PACS / RIS Protocol
                  </span>
                </div>
              </div>

              {/* Featured Focal STAT Escalation Card */}
              <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-rose-50/40 dark:bg-rose-950/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-2xs">
                      <Lightning size={12} weight="fill" />
                      STAT Case
                    </span>
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {CONCEPTUAL_STUDIES[0].exam}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                    {CONCEPTUAL_STUDIES[0].location}
                  </span>
                </div>

                {/* Clear Escalation Progression Line: STAT -> Priority Routing -> Radiologist Review */}
                <div className="mt-3.5 pt-3 border-t border-rose-200/60 dark:border-rose-900/40 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded bg-white/80 dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/50 p-2">
                    <span className="block text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">
                      Step 1
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white mt-0.5 block text-[11px]">
                      STAT Flagged
                    </span>
                  </div>

                  <div className="rounded bg-white/80 dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/50 p-2">
                    <span className="block text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">
                      Step 2
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white mt-0.5 block text-[11px]">
                      Priority Routing
                    </span>
                  </div>

                  <div className="rounded bg-white/80 dark:bg-slate-900/80 border border-rose-200/80 dark:border-rose-900/50 p-2">
                    <span className="block text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">
                      Step 3
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white mt-0.5 block text-[11px]">
                      Clinician Call
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <PhoneCall size={14} className="text-rose-600 dark:text-rose-400" />
                    Direct verbal escalation to treating emergency physician
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle size={13} weight="fill" />
                    Read-back logged
                  </span>
                </div>
              </div>

              {/* Supporting Conceptual Worklist Studies */}
              <div className="p-3 sm:px-5 bg-white dark:bg-[#07131e] border-t border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Active Clinical Worklist Stream
                </div>
                <div className="space-y-1.5">
                  {CONCEPTUAL_STUDIES.slice(1).map((study) => (
                    <div
                      key={study.id}
                      className="flex items-center justify-between py-1.5 px-2.5 rounded bg-slate-50 dark:bg-slate-900/50 text-xs border border-slate-200/60 dark:border-slate-800/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                            study.priority === "STAT" && "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
                            study.priority === "High" && "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
                            study.priority === "Routine" && "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          )}
                        >
                          {study.priority}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {study.exam}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                        <span className="hidden sm:inline">{study.location}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {study.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Subtle Operational Context Note Below Visual */}
            <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
              <span>Configurable triage protocols mapped to client hospital EHR/PACS</span>
              <span className="hidden sm:inline">24/7/365 Subspecialty Support</span>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default EmergencyHero;
