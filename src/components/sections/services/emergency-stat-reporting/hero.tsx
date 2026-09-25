"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Lightning, ArrowRight, PhoneCall, CheckCircle } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO_HEADING_MOTION, MOTION } from "@/lib/motion";
import { EMERGENCY_HERO_CONTENT } from "@/content/emergency-stat-reporting";

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

const OPERATIONS_POINTS = [
  { term: "Priority Triage", detail: "Immediate worklist elevation for high-acuity studies" },
  { term: "Direct Outreach", detail: "Radiologist telephone call for critical findings" },
  { term: "Closed-Loop", detail: "Verbal read-back documented directly into the EHR" },
];
const ESCALATION_STEPS = ["STAT Flagged", "Priority Routing", "Clinician Call"];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: MOTION.easeOut },
});

export function EmergencyHero() {
  const shouldReduceMotion = useReducedMotion();
  // 0 = STAT study still queued last · 1 = moved to top · 2..4 = escalation steps lit
  const [animatedPhase, setPhase] = useState(0);
  const phase = shouldReduceMotion ? 4 : animatedPhase;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timers = [700, 1500, 1900, 2300].map((ms, i) => window.setTimeout(() => setPhase(i + 1), ms));
    return () => timers.forEach(window.clearTimeout);
  }, [shouldReduceMotion]);

  const statCase = CONCEPTUAL_STUDIES[0];
  const queue = phase >= 1 ? CONCEPTUAL_STUDIES : [...CONCEPTUAL_STUDIES.slice(1), statCase];

  return (
    <section className="relative bg-background pt-36 pb-section lg:pt-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <motion.h1 {...HERO_HEADING_MOTION} className="text-display-sm font-semibold text-foreground text-balance">
              {EMERGENCY_HERO_CONTENT.heading}
            </motion.h1>
            <motion.p {...fadeIn(0.1)} className="mt-6 text-lead font-medium text-urgent">
              {EMERGENCY_HERO_CONTENT.subheading}
            </motion.p>
            <motion.p {...fadeIn(0.16)} className="mt-4 text-base text-foreground-muted leading-relaxed">
              {EMERGENCY_HERO_CONTENT.body}
            </motion.p>

            <motion.dl {...fadeIn(0.22)} className="mt-8 border-t border-border">
              {OPERATIONS_POINTS.map(({ term, detail }) => (
                <div key={term} className="grid grid-cols-[9rem_1fr] gap-4 py-3 border-b border-border text-sm">
                  <dt className="font-semibold text-urgent">{term}</dt>
                  <dd className="text-foreground-muted">{detail}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div {...fadeIn(0.28)} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href={EMERGENCY_HERO_CONTENT.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{EMERGENCY_HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={EMERGENCY_HERO_CONTENT.secondaryCta.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                {EMERGENCY_HERO_CONTENT.secondaryCta.label}
              </Link>
            </motion.div>
            <p className="mt-3 text-sm text-foreground-subtle">{EMERGENCY_HERO_CONTENT.primaryCta.supportingText}</p>
          </div>

          {/* Illustrative acute worklist: mock data, no patient information */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: MOTION.easeOut }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Acute Priority Worklist</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">Emergency Teleradiology Console</p>
                </div>
                <p className="text-xs text-foreground-subtle">U.S. Board-Certified Radiologists</p>
              </div>

              <ul aria-label="Illustrative example of an acute worklist">
                {queue.map((study) => {
                  const isStat = study.id === statCase.id;
                  return (
                    <motion.li
                      layout="position"
                      key={study.id}
                      transition={{ layout: { duration: 0.75, ease: MOTION.easeOut } }}
                      className={cn("border-b border-border last:border-b-0 px-5 py-4", isStat && phase >= 1 && "bg-urgent-soft/60")}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={cn(
                              "inline-flex w-18 shrink-0 items-center justify-center gap-1 rounded-sm px-2 py-0.5 font-mono text-xs font-semibold",
                              study.priority === "STAT" && (isStat ? "bg-urgent text-white" : "bg-urgent-soft text-urgent"),
                              study.priority === "High" && "bg-warning/10 text-warning",
                              study.priority === "Routine" && "bg-surface-muted text-foreground-muted"
                            )}
                          >
                            {isStat && <Lightning size={12} weight="fill" aria-hidden="true" />}
                            {study.priority}
                          </span>
                          <span className={cn("truncate text-sm", isStat ? "font-semibold text-foreground" : "font-medium text-foreground")}>
                            {study.exam}
                          </span>
                        </div>
                        <span className="text-xs text-foreground-subtle">
                          {study.location} · <span className="text-foreground-muted">{study.status}</span>
                        </span>
                      </div>

                      {isStat && (
                        <div className="mt-4">
                          <ol className="grid grid-cols-3 border-t border-urgent/25">
                            {ESCALATION_STEPS.map((label, i) => {
                              const lit = phase >= i + 2;
                              return (
                                <li key={label} className="relative pt-3 pr-3">
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "absolute left-0 right-3 -top-px h-0.5 origin-left bg-urgent transition-transform duration-500",
                                      lit ? "scale-x-100" : "scale-x-0"
                                    )}
                                  />
                                  <span className="block font-mono text-xs text-foreground-subtle">Step {i + 1}</span>
                                  <span className={cn("block text-sm font-medium transition-colors duration-300", lit ? "text-foreground" : "text-foreground-subtle")}>
                                    {label}
                                  </span>
                                </li>
                              );
                            })}
                          </ol>
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 text-foreground-muted">
                              <PhoneCall size={14} aria-hidden="true" className="text-urgent" />
                              Direct verbal escalation to treating emergency physician
                            </span>
                            <motion.span
                              initial={false}
                              animate={{ opacity: phase >= 4 ? 1 : 0 }}
                              transition={{ duration: 0.4 }}
                              className="inline-flex items-center gap-1 font-medium text-success"
                            >
                              <CheckCircle size={13} weight="fill" aria-hidden="true" />
                              Read-back logged
                            </motion.span>
                          </div>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <p className="mt-3 text-[13px] text-foreground-subtle">
              Configurable triage protocols mapped to client hospital EHR/PACS · 24/7/365 Subspecialty Support
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default EmergencyHero;
