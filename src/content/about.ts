import { routes } from "@/config/routes";

/** About WE Healthcare (/about): single-page content, one export per section. */

export const ABOUT_SEO = {
  title: "About WE Healthcare | Teleradiology & Healthcare Support",
  description:
    "Learn about WE Healthcare, our teleradiology expertise, healthcare support services, operational approach, and management team.",
  path: routes.about.index,
} as const;

export const ABOUT_HERO = {
  eyebrow: "About WE Healthcare",
  body: "Teleradiology reporting for hospitals, imaging centers and emergency departments across the United States, built around the way you already work.",
  primaryCta: { label: "Contact Us", href: routes.contact },
  secondaryCta: { label: "Learn More", href: "#our-commitment" },
  image: {
    src: "/images/overnight-weekend-coverage/night-radiology-reading-room.webp",
    alt: "Radiologists reviewing studies at diagnostic workstations in a reading room",
  },
} as const;

export const OUR_COMMITMENT = {
  eyebrow: "Our Commitment",
  lead: "We aim to be a dependable extension of your team",
  rest: " rather than a distant vendor.",
  body: "That means clear communication, agreed turnaround expectations, and support structured around the way your organization actually needs us to work.",
  pillars: ["Clear communication", "Agreed turnaround expectations", "Support structured around you"],
} as const;

export const WHO_WE_ARE = {
  eyebrow: "Who We Are",
  heading: "We Start With How Your Organization Actually Operates",
  paragraphs: [
    "WE Healthcare is a teleradiology partner for healthcare organizations that need dependable reporting capacity. U.S.-based ABR-certified radiologists sign final reports, supported by Indian Board-Certified radiologists for preliminary reads. Our approach starts with understanding how your organization actually operates, then building a coverage model around your workflow, reporting requirements, and operational needs.",
    "We work with organizations across the United States and internationally, helping organizations manage changing imaging volumes, coverage requirements, and existing technology environments.",
  ],
  cta: { label: "Contact Us", href: routes.contact },
  image: {
    src: "/images/overflow-backlog-reporting/radiologist-workstation.webp",
    alt: "Radiologist reviewing chest CT images on a dual-monitor workstation",
  },
  facts: [
    { label: "Reach", value: "United States & International" },
    { label: "Core Service", value: "Teleradiology Reporting" },
  ],
} as const;

export type AboutService = {
  id: string;
  title: string;
  body: string;
  href?: string;
};

/** Lead message of the page: teleradiology only. */
export const WHAT_WE_DO = {
  eyebrow: "What We Do",
  heading: "Teleradiology Reporting, Built Around Your Workflow",
  body: "Our core service is remote radiology reporting for hospitals, imaging centers, physician groups and emergency departments, from a few hours of overflow each week to full 24x7 coverage.",
  services: [
    {
      id: "teleradiology-reporting",
      title: "Teleradiology Reporting",
      body: "Routine and subspecialty reads inside your existing PACS and RIS, returned in your report format.",
      href: routes.service("teleradiology-reporting"),
    },
    {
      id: "overnight-weekend-coverage",
      title: "Overnight & Weekend Coverage",
      body: "Nighthawk, weekend and holiday shifts, booked on their own or together.",
      href: routes.service("overnight-weekend-coverage"),
    },
    {
      id: "overflow-backlog-support",
      title: "Overflow & Backlog Support",
      body: "Extra reading capacity for daily peaks, seasonal surges or a backlog that has built up.",
      href: routes.service("overflow-backlog-support"),
    },
    {
      id: "emergency-stat-reporting",
      title: "Emergency / STAT Reporting",
      body: "Time-sensitive studies read first, with critical findings phoned directly to the ordering physician.",
      href: routes.service("emergency-stat-reporting"),
    },
    {
      id: "stroke-imaging-protocol",
      title: "Stroke Imaging Protocol",
      body: "Stroke CT, CTA and perfusion studies read as STAT, following your stroke protocol.",
      href: routes.service("stroke-imaging-protocol"),
    },
    {
      id: "trauma-critical-care",
      title: "Trauma & Critical Care",
      body: "Trauma CT and X-ray read as STAT, with findings phoned directly to the trauma team.",
      href: routes.service("trauma-critical-care"),
    },
  ] satisfies AboutService[],
} as const;

/** Secondary services: shown lower on the page, with less weight than teleradiology. */
export const ADDITIONAL_SUPPORT = {
  eyebrow: "Additional Support",
  heading: "Beyond Teleradiology",
  body: "Alongside radiology reporting, we also offer healthcare support in two related areas.",
  services: [
    {
      id: "revenue-cycle",
      title: "Revenue Cycle & AR Support",
      body: "Healthcare support services focused on revenue cycle and accounts receivable workflows.",
    },
    {
      id: "staffing",
      title: "Additional Staffing Support",
      body: "Additional healthcare staffing support structured around approved operational requirements.",
    },
  ] satisfies AboutService[],
  cta: { label: "Ask About Additional Support", href: routes.contact },
} as const;

export const HOW_WE_WORK = {
  eyebrow: "How We Work",
  heading: "Every Engagement Starts With a Conversation",
  body: "Every engagement begins with a conversation about your current volume, staffing gaps, and operational requirements. From there, we develop a support model built around your specific needs rather than applying a one-size-fits-all approach.",
  steps: [
    { title: "Understand", body: "Understand your current workflow and requirements" },
    { title: "Define", body: "Define the appropriate support model and coverage" },
    { title: "Align", body: "Align reporting, communication, and operational processes" },
    { title: "Support", body: "Provide ongoing support as your requirements change" },
  ],
} as const;

export const COVERAGE_MODEL = {
  eyebrow: "Coverage Model",
  heading: "A Coverage Model Built Around Your Operations",
  body: "Whether the need is a broader coverage model, overflow support, after-hours reporting, or additional operational capacity, WE Healthcare can structure support around your organization's requirements.",
  factors: [
    "Coverage and staffing needs",
    "Reporting volume and workload",
    "Existing imaging and technology environment",
    "Communication and escalation requirements",
    "Changing operational demands",
  ],
  cta: { label: "Contact Us", href: routes.contact },
  image: {
    src: "/images/overnight-weekend-coverage/overnight-radiology-workstation.webp",
    alt: "",
  },
} as const;
