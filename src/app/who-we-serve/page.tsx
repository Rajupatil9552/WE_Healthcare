import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Who We Serve",
  description: "Radiology support for hospitals, imaging centres, emergency departments and networks.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Who We Serve"}
      description={"Radiology support for hospitals, imaging centres, emergency departments and networks."}
      links={getNavSectionLinks("who-we-serve")}
    />
  );
}
