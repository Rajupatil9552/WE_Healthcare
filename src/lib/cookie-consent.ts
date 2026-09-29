/**
 * Cookie consent store. The visitor's choice lives in one first-party cookie
 * so it survives reloads and can be read before any optional tag loads.
 *
 * Optional tools (analytics, LinkedIn Insight Tag) must only load when
 * `useCookieConsent()` reports their category as granted. Bump
 * CONSENT_VERSION when the Cookie Policy's tool list changes materially,
 * so visitors are asked again.
 */

import { useSyncExternalStore } from "react";

export const CONSENT_COOKIE = "we_cookie_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 180;
const OPEN_SETTINGS_EVENT = "we:open-cookie-settings";

export type OptionalCategory = "analytics" | "marketing";

export type ConsentChoices = Record<OptionalCategory, boolean>;

export type ConsentRecord = ConsentChoices & {
  version: number;
  /** ISO timestamp of the choice, kept as a record of consent. */
  updatedAt: string;
};

export const CONSENT_CATEGORIES: {
  id: "necessary" | OptionalCategory;
  label: string;
  description: string;
  required?: boolean;
}[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    description: "Needed for the site to work and to remember your cookie choices. These are always on.",
    required: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how visitors use the site so we can improve it. Data is aggregated.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Let us measure the effect of our LinkedIn campaigns and show relevant ads on LinkedIn.",
  },
];

const listeners = new Set<() => void>();
let cached: { raw: string | null; value: ConsentRecord | null } = { raw: null, value: null };
/** Used only when the browser refuses to store the cookie. */
let inMemory: string | null = null;

function readRaw(): string | null {
  try {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    return match ? decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)) : inMemory;
  } catch {
    return inMemory;
  }
}

function parse(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<ConsentRecord>;
    if (v.version !== CONSENT_VERSION) return null;
    return {
      version: v.version,
      analytics: v.analytics === true,
      marketing: v.marketing === true,
      updatedAt: String(v.updatedAt ?? ""),
    };
  } catch {
    return null;
  }
}

/** Current consent, or null if the visitor has not chosen yet (or the policy version changed). */
export function getConsent(): ConsentRecord | null {
  const raw = readRaw();
  // Same reference while unchanged, as useSyncExternalStore requires.
  if (raw !== cached.raw) cached = { raw, value: parse(raw) };
  return cached.value;
}

export function saveConsent(choices: ConsentChoices) {
  const record: ConsentRecord = { ...choices, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Max-Age=${
      MAX_AGE_DAYS * 86400
    }; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookies blocked: the choice still applies until the page is reloaded.
  }
  inMemory = JSON.stringify(record);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Consent state for components. `undefined` during server render and
 * hydration, `null` once we know no choice has been made.
 */
export function useCookieConsent(): ConsentRecord | null | undefined {
  return useSyncExternalStore(subscribe, getConsent, () => undefined);
}

/** Opens the settings dialog from anywhere (footer link, Cookie Policy page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, handler);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
}
