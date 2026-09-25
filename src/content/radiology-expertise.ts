import type { WorksWheelItem } from "@/components/ui/works-wheel";

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.
export interface RadiologySpecialtyItem extends WorksWheelItem {
  id: string;
  category: string;
  shortTitle: string;
  description: string;
}

export const RADIOLOGY_EXPERTISE_HEADER = {
  badge: "RADIOLOGY EXPERTISE",
  title: "Expertise Across Every Image.",
  description:
    "Explore the imaging specialties and clinical expertise that support healthcare teams across a wide range of diagnostic needs.",
  centerLabel: "Explore\nRadiology",
} as const;

export const RADIOLOGY_SPECIALTIES: RadiologySpecialtyItem[] = [
  {
    id: "neuroradiology",
    title: "Neuroradiology",
    shortTitle: "Neuroradiology",
    category: "Subspecialty Care",
    description:
      "Specialized interpretation for neurological and head & neck imaging studies.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
    href: "#modalities",
  },
  {
    id: "body-imaging",
    title: "Body Imaging",
    shortTitle: "Body Imaging",
    category: "Subspecialty Care",
    description:
      "Comprehensive expertise across a broad range of body imaging studies.",
    image: "/images/general/accuray-6pQPFuD7nJY-unsplash.jpg",
    href: "#modalities",
  },
  {
    id: "cardiothoracic",
    title: "Cardiothoracic Imaging",
    shortTitle: "Cardiothoracic",
    category: "Subspecialty Care",
    description:
      "Focused interpretation of chest and cardiovascular imaging.",
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1000&q=80",
    href: "#modalities",
  },
  {
    id: "musculoskeletal",
    title: "Musculoskeletal Imaging",
    shortTitle: "Musculoskeletal",
    category: "Subspecialty Care",
    description:
      "Expertise across bones, joints, muscles, and related structures.",
    image: "/images/general/accuray-nhZWIUJBVVc-unsplash.jpg",
    href: "#modalities",
  },
  {
    id: "emergency-radiology",
    title: "Emergency Radiology",
    shortTitle: "Emergency",
    category: "Acuity Care",
    description:
      "Radiology support for time-sensitive clinical imaging.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
    href: "#modalities",
  },
  {
    id: "abdominal-imaging",
    title: "Abdominal Imaging",
    shortTitle: "Abdominal",
    category: "Subspecialty Care",
    description:
      "Specialized diagnostic evaluation for abdominal and pelvic conditions.",
    image: "/images/general/accuray-eRJCXdb3Q48-unsplash.jpg",
    href: "#modalities",
  },
  {
    id: "mri",
    title: "MRI",
    shortTitle: "MRI",
    category: "Advanced Modality",
    description:
      "Detailed interpretation across a wide range of magnetic resonance imaging studies.",
    image: "/images/general/mri-poster.jpg",
    href: "#modalities",
  },
  {
    id: "ct-imaging",
    title: "CT Imaging",
    shortTitle: "CT",
    category: "Diagnostic Modality",
    description:
      "Diagnostic interpretation across diverse computed tomography studies.",
    image: "/images/general/accuray-36i9vuZrVjc-unsplash.jpg",
    href: "#modalities",
  },
  {
    id: "general-radiology",
    title: "General Radiology",
    shortTitle: "General Radiology",
    category: "Core Diagnostics",
    description:
      "Comprehensive routine diagnostic imaging support across everyday clinical needs.",
    image: "/images/general/national-cancer-institute-rUfUd-7WW78-unsplash.jpg",
    href: "#modalities",
  },
];
