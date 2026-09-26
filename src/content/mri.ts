/**
 * Content definition for the MRI modality page.
 * Route: /modalities/mri
 *
 * Copy follows the approved MRI Reporting Services content. No equipment,
 * accreditation, turnaround, or coverage claims. FAQ answers restate the
 * approved content. [VERIFY: FAQ copy]
 *
 * Study → subspecialty pairings follow the brief (neuroradiology for brain,
 * head, neck and spine; MSK; body/abdominal; emergency & trauma). Chest is
 * paired with Body / Abdominal. [VERIFY: chest MRI routing]
 *
 * Imagery: Wikimedia Commons, stored locally in /public/images/modalities/mri.
 * Several files are CC BY-SA, so MRI_IMAGE_CREDITS is rendered on the page.
 * All images are illustrative and contain no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/mri";

export type MriImage = {
  src: string;
  alt: string;
  /** Plane label shown in viewports, e.g. "Sagittal". */
  plane: string;
  /** width / height of the file. */
  ratio: number;
};

export const MRI_IMAGES = {
  sagittalHead: {
    src: `${IMG}/mri-reporting-hero.webp`,
    alt: "Sagittal MRI of the head showing the brain, cerebellum, brainstem, and cervical spine",
    plane: "Sagittal",
    ratio: 645 / 702,
  },
  brain: {
    src: `${IMG}/mri-brain-axial.webp`,
    alt: "Axial T2-weighted MRI of the brain",
    plane: "Axial",
    ratio: 693 / 800,
  },
  lumbarSpine: {
    src: `${IMG}/mri-lumbar-spine-sagittal.webp`,
    alt: "Sagittal T2-weighted MRI of the lumbar spine",
    plane: "Sagittal",
    ratio: 615 / 850,
  },
  knee: {
    src: `${IMG}/mri-knee-sagittal.webp`,
    alt: "Sagittal MRI of the knee",
    plane: "Sagittal",
    ratio: 697 / 800,
  },
  abdomen: {
    src: `${IMG}/mri-abdomen-axial.webp`,
    alt: "Axial MRI of the upper abdomen showing the liver, kidneys, and spine",
    plane: "Axial",
    ratio: 472 / 346,
  },
  pelvis: {
    src: `${IMG}/mri-pelvis-axial.webp`,
    alt: "Axial T2-weighted MRI of the pelvis",
    plane: "Axial",
    ratio: 512 / 372,
  },
  chest: {
    src: `${IMG}/mri-chest-coronal.webp`,
    alt: "Coronal MRI of the chest",
    plane: "Coronal",
    ratio: 255 / 247,
  },
} as const satisfies Record<string, MriImage>;

