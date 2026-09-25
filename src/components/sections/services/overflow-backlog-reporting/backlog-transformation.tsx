"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS_CONTENT, type WorkflowStep } from "@/content/overflow-backlog-support";

// Mock study queue states for the 4 transformation phases
interface TransformationCase {
  id: string;
  accession: string;
  modality: string;
  exam: string;
  priority?: "STAT" | "Urgent" | "Routine";
  status: "Pending" | "Triage" | "In Review" | "Reported" | "Archived";
  assignedTo?: string;
  isCompleted?: boolean;
}

const PHASE_CASES: Record<number, TransformationCase[]> = {
  // Step 1: Assess Backlog — Unsorted raw unread studies
  0: [
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", status: "Pending" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", status: "Pending" },
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", status: "Pending" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", status: "Pending" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", status: "Pending" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", status: "Pending" },
  ],
  // Step 2: Prioritize — Clinical urgency indicators & modality triage applied
  1: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "Triage" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "Triage" },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "Triage" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Pending" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "Pending" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "Pending" },
  ],
  // Step 3: Report in Batches — Studies actively routed to subspecialists
  2: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "In Review", assignedTo: "Neuroradiology" },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "In Review", assignedTo: "Body Imaging" },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "In Review", assignedTo: "WE Teleradiology Batch A" },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Triage", assignedTo: "Batch B (Scheduled)" },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "Pending", assignedTo: "Batch B (Scheduled)" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "Pending", assignedTo: "Batch C (Scheduled)" },
  ],
  // Step 4: Clear Queue — High-acuity cases reported, queue normalized
  3: [
    { id: "c3", accession: "ACC-8103", modality: "CT", exam: "CTA Head & Neck Protocol", priority: "STAT", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c6", accession: "ACC-8106", modality: "MRI", exam: "MRI Brain w/ & w/o IV", priority: "Urgent", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c1", accession: "ACC-8101", modality: "CT", exam: "CT Abdomen/Pelvis w/ IV", priority: "Urgent", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c5", accession: "ACC-8105", modality: "CT", exam: "CT Chest w/o Contrast", priority: "Routine", status: "Reported", assignedTo: "Signed & Returned to PACS", isCompleted: true },
    { id: "c2", accession: "ACC-8102", modality: "MRI", exam: "MRI Cervical Spine w/o", priority: "Routine", status: "In Review", assignedTo: "Steady-State Shift" },
    { id: "c4", accession: "ACC-8104", modality: "X-Ray", exam: "XR Chest 2-Views PA/LAT", priority: "Routine", status: "In Review", assignedTo: "Steady-State Shift" },
  ],
};

const STEP_COUNT = HOW_IT_WORKS_CONTENT.length;

