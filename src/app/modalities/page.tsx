import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Modalities",
  description: "Imaging modalities we read and report.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Modalities"}
      description={"Imaging modalities we read and report."}
      links={getNavSectionLinks("modalities")}
    />
  );
}
