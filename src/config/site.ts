import { routes } from "@/config/routes";

/**
 * Site-wide configuration. Navigation lives in `config/navigation.ts`,
 * URLs in `config/routes.ts`.
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

export const primaryCta = {
  label: "Request a Demo",
  href: routes.requestDemo,
};

export const secondaryHeroCta = {
  label: "Explore Our Services",
  href: routes.services,
};
