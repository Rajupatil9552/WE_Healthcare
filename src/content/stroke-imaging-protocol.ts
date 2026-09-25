/**
 * Content definition for Stroke Imaging Protocol page.
 * Route: /services/stroke-imaging-protocol
 *
 * NOTE: Strictly adheres to approved clinical descriptions.
 * No unsupported turnaround guarantees, fabricated SLAs, or invented customer statistics.
 */

export const STROKE_PAGE_METADATA = {
  title: "Stroke Imaging Teleradiology Support | WE Healthcare",
  description:
    "Teleradiology support for stroke imaging workflows, including priority routing, radiologist assignment, and defined communication processes.",
  canonical: "/services/stroke-imaging-protocol",
} as const;

export const STROKE_HERO_CONTENT = {
  eyebrow: "STROKE IMAGING PROTOCOL",
  heading: "Stroke Imaging Protocol",
  subheading: "A defined workflow for time-sensitive stroke imaging.",
  body: "Stroke imaging workflows depend on timely study routing, appropriate radiologist assignment, and clear communication. WE Healthcare can support defined priority workflows aligned with the facility’s existing requirements.",
  // [VERIFY: stroke-specific capability and protocol customization]
  verificationNote: "[VERIFY: stroke-specific capability and protocol customization]",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  image: "/images/stroke-imaging-protocol/hero-stroke-ct-imaging.jpg",
  alt: "Diagnostic radiologist reviewing axial brain CT slices and CTA head and neck vascular imaging on multi-monitor workstation",
  // Conceptual protocol stages for subtle overlay
  protocolStages: [
    {
      step: "01",
      id: "imaging-received",
      label: "IMAGING RECEIVED",
      shortLabel: "Imaging",
      description: "Direct DICOM transfer ingested from facility PACS",
    },
    {
      step: "02",
      id: "protocol-identified",
      label: "PROTOCOL",
      shortLabel: "Protocol",
      description: "Validated against facility stroke pathway parameters",
    },
    {
      step: "03",
      id: "radiologist-review",
      label: "RADIOLOGIST REVIEW",
      shortLabel: "Review",
      description: "Board-certified diagnostic interpretation",
    },
    {
      step: "04",
      id: "clinical-communication",
      label: "CLINICAL COMMUNICATION",
      shortLabel: "Communication",
      description: "Direct voice outreach and EHR documentation",
    },
  ],
} as const;

export const BUILT_AROUND_WORKFLOW_CONTENT = {
  eyebrow: "BUILT AROUND YOUR STROKE WORKFLOW",
  heading: "Built Around Your Stroke Workflow",
  body: "Stroke imaging can require priority handling across imaging, radiology, and clinical teams. The workflow should reflect the facility’s existing stroke pathway and communication requirements.",
  tagline: "ONE WORKFLOW. MULTIPLE CLINICAL TEAMS.",
  image: "/images/stroke-imaging-protocol/stroke-workflow-brain-imaging.jpg",
  alt: "Radiology professional analyzing acute axial brain CT scans and neurovascular CTA imaging on diagnostic displays in a clinical suite",
  caption: "Designed around existing clinical workflows.",
  coordinationSteps: [
    {
      number: "01",
      id: "imaging",
      title: "IMAGING",
      subtitle: "Facility Technologists",
      detail: "Initial scan acquisition, PACS transmission, and stroke protocol flagging.",
    },
    {
      number: "02",
      id: "radiology",
      title: "RADIOLOGY",
      subtitle: "Diagnostic Interpretation",
      detail: "Targeted evaluation of acute ischemia, hemorrhage, and vascular patency.",
    },
    {
      number: "03",
      id: "clinical-team",
      title: "CLINICAL TEAM",
      subtitle: "Treating Care Teams",
      detail: "Direct clinical communication, verbal read-back, and expedited care pathways.",
    },
  ],
} as const;

