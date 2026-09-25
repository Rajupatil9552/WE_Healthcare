import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Legal" title="Terms of Service" />;
}
