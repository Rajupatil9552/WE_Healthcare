import type { NavLink, NavSection } from "@/types";
import { routes } from "@/config/routes";
import { services } from "@/content/services";
import { modalities, modalityCategories } from "@/content/modalities";
import { audiences } from "@/content/audiences";

/**
 * Single source of truth for site navigation. The header, the footer
 * sitemap and each hub page's sub-page list all read from here.
 */
export const mainNav: NavSection[] = [
  {
    id: "services",
    label: "Services",
    href: routes.services,
    items: services.map((s) => ({
      label: s.title,
      href: routes.service(s.slug),
      description: s.summary,
    })),
  },
  {
    id: "modalities",
    label: "Modalities",
    href: routes.modalities,
    groups: modalityCategories.map((category) => ({
      label: category,
      items: modalities
        .filter((m) => m.category === category)
        .map((m) => ({ label: m.title, href: routes.modality(m.slug) })),
    })),
  },
  {
    id: "who-we-serve",
    label: "Who We Serve",
    href: routes.whoWeServe,
    items: audiences.map((a) => ({ label: a.title, href: routes.audience(a.slug) })),
  },
  {
    id: "technology",
    label: "Technology & Security",
    href: routes.technology.index,
    items: [
      { label: "PACS & RIS Integration", href: routes.technology.pacsRisIntegration },
      { label: "DICOM Workflow", href: routes.technology.dicomWorkflow },
      { label: "Secure Image Transfer", href: routes.technology.secureImageTransfer },
      { label: "Security & Compliance", href: routes.technology.securityCompliance },
      { label: "Credentialing & Licensing", href: routes.technology.credentialingLicensing },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    href: routes.quality.index,
    items: [
      { label: "Our Radiologists", href: routes.quality.radiologists },
      { label: "Quality Control", href: routes.quality.qualityControl },
      { label: "Reporting Workflow", href: routes.quality.reportingWorkflow },
      { label: "Critical Findings", href: routes.quality.criticalFindings },
      { label: "Client Reporting & Analytics", href: routes.quality.clientReportingAnalytics },
      { label: "Operations Support", href: routes.quality.operationsSupport },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: routes.resources.index,
    items: [
      { label: "Insights", href: routes.resources.insights },
      { label: "Case Studies", href: routes.resources.caseStudies },
      { label: "FAQs", href: routes.resources.faqs },
      { label: "Teleradiology Resources", href: routes.resources.teleradiologyResources },
      { label: "Sample Report / Performance Report", href: routes.resources.sampleReports },
    ],
  },
  {
    id: "about",
    label: "About",
    href: routes.about.index,
    items: [
      { label: "About WE Healthcare", href: routes.about.index },
      { label: "Our Approach", href: routes.about.ourApproach },
      { label: "Leadership", href: routes.about.leadership },
      { label: "Contact", href: routes.contact },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: routes.legal.privacy },
  { label: "Terms of Service", href: routes.legal.terms },
  { label: "Cookie Policy", href: routes.legal.cookies },
];

export function getNavSection(id: string) {
  return mainNav.find((s) => s.id === id);
}

/** All links in a section, flattening groups. Used by hub pages. */
export function getNavSectionLinks(id: string): NavLink[] {
  const section = getNavSection(id);
  if (!section) return [];
  return section.groups ? section.groups.flatMap((g) => g.items) : (section.items ?? []);
}
