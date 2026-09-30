import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import { SPINAL_CTA_CONTENT as CTA, SPINAL_FAQ_CONTENT as FAQ, SPINE_IMAGES } from "@/content/spinal-annotation";

/** Closing sections, as on every service page: shared FAQ accordion, then the consultation band. */
export function SpinalFaqCtaSection() {
  return (
    <>
      <FaqSection eyebrow={FAQ.eyebrow} heading={FAQ.heading} intro={FAQ.intro} items={FAQ.items} />
      <ServiceCta
        heading={CTA.heading}
        body={CTA.body}
        primary={CTA.primaryCta}
        image={{ src: SPINE_IMAGES.lumbarMri.src, alt: SPINE_IMAGES.lumbarMri.alt }}
      />
    </>
  );
}

export default SpinalFaqCtaSection;
