"use client";

import { SlidersHorizontal } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings} className={buttonVariants({ variant: "outline", size: "md" })}>
      <SlidersHorizontal size={16} weight="bold" aria-hidden="true" />
      Manage cookie settings
    </button>
  );
}
