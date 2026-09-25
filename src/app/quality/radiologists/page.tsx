import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Our Radiologists",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Our Radiologists" />;
}
