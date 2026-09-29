import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { CookieSettingsButton } from "@/components/sections/legal/cookie-settings-button";
import { cookiePolicy } from "@/content/legal";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description: cookiePolicy.description,
};

export default function Page() {
  return <LegalPage doc={cookiePolicy} href={routes.legal.cookies} action={<CookieSettingsButton />} />;
}
