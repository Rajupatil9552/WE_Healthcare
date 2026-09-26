/**
 * Content definition for the CBCT modality page.
 * Route: /modalities/cbct
 *
 * [VERIFY: final CBCT clinical scope.] The approved copy flags the clinical
 * scope as pending confirmation. That internal note, and the approved line
 * "The final scope of supported studies and clinical responsibilities should
 * be confirmed with the appropriate WE Healthcare clinical and operations
 * teams", are kept here rather than shown on the page; the page uses a
 * customer-facing equivalent ("confirmed with each organization").
 *
 * Subspecialty Expertise: the approved content has no entries yet, so the page
 * omits that block. [VERIFY: CBCT subspecialty expertise]
 *
 * FAQ answers, the CTA heading/body, and the study-card view labels are not
 * part of the approved set. [VERIFY: FAQ, CTA, view labels]
 *
 * Imagery: Wikimedia Commons, stored locally in /public/images/modalities/cbct.
 * Viewer text, rulers, and positioning hardware were removed. Credited on the
 * page. Illustrative only, no PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/cbct";

export type CbctImage = { src: string; alt: string; ratio: number };

export const CBCT_IMAGES = {
  volume: {
    src: `${IMG}/cbct-dental-volume.webp`,
    alt: "3D cone beam CT volume rendering of the jaws and teeth",
    ratio: 720 / 707,
  },
  ceph: {
    src: `${IMG}/cbct-cephalometric.webp`,
    alt: "Lateral cephalometric view of the skull, jaws, cervical spine, and airway",
    ratio: 1300 / 1307,
  },
  sinus: {
    src: `${IMG}/cbct-sinus-coronal.webp`,
    alt: "Coronal CT of the paranasal sinuses and nasal cavity",
    ratio: 1081 / 579,
  },
  panoramic: {
    src: `${IMG}/cbct-panoramic.webp`,
    alt: "Panoramic dental view of the maxilla, mandible, and teeth",
    ratio: 1400 / 682,
  },
} as const satisfies Record<string, CbctImage>;

/** 27-frame rotation of the dental volume, laid out 9 x 3. */
export const CBCT_VOLUME_SPRITE = {
  src: `${IMG}/cbct-reporting-hero.webp`,
  columns: 9,
  rows: 3,
  count: 27,
  ratio: 280 / 275,
  alt: "Rotating 3D cone beam CT volume of the jaws and teeth",
} as const;

export const CBCT_IMAGE_CREDITS = [
  { image: "3D dental volume", author: "Emailshankar", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:CBCT_Dental_implant.gif" },
  { image: "Cephalometric view", author: "ANUG", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Cephalometric_radiograph.JPG" },
  { image: "Sinus coronal", author: "Mikael Häggström", license: "CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:CT_of_the_ostiomeatal_complex,_coronal_plane,_no_annotations.png" },
  { image: "Panoramic view", author: "Coronation Dental Specialty Group", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Basic_panoramic_radiograph.jpg" },
] as const;

export const CBCT_PAGE_METADATA = {
  title: "CBCT Reporting Services | Cone Beam CT Teleradiology | WE Healthcare",
  description:
    "CBCT reporting support for dental, maxillofacial, ENT, sinus, TMJ, airway, and orthodontic imaging applications.",
  canonical: routes.modality("cbct"),
} as const;

export const CBCT_HERO_CONTENT = {
  eyebrow: "Modality · Cone Beam CT",
  heading: "CBCT Reporting Services",
  subheading: "Cone Beam CT reporting for dental, maxillofacial, and ENT imaging.",
  body: "WE Healthcare provides remote CBCT interpretation support for organizations using cone beam CT across dental, maxillofacial, ENT, and related imaging applications.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
  /** Areas the hero rotation names (from the subheading). */
  areas: ["Dental", "Maxillofacial", "ENT"],
} as const;

/** A labelled region on an image, in % of the image. */
export type Region = { x: number; y: number; w: number; h: number };

export type CbctStudy = {
  id: string;
  label: string;
  view: string;
  image: CbctImage;
  /** Area of the image the study concerns (drawn as a highlight box). */
  region: Region;
};

export const CBCT_STUDIES_CONTENT = {
  eyebrow: "CBCT reporting support",
  heading: "CBCT Reporting Support",
  body: "CBCT studies can require specialized interpretation depending on the anatomy and clinical application.",
  scopeNote: "The scope of supported studies is confirmed with each organization.",
  studiesHeading: "Studies We Report",
  studies: [
    { id: "dental", label: "Dental / Implant Planning", view: "3D volume", image: CBCT_IMAGES.volume, region: { x: 16, y: 38, w: 68, h: 44 } },
    { id: "maxillofacial", label: "Maxillofacial", view: "Lateral", image: CBCT_IMAGES.ceph, region: { x: 56, y: 36, w: 42, h: 55 } },
    { id: "sinus", label: "Sinus / ENT", view: "Coronal", image: CBCT_IMAGES.sinus, region: { x: 20, y: 4, w: 60, h: 92 } },
    { id: "tmj", label: "TMJ", view: "Lateral", image: CBCT_IMAGES.ceph, region: { x: 46, y: 43, w: 14, h: 14 } },
    { id: "airway", label: "Airway", view: "Lateral", image: CBCT_IMAGES.ceph, region: { x: 50, y: 54, w: 9, h: 34 } },
    { id: "orthodontic", label: "Orthodontic Assessment", view: "Panoramic", image: CBCT_IMAGES.panoramic, region: { x: 14, y: 14, w: 72, h: 66 } },
  ] satisfies CbctStudy[],
};

export const CBCT_WORKFLOW_CONTENT = {
  eyebrow: "Reporting workflow",
  heading: "How It Works",
  intro: "Each CBCT study follows the same reporting path, from receipt to a structured report in your PACS/RIS.",
  steps: [
    { id: "received", label: "Study received" },
    { id: "transfer", label: "Secure transfer" },
    { id: "routing", label: "Appropriate routing" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report" },
    { id: "pacs", label: "PACS/RIS" },
  ],
} as const;

export const CBCT_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "CBCT Reporting Questions",
  intro: "How remote cone beam CT reporting works.",
  items: [
    {
      id: "studies",
      question: "What CBCT studies does WE Healthcare report?",
      answer:
        "CBCT reporting covers dental and implant planning, maxillofacial, sinus/ENT, TMJ, airway, and orthodontic assessment studies. The scope of supported studies is confirmed with each organization.",
    },
    {
      id: "who",
      question: "Which organizations can use CBCT reporting support?",
      answer:
        "Organizations using cone beam CT across dental, maxillofacial, ENT, and related imaging applications.",
    },
    {
      id: "why",
      question: "Why can CBCT studies need specialized interpretation?",
      answer: "CBCT studies can require specialized interpretation depending on the anatomy and clinical application.",
    },
    {
      id: "routing",
      question: "How are CBCT studies routed?",
      answer:
        "After a study is received through secure transfer, it is routed appropriately for radiologist interpretation.",
    },
    {
      id: "delivery",
      question: "How are CBCT reports delivered?",
      answer: "A structured report is returned to your PACS/RIS.",
    },
  ],
} as const;

export const CBCT_CTA_CONTENT = {
  heading: "Need CBCT Reporting Support?",
  body: "Request a consultation to discuss your CBCT applications, study volumes, and reporting workflow.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
