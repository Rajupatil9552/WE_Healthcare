import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import { OVERFLOW_FAQ_CONTENT, OVERFLOW_FINAL_CTA_CONTENT as CTA } from "@/content/overflow-backlog-support";

export function FAQCTASection() {
  return (
    <>
      <FaqSection
        eyebrow="Frequently asked questions"
        heading="Overflow & Backlog Reporting FAQs"
        intro="Clear answers regarding capacity scaling, workflow integration, case prioritization, and critical notification."
        items={OVERFLOW_FAQ_CONTENT}
      />
      <ServiceCta
        eyebrow={CTA.eyebrow}
        heading={CTA.heading}
        body={CTA.subheading}
        bullets={CTA.bulletPoints}
        primary={CTA.primaryBtn}
        secondary={CTA.secondaryBtn}
        image={{ src: CTA.image, alt: CTA.alt }}
      />
    </>
  );
}

export default FAQCTASection;
