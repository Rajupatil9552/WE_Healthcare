import { routes } from "@/config/routes";

/**
 * Who We Serve: single-page content (no audience sub-pages). Each audience is
 * its own section, addressable by hash: #hospitals, #imaging-centers,
 * #healthcare-networks, #emergency-departments (the homepage cards link here).
 */

export const WHO_WE_SERVE_SEO = {
  title: "Teleradiology Services for Hospitals, Imaging Centers & Healthcare Networks | WE Healthcare",
  description:
    "Teleradiology reporting support for U.S. hospitals, imaging centers, and healthcare networks, including routine, overflow, emergency, overnight, and subspecialty imaging.",
  path: routes.whoWeServe,
} as const;

export const WHO_WE_SERVE_HERO = {
  eyebrow: "Who We Serve",
  heading: "Teleradiology Built Around Your Organization",
  body: "Healthcare organizations face different imaging volumes, coverage requirements, and operational challenges. WE Healthcare provides remote radiology reporting support designed to fit your existing workflow from routine reporting and overflow volume to overnight, emergency, and subspecialty coverage.",
  primaryCta: { label: "Request a Demo", href: routes.requestDemo },
  secondaryCta: { label: "Who We Support", href: "#who-we-support" },
} as const;

export type Audience = {
  id: "hospitals" | "imaging-centers" | "healthcare-networks" | "emergency-departments";
  /** Short label for tabs and the hero hub. */
  short: string;
  title: string;
  body: string;
  bullets: readonly string[];
  cta: { label: string; href: string };
  image: { src: string; alt: string; position?: string };
  /** One-line readout shown on the image. */
  tag: string;
};

export const AUDIENCES: readonly Audience[] = [
  {
    id: "hospitals",
    short: "Hospitals",
    title: "Hospitals & Health Systems",
    body: "Support for hospitals managing multiple departments, changing imaging volumes, emergency demand, after-hours coverage, and subspecialty reporting requirements.",
    bullets: [
      "Overnight & weekend coverage",
      "Emergency and STAT reporting",
      "Overflow and backlog support",
      "Subspecialty reporting",
      "Multi-department and multi-site operations",
    ],
    cta: { label: "Explore Hospital Solutions", href: routes.service("overnight-weekend-coverage") },
    image: {
      src: "/images/audiences/hospital.webp",
      alt: "Hospital building exterior with a covered main entrance",
      position: "object-[60%_50%]",
    },
    tag: "Inpatient · ED · Outpatient",
  },
  {
    id: "imaging-centers",
    short: "Imaging Centers",
    title: "Imaging Centers",
    body: "Flexible reporting support for imaging centers managing growing study volumes, extended operating hours, staffing changes, reporting backlogs, or new imaging services.",
    bullets: [
      "Routine reporting capacity",
      "Overflow support",
      "Evening & weekend coverage",
      "Modality-specific reporting",
      "Subspecialty interpretation",
    ],
    cta: { label: "Explore Imaging Center Solutions", href: routes.service("overflow-backlog-support") },
    image: {
      src: "/images/who-we-serve/imaging-center-scanner-suite.webp",
      alt: "Modern outpatient imaging suite with a large-bore scanner and patient table",
    },
    tag: "Routine · Extended hours",
  },
  {
    id: "healthcare-networks",
    short: "Networks",
    title: "Healthcare Networks",
    body: "Connected reporting support for organizations managing imaging across multiple hospitals, outpatient centers, and locations.",
    bullets: [
      "Multi-site reporting",
      "Centralized reporting workflows",
      "Variable imaging volumes",
      "Cross-location coverage",
      "Subspecialty access",
    ],
    cta: { label: "Explore Healthcare Network Solutions", href: routes.service("teleradiology-reporting") },
    image: {
      src: "/images/who-we-serve/healthcare-network-city-lights.webp",
      alt: "Aerial night view of a metropolitan area with lit roads connecting neighborhoods",
    },
    tag: "Multi-site · Centralized",
  },
  {
    id: "emergency-departments",
    short: "Emergency",
    title: "Emergency Departments",
    body: "Emergency departments are an important part of the organizations we support. WE Healthcare can support approved Emergency / STAT, trauma, stroke, overnight, and other time-sensitive imaging workflows as part of the appropriate hospital or healthcare organization engagement.",
    bullets: ["Emergency / STAT", "Trauma", "Stroke", "Overnight"],
    cta: { label: "Explore Emergency & STAT Reporting", href: routes.service("emergency-stat-reporting") },
    image: {
      src: "/images/emergency-stat-reporting/emergency-department-imaging.webp",
      alt: "Emergency department CT suite with clinical staff positioning a patient for a scan",
    },
    tag: "STAT · Trauma · Stroke",
  },
];

export function getAudience(id: Audience["id"]) {
  return AUDIENCES.find((a) => a.id === id)!;
}

export const WHO_WE_SUPPORT_INTRO = {
  eyebrow: "Organizations",
  heading: "Who We Support",
  body: "Jump to your organization type to see the coverage and reporting support we typically provide.",
} as const;

