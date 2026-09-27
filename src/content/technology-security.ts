import { routes } from "@/config/routes";

/**
 * Technology & Security: one integrated page (no sub-pages). Sections are
 * addressable by hash: #pacs-ris-integration, #dicom-workflow,
 * #secure-image-transfer, #security-compliance.
 *
 * Copy follows the approved brief. Where the brief carried an internal
 * editorial note ("should be confirmed before publication", "only after
 * legal/security approval"), the page shows a neutral, claim-free line and the
 * original note is kept in a comment beside it. Do not add certifications,
 * frameworks, encryption standards, retention periods or attestations until
 * legal/security has approved them.
 */

export const TECH_SEO = {
  title: "Technology & Security for Teleradiology | WE Healthcare",
  description:
    "Secure teleradiology technology designed to connect healthcare imaging workflows with remote radiology reporting.",
  path: routes.technology.index,
} as const;

export const TECH_HERO = {
  eyebrow: "Technology & Security",
  heading: "Technology Designed Around Your Existing Workflow",
  body: "WE Healthcare's technology is designed to connect your existing imaging environment with a remote radiology reporting workflow, supporting secure image transfer, study routing, radiologist access, and report delivery.",
  goal: "The goal is simple: fit into your existing workflow rather than require your team to completely change how imaging is acquired and managed.",
  primaryCta: { label: "Discuss Your Integration", href: routes.contact },
  secondaryCta: { label: "Follow a Study", href: "#pacs-ris-integration" },
} as const;

export type ChapterId = "pacs-ris-integration" | "dicom-workflow" | "secure-image-transfer" | "security-compliance";

export const CHAPTERS: readonly { id: ChapterId; label: string; short: string }[] = [
  { id: "pacs-ris-integration", label: "PACS & RIS Integration", short: "PACS & RIS" },
  { id: "dicom-workflow", label: "DICOM Workflow", short: "DICOM" },
  { id: "secure-image-transfer", label: "Secure Image Transfer", short: "Transfer" },
  { id: "security-compliance", label: "Security & Compliance", short: "Security" },
];

/** The example study followed down the page (illustrative, not patient data). */
export const STUDY = {
  title: "CT Head without contrast",
  label: "Example study",
  thumb: "/images/modalities/ct/ct-head-axial.webp",
} as const;

export type JourneyStageId = ChapterId | "report-delivery";

/** Journey stages, in page order: the four chapters, then report delivery. */
export const JOURNEY: readonly { id: JourneyStageId; label: string }[] = [
  ...CHAPTERS,
  { id: "report-delivery", label: "Report Delivery" },
];

export const PACS_RIS = {
  heading: "PACS & RIS Integration",
  body: "WE Healthcare can connect with a facility's existing PACS/RIS environment to support the movement of imaging studies and completed reports through the agreed workflow.",
  /** `side` marks where each step runs: at the facility or in the reading environment. */
  steps: [
    { label: "Modality", side: "facility" },
    { label: "Your PACS", side: "facility" },
    { label: "Secure Gateway", side: "gateway" },
    { label: "Routing", side: "reading" },
    { label: "Radiologist Workstation", side: "reading" },
    { label: "Structured Report", side: "reading" },
    { label: "PACS/RIS", side: "facility" },
  ],
  note: "Supported systems, interfaces, and integration requirements should be confirmed during technical assessment.",
  cta: { label: "Discuss Your Integration", href: routes.contact },
} as const;

export const DICOM = {
  heading: "DICOM-Based Image Workflow",
  body: "DICOM is used to exchange medical images and related information between compatible healthcare imaging systems.",
  /**
   * Each capability highlights one row of the illustrative study header.
   * Tags are real DICOM attributes; values are example data only.
   */
  capabilities: [
    { label: "Study routing", field: "study" },
    { label: "Modality-based routing", field: "modality" },
    { label: "Priority handling", field: "priority" },
    { label: "Destination-based routing", field: "destination" },
    { label: "Report return workflow", field: "report" },
    { label: "Prior-study access where supported", field: "priors" },
  ],
  header: [
    { field: "study", tag: "(0020,000D)", name: "Study Instance UID", value: "1.2.840.…4471" },
    { field: "modality", tag: "(0008,0060)", name: "Modality", value: "CT" },
    { field: "priority", tag: "(0040,1003)", name: "Requested Procedure Priority", value: "STAT" },
    { field: "destination", tag: "Route", name: "Destination", value: "Neuro reading queue" },
    { field: "report", tag: "Report", name: "Return to", value: "Facility PACS/RIS" },
    { field: "priors", tag: "Priors", name: "Prior studies", value: "2 available" },
  ],
  note: "Exact DICOM capabilities and system compatibility should be confirmed during integration planning.",
} as const;