export function BacklogTransformationSection() {
  const [activeStep, setActiveStep] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentStepData = HOW_IT_WORKS_CONTENT[activeStep];
  const currentCases = PHASE_CASES[activeStep];

  // Desktop: pin the panel and let scroll advance the phases (snapping per
  // phase). Tabs stay clickable and jump the scroll to their phase.
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        triggerRef.current = ScrollTrigger.create({
          trigger: panelRef.current,
          start: "top 12%",
          end: () => `+=${window.innerHeight * 0.8 * (STEP_COUNT - 1)}`,
          pin: true,
          snap: { snapTo: 1 / (STEP_COUNT - 1), duration: 0.35, ease: "power2.inOut" },
          onUpdate: (self) => setActiveStep(Math.round(self.progress * (STEP_COUNT - 1))),
        });
        return () => {
          triggerRef.current = null;
        };
      });
    },
    { scope: panelRef },
  );

  const selectStep = (idx: number) => {
    const st = triggerRef.current;
    if (st) {
      window.scrollTo({ top: st.start + (st.end - st.start) * (idx / (STEP_COUNT - 1)), behavior: "smooth" });
    } else {
      setActiveStep(idx);
    }
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const next =
      e.key === "ArrowRight" ? (idx + 1) % STEP_COUNT : e.key === "ArrowLeft" ? (idx - 1 + STEP_COUNT) % STEP_COUNT : null;
    if (next === null) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    selectStep(next);
  };

  return (
    <section id="how-it-works" className="py-section lg:py-section-lg bg-surface scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">How It Works</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              From Growing Backlog to a Managed Worklist
            </RevealHeading>
          </div>
          <p className="lg:col-span-5 text-base text-foreground-muted leading-relaxed">
            A conceptual walkthrough of how our clinical operations organize, prioritize, and systematically process overflow imaging volume.
          </p>
        </div>

        <div ref={panelRef} className="mt-14 bg-surface">
          {/* Phase rail doubles as the tab list */}
          <div role="tablist" aria-label="Backlog workflow phases" className="grid grid-cols-2 md:grid-cols-4 border-t border-border-strong">
            {HOW_IT_WORKS_CONTENT.map((stepItem: WorkflowStep, idx: number) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={stepItem.step}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`backlog-tab-${idx}`}
                  aria-selected={isSelected}
                  aria-controls="backlog-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectStep(idx)}
                  onKeyDown={(e) => onTabKeyDown(e, idx)}
                  className="relative py-4 pr-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 right-4 -top-px h-0.5 origin-left transition-transform duration-500",
                      idx <= activeStep ? "scale-x-100 bg-primary" : "scale-x-0 bg-primary"
                    )}
                  />
                  <span className={cn("block font-mono text-xs tabular-nums", isSelected ? "text-primary" : "text-foreground-subtle")}>
                    {stepItem.number}
                  </span>
                  <span className={cn("mt-1 block text-base font-semibold", isSelected ? "text-foreground" : "text-foreground-muted")}>
                    {stepItem.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="backlog-panel"
            role="tabpanel"
            aria-labelledby={`backlog-tab-${activeStep}`}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5"
            >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
                  Phase {activeStep + 1} of {STEP_COUNT} · {currentStepData.badge}
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">{currentStepData.title}</h3>
                <p className="mt-2 text-base font-medium text-primary-strong">{currentStepData.subtitle}</p>
                <p className="mt-4 text-base text-foreground-muted leading-relaxed">{currentStepData.description}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                  {currentStepData.visualMetrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs text-foreground-subtle">{metric.label}</dt>
                      <dd className="mt-1 text-base font-semibold text-foreground">{metric.value}</dd>
                      <dd className="text-xs text-foreground-muted">{metric.subtext}</dd>
                    </div>
                  ))}
                </dl>
            </motion.div>

            {/* Illustrative worklist: the same six studies move and change state per phase */}
            <div className="lg:col-span-7 overflow-hidden rounded-lg border border-border bg-card shadow-md">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
                  Worklist State: {currentStepData.title}
                </p>
                <p className="font-mono text-xs text-foreground-subtle">Active Studies: {currentCases.length}</p>
              </div>
              <ul>
                {currentCases.map((study) => (
                  <motion.li
                    layout="position"
                    key={study.id}
                    transition={{ layout: { duration: 0.6, ease: MOTION.easeOut } }}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border px-5 py-3 last:border-b-0 transition-colors duration-500",
                      study.isCompleted && "bg-success/5"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={cn(
                          "min-w-[5.5rem] shrink-0 rounded-sm px-2 py-0.5 text-center font-mono text-xs font-semibold transition-colors duration-500",
                          study.priority === "STAT" && "bg-urgent-soft text-urgent",
                          study.priority === "Urgent" && "bg-warning/10 text-warning",
                          study.priority === "Routine" && "bg-surface-muted text-foreground-muted",
                          !study.priority && "bg-surface-muted text-foreground-subtle"
                        )}
                      >
                        {study.priority ?? "Untriaged"}
                      </span>
                      <div className="min-w-0">
                        <span className="font-mono text-xs text-foreground-subtle">
                          {study.accession} · {study.modality}
                        </span>
                        <p
                          className={cn(
                            "truncate text-sm font-medium",
                            study.isCompleted ? "text-foreground-subtle line-through" : "text-foreground"
                          )}
                        >
                          {study.exam}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-[6.25rem] sm:pl-0 text-xs">
                      {study.assignedTo && (
                        <span className="hidden md:inline text-foreground-subtle">{study.assignedTo}</span>
                      )}
                      <span
                        className={cn(
                          "font-medium",
                          study.isCompleted ? "text-success" : study.status === "In Review" ? "text-primary" : "text-foreground-muted"
                        )}
                      >
                        {study.status}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <p className="border-t border-border bg-surface px-5 py-3 text-xs text-foreground-subtle">
                Conceptual workflow representation for healthcare operational planning.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BacklogTransformationSection;
