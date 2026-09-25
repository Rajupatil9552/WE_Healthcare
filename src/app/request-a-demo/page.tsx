import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Request a Demo",
};

export default function Page() {
  return <PagePlaceholder title="Request a Demo" />;
}
