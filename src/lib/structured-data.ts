export const SITE_URL = "https://www.wehealthcare.com";

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
  section?: "services" | "modalities" | "who-we-serve" | "technology-security" | "quality";
  /** Omit for a top-level page such as /who-we-serve. */
  slug?: string;
  name: string;
  description: string;
  specialties: string[];
  faqs: readonly FaqEntry[];
}) {
  const url = slug ? `${SITE_URL}/${section}/${slug}` : `${SITE_URL}/${section}`;
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

/** BlogPosting for a single post page. */
export function buildBlogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  cover: { src: string };
  author: { name: string };
  publishedAt: string;
  updatedAt?: string;
  category: { name: string };
  tags: string[];
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.excerpt,
    image: post.cover.src.startsWith("http") ? post.cover.src : `${SITE_URL}${post.cover.src}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.category.name,
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: post.author.name },
    publisher: { "@type": "Organization", name: "WE Healthcare", url: SITE_URL },
  };
}
