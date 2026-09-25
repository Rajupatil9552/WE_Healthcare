import type { ContentEntry } from "@/types";

export type ModalityCategory =
  | "Diagnostic Imaging"
  | "Advanced Imaging"
  | "Specialized Services";

export interface Modality extends ContentEntry {
  category: ModalityCategory;
}

/** Drives the Modalities nav, footer, and `/modalities/[slug]` pages. */
export const modalities: Modality[] = [
  { slug: "x-ray", title: "X-Ray", category: "Diagnostic Imaging" },
  { slug: "ct", title: "CT", category: "Diagnostic Imaging" },
  { slug: "mri", title: "MRI", category: "Diagnostic Imaging" },
  { slug: "ultrasound", title: "Ultrasound", category: "Diagnostic Imaging" },
  { slug: "pet-ct", title: "PET-CT", category: "Diagnostic Imaging" },
  { slug: "cbct", title: "CBCT", category: "Advanced Imaging" },
  { slug: "nuclear-medicine", title: "Nuclear Medicine", category: "Advanced Imaging" },
  { slug: "spinal-annotation", title: "Spinal Annotation", category: "Specialized Services" },
];

/** Display order of categories in menus. */
export const modalityCategories: ModalityCategory[] = [
  "Diagnostic Imaging",
  "Advanced Imaging",
  "Specialized Services",
];

export function getModality(slug: string) {
  return modalities.find((m) => m.slug === slug);
}
