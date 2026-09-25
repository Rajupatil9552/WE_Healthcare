/**
 * Shared, project-wide types. Expand as routes, components, and content
 * models are added.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

/** A labelled cluster of links inside one dropdown (e.g. "Diagnostic Imaging"). */
export interface NavGroup {
  label: string;
  items: NavLink[];
}

/** One top-level navbar entry. Uses either flat `items` or grouped `groups`. */
export interface NavSection {
  id: string;
  label: string;
  href: string;
  items?: NavLink[];
  groups?: NavGroup[];
}

/** Content entry for a page generated from a `[slug]` route. */
export interface ContentEntry {
  slug: string;
  title: string;
  summary?: string;
}

export type ThemeMode = "light" | "dark" | "system";
