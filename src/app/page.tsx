import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const RadiologyExpertise = dynamic(() => import("@/components/sections/home/radiology-expertise").then((m) => m.RadiologyExpertise));
const WhoWeServe = dynamic(() => import("@/components/sections/home/who-we-serve").then((m) => m.WhoWeServe));
const TechnologyWorkflow = dynamic(() => import("@/components/sections/home/technology-workflow").then((m) => m.TechnologyWorkflow));
const ClinicalExpertise = dynamic(() => import("@/components/sections/home/clinical-expertise").then((m) => m.ClinicalExpertise));
const HowPartnershipWorks = dynamic(() => import("@/components/sections/home/how-partnership-works").then((m) => m.HowPartnershipWorks));
const ClientTestimonials = dynamic(() => import("@/components/sections/home/client-testimonials").then((m) => m.ClientTestimonials));
const LatestInsights = dynamic(() => import("@/components/sections/home/latest-insights").then((m) => m.LatestInsights));

// The blog teaser reads posts; refresh at most every 5 minutes (matches /blog).
export const revalidate = 300;

export default function Home() {
  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <Hero />
      <RadiologyExpertise />
      <WhoWeServe />
      <TechnologyWorkflow />
      <ClinicalExpertise />
      <HowPartnershipWorks />
      <ClientTestimonials />
      <LatestInsights />
    </main>
  );
}
