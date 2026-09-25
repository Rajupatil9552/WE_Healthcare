import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "FAQs",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Resources" title="FAQs" />;
}
