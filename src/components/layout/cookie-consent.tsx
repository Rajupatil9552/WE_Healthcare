"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cookie, X } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import {
  CONSENT_CATEGORIES,
  onOpenCookieSettings,
  saveConsent,
  useCookieConsent,
  type ConsentChoices,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

const ALL_ON: ConsentChoices = { analytics: true, marketing: true };
const ALL_OFF: ConsentChoices = { analytics: false, marketing: false };

/**
 * Cookie banner (Accept / Reject / Settings) shown until the visitor chooses,
 * plus the settings dialog, which the footer "Cookie Settings" link and the
 * Cookie Policy page can reopen at any time.
 */
export function CookieConsent() {
  const consent = useCookieConsent();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<ConsentChoices>(ALL_OFF);

  const openSettings = () => {
    // Start from the saved choice; nothing optional is pre-ticked.
    setDraft(consent ? { analytics: consent.analytics, marketing: consent.marketing } : ALL_OFF);
    dialogRef.current?.showModal();
  };

  // Re-bind when the saved choice changes so the dialog opens with it.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onOpenCookieSettings(openSettings), [consent]);

  const choose = (choices: ConsentChoices) => {
    saveConsent(choices);
    dialogRef.current?.close();
  };

  // undefined = still hydrating; don't flash the banner at visitors who already chose.
  const showBanner = consent === null;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.section
            aria-label="Cookie consent"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
          >
            <div className="rounded-2xl border border-border bg-card/95 p-5 text-foreground shadow-2xl backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Cookie size={20} weight="duotone" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">We use cookies</h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-foreground-muted">
                    We use strictly necessary cookies to run this site. With your permission, we also use analytics and
                    marketing cookies to understand how the site is used and to measure our campaigns. See our{" "}
                    <Link href={routes.legal.cookies} className="font-medium text-primary underline underline-offset-2">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={openSettings}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "col-span-2 sm:mr-auto")}
                >
                  Settings
                </button>
                <button type="button" onClick={() => choose(ALL_OFF)} className={buttonVariants({ variant: "outline", size: "sm" })}>
                  Reject all
                </button>
                <button type="button" onClick={() => choose(ALL_ON)} className={buttonVariants({ variant: "primary", size: "sm" })}>
                  Accept all
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 id="cookie-settings-title" className="text-lg font-semibold tracking-tight">
              Cookie settings
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              Choose which optional cookies we may use. You can change this at any time.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close cookie settings"
            className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-full text-foreground-muted hover:bg-surface-muted hover:text-foreground"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <ul className="divide-y divide-border px-6">
          {CONSENT_CATEGORIES.map((c) => {
            const checked = c.required ? true : draft[c.id as keyof ConsentChoices];
            const inputId = `cookie-${c.id}`;
            return (
              <li key={c.id} className="flex items-start justify-between gap-4 py-4">
                <label htmlFor={inputId} className="min-w-0 flex-1 cursor-pointer">
                  <span className="block text-sm font-semibold">
                    {c.label}
                    {c.required && <span className="ml-2 text-xs font-normal text-foreground-subtle">Always on</span>}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-foreground-muted">{c.description}</span>
                </label>
                <input
                  id={inputId}
                  type="checkbox"
                  role="switch"
                  checked={checked}
                  disabled={c.required}
                  onChange={(e) => setDraft((d) => ({ ...d, [c.id]: e.target.checked }))}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  aria-hidden="true"
                  className={cn(
                    "relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                    checked ? "bg-primary" : "bg-border-strong",
                    c.required && "cursor-not-allowed opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform",
                      checked && "translate-x-5"
                    )}
                  />
                </label>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => choose(ALL_OFF)} className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Reject all
          </button>
          <button type="button" onClick={() => choose(draft)} className={buttonVariants({ variant: "outline", size: "sm" })}>
            Save choices
          </button>
          <button type="button" onClick={() => choose(ALL_ON)} className={buttonVariants({ variant: "primary", size: "sm" })}>
            Accept all
          </button>
        </div>
      </dialog>
    </>
  );
}
