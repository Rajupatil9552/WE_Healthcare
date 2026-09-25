import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Legal" title="Privacy Policy" />;
}
