import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Resources",
  description: "Insights, case studies, FAQs and sample reports.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title={"Resources"}
      description={"Insights, case studies, FAQs and sample reports."}
      links={[
        { label: "Insights", href: routes.resources.insights },
        { label: "Case Studies", href: routes.resources.caseStudies },
        { label: "FAQs", href: routes.resources.faqs },
        { label: "Teleradiology Resources", href: routes.resources.teleradiologyResources },
        { label: "Sample Report / Performance Report", href: routes.resources.sampleReports },
      ]}
    />
  );
}
