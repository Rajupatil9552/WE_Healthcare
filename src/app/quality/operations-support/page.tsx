import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Operations Support",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Operations Support" />;
}
