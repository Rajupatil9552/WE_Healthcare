import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Reporting Workflow",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Reporting Workflow" />;
}
