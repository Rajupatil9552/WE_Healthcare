import { Hero } from "@/components/sections/home/hero";
import { RadiologyExpertise } from "@/components/sections/home/radiology-expertise";
import { WhoWeServe } from "@/components/sections/home/who-we-serve";
import { TechnologyWorkflow } from "@/components/sections/home/technology-workflow";
import { ClinicalExpertise } from "@/components/sections/home/clinical-expertise";
import { HowPartnershipWorks } from "@/components/sections/home/how-partnership-works";
import { ClientTestimonials } from "@/components/sections/home/client-testimonials";


export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <RadiologyExpertise />
      <WhoWeServe />
      <TechnologyWorkflow />
      <ClinicalExpertise />
      <HowPartnershipWorks />
      <ClientTestimonials />
    </main>
  );
}