export const MRI_IMAGE_CREDITS = [
  { image: "Sagittal head", author: "everyone's idle", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:MRI_brain_sagittal_section.jpg" },
  { image: "Axial brain", author: "511KeV", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:MRI_Brain_T2_Axial_(10).jpg" },
  { image: "Lumbar spine", author: "Stillwaterising", license: "CC0", href: "https://commons.wikimedia.org/wiki/File:Lumbar_MRI_t2-tse-rst-sagittal_06.jpg" },
  { image: "Knee", author: "Ptrump16", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Knee_MRI_T1_TSE_Sagittal.jpg" },
  { image: "Abdomen", author: "Nevit Dilmen", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Abdomen_135821_rgbcd.png" },
  { image: "Pelvis", author: "Nevit Dilmen", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Pelvic_MRI_T1FSE_T2frFSE_T2FSfrFSE_16.jpg" },
  { image: "Skeleton (study map)", author: "Mariana Ruiz Villarreal (LadyofHats)", license: "Public domain", href: "https://commons.wikimedia.org/wiki/File:Human_skeleton_front_-_no_labels.svg" },
  { image: "Chest", author: "Golshani7", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Conventional_MRI_of_the_chest.jpg" },
] as const;

export const MRI_PAGE_METADATA = {
  title: "MRI Teleradiology Reporting Services | WE Healthcare",
  description:
    "Subspecialty MRI reporting support for hospitals, imaging centers, and healthcare networks, including routine, emergency, overnight, and overflow coverage.",
  canonical: routes.modality("mri"),
} as const;

export const MRI_HERO_CONTENT = {
  eyebrow: "Modality · MRI",
  heading: "MRI Reporting Services",
  subheading: "Subspecialty-matched MRI reporting for complex imaging workloads.",
  body: "WE Healthcare provides remote MRI interpretation designed to support organizations managing routine MRI volumes, subspecialty requirements, after-hours studies, and reporting capacity constraints.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  /** Labels on the central sagittal image, in % of the image. */
  points: [
    { x: 48, y: 26, label: "Brain", side: "right" },
    { x: 76, y: 55, label: "Head & neck", side: "left" },
    { x: 43, y: 82, label: "Cervical spine", side: "right" },
  ],
  /** Anatomical layers around the central image. */
  layers: [
    { id: "spine", label: "Spine", image: MRI_IMAGES.lumbarSpine },
    { id: "msk", label: "MSK", image: MRI_IMAGES.knee },
    { id: "body", label: "Body", image: MRI_IMAGES.abdomen },
  ],
  interpretation: { label: "Subspecialty interpretation", detail: "Matched by anatomical area" },
} as const;

export type Subspecialty = "Neuroradiology" | "Musculoskeletal" | "Body / Abdominal" | "Emergency & Trauma";

/** Region ids drawn on the study-map figure. */
export type BodyRegion = "brain" | "head" | "neck" | "cspine" | "spine" | "chest" | "abdomen" | "pelvis" | "msk";

export type MriStudy = {
  id: string;
  label: string;
  image: MriImage;
  /** Anatomical study (drawn on the figure) or a workflow / capacity label. */
  region?: BodyRegion;
  kind: "anatomy" | "workflow";
  expertise?: Subspecialty;
  /** Shown instead of an expertise pairing for workflow labels. */
  note?: string;
};

export const MRI_STUDIES_CONTENT = {
  eyebrow: "Key clinical areas",
  heading: "MRI Reporting Across Key Clinical Areas",
  body: "MRI studies often require subspecialty-specific interpretation. A structured remote reporting workflow can route studies according to modality, priority, and available expertise.",
  studiesHeading: "Studies We Report",
  anatomyLabel: "Anatomical studies",
  workflowLabel: "Workflow & capacity",
  studies: [
    { id: "brain", label: "Brain", region: "brain", kind: "anatomy", expertise: "Neuroradiology", image: MRI_IMAGES.brain },
    { id: "head", label: "Head", region: "head", kind: "anatomy", expertise: "Neuroradiology", image: MRI_IMAGES.sagittalHead },
    { id: "neck", label: "Neck", region: "neck", kind: "anatomy", expertise: "Neuroradiology", image: MRI_IMAGES.sagittalHead },
    { id: "cervical-spine", label: "Cervical Spine", region: "cspine", kind: "anatomy", expertise: "Neuroradiology", image: MRI_IMAGES.sagittalHead },
    { id: "spine", label: "Spine", region: "spine", kind: "anatomy", expertise: "Neuroradiology", image: MRI_IMAGES.lumbarSpine },
    { id: "chest", label: "Chest", region: "chest", kind: "anatomy", expertise: "Body / Abdominal", image: MRI_IMAGES.chest },
    { id: "abdomen", label: "Abdomen", region: "abdomen", kind: "anatomy", expertise: "Body / Abdominal", image: MRI_IMAGES.abdomen },
    { id: "pelvis", label: "Pelvis", region: "pelvis", kind: "anatomy", expertise: "Body / Abdominal", image: MRI_IMAGES.pelvis },
    { id: "msk", label: "Musculoskeletal", region: "msk", kind: "anatomy", expertise: "Musculoskeletal", image: MRI_IMAGES.knee },
    { id: "night", label: "Night-time Studies", kind: "workflow", note: "After-hours studies", image: MRI_IMAGES.brain },
    { id: "emergency", label: "Emergency / STAT", kind: "workflow", expertise: "Emergency & Trauma", note: "Priority routing", image: MRI_IMAGES.sagittalHead },
  ] satisfies MriStudy[],
};

export const MRI_WORKFLOW_CONTENT = {
  eyebrow: "Subspecialty reporting",
  subspecialtyHeading: "Subspecialty Expertise",
  subspecialtyIntro: "MRI studies are routed according to modality, priority, and available subspecialty expertise.",
  columns: { area: "Clinical area", subspecialty: "Subspecialty", radiologist: "Radiologist" },
  matches: [
    { id: "neuro", subspecialty: "Neuroradiology", areas: ["Brain", "Head", "Neck", "Cervical Spine", "Spine"], image: MRI_IMAGES.sagittalHead, priority: "Routine" },
    { id: "msk", subspecialty: "Musculoskeletal", areas: ["Musculoskeletal"], image: MRI_IMAGES.knee, priority: "Routine" },
    { id: "body", subspecialty: "Body / Abdominal", areas: ["Chest", "Abdomen", "Pelvis"], image: MRI_IMAGES.abdomen, priority: "Routine" },
    { id: "emergency", subspecialty: "Emergency & Trauma", areas: ["Emergency / STAT"], image: MRI_IMAGES.lumbarSpine, priority: "STAT" },
  ],
  nightNote: "Night-time studies follow the same routing by priority and available expertise.",
  workflowHeading: "How It Works",
  steps: [
    { id: "received", label: "Study received" },
    { id: "transfer", label: "Secure transfer" },
    { id: "routing", label: "Priority and subspecialty routing" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report returned to PACS/RIS" },
  ],
  /** Standard sections of a diagnostic radiology report (layout only, no findings). */
  reportSections: ["Exam", "Technique", "Findings", "Impression"],
} as const;

export const MRI_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "MRI Reporting Questions",
  intro: "How remote MRI reporting works for hospitals, imaging centers, and healthcare networks.",
  items: [
    {
      id: "studies",
      question: "What MRI studies does WE Healthcare support?",
      answer:
        "WE Healthcare reports brain, head, neck, cervical spine, spine, chest, abdomen, pelvis, and musculoskeletal MRI, as well as night-time and emergency/STAT studies.",
    },
    {
      id: "subspecialty",
      question: "Can MRI studies be matched to subspecialty expertise?",
      answer:
        "Yes. MRI studies are routed according to modality, priority, and available expertise across neuroradiology, musculoskeletal, body/abdominal, and emergency & trauma.",
    },
    {
      id: "emergency",
      question: "Can MRI reporting support emergency and STAT studies?",
      answer: "Yes. Emergency and STAT MRI studies are supported, with priority routing as part of the reporting workflow.",
    },
    {
      id: "overnight",
      question: "Can overnight MRI studies be supported?",
      answer:
        "Yes. Remote MRI interpretation is designed to support after-hours and night-time studies alongside routine MRI volumes.",
    },
    {
      id: "routing",
      question: "How are MRI studies routed to radiologists?",
      answer:
        "Once a study is received through secure transfer, it is routed by priority and subspecialty to a radiologist for interpretation.",
    },
    {
      id: "delivery",
      question: "How are MRI reports returned to the healthcare organization?",
      answer: "A structured report is returned to your PACS/RIS.",
    },
  ],
} as const;

export const MRI_CTA_CONTENT = {
  heading: "Need Additional MRI Reporting Support?",
  body: "Request a consultation to discuss your MRI reporting workflow, study volumes, subspecialty requirements, and reporting capacity needs.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
