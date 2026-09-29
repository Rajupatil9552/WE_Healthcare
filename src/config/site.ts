import { routes } from "@/config/routes";

/**
 * Site-wide configuration. Navigation lives in `config/navigation.ts`,
 * URLs in `config/routes.ts`.
 */
export const siteConfig = {
  name: "WE Healthcare",
  shortName: "WE Healthcare",
  /** Home page <title> (and the default for pages without their own). */
  title:
    "Teleradiology Services for US Hospitals | ABR-Certified Radiologists | WE Healthcare",
  description:
    "24x7 teleradiology reporting for US hospitals, imaging centers and emergency departments. ABR-certified final reads, PACS/RIS integration, HIPAA BAA available.",
  url: "https://www.wehealthcare.com", // placeholder - update on domain finalization
  locale: "en-US",
} as const;

export type SiteConfig = typeof siteConfig;

export const primaryCta = {
  label: "Request a Demo",
  href: routes.requestDemo,
};

/** Navbar CTA (desktop and mobile menu). */
export const headerCta = {
  label: "Contact Us",
  href: routes.contact,
};

export const secondaryHeroCta = {
  label: "Explore Our Services",
  href: routes.services,
};
