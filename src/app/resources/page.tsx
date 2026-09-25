import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Resources",
  description: "Insights, case studies, FAQs and sample reports.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Resources"}
      description={"Insights, case studies, FAQs and sample reports."}
      links={getNavSectionLinks("resources")}
    />
  );
}
