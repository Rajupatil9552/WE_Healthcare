import type { NavItem } from "@/types";

/**
 * Site-wide configuration.
 *
 * Routes below are sensible placeholders for pages that have not been
 * built yet (see project scope: navbar + hero only). Update `href`
 * values as real pages ship; nothing here should need to change shape.
 */
export const siteConfig = {
  name: "WE Healthcare",
  shortName: "WE Healthcare",
  description:
    "Premium US-based teleradiology services. Details pending content approval.",
  url: "https://www.wehealthcare.com", // placeholder - update on domain finalization
  locale: "en-US",
} as const;

export type SiteConfig = typeof siteConfig;

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Teleradiology",
        href: "/services/teleradiology",
        description: "Core remote-read coverage for hospitals and imaging centers.",
      },
      {
        label: "Subspecialty Reads",
        href: "/services/subspecialty-reads",
        description: "Board-certified subspecialists for complex studies.",
      },
      {
        label: "Emergency Reads",
        href: "/services/emergency-reads",
        description: "24/7/365 stat coverage with fast turnaround times.",
      },
      {
        label: "Overflow Coverage",
        href: "/services/overflow-coverage",
        description: "On-demand capacity for volume spikes and staffing gaps.",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Hospitals",
        href: "/solutions/hospitals",
        description: "Coverage models built around hospital call schedules.",
      },
      {
        label: "Imaging Centers",
        href: "/solutions/imaging-centers",
        description: "Dependable reads that keep outpatient volume moving.",
      },
      {
        label: "Radiology Groups",
        href: "/solutions/radiology-groups",
        description: "Extend your group's capacity without extending burnout.",
      },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    children: [
      {
        label: "PACS/RIS Integration",
        href: "/technology/pacs-ris-integration",
        description: "Connects to the systems you already run.",
      },
      {
        label: "Secure Reporting",
        href: "/technology/secure-reporting",
        description: "HIPAA-aligned reporting from study to signed report.",
      },
      {
        label: "AI-Enabled Workflow",
        href: "/technology/ai-enabled-workflow",
        description: "Triage and worklist tools that speed up radiologists.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Insights", href: "/resources/insights", description: "Perspectives from our radiology team." },
      { label: "Case Studies", href: "/resources/case-studies", description: "How partners use our coverage." },
      { label: "FAQs", href: "/resources/faqs", description: "Common questions about coverage and onboarding." },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const primaryCta = {
  label: "Request a Demo",
  href: "/request-a-demo",
};

export const secondaryHeroCta = {
  label: "Explore Our Services",
  href: "/services",
};
