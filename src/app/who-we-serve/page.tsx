import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { WHO_WE_SERVE_FAQ, WHO_WE_SERVE_SEO as SEO } from "@/content/who-we-serve";
import { WhoWeServeHero } from "@/components/sections/who-we-serve/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const WhoWeSupport = dynamic(() => import("@/components/sections/who-we-serve/who-we-support").then((m) => m.WhoWeSupport));
const HospitalsSection = dynamic(() => import("@/components/sections/who-we-serve/hospitals").then((m) => m.HospitalsSection));
const ImagingCentersSection = dynamic(() => import("@/components/sections/who-we-serve/imaging-centers").then((m) => m.ImagingCentersSection));
const HealthcareNetworksSection = dynamic(() => import("@/components/sections/who-we-serve/healthcare-networks").then((m) => m.HealthcareNetworksSection));
const EmergencySupport = dynamic(() => import("@/components/sections/who-we-serve/emergency-support").then((m) => m.EmergencySupport));
const WorkflowPipeline = dynamic(() => import("@/components/sections/who-we-serve/workflow-pipeline").then((m) => m.WorkflowPipeline));
const ModalitiesMarquee = dynamic(() => import("@/components/sections/who-we-serve/modalities-marquee").then((m) => m.ModalitiesMarquee));
const WhyTeleradiology = dynamic(() => import("@/components/sections/who-we-serve/why-teleradiology").then((m) => m.WhyTeleradiology));
const WhoWeServeFaq = dynamic(() => import("@/components/sections/who-we-serve/faq").then((m) => m.WhoWeServeFaq));
const WhoWeServeFinalCta = dynamic(() => import("@/components/sections/who-we-serve/final-cta").then((m) => m.WhoWeServeFinalCta));

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
  section: "who-we-serve",
  name: SEO.title,
  description: SEO.description,
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: WHO_WE_SERVE_FAQ,
});

export default function Page() {
  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <WhoWeServeHero />
      {/* One section per audience; the homepage cards link to each by hash. */}
      <WhoWeSupport>
        <HospitalsSection />
        <ImagingCentersSection />
        <HealthcareNetworksSection />
        <EmergencySupport />
      </WhoWeSupport>
      <WorkflowPipeline />
      <ModalitiesMarquee />
      <WhyTeleradiology />
      <WhoWeServeFaq />
      <WhoWeServeFinalCta />
    </main>
  );
}
