const SITE_URL = "https://www.wehealthcare.com";

type FaqEntry = { question: string; answer: string };

/**
 * MedicalWebPage + FAQPage graph for a service (or modality) page. FAQ entries
 * come from the same content arrays the page renders, so the markup can't
 * drift from the UI.
 */
export function buildServiceJsonLd({
  section = "services",
  slug,
  name,
  description,
  specialties,
  faqs,
}: {
  /** Top-level route segment the page lives under. */
  section?: "services" | "modalities";
  slug: string;
  name: string;
  description: string;
  specialties: string[];
  faqs: readonly FaqEntry[];
}) {
  const url = `${SITE_URL}/${section}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        about: specialties.map((specialty) => ({ "@type": "MedicalSpecialty", name: specialty })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
