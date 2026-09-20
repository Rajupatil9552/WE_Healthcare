/**
 * Shared, project-wide types. Kept minimal at scaffold stage - expand as
 * routes, components, and content models are added.
 */

export interface NavChildItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  /** Dropdown items shown under this top-level nav entry, if any. */
  children?: NavChildItem[];
}

export type ThemeMode = "light" | "dark" | "system";
