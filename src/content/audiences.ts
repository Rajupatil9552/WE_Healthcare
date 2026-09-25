import type { ContentEntry } from "@/types";

/** Drives the Who We Serve nav, footer, and `/who-we-serve/[slug]` pages. */
export const audiences: ContentEntry[] = [
  { slug: "hospitals-health-systems", title: "Hospitals & Health Systems" },
  { slug: "imaging-centers", title: "Imaging Centres" },
  { slug: "emergency-departments", title: "Emergency Departments" },
  { slug: "healthcare-networks", title: "Healthcare Networks" },
];

export function getAudience(slug: string) {
  return audiences.find((a) => a.slug === slug);
}
