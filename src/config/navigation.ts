import type { NavLink, NavSection } from "@/types";
import { routes } from "@/config/routes";
import { services } from "@/content/services";
import { modalities, modalityCategories } from "@/content/modalities";

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
    // Single page: no dropdown. Audiences are sections on /who-we-serve.
    href: routes.whoWeServe,
  },
  {
    id: "technology",
    label: "Technology & Security",
    // Single page: no dropdown. Topics are sections on /technology-security.
    href: routes.technology.index,
  },
  {
    id: "quality",
    label: "Quality",
    // Single page: no dropdown. Topics are sections on /quality.
    href: routes.quality.index,
  },
  {
    id: "about",
    label: "About",
    href: routes.about.index,
    items: [
      { label: "About WE Healthcare", href: routes.about.index },
      { label: "Leadership", href: routes.about.leadership },
      { label: "Blog", href: routes.about.blog },
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

/** True when a section has a dropdown; single-page sections render as a plain link. */
export function hasSubmenu(section: NavSection) {
  return Boolean(section.groups?.length || section.items?.length);
}

/** All links in a section, flattening groups. Used by hub pages. */
export function getNavSectionLinks(id: string): NavLink[] {
  const section = getNavSection(id);
  if (!section) return [];
  return section.groups ? section.groups.flatMap((g) => g.items) : (section.items ?? []);
}
