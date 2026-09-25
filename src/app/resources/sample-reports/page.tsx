import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Sample Report / Performance Report",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Resources" title="Sample Report / Performance Report" />;
}
