import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Critical Findings",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Critical Findings" />;
}