export const COMMON_OPERATIONAL_NEEDS_CONTENT = {
  eyebrow: "COMMON OPERATIONAL NEEDS",
  heading: "Supporting the Demands of Time-Sensitive Stroke Imaging",
  intro:
    "Stroke imaging workflows can involve different operational requirements depending on the facility, coverage model, clinical pathway, and communication process.",
  image: "/images/stroke-imaging-protocol/stroke-operational-needs.jpg",
  alt: "Diagnostic medical display showing axial brain CT cross-sections and cerebral CTA neurovascular angiography in clinical reading room",
  caption: "Operational frameworks aligned with clinical urgency.",
  needs: [
    {
      number: "01",
      id: "overnight-coverage",
      title: "Overnight Stroke Coverage",
      description:
        "Overnight stroke coverage requirements can be incorporated into the facility’s existing radiology workflow.",
    },
    {
      number: "02",
      id: "priority-worklists",
      title: "Priority Stroke Worklists",
      description:
        "Stroke-related imaging may require defined prioritization within the radiology worklist.",
    },
    {
      number: "03",
      id: "stroke-center-workflows",
      title: "Primary or Comprehensive Stroke Center Workflows",
      description:
        "Workflows may need to align with the facility’s existing stroke-care pathway and operational requirements.",
    },
    {
      number: "04",
      id: "time-sensitive-interpretation",
      title: "Time-Sensitive Imaging Interpretation",
      description:
        "Time-sensitive imaging requires appropriate routing and review within the established clinical workflow.",
    },
    {
      number: "05",
      id: "direct-communication",
      title: "Direct Physician Communication",
      description:
        "Some workflows may require direct communication between the interpreting radiologist and the clinical team.",
    },
    {
      number: "06",
      id: "certification-requirements",
      title: "Existing Certification or Protocol Requirements",
      description:
        "Existing facility certifications, protocols, and operational requirements should be considered when defining the workflow.",
    },
  ],
} as const;

export const STROKE_PROTOCOL_WORKFLOW_CONTENT = {
  eyebrow: "STROKE IMAGING PROTOCOL",
  heading: "From Stroke Imaging to Clinical Communication",
  supportingText:
    "A defined workflow can help coordinate study routing, radiologist review, escalation, and communication around time-sensitive stroke imaging.",
  image: "/images/stroke-imaging-protocol/stroke-protocol-workflow.jpg",
  alt: "Diagnostic multi-planar stroke imaging study showing axial brain CT perfusion maps and CTA cerebral angiography on medical display",
  stages: [
    {
      step: "01",
      id: "flag",
      title: "FLAG",
      description:
        "Identify the stroke-related imaging study within the established workflow.",
      detailBadge: "Ingestion & Protocol Recognition",
      visualFocus: "Study identified upon transmission from facility PACS",
    },
    {
      step: "02",
      id: "auto-prioritize",
      title: "AUTO-PRIORITIZE",
      description:
        "Route the study according to the facility’s defined priority rules.",
      detailBadge: "Priority Worklist Alignment",
      visualFocus: "Elevated through facility-defined queue rules",
    },
    {
      step: "03",
      id: "immediate-review",
      title: "IMMEDIATE REVIEW",
      description:
        "Direct the study for appropriate radiologist review.",
      detailBadge: "Diagnostic Neuroradiology Match",
      visualFocus: "Assigned for diagnostic radiologist review",
    },
    {
      step: "04",
      id: "direct-voice-contact",
      title: "DIRECT VOICE CONTACT",
      description:
        "Communicate time-sensitive findings through the facility-established communication pathway.",
      detailBadge: "Direct Clinical Outreach",
      visualFocus: "Verbal communication & EHR documentation",
    },
  ],
} as const;

