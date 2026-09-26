/**
 * Content definition for the CT modality page.
 * Route: /modalities/ct
 *
 * Copy follows the approved CT Reporting Services content. No equipment,
 * accreditation, turnaround, or coverage claims. FAQ answers restate the
 * approved content. [VERIFY: FAQ copy]
 *
 * Imagery: CC0 CT series from Wikimedia Commons (Mikael Häggström, M.D.;
 * Department of Radiology, Uppsala University Hospital), stored locally in
 * /public/images/modalities/ct. Viewer overlays, scanner text, and institution
 * details were cropped out. All images are illustrative and contain no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/ct";

export type CtImage = {
  src: string;
  alt: string;
  /** Plane label shown in the viewport, e.g. "AXIAL". */
  plane: string;
  width: number;
  height: number;
};

export const CT_IMAGES = {
  head: {
    src: `${IMG}/ct-head-axial.webp`,
    alt: "Axial CT slice of the head at the level of the lateral ventricles",
    plane: "Axial",
    width: 440,
    height: 440,
  },
  chest: {
    src: `${IMG}/ct-chest-axial.webp`,
    alt: "Axial CT slice through the lower chest showing both lungs, the heart, and the thoracic spine",
    plane: "Axial",
    width: 462,
    height: 284,
  },
  abdomenPelvis: {
    src: `${IMG}/ct-cross-sectional-imaging.webp`,
    alt: "Coronal CT reconstruction of the abdomen and pelvis showing the liver, kidneys, lumbar spine, and hips",
    plane: "Coronal",
    width: 485,
    height: 672,
  },
  neck: {
    src: `${IMG}/ct-neck-axial.webp`,
    alt: "Axial CT slice of the neck showing the airway and a cervical vertebra",
    plane: "Axial",
    width: 370,
    height: 348,
  },
  spine: {
    src: `${IMG}/ct-spine-sagittal.webp`,
    alt: "Sagittal CT reconstruction of the cervical spine in bone window",
    plane: "Sagittal",
    width: 262,
    height: 462,
  },
} as const satisfies Record<string, CtImage>;

/** 4 x 4 sprite of contiguous axial head CT slices, played as a cine loop. */
export const CT_SLICE_STACK = {
  src: `${IMG}/ct-reporting-hero.webp`,
  columns: 4,
  count: 16,
  alt: "Axial head CT series viewed slice by slice",
} as const;

export const CT_PAGE_METADATA = {
  title: "CT Teleradiology Reporting Services | WE Healthcare",
  description:
    "Subspecialty CT reporting support for hospitals and imaging centers, including routine, urgent, emergency, overnight, and overflow studies.",
  canonical: routes.modality("ct"),
} as const;

export const CT_HERO_CONTENT = {
  eyebrow: "CT Reporting Services",
  heading: "CT Reporting Services",
  subheading: "Subspecialty CT interpretation for routine, urgent, and emergency imaging.",
  body: "WE Healthcare provides remote CT reporting support for healthcare organizations that need additional subspecialty capacity, after-hours coverage, or flexible reporting support.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  /** CT study → subspecialty review → reporting, shown under the viewer. */
  pipeline: [
    { id: "study", label: "CT study", detail: "Head / Brain · Axial" },
    { id: "review", label: "Subspecialty review", detail: "Neuroradiology" },
    { id: "report", label: "Reporting", detail: "Structured report" },
  ],
} as const;

/**
 * A preview of a study region: which image, and how far to zoom into it.
 * `origin` is in % of the 4:3 viewport (the image is letterboxed inside it).
 */
type Preview = { image: CtImage; scale?: number; origin?: string };

