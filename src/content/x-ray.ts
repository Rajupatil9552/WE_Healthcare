/**
 * Content definition for the X-Ray modality page.
 * Route: /modalities/x-ray
 *
 * Copy follows the approved X-Ray Reporting Services content. No equipment,
 * accreditation, or turnaround claims. FAQ copy is not part of the approved
 * content set. [VERIFY: FAQ copy]
 *
 * Imagery: CC0 / public-domain radiographs from Wikimedia Commons
 * (Mikael Häggström, M.D.; Department of Radiology, UC San Diego Health),
 * stored locally in /public/images/modalities/x-ray. Laterality markers were
 * removed. All films are illustrative and contain no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/x-ray";

/** A labelled point on a film, in % of the image's own width/height. */
export type AnatomyPoint = {
  x: number;
  y: number;
  label: string;
  /** Which side of the point the label sits on. */
  side?: "left" | "right";
};

export type Film = {
  src: string;
  alt: string;
  /** width / height of the image file, so overlays stay pinned to anatomy. */
  ratio: number;
  /** DICOM-style viewport caption, e.g. "CHEST · PA". */
  view: string;
  /** Marker shown on the patient's right (viewer's left) for frontal views. */
  marker?: "R" | "L";
  points?: readonly AnatomyPoint[];
};

export const XRAY_PAGE_METADATA = {
  title: "X-Ray Teleradiology Reporting Services | WE Healthcare",
  description:
    "Reliable X-ray teleradiology reporting for hospitals, imaging centers, and healthcare networks. Support for routine, emergency, overnight, and overflow studies.",
  canonical: routes.modality("x-ray"),
} as const;

export const FILMS = {
  chestPa: {
    src: `${IMG}/chest-radiograph-pa.webp`,
    alt: "Frontal (PA) chest X-ray showing both lung fields, the heart, the mediastinum, and the diaphragm",
    ratio: 1519 / 1600,
    view: "CHEST · PA",
    marker: "R",
    points: [
      { x: 48, y: 11, label: "Trachea", side: "right" },
      { x: 58, y: 32, label: "Aortic knob", side: "right" },
      { x: 24, y: 47, label: "Right lung field", side: "right" },
      { x: 63, y: 62, label: "Cardiac silhouette", side: "left" },
      { x: 76, y: 80, label: "Hemidiaphragm", side: "left" },
    ],
  },
  chestLateral: {
    src: `${IMG}/chest-radiograph-lateral.webp`,
    alt: "Lateral chest X-ray showing the trachea, retrosternal space, heart, thoracic spine, and diaphragm",
    ratio: 1010 / 1400,
    view: "CHEST · LAT",
    points: [
      { x: 50, y: 33, label: "Trachea", side: "right" },
      { x: 30, y: 46, label: "Retrosternal space", side: "right" },
      { x: 34, y: 66, label: "Cardiac silhouette", side: "right" },
      { x: 77, y: 57, label: "Thoracic spine", side: "left" },
      { x: 55, y: 75, label: "Hemidiaphragm", side: "right" },
    ],
  },
  hand: {
    src: `${IMG}/hand-radiograph.webp`,
    alt: "Frontal X-ray of the hand and wrist showing the phalanges, metacarpals, carpal bones, and distal radius",
    ratio: 986 / 1400,
    view: "HAND · PA",
    points: [
      { x: 43, y: 30, label: "Phalanges", side: "right" },
      { x: 41, y: 57, label: "Metacarpals", side: "right" },
      { x: 36, y: 77, label: "Carpal bones", side: "right" },
      { x: 40, y: 93, label: "Distal radius", side: "right" },
    ],
  },
  cervicalSpine: {
    src: `${IMG}/cervical-spine-radiograph-lateral.webp`,
    alt: "Lateral cervical spine X-ray showing vertebral alignment, vertebral bodies, and spinous processes",
    ratio: 888 / 1400,
    view: "C-SPINE · LAT",
    points: [
      { x: 33, y: 26, label: "C2 (axis)", side: "left" },
      { x: 57, y: 31, label: "Spinous process", side: "right" },
      { x: 33, y: 44, label: "Vertebral bodies", side: "right" },
      { x: 22, y: 50, label: "Prevertebral soft tissue", side: "right" },
    ],
  },
  knee: {
    src: `${IMG}/knee-radiograph-ap.webp`,
    alt: "Frontal (AP) knee X-ray showing the femoral condyles, joint space, tibial plateau, and fibular head",
    ratio: 689 / 1400,
    view: "KNEE · AP",
    marker: "R",
    points: [
      { x: 43, y: 38, label: "Femoral condyles", side: "right" },
      { x: 42, y: 48, label: "Joint space", side: "right" },
      { x: 50, y: 54, label: "Tibial plateau", side: "right" },
      { x: 8, y: 59, label: "Fibular head", side: "right" },
    ],
  },
  shoulder: {
    src: `${IMG}/shoulder-radiograph.webp`,
    alt: "Frontal (Grashey) shoulder X-ray showing the humeral head and acromion",
    ratio: 928 / 1400,
    view: "SHOULDER · GRASHEY",
    points: [
      { x: 56, y: 12, label: "Acromion", side: "right" },
      { x: 48, y: 30, label: "Humeral head", side: "left" },
    ],
  },
} as const satisfies Record<string, Film>;

