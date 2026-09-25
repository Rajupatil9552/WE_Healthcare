import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Leadership",
};

export default function Page() {
  return <PagePlaceholder eyebrow="About" title="Leadership" />;
}
