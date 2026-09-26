/**
 * Content definition for the Ultrasound modality page.
 * Route: /modalities/ultrasound
 *
 * Copy follows the approved Ultrasound Reporting Services content. No
 * equipment, accreditation, turnaround, or coverage claims. The FAQ answers
 * and the CTA heading/body are not part of the approved set; they restate it.
 * [VERIFY: FAQ + CTA copy]
 *
 * Imagery: Wikimedia Commons, stored locally in
 * /public/images/modalities/ultrasound. Scanner text, calipers, dates, and
 * labels were cropped or removed. Several files are CC BY-SA, so
 * US_IMAGE_CREDITS is rendered on the page. Illustrative only, no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/ultrasound";

/** Point on an image, in % of the image file, with its label side. */
export type UsPoint = { x: number; y: number; label: string; side?: "left" | "right" };

export type UsImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Display shape of the probe that produced the image: a curved-array fan
   * (abdominal), a linear-array rectangle (small parts, MSK, vascular), or
   * the image's own shape (endocavitary).
   */
  probe: "curved" | "linear" | "native";
  points: readonly UsPoint[];
};

export const US_IMAGES = {
  abdominal: {
    src: `${IMG}/us-reporting-hero.webp`,
    alt: "Abdominal ultrasound of the liver showing hepatic and portal veins",
    width: 794,
    height: 585,
    probe: "curved",
    points: [
      { x: 40, y: 25, label: "Liver" },
      { x: 47, y: 40, label: "Hepatic vein" },
      { x: 63, y: 55, label: "Portal vein" },
      { x: 35, y: 85, label: "Diaphragm" },
    ],
  },
  pelvic: {
    src: `${IMG}/us-pelvic.webp`,
    alt: "Transvaginal pelvic ultrasound of the uterus",
    width: 524,
    height: 330,
    probe: "native",
    points: [
      { x: 30, y: 42, label: "Uterus" },
      { x: 50, y: 59, label: "Endometrium" },
    ],
  },
  neck: {
    src: `${IMG}/us-neck-thyroid.webp`,
    alt: "Neck ultrasound of a thyroid lobe beside the trachea",
    width: 272,
    height: 330,
    probe: "linear",
    points: [
      { x: 32, y: 28, label: "Thyroid lobe" },
      { x: 72, y: 45, label: "Trachea", side: "left" },
      { x: 8, y: 47, label: "Carotid artery" },
    ],
  },
  breast: {
    src: `${IMG}/us-breast.webp`,
    alt: "Breast ultrasound showing the skin, fibroglandular tissue, and chest wall",
    width: 560,
    height: 505,
    probe: "linear",
    points: [
      { x: 50, y: 10, label: "Skin" },
      { x: 42, y: 30, label: "Fibroglandular tissue" },
      { x: 22, y: 62, label: "Pectoralis muscle" },
    ],
  },
  msk: {
    src: `${IMG}/us-msk.webp`,
    alt: "Musculoskeletal ultrasound of the shoulder showing the deltoid, supraspinatus tendon, and humeral head",
    width: 900,
    height: 590,
    probe: "linear",
    points: [
      { x: 50, y: 32, label: "Deltoid" },
      { x: 30, y: 56, label: "Supraspinatus tendon" },
      { x: 58, y: 68, label: "Humeral head" },
    ],
  },
  doppler: {
    src: `${IMG}/us-vascular-doppler.webp`,
    alt: "Vascular color Doppler ultrasound showing blood flow in an artery",
    width: 560,
    height: 436,
    probe: "linear",
    points: [
      { x: 45, y: 46, label: "Color flow" },
      { x: 35, y: 63, label: "Vessel wall" },
    ],
  },
  emergency: {
    src: `${IMG}/us-emergency-ruq.webp`,
    alt: "Right upper quadrant ultrasound showing the liver, kidney, and hepatorenal space",
    width: 820,
    height: 724,
    probe: "curved",
    points: [
      { x: 50, y: 14, label: "Liver" },
      { x: 42, y: 33, label: "Hepatorenal space", side: "left" },
      { x: 55, y: 52, label: "Kidney" },
    ],
  },
} as const satisfies Record<string, UsImage>;

