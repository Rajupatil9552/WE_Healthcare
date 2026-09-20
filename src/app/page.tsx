import { Hero } from "@/components/sections/hero";
import { TrustCredibility } from "@/components/sections/trust-credibility";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { TechnologyWorkflow } from "@/components/sections/technology-workflow";
import { ClinicalExpertise } from "@/components/sections/clinical-expertise";
import { HowPartnershipWorks } from "@/components/sections/how-partnership-works";
import { ClientTestimonials } from "@/components/sections/client-testimonials";
import { Footer } from "@/components/sections/footer";

/**
 * Homepage layout.
 * 1. Hero Section (Airlock scroll-scrub)
 * 2. Section 02: Trust & Credibility
 * 3. Section 03: Who We Serve (Audience Carousel)
 * 4. Section 04: Technology & Workflow (5-Step Visual Process)
 * 5. Section 05: Clinical Expertise & Quality (Editorial Split Layout)
 * 6. Section 06: How Partnership Works (4-Step Partnership Journey)
 * 7. Section 07: Client Stories & Testimonials (Spacious Single-Slide Carousel)
 * 8. Section 08: Premium Footer & Final CTA
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <TrustCredibility />
      <WhoWeServe />
      <TechnologyWorkflow />
      <ClinicalExpertise />
      <HowPartnershipWorks />
      <ClientTestimonials />
      <Footer />
    </main>
  );
}
