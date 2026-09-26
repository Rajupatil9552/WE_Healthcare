/**
 * Content definition for the Nuclear Medicine modality page.
 * Route: /modalities/nuclear-medicine
 *
 * Copy follows the approved Nuclear Medicine Reporting Services content.
 * "Subspecialty-trained radiologists" is from the approved subheading.
 * [VERIFY: subspecialty-trained claim]
 * The acquisition labels (Planar, SPECT, Dynamic...), FAQ answers, and the
 * CTA heading/body are not part of the approved set. [VERIFY: labels, FAQ, CTA]
 *
 * Imagery (stored locally in /public/images/modalities/nuclear-medicine):
 * bone scan (CC BY-SA 4.0), thyroid (CC BY 3.0), cardiac perfusion
 * (CC BY 3.0), all from Wikimedia Commons with viewer text, dates, and R/L
 * markers removed. PET-CT and whole-body MIP imagery is shared with the
 * PET-CT page. The renogram is a drawn, illustrative curve. No PHI.
 */

import { routes } from "@/config/routes";

const IMG = "/images/modalities/nuclear-medicine";

export const NM_IMAGES = {
  boneAnterior: { src: `${IMG}/nm-bone-scan-anterior.webp`, alt: "Whole-body bone scan, anterior view", ratio: 248 / 834 },
  bonePosterior: { src: `${IMG}/nm-bone-scan-posterior.webp`, alt: "Whole-body bone scan, posterior view", ratio: 248 / 834 },
  thyroid: { src: `${IMG}/nm-thyroid-anterior.webp`, alt: "Thyroid scan, anterior view of both thyroid lobes", ratio: 452 / 430 },
  cardiac: {
    src: `${IMG}/nm-cardiac-perfusion-short-axis.webp`,
    alt: "Myocardial perfusion imaging: short-axis slices at stress (top row) and rest (bottom row)",
    ratio: 522 / 200,
  },
} as const;

export const NM_IMAGE_CREDITS = [
  { image: "Whole-body bone scan", author: "James Heilman, MD", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:NormalBoneScan.png" },
  { image: "Thyroid scan", author: "Myohan", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Thyroid_scan.jpg" },
  { image: "Myocardial perfusion", author: "Myohan", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Nl_mpi2.jpg" },
  { image: "PET-CT", author: "Myohan", license: "CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Nl_petct.jpg" },
  { image: "Whole-body MIP", author: "Jens Maus", license: "Public domain", href: "https://commons.wikimedia.org/wiki/File:PET-MIPS-anim.gif" },
] as const;

export const NM_PAGE_METADATA = {
  title: "Nuclear Medicine Reporting Services | WE Healthcare",
  description:
    "Nuclear medicine reporting support for hospitals and imaging centers, including PET-CT, bone scans, thyroid, cardiac perfusion, renal, and oncology studies.",
  canonical: routes.modality("nuclear-medicine"),
} as const;

export const NM_HERO_CONTENT = {
  eyebrow: "Modality · Nuclear Medicine",
  heading: "Nuclear Medicine Reporting Services",
  subheading: "Nuclear medicine reporting supported by subspecialty-trained radiologists.",
  body: "WE Healthcare provides remote nuclear medicine reporting support for hospitals, imaging centers, and healthcare networks managing nuclear medicine and hybrid imaging workloads.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;

export type NmStudyId = "pet-ct" | "bone" | "thyroid" | "cardiac" | "renal" | "oncology";

export const NM_STUDIES_CONTENT = {
  eyebrow: "Nuclear medicine reporting",
  heading: "Nuclear Medicine Reporting",
  body: "Nuclear medicine studies can require specialized interpretation and clinical correlation. The reporting workflow should support appropriate study routing, access to relevant priors where available, structured reporting, and established communication procedures.",
  /** The four workflow requirements named in the body, shown as a checklist. */
  requirements: ["Appropriate study routing", "Relevant priors, where available", "Structured reporting", "Established communication procedures"],
  studiesHeading: "Studies We Report",
  studies: [
    { id: "pet-ct", label: "PET-CT", acquisition: "Hybrid · PET/CT" },
    { id: "bone", label: "Bone Scan", acquisition: "Planar · Whole-body" },
    { id: "thyroid", label: "Thyroid Imaging", acquisition: "Planar" },
    { id: "cardiac", label: "Cardiac Perfusion", acquisition: "SPECT · Stress / Rest" },
    { id: "renal", label: "Renal Imaging", acquisition: "Dynamic" },
    { id: "oncology", label: "Oncology Staging", acquisition: "Whole-body" },
  ] satisfies { id: NmStudyId; label: string; acquisition: string }[],
};

export const NM_WORKFLOW_CONTENT = {
  eyebrow: "Nuclear medicine & hybrid imaging",
  subspecialtyHeading: "Subspecialty Expertise",
  subspecialties: [
    { id: "nm", label: "Nuclear Medicine" },
    { id: "body", label: "Body / Abdominal Imaging" },
    { id: "additional", label: "Additional subspecialty coverage" },
  ],
  workflowHeading: "How It Works",
  steps: [
    { id: "received", label: "Study received" },
    { id: "routing", label: "Nuclear medicine routing" },
    { id: "interpretation", label: "Radiologist interpretation" },
    { id: "report", label: "Structured report" },
    { id: "pacs", label: "PACS/RIS" },
  ],
} as const;

export const NM_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "Nuclear Medicine Reporting Questions",
  intro: "How remote nuclear medicine reporting works for hospitals, imaging centers, and healthcare networks.",
  items: [
    {
      id: "studies",
      question: "What nuclear medicine studies does WE Healthcare report?",
      answer: "WE Healthcare reports PET-CT, bone scans, thyroid imaging, cardiac perfusion, renal imaging, and oncology staging studies.",
    },
    {
      id: "subspecialties",
      question: "Which subspecialties support nuclear medicine reporting?",
      answer: "Nuclear medicine reporting is supported by nuclear medicine and body/abdominal imaging, with additional subspecialty coverage.",
    },
    {
      id: "priors",
      question: "Are prior studies used during interpretation?",
      answer:
        "The reporting workflow supports access to relevant priors where available, alongside clinical correlation.",
    },
    {
      id: "hybrid",
      question: "Can you support hybrid imaging workloads?",
      answer:
        "Yes. Remote reporting supports organizations managing nuclear medicine and hybrid imaging workloads, including PET-CT.",
    },
    {
      id: "routing",
      question: "How are nuclear medicine studies routed?",
      answer: "Once a study is received, it follows nuclear medicine routing to a radiologist for interpretation.",
    },
    {
      id: "delivery",
      question: "How are nuclear medicine reports delivered?",
      answer:
        "A structured report is returned to your PACS/RIS, with communication following established procedures.",
    },
  ],
} as const;

export const NM_CTA_CONTENT = {
  heading: "Need Additional Nuclear Medicine Reporting Support?",
  body: "Request a consultation to discuss your nuclear medicine study mix, hybrid imaging volumes, and reporting workflow.",
  primaryCta: { label: "Request a Consultation", href: routes.contact },
} as const;
