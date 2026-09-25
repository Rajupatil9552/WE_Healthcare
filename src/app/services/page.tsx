import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Services",
  description: "Teleradiology services for health facilities of every size.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Services"}
      description={"Teleradiology services for health facilities of every size."}
      links={getNavSectionLinks("services")}
    />
  );
}