export const US_IMAGE_CREDITS = [
  { image: "Liver", author: "Mikael Häggström", license: "CC0", href: "https://commons.wikimedia.org/wiki/File:Ultrasonography_of_a_normal_liver.jpg" },
  { image: "Uterus", author: "Mikael Häggström", license: "CC0", href: "https://commons.wikimedia.org/wiki/File:Uterus_of_88_year_old_female.jpg" },
  { image: "Thyroid", author: "Nevit Dilmen", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Thyroid_ultrasound_110314093023_0931110.jpg" },
  { image: "Breast", author: "Nevit Dilmen", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Breast_ultrasound_10304092047_0926000.jpg" },
  { image: "Supraspinatus", author: "RSatUSZ", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Transversal_US_supraspinatus.jpg" },
  { image: "Color Doppler", author: "Drickey", license: "CC BY-SA 2.5", href: "https://commons.wikimedia.org/wiki/File:ColourDopplerA.jpg" },
  { image: "Right upper quadrant", author: "Drahreg01", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:MorisonNoText.png" },
] as const;

export const US_PAGE_METADATA = {
  title: "Ultrasound Teleradiology Reporting Services | WE Healthcare",
  description:
    "Remote ultrasound reporting support for hospitals and imaging centers, covering abdominal, pelvic, vascular, breast, MSK, and emergency ultrasound studies.",
  canonical: routes.modality("ultrasound"),
} as const;

export const US_HERO_CONTENT = {
  eyebrow: "Modality · Ultrasound",
  heading: "Ultrasound Reporting Services",
  subheading: "Ultrasound interpretation for routine, vascular, and emergency imaging.",
  body: "WE Healthcare supports ultrasound reporting requirements across hospitals, imaging centers, and healthcare networks, including routine studies, emergency imaging, and additional reporting capacity.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  /** Mirrors the subheading: routine, vascular, emergency. */
  modes: [
    { id: "routine", label: "Routine", image: US_IMAGES.abdominal },
    { id: "vascular", label: "Vascular", image: US_IMAGES.doppler },
    { id: "emergency", label: "Emergency", image: US_IMAGES.emergency },
  ],
} as const;

export type UsStudy = {
  id: string;
  /** Short console-preset style label. */
  code: string;
  label: string;
  image: UsImage;
  urgent?: boolean;
};

export const US_STUDIES_CONTENT = {
  eyebrow: "Ultrasound reporting support",
  heading: "Ultrasound Reporting Support",
  body: "Ultrasound services can involve varied study types across multiple clinical departments. Remote reporting can provide additional interpretation capacity while allowing imaging teams to continue using their existing operational workflow.",
  studiesHeading: "Studies We Report",
  studies: [
    { id: "abdominal", code: "ABD", label: "Abdominal Ultrasound", image: US_IMAGES.abdominal },
    { id: "pelvic", code: "PELV", label: "Pelvic Ultrasound", image: US_IMAGES.pelvic },
    { id: "neck", code: "NECK", label: "Neck Ultrasound", image: US_IMAGES.neck },
    { id: "breast", code: "BRST", label: "Breast Ultrasound", image: US_IMAGES.breast },
    { id: "msk", code: "MSK", label: "Musculoskeletal Ultrasound", image: US_IMAGES.msk },
    { id: "vascular", code: "VASC", label: "Vascular Ultrasound", image: US_IMAGES.doppler },
    { id: "emergency", code: "STAT", label: "Emergency / STAT Ultrasound", image: US_IMAGES.emergency, urgent: true },
  ] satisfies UsStudy[],
};

export const US_SUBSPECIALTY_CONTENT = {
  eyebrow: "Subspecialty reporting",
  heading: "Subspecialty Expertise",
  /** One representative image per subspecialty (illustrative). */
  items: [
    { id: "body", label: "Body / Abdominal", image: US_IMAGES.abdominal },
    { id: "breast", label: "Breast Imaging", image: US_IMAGES.breast },
    { id: "msk", label: "Musculoskeletal", image: US_IMAGES.msk },
    { id: "emergency", label: "Emergency & Trauma", image: US_IMAGES.emergency },
  ],
  workflowHeading: "How It Works",
  steps: [
    { id: "received", label: "Study received" },
    { id: "routing", label: "Priority and subspecialty routing" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report returned to PACS/RIS" },
  ],
} as const;

export const US_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "Ultrasound Reporting Questions",
  intro: "How remote ultrasound reporting works for hospitals, imaging centers, and healthcare networks.",
  items: [
    {
      id: "studies",
      question: "What ultrasound studies does WE Healthcare support?",
      answer:
        "WE Healthcare reports abdominal, pelvic, neck, breast, musculoskeletal, and vascular ultrasound, as well as emergency and STAT ultrasound studies.",
    },
    {
      id: "emergency",
      question: "Can ultrasound reporting support emergency and STAT studies?",
      answer: "Yes. Emergency imaging is supported, with studies routed by priority as part of the reporting workflow.",
    },
    {
      id: "subspecialties",
      question: "Which subspecialties support ultrasound reporting?",
      answer: "Ultrasound reporting covers body/abdominal, breast imaging, musculoskeletal, and emergency & trauma.",
    },
    {
      id: "workflow",
      question: "Do imaging teams need to change their workflow?",
      answer:
        "No. Remote reporting provides additional interpretation capacity while imaging teams continue using their existing operational workflow.",
    },
    {
      id: "routing",
      question: "How are ultrasound studies routed to radiologists?",
      answer: "Once a study is received, it is routed by priority and subspecialty to a radiologist for interpretation.",
    },
    {
      id: "delivery",
      question: "How are ultrasound reports delivered?",
      answer: "A structured report is returned to your PACS/RIS.",
    },
  ],
} as const;

export const US_CTA_CONTENT = {
  heading: "Need Additional Ultrasound Reporting Support?",
  body: "Request a consultation to discuss your ultrasound study mix, reporting workflow, and capacity needs.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
