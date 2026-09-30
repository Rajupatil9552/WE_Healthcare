import { routes } from "@/config/routes";

/**
 * Quality: one integrated page (no sub-pages). Sections are addressable by
 * hash: #radiologists, #quality-control, #reporting-workflow,
 * #critical-findings, #reporting-visibility, #operations-support.
 *
 * Copy follows the approved brief. Where the brief carried an internal
 * editorial note ("should be confirmed before publication"), the page shows a
 * neutral, claim-free line and the original note is kept in a comment beside
 * it. Do not publish QC metrics, response times, escalation paths, coverage
 * hours or dashboard specifics until they are approved.
 */

export const QUALITY_SEO = {
  title: "Radiology Quality & Reporting Standards | WE Healthcare",
  description:
    "Learn how WE Healthcare approaches radiologist expertise, quality control, reporting workflows, critical findings communication, and operational visibility.",
  path: routes.quality.index,
} as const;

export type QualitySectionId =
  | "radiologists"
  | "quality-control"
  | "reporting-workflow"
  | "critical-findings"
  | "reporting-visibility"
  | "operations-support";

export const QUALITY_SECTIONS: readonly { id: QualitySectionId; label: string }[] = [
  { id: "radiologists", label: "Radiologist Expertise" },
  { id: "quality-control", label: "Quality Control" },
  { id: "reporting-workflow", label: "Reporting Workflow" },
  { id: "critical-findings", label: "Critical Findings" },
  { id: "reporting-visibility", label: "Reporting Visibility" },
  { id: "operations-support", label: "Operational Support" },
];

export const QUALITY_HERO = {
  eyebrow: "Quality",
  heading: "Quality Built Into Every Reporting Workflow",
  body: "Radiology quality depends on more than the final report. It involves appropriate radiologist expertise, a defined reporting workflow, quality review, communication of significant findings, and consistent operational processes.",
  approach: "WE Healthcare's quality approach is designed around these elements across the reporting workflow.",
  /** The five elements named in the intro, each linked to its section. */
  layers: [
    { label: "Radiologist expertise", target: "radiologists" },
    { label: "Defined reporting workflow", target: "reporting-workflow" },
    { label: "Quality review", target: "quality-control" },
    { label: "Communication of significant findings", target: "critical-findings" },
    { label: "Consistent operational processes", target: "operations-support" },
  ] satisfies { label: string; target: QualitySectionId }[],
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  secondaryCta: { label: "See How It Works", href: "#radiologists" },
} as const;

export const EXPERTISE = {
  heading: "Subspecialty-Matched Radiologist Expertise",
  body: "WE Healthcare's reporting model is designed to match studies with appropriate radiology expertise based on the approved clinical and operational workflow.",
  subspecialties: [
    { id: "neuro", label: "Neuroradiology", image: "/images/modalities/mri/mri-brain-axial.webp" },
    { id: "msk", label: "Musculoskeletal", image: "/images/modalities/mri/mri-knee-sagittal.webp" },
    { id: "body", label: "Body / Abdominal Imaging", image: "/images/modalities/mri/mri-abdomen-axial.webp" },
    { id: "chest", label: "Chest & Cardiac", image: "/images/modalities/ct/ct-chest-axial.webp" },
    { id: "breast", label: "Breast Imaging", image: "/images/modalities/ultrasound/us-breast.webp" },
    { id: "gu", label: "Genitourinary", image: "/images/modalities/ultrasound/us-pelvic.webp" },
    { id: "nm", label: "Nuclear Medicine / PET", image: "/images/modalities/pet-ct/pet-ct-coronal-pet.webp" },
    { id: "er", label: "Emergency & Trauma", image: "/images/modalities/ct/ct-head-axial.webp" },
  ],
  /** Illustrative example studies and the subspecialty each would typically route to. */
  examples: [
    { study: "MRI Brain", match: "neuro" },
    { study: "MRI Knee", match: "msk" },
    { study: "CT Abdomen / Pelvis", match: "body" },
    { study: "CT Chest", match: "chest" },
    { study: "Breast Ultrasound", match: "breast" },
    { study: "Pelvic Ultrasound", match: "gu" },
    { study: "PET-CT", match: "nm" },
    { study: "Trauma CT Head", match: "er" },
  ],
  // Brief: "Specific credentialing, licensing, and assignment processes
  // should be confirmed before publication."
  note: "Credentialing details, including ABR certification, state licensure, privileging support, malpractice coverage and BAA terms, are shared with each client during onboarding.",
  // Brief: "Explore Radiologist Credentialing →" (the credentialing page no longer exists).
  cta: { label: "Explore Radiologist Credentialing", href: routes.contact },
} as const;

