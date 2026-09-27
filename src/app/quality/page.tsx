import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { QUALITY_FAQ, QUALITY_SEO as SEO } from "@/content/quality";
import { QualityHero } from "@/components/sections/quality/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const ExpertiseSection = dynamic(() => import("@/components/sections/quality/expertise").then((m) => m.ExpertiseSection));
const QualityControlSection = dynamic(() => import("@/components/sections/quality/quality-control").then((m) => m.QualityControlSection));
const ReportingWorkflowSection = dynamic(() => import("@/components/sections/quality/reporting-workflow").then((m) => m.ReportingWorkflowSection));
const CriticalFindingsSection = dynamic(() => import("@/components/sections/quality/critical-findings").then((m) => m.CriticalFindingsSection));
const ReportingVisibilitySection = dynamic(() => import("@/components/sections/quality/reporting-visibility").then((m) => m.ReportingVisibilitySection));
const OperationsSupportSection = dynamic(() => import("@/components/sections/quality/operations-support").then((m) => m.OperationsSupportSection));
const QualityFaq = dynamic(() => import("@/components/sections/quality/faq").then((m) => m.QualityFaq));
const QualityFinalCta = dynamic(() => import("@/components/sections/quality/final-cta").then((m) => m.QualityFinalCta));
const ContentsNav = dynamic(() => import("@/components/sections/quality/contents-nav").then((m) => m.ContentsNav));

export const metadata: Metadata = {
  // Absolute: the SEO title already carries the brand, so skip the layout template.
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: SEO.path },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.path,
    type: "website",
  },
};

const JSON_LD = buildServiceJsonLd({
  section: "quality",
  name: SEO.title,
  description: SEO.description,
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: QUALITY_FAQ,
});

/** Quality: one page, six sections (formerly separate sub-pages). */
export default function Page() {
  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <QualityHero />
      <ExpertiseSection />
      <QualityControlSection />
      <ReportingWorkflowSection />
      <CriticalFindingsSection />
      <ReportingVisibilitySection />
      <OperationsSupportSection />
      <QualityFaq />
      <QualityFinalCta />
      <ContentsNav />
    </main>
  );
}
