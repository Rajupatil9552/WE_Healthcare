import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Technology & Security",
  description: "Integration, workflow and security behind our reads.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Technology & Security"}
      description={"Integration, workflow and security behind our reads."}
      links={getNavSectionLinks("technology")}
    />
  );
}