export const EMERGENCY_SUPPORT = {
  heading: "Support for Emergency & Time-Sensitive Imaging",
  body: "Emergency departments are an important part of the organizations we support—not a separate audience that needs its own page. WE Healthcare can support approved Emergency / STAT, trauma, stroke, overnight, and other time-sensitive imaging workflows as part of the appropriate hospital or healthcare organization engagement.",
  workflows: [
    { label: "Emergency / STAT", href: routes.service("emergency-stat-reporting") },
    { label: "Trauma", href: `${routes.service("emergency-stat-reporting")}#trauma` },
    { label: "Stroke", href: `${routes.service("emergency-stat-reporting")}#stroke` },
    { label: "Overnight", href: routes.service("overnight-weekend-coverage") },
  ],
  cta: { label: "Explore Emergency & STAT Reporting", href: routes.service("emergency-stat-reporting") },
  image: {
    src: "/images/emergency-stat-reporting/emergency-department-imaging.webp",
    alt: "Emergency department CT suite with clinical staff positioning a patient for a scan",
  },
} as const;

export const WORKFLOW = {
  eyebrow: "Workflow",
  heading: "How We Fit Into Your Workflow",
  steps: [
    { label: "Study Received", detail: "Imaging study is acquired at your site and queued for reporting." },
    { label: "Secure Transfer", detail: "Images move over the approved secure transfer connection." },
    { label: "Priority / Modality Routing", detail: "Routing rules sort studies by priority and modality." },
    { label: "Radiologist Assignment", detail: "The study is assigned to an appropriate radiologist." },
    { label: "Interpretation", detail: "The radiologist reviews and interprets the study." },
    { label: "Structured Report", detail: "Findings are captured in a structured report." },
    { label: "PACS/RIS", detail: "The report is returned to your PACS/RIS." },
  ],
  note: "The exact workflow, integrations, routing rules, and technical requirements are configured according to the approved operational model.",
} as const;

export const MODALITIES_STRIP = {
  eyebrow: "Imaging Modalities",
  heading: "Imaging Modalities",
  intro: "WE Healthcare supports reporting across approved imaging modalities, including:",
  items: [
    { label: "X-Ray", slug: "x-ray", image: "/images/modalities/x-ray/chest-radiograph-pa.webp" },
    { label: "CT", slug: "ct", image: "/images/modalities/ct/ct-head-axial.webp" },
    { label: "MRI", slug: "mri", image: "/images/modalities/mri/mri-brain-axial.webp" },
    { label: "Ultrasound", slug: "ultrasound", image: "/images/modalities/ultrasound/us-neck-thyroid.webp" },
    { label: "PET-CT", slug: "pet-ct", image: "/images/modalities/pet-ct/pet-ct-coronal-pet.webp" },
    { label: "CBCT", slug: "cbct", image: "/images/modalities/cbct/cbct-panoramic.webp" },
    { label: "Nuclear Medicine", slug: "nuclear-medicine", image: "/images/modalities/nuclear-medicine/nm-bone-scan-anterior.webp" },
  ],
  cta: { label: "Explore All Modalities", href: routes.modalities },
} as const;

export const WHY_TELERADIOLOGY = {
  eyebrow: "Why Teleradiology",
  heading: "Why Organizations Use Teleradiology Support",
  reasons: [
    { title: "Additional reporting capacity", detail: "when imaging volume increases" },
    { title: "Coverage flexibility", detail: "for overnight, weekends, or temporary gaps" },
    { title: "Subspecialty support", detail: "for approved imaging requirements" },
    { title: "Overflow and backlog support", detail: "during periods of increased demand" },
    { title: "Workflow integration", detail: "designed around existing imaging operations" },
  ],
} as const;

export const WHO_WE_SERVE_FAQ = [
  {
    id: "who",
    question: "Who does WE Healthcare support?",
    answer:
      "WE Healthcare supports U.S. hospitals and health systems, imaging centers, and healthcare networks with approved remote radiology reporting requirements.",
  },
  {
    id: "emergency",
    question: "Can WE Healthcare support emergency imaging?",
    answer: "Emergency and STAT reporting can be supported according to the approved service model and clinical workflow.",
  },
  {
    id: "pacs",
    question: "Can WE Healthcare work with our existing PACS/RIS?",
    answer: "Integration depends on the supported systems, interfaces, and technical requirements for the engagement.",
  },
  {
    id: "overnight",
    question: "Can you support overnight and weekend reporting?",
    answer: "Coverage depends on the approved service model and required coverage window.",
  },
  {
    id: "start",
    question: "How do we get started?",
    answer:
      "A consultation can be used to understand your imaging volume, modalities, coverage requirements, workflow, and technical requirements.",
  },
] as const;

export const WHO_WE_SERVE_CTA = {
  eyebrow: "Get Started",
  heading: "Let's Talk About Your Radiology Workflow",
  body: "Whether you need additional capacity, after-hours coverage, overflow support, or a reporting model across multiple locations, WE Healthcare can work with you to understand your requirements.",
  needs: ["Additional capacity", "After-hours coverage", "Overflow support", "Multi-location reporting"],
  cta: { label: "Request a Demo", href: routes.requestDemo },
} as const;
