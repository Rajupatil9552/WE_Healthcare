/**
 * Content definition for the PET-CT modality page.
 * Route: /modalities/pet-ct
 *
 * Copy follows the approved PET-CT Reporting Services content. No equipment,
 * tracer, accreditation, turnaround, or coverage claims. The FAQ answers,
 * the pathway time labels, and the CTA heading/body are not part of the
 * approved set; they restate it. [VERIFY: FAQ, pathway labels, CTA copy]
 *
 * Imagery (stored locally in /public/images/modalities/pet-ct):
 * - Rotating MIP: public domain (Jens Maus), recoloured from a rainbow map to
 *   the standard inverted-grey reading view.
 * - Coronal CT and PET: CC BY 3.0 (Myohan), viewer text and crosshairs
 *   removed; the fused view is composited on the page. Credited on the page.
 * Illustrative only, no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/pet-ct";

/** 32-frame rotating whole-body MIP, laid out 8 x 4. */
export const PET_MIP_SPRITE = {
  src: `${IMG}/pet-ct-reporting-hero.webp`,
  columns: 8,
  rows: 4,
  count: 32,
  ratio: 260 / 392,
  alt: "Rotating whole-body PET maximum-intensity projection (MIP)",
} as const;

/** Pixel-aligned coronal CT and PET from the same study. */
export const PET_FUSION_IMAGES = {
  ratio: 332 / 868,
  ct: { src: `${IMG}/pet-ct-coronal-ct.webp`, alt: "Coronal CT showing anatomy from the head to the thighs" },
  pet: { src: `${IMG}/pet-ct-coronal-pet-gray.webp`, alt: "Coronal PET showing tracer distribution" },
  petOverlay: { src: `${IMG}/pet-ct-coronal-pet.webp` },
  fusedAlt: "Fused coronal PET-CT: PET activity overlaid in color on CT anatomy",
} as const;

export const PET_IMAGE_CREDITS = [
  { image: "Coronal CT and PET", author: "Myohan", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Nl_petct.jpg" },
  { image: "Rotating MIP", author: "Jens Maus", license: "Public domain", href: "https://commons.wikimedia.org/wiki/File:PET-MIPS-anim.gif" },
] as const;

export const PET_PAGE_METADATA = {
  title: "PET-CT Reporting Services | PET-CT Teleradiology | WE Healthcare",
  description:
    "PET-CT reporting support for hospitals and imaging centers, with structured interpretation for oncology and other PET-CT studies.",
  canonical: routes.modality("pet-ct"),
} as const;

export const PET_HERO_CONTENT = {
  eyebrow: "Modality · PET-CT",
  heading: "PET-CT Reporting Services",
  subheading: "PET-CT interpretation for complex diagnostic and oncology imaging.",
  body: "WE Healthcare provides PET-CT reporting support for healthcare organizations requiring additional nuclear medicine and hybrid imaging interpretation capacity.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;

export const PET_STUDIES_CONTENT = {
  eyebrow: "Hybrid imaging",
  heading: "PET-CT Reporting Support",
  body: "PET-CT combines functional and anatomic imaging and requires interpretation of findings within the appropriate clinical context. Remote PET-CT reporting can provide additional interpretation capacity for organizations managing hybrid imaging workloads.",
  /** Viewer modes: anatomic, functional, combined. */
  views: [
    { id: "ct", label: "CT", detail: "Anatomic" },
    { id: "pet", label: "PET", detail: "Functional" },
    { id: "fused", label: "Fused", detail: "PET-CT" },
  ],
  studiesHeading: "Studies We Report",
  umbrella: "Oncology PET-CT",
  pathway: [
    { id: "staging", label: "PET-CT for Staging", time: "Before treatment" },
    { id: "treatment", label: "PET-CT for Treatment Assessment", time: "During or after treatment" },
    { id: "follow-up", label: "Follow-up PET-CT", time: "After treatment" },
  ],
} as const;

export const PET_WORKFLOW_CONTENT = {
  eyebrow: "Nuclear medicine & hybrid imaging",
  subspecialtyHeading: "Subspecialty Expertise",
  subspecialties: [
    { id: "nm", label: "Nuclear Medicine", view: "pet", caption: "PET · functional" },
    { id: "body", label: "Body / Abdominal Imaging", view: "ct", caption: "CT · anatomic" },
    { id: "additional", label: "Additional PET-CT subspecialty coverage", view: "fused", caption: "Fused PET-CT" },
  ],
  workflowHeading: "How It Works",
  steps: [
    { id: "received", label: "PET-CT study received" },
    { id: "transfer", label: "Secure transfer" },
    { id: "routing", label: "Nuclear medicine/subspecialty routing" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report" },
    { id: "pacs", label: "PACS/RIS" },
  ],
  /** Index of the step where the PET and CT channels are read together. */
  mergeAt: 3,
} as const;

export const PET_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "PET-CT Reporting Questions",
  intro: "How remote PET-CT reporting works for hospitals and imaging centers.",
  items: [
    {
      id: "studies",
      question: "What PET-CT studies does WE Healthcare report?",
      answer:
        "WE Healthcare reports oncology PET-CT, including PET-CT for staging, PET-CT for treatment assessment, and follow-up PET-CT.",
    },
    {
      id: "subspecialties",
      question: "Which subspecialties support PET-CT reporting?",
      answer:
        "PET-CT reporting is supported by nuclear medicine and body/abdominal imaging, with additional PET-CT subspecialty coverage.",
    },
    {
      id: "context",
      question: "Why does PET-CT need specialized interpretation?",
      answer:
        "PET-CT combines functional and anatomic imaging, so findings are interpreted within the appropriate clinical context.",
    },
    {
      id: "capacity",
      question: "Can remote PET-CT reporting add interpretation capacity?",
      answer:
        "Yes. Remote PET-CT reporting can provide additional interpretation capacity for organizations managing hybrid imaging workloads.",
    },
    {
      id: "routing",
      question: "How are PET-CT studies routed to radiologists?",
      answer:
        "Once a PET-CT study is received through secure transfer, it is routed to nuclear medicine or the appropriate subspecialty for radiologist interpretation.",
    },
    {
      id: "delivery",
      question: "How are PET-CT reports delivered?",
      answer: "A structured report is returned to your PACS/RIS.",
    },
  ],
} as const;

export const PET_CTA_CONTENT = {
  heading: "Need Additional PET-CT Reporting Support?",
  body: "Request a consultation to discuss your PET-CT study volumes, reporting workflow, and nuclear medicine interpretation needs.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
