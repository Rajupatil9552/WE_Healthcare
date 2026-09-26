/**
 * Content definition for the Spinal Annotation page.
 * Route: /modalities/spinal-annotation (kept where the nav already links;
 * the brief listed /services/spinal-annotation).
 *
 * Copy follows the approved Spinal Annotation content. The Quality & Review
 * text is shown verbatim as supplied. [VERIFY: Quality & Review detail]
 * The H1, FAQ answers, and CTA heading/body are not part of the approved
 * set; they restate it. [VERIFY: H1, FAQ, CTA]
 *
 * Imagery: CC0 / public-domain spine images already used on the MRI, X-ray,
 * and CT pages. Level labels are illustrative placements, not a clinical
 * read. [VERIFY: level labels]
 */

import { routes } from "@/config/routes";

/** A labelled level on an image, in % of the image. */
export type Level = { label: string; x: number; y: number; side?: "left" | "right" };

export type AnnotatedImage = {
  src: string;
  alt: string;
  ratio: number;
  levels: readonly Level[];
  /** Disc-space lines (y, in %), drawn between vertebral bodies. */
  discs?: readonly number[];
};

export const SPINE_IMAGES = {
  lumbarMri: {
    src: "/images/modalities/mri/mri-lumbar-spine-sagittal.webp",
    alt: "Sagittal MRI of the lumbar spine",
    ratio: 615 / 850,
    levels: [
      { label: "L2", x: 30, y: 9 },
      { label: "L3", x: 32, y: 31 },
      { label: "L4", x: 33, y: 53 },
      { label: "L5", x: 35, y: 73 },
      { label: "S1", x: 42, y: 92 },
    ],
    discs: [20, 42, 63, 83],
  },
  cervicalXray: {
    src: "/images/modalities/x-ray/cervical-spine-radiograph-lateral.webp",
    alt: "Lateral X-ray of the cervical spine",
    ratio: 888 / 1400,
    levels: [
      { label: "C2", x: 33, y: 25 },
      { label: "C3", x: 31, y: 35.5 },
      { label: "C4", x: 30, y: 43 },
      { label: "C5", x: 30, y: 50 },
      { label: "C6", x: 31, y: 57 },
      { label: "C7", x: 33, y: 64 },
    ],
  },
  cervicalCt: {
    src: "/images/modalities/ct/ct-spine-sagittal.webp",
    alt: "Sagittal CT of the cervical spine",
    ratio: 262 / 462,
    levels: [
      { label: "C1", x: 24, y: 23, side: "right" },
      { label: "C2", x: 34, y: 35 },
      { label: "C3", x: 40, y: 46 },
      { label: "C4", x: 45, y: 57 },
      { label: "C5", x: 49, y: 67 },
      { label: "C6", x: 55, y: 78 },
      { label: "C7", x: 60, y: 90 },
    ],
  },
} as const satisfies Record<string, AnnotatedImage>;

export const SPINAL_PAGE_METADATA = {
  title: "Spinal Annotation Services | Radiology Imaging Support | WE Healthcare",
  description:
    "Spinal annotation support for imaging workflows, with service scope and output configured around approved clinical and operational requirements.",
  canonical: routes.modality("spinal-annotation"),
} as const;

export const SPINAL_HERO_CONTENT = {
  eyebrow: "Specialized Service · Spinal Annotation",
  heading: "Spinal Annotation Services",
  subheading: "Structured spinal annotation support for imaging workflows.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;

export const SPINAL_WHAT_CONTENT = {
  eyebrow: "Spinal annotation",
  heading: "What Is Spinal Annotation?",
  paragraphs: [
    "Spinal annotation is the structured identification, labeling, and marking of relevant spinal anatomy on medical images to support defined clinical and imaging workflows.",
    "It can help organize and identify spinal structures consistently across imaging studies, making the relevant anatomy easier to review, assess, and use within the intended workflow.",
    "For WE Healthcare, spinal annotation is provided as a specialized imaging support service, with the annotation scope, supported studies, anatomical regions, and deliverables aligned with the approved workflow requirements.",
  ],
  compare: { before: "Unannotated", after: "Annotated" },
} as const;

export const SPINAL_WORKFLOW_CONTENT = {
  eyebrow: "Annotation workflow",
  heading: "How It Works",
  steps: [
    { id: "received", label: "Study received" },
    { id: "preparation", label: "Image preparation" },
    { id: "annotation", label: "Annotation" },
    { id: "review", label: "Quality review" },
    { id: "output", label: "Output delivered" },
  ],
  qualityHeading: "Quality & Review",
  qualityBody: "Approved quality-control process, reviewer qualifications, and escalation/addendum process.",
} as const;

export const SPINAL_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "Spinal Annotation Questions",
  intro: "How spinal annotation support fits into imaging workflows.",
  items: [
    {
      id: "what",
      question: "What is spinal annotation?",
      answer:
        "Spinal annotation is the structured identification, labeling, and marking of relevant spinal anatomy on medical images to support defined clinical and imaging workflows.",
    },
    {
      id: "why",
      question: "How does spinal annotation help imaging workflows?",
      answer:
        "It can help organize and identify spinal structures consistently across imaging studies, making the relevant anatomy easier to review, assess, and use within the intended workflow.",
    },
    {
      id: "scope",
      question: "Which studies, regions, and deliverables are included?",
      answer:
        "The annotation scope, supported studies, anatomical regions, and deliverables are aligned with the approved workflow requirements.",
    },
    {
      id: "process",
      question: "How does the annotation process work?",
      answer: "Studies are received, the images are prepared, annotation is performed, a quality review follows, and the output is delivered.",
    },
  ],
} as const;

export const SPINAL_CTA_CONTENT = {
  heading: "Discuss Spinal Annotation Support",
  body: "Request a consultation to discuss your annotation scope, supported studies, and deliverable requirements.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
