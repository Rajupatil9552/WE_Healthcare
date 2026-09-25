import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Client Reporting & Analytics",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Quality" title="Client Reporting & Analytics" />;
}
