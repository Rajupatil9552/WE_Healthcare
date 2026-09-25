import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import { TRAUMA_FAQ_CONTENT as FAQ, TRAUMA_FINAL_CTA_CONTENT as CTA } from "@/content/trauma-critical-care";

export function FAQAndCTASection() {
  return (
    <>
      <FaqSection
        eyebrow={FAQ.eyebrow}
        heading={FAQ.heading}
        intro="Key operational, coverage model, and clinical escalation details for trauma and critical care radiology support."
        items={FAQ.items}
      />
      <ServiceCta
        eyebrow={CTA.eyebrow}
        heading={CTA.heading}
        body={CTA.body}
        bullets={["Facility-Aligned Protocols", "Direct Trauma Outreach", "Non-Disruptive Integration"]}
        primary={CTA.primaryCta}
        image={{ src: CTA.image, alt: CTA.alt }}
      />
    </>
  );
}

export default FAQAndCTASection;
