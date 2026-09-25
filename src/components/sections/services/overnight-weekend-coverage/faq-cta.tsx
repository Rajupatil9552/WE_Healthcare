import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import { OVERNIGHT_FAQ_ITEMS } from "@/content/overnight-weekend-coverage";

export function FAQCTASection() {
  return (
    <>
      <FaqSection
        eyebrow="Frequently asked questions"
        heading="Overnight & Weekend Coverage FAQs"
        intro="Common operational and clinical questions regarding our off-hours radiology reporting support."
        items={OVERNIGHT_FAQ_ITEMS}
      />
      <ServiceCta
        eyebrow="Off-hours clinical partnership"
        heading="Extend Your Radiology Coverage"
        body="Tell us about your radiology coverage needs."
        bullets={[
          "U.S. board-certified, fellowship-trained radiologists",
          "Seamless PACS/RIS interoperability with zero technologist retraining",
          "Customizable shifts for night, weekend, holiday, and surge support",
        ]}
        primary={{ label: "Request a Consultation", href: "/contact" }}
        image={{
          src: "/images/overnight-weekend-coverage/final-cta-radiology.jpg",
          alt: "Clinical radiology reading room and hospital leadership consultation at dusk",
        }}
      />
    </>
  );
}

export default FAQCTASection;