export const SECURE_TRANSFER = {
  heading: "Secure Image Transfer",
  body: "Remote radiology depends on reliable and secure movement of imaging studies and reports between your facility and the reading environment.",
  items: [
    "Secure image transmission",
    "Controlled system access",
    "Secure report delivery",
    "Appropriate data handling",
    "Audit and monitoring capabilities where supported",
  ],
  // Brief: "Specific encryption, access-control, logging, retention, and
  // data-handling specifications should be confirmed before publication."
  note: "Specific encryption, access-control, logging, retention, and data-handling specifications are shared during technical and security review.",
} as const;

export const SECURITY = {
  heading: "Security & Compliance",
  // Brief: "WE Healthcare's security and compliance approach should be
  // described based only on the organization's approved security framework,
  // applicable requirements, audit/attestation status, access governance,
  // incident-response procedures, and legal review."
  body: "WE Healthcare's security and compliance approach is built around access governance, audit and monitoring, incident response, and documented security processes.",
  pillars: [
    { title: "Access Governance", body: "Role-based access, onboarding/offboarding, and access-review procedures where applicable." },
    { title: "Audit & Monitoring", body: "Approved logging, monitoring, retention, and review processes." },
    { title: "Incident Response", body: "Defined processes for identifying, escalating, responding to, and documenting security incidents." },
    { title: "Security Documentation", body: "Security documentation can be provided according to the approved request process." },
  ],
  // Brief: "Important: Specific certifications, frameworks, compliance claims,
  // audit status, encryption standards, retention periods, or attestations
  // should only be published after legal/security approval."
  notice: "Details on certifications, frameworks, audit status, and security specifications are available through the security documentation request process.",
  documentationCta: { label: "Request Security Documentation", href: routes.contact },
} as const;

/** Closing stage of the study journey (illustrative worklist). */
export const REPORT_DELIVERY = {
  eyebrow: "Journey Complete",
  heading: "Structured Report → PACS/RIS",
  body: "The completed report returns through the agreed workflow to your PACS/RIS, where your team works with it as part of existing imaging operations.",
  statuses: ["Received", "In review", "Final"],
} as const;

export const IMAGING_WORKFLOW = {
  eyebrow: "End to End",
  heading: "Built for Healthcare Imaging Workflows",
  steps: [
    "Existing Imaging Environment",
    "Secure Image Transfer",
    "Study Routing & Prioritization",
    "Radiologist Workstation",
    "Structured Report",
    "PACS / RIS",
  ],
} as const;

export const TECH_FAQ = [
  {
    id: "pacs",
    question: "Can WE Healthcare integrate with our existing PACS/RIS?",
    answer: "Integration depends on the PACS/RIS platform, interfaces, connectivity, and technical requirements for the engagement.",
  },
  {
    id: "dicom",
    question: "Does WE Healthcare support DICOM?",
    answer: "The workflow is designed around DICOM-based image exchange where supported. Exact capabilities should be confirmed during technical assessment.",
  },
  {
    id: "transfer",
    question: "How are imaging studies transferred?",
    answer: "Studies move through the configured secure-transfer workflow between the facility and remote reading environment.",
  },
  {
    id: "encryption",
    question: "Is data transmission encrypted?",
    // Brief: "The approved encryption specification should be confirmed with
    // the WE Healthcare security/IT team before publication."
    answer: "Encryption specifications are provided by the WE Healthcare security and IT team as part of the technical and security review.",
  },
  {
    id: "documentation",
    question: "Can we request security documentation?",
    answer: "Yes, subject to the organization's approved security-documentation request process.",
  },
] as const;

export const TECH_CTA = {
  heading: "Connect Your Imaging Workflow",
  body: "Have questions about PACS/RIS integration, image transfer, security, or technical requirements?",
  sub: "Let's discuss your workflow and integration requirements.",
  cta: { label: "Request a Consultation", href: routes.contact },
} as const;
