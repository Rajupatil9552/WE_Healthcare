import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { TELERADIOLOGY_FAQ_ITEMS } from "@/content/teleradiology-reporting";

export function FAQSection() {
  return (
    <FaqSection
      heading="Frequently Asked Questions"
      intro="Common operational and clinical questions regarding our teleradiology reporting services."
      items={TELERADIOLOGY_FAQ_ITEMS}
    />
  );
}

export default FAQSection;
