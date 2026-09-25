import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { getNavSectionLinks } from "@/config/navigation";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "About WE Healthcare",
  description: "Who we are, how we work, and the people behind it.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"About WE Healthcare"}
      description={"Who we are, how we work, and the people behind it."}
      links={getNavSectionLinks("about").filter((l) => l.href !== routes.about.index)}
    />
  );
}
