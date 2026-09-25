import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Security & Compliance",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Technology & Security" title="Security & Compliance" />;
}
