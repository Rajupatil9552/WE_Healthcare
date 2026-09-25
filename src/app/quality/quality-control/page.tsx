import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Quality Control",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Quality Control" />;
}
