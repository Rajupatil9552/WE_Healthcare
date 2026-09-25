import { ServiceCta } from "@/components/sections/services/shared/service-cta";

export function FinalCTASection() {
  return (
    <ServiceCta
      eyebrow="Ready to discuss your radiology workflow?"
      heading="Tell us about your reporting needs."
      body="Tell us about your radiology coverage needs."
      bullets={[
        "U.S. board-certified, state-licensed fellowship radiologists",
        "Bi-directional PACS/RIS integration with zero technologist retraining",
        "Custom coverage windows for 24/7, nights, weekends, and volume surges",
      ]}
      primary={{ label: "Request a Consultation", href: "/contact" }}
      secondary={{ label: "Contact Our Team", href: "/contact" }}
      image={{
        src: "/images/teleradiology-reporting/final-cta-radiology.jpg",
        alt: "Clinical radiology reading room and hospital leadership consultation at dusk",
      }}
    />
  );
}

export default FinalCTASection;