export const QUALITY_CONTROL = {
  heading: "Quality Control & Report Review",
  body: "Quality control is incorporated into the reporting process to support consistency and identify discrepancies.",
  steps: ["Report Generation", "Quality Review", "Discrepancy Identification", "Feedback", "Addendum When Required"],
  items: [
    "Structured reporting templates",
    "Independent spot-checking",
    "Discrepancy identification",
    "Feedback and review",
    "Addendum workflow",
    "Critical findings communication",
  ],
  // Brief: "Exact QC metrics and operational procedures should be published
  // only after approval."
  note: "Details on QC metrics and operational procedures are available on request.",
} as const;

export const REPORTING_WORKFLOW = {
  eyebrow: "Reporting Workflow",
  heading: "From Study to Final Report",
  steps: [
    "Study Received",
    "Validation",
    "Priority / Worklist Routing",
    "Radiologist Assignment",
    "Image Interpretation",
    "Quality Review",
    "Report Returned",
  ],
  note: "The exact routing, assignment, validation, and report-delivery processes depend on the approved operational workflow.",
} as const;

export const CRITICAL_FINDINGS = {
  heading: "Critical Findings Communication",
  body: "When an imaging interpretation identifies a finding requiring timely clinical attention, communication is an important part of the reporting process.",
  steps: [
    "Critical Finding Identified",
    "Appropriate Clinical Contact",
    "Direct Communication",
    "Documentation",
    "Report / Addendum",
  ],
  // Brief: "Specific escalation paths, response times, contact procedures,
  // and documentation requirements should be confirmed before publication."
  note: "Escalation paths, contact procedures, and documentation requirements follow the approved communication protocol for each engagement.",
  image: {
    src: "/images/overnight-weekend-coverage/escalation-critical-finding.webp",
    alt: "Radiologist on the phone pointing to a finding on a head CT at a reading workstation",
  },
} as const;

export const VISIBILITY = {
  heading: "Reporting Visibility",
  body: "Where approved, operational reporting can provide visibility into areas such as:",
  areas: ["Study volume", "Reporting activity", "Turnaround performance", "Critical findings", "Modality and priority trends"],
  // Brief: "Any specific metrics, dashboard capabilities, or reporting
  // frequency should be confirmed before publishing."
  note: "Specific metrics, dashboard capabilities, and reporting frequency depend on the approved reporting for each engagement.",
} as const;

export const OPERATIONS = {
  heading: "Operational Support",
  body: "Quality also depends on consistent communication and operational coordination throughout the reporting process.",
  items: ["Study coordination", "Communication routing", "Technical/transmission support", "Escalation handling", "Documented follow-up"],
  // Brief: "Exact responsibilities, coverage hours, escalation routes, and
  // contact channels should be confirmed before publication."
  note: "Responsibilities, coverage hours, escalation routes, and contact channels are agreed for each engagement.",
  image: {
    src: "/images/overnight-weekend-coverage/morning-radiology-handoff.webp",
    alt: "Two clinicians reviewing a radiology worklist together at a reading-room workstation",
  },
} as const;

export const QUALITY_FAQ = [
  {
    id: "quality",
    question: "How does WE Healthcare maintain report quality?",
    answer:
      "Through an approved reporting and quality-control process that may include structured reporting, review, discrepancy identification, feedback, and addendum workflows.",
  },
  {
    id: "matching",
    question: "How are radiologists matched to studies?",
    answer: "Studies are assigned according to the approved clinical and operational assignment process.",
  },
  {
    id: "critical",
    question: "How are critical findings communicated?",
    answer: "According to the approved communication and escalation protocol, with appropriate documentation.",
  },
  {
    id: "performance",
    question: "Can we receive reporting performance information?",
    answer: "Reporting visibility depends on the approved reporting and analytics capabilities available for the engagement.",
  },
  {
    id: "workflow",
    question: "How does the reporting workflow work?",
    answer: "Studies move through intake, validation, routing, radiologist assignment, interpretation, quality review, and report delivery.",
  },
] as const;

export const QUALITY_CTA = {
  heading: "Quality You Can Build Into Your Workflow",
  body: "Let's discuss your reporting requirements, quality processes, and operational needs.",
  cta: { label: "Request a Consultation", href: routes.contact },
  image: {
    src: "/images/overnight-weekend-coverage/night-radiology-reading-room.webp",
    alt: "",
  },
} as const;