export const XRAY_HERO_CONTENT = {
  eyebrow: "Modality · X-Ray",
  heading: "X-Ray Reporting Services",
  subheading: "High-volume X-ray reporting support for routine and time-sensitive imaging.",
  body: "WE Healthcare provides remote X-ray interpretation designed to support hospitals, imaging centers, emergency departments, and healthcare networks managing routine volume, after-hours coverage, or reporting backlogs.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  secondaryCta: { label: "Studies we report", href: "#studies" },
  readouts: [
    { label: "Volume", value: "Routine & STAT" },
    { label: "Coverage", value: "Overnight & overflow" },
    { label: "Reports", value: "Returned to PACS/RIS" },
  ],
} as const;

export const XRAY_STUDIES_CONTENT = {
  eyebrow: "Studies we report",
  heading: "Studies We Report",
  /** Emergency / STAT applies across every region, so it is shown as a flag. */
  priority: "Emergency / STAT",
  groups: [
    {
      id: "chest-abdomen",
      index: "01",
      title: "Chest & Abdomen",
      studies: ["Chest X-Ray", "Abdomen"],
      subspecialties: ["Emergency & Trauma", "Body / Abdominal"],
      film: FILMS.chestPa,
    },
    {
      id: "head-neck-spine",
      index: "02",
      title: "Head, Neck & Spine",
      studies: ["Head", "Neck", "Spine"],
      subspecialties: ["Neuroradiology", "Musculoskeletal"],
      film: FILMS.cervicalSpine,
    },
    {
      id: "upper-limb",
      index: "03",
      title: "Upper Limb & MSK",
      studies: ["Upper Limb", "MSK"],
      subspecialties: ["Musculoskeletal", "Emergency & Trauma"],
      film: FILMS.hand,
    },
    {
      id: "lower-limb",
      index: "04",
      title: "Lower Limb & Joints",
      studies: ["Lower Limb", "Knee", "Hip", "Ankle"],
      subspecialties: ["Musculoskeletal", "Emergency & Trauma"],
      film: FILMS.knee,
    },
  ],
  subspecialty: {
    heading: "Subspecialty Expertise",
    items: ["Emergency & Trauma", "Musculoskeletal", "Body / Abdominal", "Neuroradiology"],
  },
} as const;

export const XRAY_WORKFLOW_CONTENT = {
  eyebrow: "How it works",
  heading: "X-Ray Reporting Built Around Your Workflow",
  body: "X-ray remains one of the highest-volume imaging modalities across hospitals and imaging centers. When study volume increases or in-house coverage becomes constrained, remote reporting can provide additional reading capacity while allowing technologists and imaging teams to continue using their established workflow.",
  viewerLabel: "X-Ray Reporting Viewer",
  /** Step descriptions paraphrase the approved copy. [VERIFY: step descriptions] */
  steps: [
    {
      id: "received",
      step: "01",
      title: "Study received",
      description:
        "Studies arrive from your facility's existing systems, so technologists and imaging teams keep their established workflow.",
      detailBadge: "Image Transfer",
      visualFocus: "Study received from the facility",
    },
    {
      id: "routing",
      step: "02",
      title: "Priority and subspecialty routing",
      description:
        "Each study is routed by priority, from routine volume to emergency / STAT, and matched to the appropriate subspecialty.",
      detailBadge: "Routine · Emergency / STAT",
      visualFocus: "Routed by priority and subspecialty",
    },
    {
      id: "interpretation",
      step: "03",
      title: "Radiologist interpretation",
      description:
        "A radiologist interprets the study, adding reading capacity when volume increases or in-house coverage is constrained.",
      detailBadge: "Remote X-Ray Interpretation",
      visualFocus: "Radiologist review of the study",
    },
    {
      id: "report",
      step: "04",
      title: "Structured report returned to PACS/RIS",
      description: "A structured report is returned to your PACS/RIS for the care team.",
      detailBadge: "Report Delivery",
      visualFocus: "Structured report returned to PACS/RIS",
    },
  ],
  /** Standard sections of a diagnostic radiology report (layout only, no findings). */
  reportSections: ["Exam", "Clinical indication", "Findings", "Impression"],
  links: [
    { label: "Reporting workflow", href: routes.quality.reportingWorkflow },
    { label: "PACS & RIS integration", href: routes.technology.pacsRisIntegration },
  ],
} as const;

export const XRAY_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "X-Ray Reporting Questions",
  items: [
    {
      id: "study-types",
      question: "Which X-ray studies do you report?",
      answer:
        "Chest, abdomen, head, neck, spine, upper and lower limb, knee, hip, ankle, and other musculoskeletal X-rays, including emergency and STAT studies.",
    },
    {
      id: "coverage",
      question: "Can X-ray reporting cover overnight and overflow volume?",
      answer:
        "Yes. X-ray reporting can support routine volume, after-hours coverage, and reporting backlogs, based on the coverage model agreed with your facility.",
    },
    {
      id: "workflow",
      question: "Do our technologists need to change their workflow?",
      answer:
        "No. Remote reporting is designed so technologists and imaging teams continue using their established workflow, with studies routed from your existing systems.",
    },
    {
      id: "report-delivery",
      question: "Where are X-ray reports delivered?",
      answer: "Structured reports are returned to your PACS/RIS.",
    },
    {
      id: "routing",
      question: "How are urgent X-ray studies handled?",
      answer:
        "Studies are routed by priority and subspecialty, so emergency and STAT X-rays can be directed to the appropriate radiologist according to your facility's requirements.",
    },
  ],
} as const;

export const XRAY_CTA_CONTENT = {
  eyebrow: "Consultation",
  heading: "Request a Consultation",
  body: "Talk with WE Healthcare about X-ray reporting for routine volume, after-hours coverage, or reporting backlogs.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  secondaryCta: { label: "Request a Demo", href: routes.requestDemo },
} as const;
