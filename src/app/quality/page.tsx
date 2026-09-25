import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Quality",
  description: "How we keep reads accurate, consistent and on time.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Quality"}
      description={"How we keep reads accurate, consistent and on time."}
      links={getNavSectionLinks("quality")}
    />
  );
}