export const CT_STUDIES_CONTENT = {
  eyebrow: "Complex imaging workloads",
  heading: "CT Reporting for Complex Imaging Workloads",
  body: "CT volumes can vary significantly across emergency departments, hospitals, and outpatient imaging centers. Remote reporting can help organizations manage changing study volumes while maintaining a structured reporting workflow.",
  studiesHeading: "Studies We Report",
  studies: [
    { id: "head", label: "Head / Brain", preview: { image: CT_IMAGES.head } },
    { id: "chest", label: "Chest", preview: { image: CT_IMAGES.chest } },
    { id: "abdomen", label: "Abdomen", preview: { image: CT_IMAGES.abdomenPelvis, scale: 1.5, origin: "50% 25%" } },
    { id: "pelvis", label: "Pelvis", preview: { image: CT_IMAGES.abdomenPelvis, scale: 1.6, origin: "50% 82%" } },
    { id: "neck", label: "Neck", preview: { image: CT_IMAGES.neck } },
    { id: "spine", label: "Spine", preview: { image: CT_IMAGES.spine } },
    { id: "msk", label: "Musculoskeletal", preview: { image: CT_IMAGES.abdomenPelvis, scale: 2, origin: "36% 80%" } },
    { id: "lung-screening", label: "Lung Screening", preview: { image: CT_IMAGES.chest, scale: 1.7, origin: "22% 50%" } },
    { id: "emergency", label: "Emergency / STAT", preview: { image: CT_IMAGES.head }, urgent: true },
  ] satisfies { id: string; label: string; preview: Preview; urgent?: boolean }[],
};

export const CT_WORKFLOW_CONTENT = {
  eyebrow: "Subspecialty reporting",
  subspecialtyHeading: "Subspecialty Expertise",
  subspecialties: [
    { id: "neuro", label: "Neuroradiology", study: "CT Head / Brain", image: CT_IMAGES.head },
    { id: "body", label: "Body / Abdominal Imaging", study: "CT Abdomen / Pelvis", image: CT_IMAGES.abdomenPelvis },
    { id: "msk", label: "Musculoskeletal", study: "CT Spine", image: CT_IMAGES.spine },
    { id: "emergency", label: "Emergency & Trauma", study: "CT Chest · STAT", image: CT_IMAGES.chest },
  ],
  workflowHeading: "How It Works",
  /** The study the workflow starts from (not a numbered step). */
  origin: "CT study",
  steps: [
    { id: "dicom", label: "Secure DICOM transfer" },
    { id: "priority", label: "Priority routing" },
    { id: "assignment", label: "Subspecialty assignment" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report" },
    { id: "pacs", label: "PACS/RIS" },
  ],
  /** Standard sections of a diagnostic radiology report (layout only, no findings). */
  reportSections: ["Exam", "Technique", "Findings", "Impression"],
} as const;

export const CT_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "CT Reporting Questions",
  intro: "How CT reporting support works for hospitals and imaging centers.",
  items: [
    {
      id: "studies",
      question: "What CT studies does WE Healthcare support?",
      answer:
        "WE Healthcare reports head/brain, chest, abdomen, pelvis, neck, spine, musculoskeletal, and lung screening CT studies, as well as emergency and STAT studies.",
    },
    {
      id: "routine-urgent",
      question: "Can CT reporting support routine and urgent imaging?",
      answer:
        "Yes. CT reporting supports routine and urgent imaging for organizations that need additional subspecialty capacity, after-hours coverage, or flexible reporting support.",
    },
    {
      id: "emergency",
      question: "Can CT reporting support emergency and STAT studies?",
      answer:
        "Yes. Emergency and STAT CT studies are supported, with priority routing as part of the reporting workflow.",
    },
    {
      id: "subspecialties",
      question: "What CT subspecialties are supported?",
      answer:
        "CT reporting covers neuroradiology, body/abdominal imaging, musculoskeletal, and emergency & trauma imaging.",
    },
    {
      id: "routing",
      question: "How are CT studies routed to radiologists?",
      answer:
        "Studies arrive through secure DICOM transfer, move through priority routing, and are assigned by subspecialty for radiologist interpretation.",
    },
    {
      id: "delivery",
      question: "How are CT reports delivered?",
      answer: "Radiologists produce a structured report, which is returned to your PACS/RIS.",
    },
  ],
} as const;

export const CT_CTA_CONTENT = {
  heading: "Need Additional CT Reporting Support?",
  body: "Request a consultation to discuss your CT reporting workflow, study volumes, and subspecialty reporting requirements.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