export const WHATS_INCLUDED_CONTENT = {
  eyebrow: "WHAT’S INCLUDED",
  heading: "A Stroke Imaging Workflow Built Around Defined Requirements",
  supportingCopy:
    "The workflow can incorporate defined routing, radiologist assignment, communication, and documentation requirements established during implementation.",
  image: "/images/stroke-imaging-protocol/stroke-capabilities-imaging.jpg",
  alt: "Clinical diagnostic display showing axial brain CT perfusion scans and neurovascular vascular mapping in reading suite",
  caption: "Facility-specific capability specifications.",
  capabilities: [
    {
      number: "01",
      id: "auto-prioritized-worklist",
      title: "Auto-Prioritized Stroke Worklist",
      description: "Auto-prioritized stroke worklist functionality.",
      verificationNote: "[VERIFY: auto-prioritized stroke worklist]",
      badge: "Intake & Routing",
    },
    {
      number: "02",
      id: "radiologist-assignment-rules",
      title: "Defined Radiologist Assignment Rules",
      description:
        "Defined rules for assigning stroke-related imaging studies to the appropriate radiologist.",
      badge: "Credentialing Match",
    },
    {
      number: "03",
      id: "direct-voice-communication",
      title: "Direct Voice Communication Protocol",
      description:
        "A defined direct voice communication process for time-sensitive findings.",
      verificationNote: "[VERIFY: direct voice communication protocol]",
      badge: "Clinical Outreach",
    },
    {
      number: "04",
      id: "facility-aligned-documentation",
      title: "Facility-Aligned Documentation",
      description:
        "Documentation aligned with the facility’s established workflow and requirements.",
      badge: "EHR Integration",
    },
  ],
} as const;

export const CRITICAL_FINDINGS_CONTENT = {
  eyebrow: "CRITICAL FINDINGS",
  heading: "Clear Communication for Time-Sensitive Findings",
  content:
    "Time-sensitive or critical findings should follow the facility-established communication and documentation pathway.",
  supportingCopy:
    "The communication process can be aligned with the facility’s existing requirements for escalation, physician communication, and documentation.",
  verificationNote: "[VERIFY: exact protocol]",
  pathwaySteps: [
    {
      step: "01",
      id: "critical-finding",
      label: "CRITICAL FINDING",
      detail: "Acute imaging finding identified during interpretation",
    },
    {
      step: "02",
      id: "facility-pathway",
      label: "FACILITY-ESTABLISHED PATHWAY",
      detail: "Initiates facility-agreed clinical escalation workflow",
    },
    {
      step: "03",
      id: "clinical-communication",
      label: "CLINICAL COMMUNICATION",
      detail: "Direct telephone outreach to treating physician or care team",
    },
    {
      step: "04",
      id: "documentation",
      label: "DOCUMENTATION",
      detail: "Closed-loop verbal read-back documented in report and EHR",
    },
  ],
} as const;

export const STROKE_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "faq-01",
      number: "01",
      question: "Can teleradiology support stroke imaging workflows?",
      answer:
        "Stroke imaging workflows can be supported through defined study routing, radiologist assignment, communication, and documentation processes aligned with the facility’s requirements.",
    },
    {
      id: "faq-02",
      number: "02",
      question: "How are stroke studies prioritized?",
      answer:
        "Stroke-related studies can be handled through defined priority rules established as part of the facility’s workflow.",
    },
    {
      id: "faq-03",
      number: "03",
      question: "How is the radiologist assigned?",
      answer:
        "Radiologist assignment can follow defined workflow and subspecialty requirements established for the facility.",
    },
    {
      id: "faq-04",
      number: "04",
      question: "How are urgent findings communicated?",
      answer:
        "Time-sensitive or critical findings follow the facility-established communication and documentation pathway.",
    },
    {
      id: "faq-05",
      number: "05",
      question: "Can the workflow align with existing facility protocols?",
      answer:
        "The workflow can be designed around the facility’s existing clinical pathway and operational requirements, subject to capability and implementation verification.",
    },
    {
      id: "faq-06",
      number: "06",
      question: "What information is required during onboarding?",
      answer:
        "The implementation process may require information about the facility’s existing workflow, imaging routing, priority requirements, communication process, documentation requirements, and operational expectations.",
    },
  ],
} as const;

export const STROKE_FINAL_CTA_CONTENT = {
  eyebrow: "READY TO DISCUSS YOUR WORKFLOW?",
  heading: "Let's Discuss Your Stroke Imaging Workflow",
  body: "Tell us about your radiology coverage needs and the stroke imaging workflow requirements you need to support.",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  image: "/images/stroke-imaging-protocol/stroke-imaging-final-cta.webp",
  alt: "Diagnostic radiologist reviewing stroke neurovascular scans at medical workstation",
} as const;





