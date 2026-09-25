import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Secure Image Transfer",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Technology & Security" title="Secure Image Transfer" />;
}
