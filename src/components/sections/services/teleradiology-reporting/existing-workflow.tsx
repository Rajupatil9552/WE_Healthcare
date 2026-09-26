"use client";

import { useRef } from "react";
import { HardDrives, ShareNetwork, UserCheck, FileText, Cpu, LockKey } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useScrubSequence } from "@/lib/use-scrub-sequence";

// Internal verification tracking:
// [VERIFY: supported PACS/RIS integrations, interfaces, and workflow capabilities]

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Study Received",
    description: "DICOM transfer initiates directly from local modalities or facility PACS via secure connection.",
    icon: HardDrives,
  },
  {
    number: "02",
    title: "Study Routing",
    description: "Automated worklist ingestion matches study modality, priority level, and required subspecialty.",
    icon: ShareNetwork,
  },
  {
    number: "03",
    title: "Radiologist Review",
    description: "Board-certified radiologist reviews prior imaging history and performs diagnostic interpretation.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Report Returned",
    description: "Signed diagnostic report returns bi-directionally into your local PACS and EHR environment.",
    icon: FileText,
  },
];

const CAPABILITY_LABELS = [
  { label: "PACS/RIS", icon: HardDrives },
  { label: "Secure Connectivity", icon: LockKey },
  { label: "Reporting Workflow", icon: Cpu },
];

export function ExistingWorkflowSection() {
  const schematic = useRef<HTMLOListElement>(null);
  useScrubSequence(schematic);

  return (
    <section id="workflow" className="relative overflow-clip py-section lg:py-section-lg bg-background scroll-mt-20">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Built For Your Environment</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              Built Around Your Existing Workflow
            </RevealHeading>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-foreground-muted leading-relaxed">
              The goal is to fit into your current imaging environment rather than create a separate process.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
              {CAPABILITY_LABELS.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" className="text-primary" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Systems schematic: one track, four nodes. On desktop the track fills with scroll. */}
        <ol ref={schematic} className="relative mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
          <div aria-hidden="true" className="hidden lg:block absolute left-6 right-6 top-6 h-px bg-border-strong">
            <div className="js-track h-full w-full bg-primary" />
          </div>
          <div aria-hidden="true" className="lg:hidden absolute left-6 top-6 bottom-6 w-px bg-border-strong" />

          {WORKFLOW_STEPS.map(({ number, title, description, icon: Icon }) => (
            <li key={number} className="relative grid grid-cols-[3rem_1fr] lg:block gap-5">
              <span className="js-node relative z-10 flex size-12 items-center justify-center rounded-full border border-primary bg-background text-primary">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div className="lg:mt-8">
                <span className="font-mono text-xs text-foreground-subtle tabular-nums">{number}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed max-w-[32ch]">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default ExistingWorkflowSection;
