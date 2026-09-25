import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Teleradiology Resources",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Resources" title="Teleradiology Resources" />;
}
