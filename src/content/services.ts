import type { ContentEntry } from "@/types";

/** Drives the Services nav, footer, and `/services/[slug]` pages. */
export const services: ContentEntry[] = [
  {
    slug: "teleradiology-reporting",
    title: "Teleradiology Reporting",
    summary: "24/7/365 remote reading for health facilities.",
  },
  {
    slug: "overnight-weekend-coverage",
    title: "Overnight & Weekend Coverage",
    summary: "Seamless off-hours and holiday diagnostics.",
  },
  {
    slug: "overflow-backlog-support",
    title: "Overflow & Backlog Support",
    summary: "Rapid capacity scaling for volume spikes.",
  },
  {
    slug: "emergency-stat-reporting",
    title: "Emergency / STAT Reporting",
    summary: "Priority reads for time-sensitive cases, 24x7.",
  },
  {
    slug: "stroke-imaging-protocol",
    title: "Stroke Imaging Protocol",
    summary: "Accelerated neurovascular and perfusion reads.",
  },
  {
    slug: "trauma-critical-care",
    title: "Trauma & Critical Care",
    summary: "High-acuity emergency radiology coverage.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
