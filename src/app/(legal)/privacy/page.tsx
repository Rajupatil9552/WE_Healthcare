import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { privacyPolicy } from "@/content/legal";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
};

export default function Page() {
  return <LegalPage doc={privacyPolicy} href={routes.legal.privacy} />;
}
