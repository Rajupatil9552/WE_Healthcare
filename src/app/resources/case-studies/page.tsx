import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Resources" title="Case Studies" />;
}
