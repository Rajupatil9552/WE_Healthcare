import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { termsOfService } from "@/content/legal";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
};

export default function Page() {
  return <LegalPage doc={termsOfService} href={routes.legal.terms} />;
}
