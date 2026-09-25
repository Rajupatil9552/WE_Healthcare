import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import { STROKE_FAQ_CONTENT as FAQ, STROKE_FINAL_CTA_CONTENT as CTA } from "@/content/stroke-imaging-protocol";

export function StrokeFinalSection() {
  return (
    <>
      <FaqSection
        eyebrow={FAQ.eyebrow}
        heading={FAQ.heading}
        intro="Key operational, protocol alignment, and onboarding considerations for facility stroke imaging support."
        items={FAQ.items}
      />
      <ServiceCta
        eyebrow={CTA.eyebrow}
        heading={CTA.heading}
        body={CTA.body}
        primary={CTA.primaryCta}
        image={{ src: CTA.image, alt: CTA.alt }}
      />
    </>
  );
}

export default StrokeFinalSection;
