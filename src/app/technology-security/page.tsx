import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { TECH_FAQ, TECH_SEO as SEO } from "@/content/technology-security";
import { TechHero } from "@/components/sections/technology-security/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const ChapterLayout = dynamic(() => import("@/components/sections/technology-security/chapter-layout").then((m) => m.ChapterLayout));
const PacsRisChapter = dynamic(() => import("@/components/sections/technology-security/pacs-ris").then((m) => m.PacsRisChapter));
const DicomWorkflowChapter = dynamic(() => import("@/components/sections/technology-security/dicom-workflow").then((m) => m.DicomWorkflowChapter));
const SecureTransferChapter = dynamic(() => import("@/components/sections/technology-security/secure-transfer").then((m) => m.SecureTransferChapter));
const SecurityComplianceChapter = dynamic(() => import("@/components/sections/technology-security/security-compliance").then((m) => m.SecurityComplianceChapter));
const ReportDelivery = dynamic(() => import("@/components/sections/technology-security/report-delivery").then((m) => m.ReportDelivery));
const ImagingWorkflow = dynamic(() => import("@/components/sections/technology-security/imaging-workflow").then((m) => m.ImagingWorkflow));
const TechFaq = dynamic(() => import("@/components/sections/technology-security/faq").then((m) => m.TechFaq));
const TechFinalCta = dynamic(() => import("@/components/sections/technology-security/final-cta").then((m) => m.TechFinalCta));

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
  section: "technology-security",
  name: SEO.title,
  description: SEO.description,
  specialties: ["Teleradiology", "Diagnostic Radiology"],
  faqs: TECH_FAQ,
});

export default function Page() {
  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <TechHero />
      {/* One page, four chapters (formerly separate sub-pages), told as one study's journey */}
      <ChapterLayout>
        <PacsRisChapter />
        <DicomWorkflowChapter />
        <SecureTransferChapter />
        <SecurityComplianceChapter />
        <ReportDelivery />
      </ChapterLayout>
      <ImagingWorkflow />
      <TechFaq />
      <TechFinalCta />
    </main>
  );
}
