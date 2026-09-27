/**
 * Every internal URL in the site. Import from here instead of hard-coding
 * paths so a renamed route only changes in one place.
 *
 * Detail pages for services and modalities are generated from
 * `src/content/*` via `[slug]` routes - use the helpers below for those.
 */
export const routes = {
  home: "/",

  services: "/services",
  service: (slug: string) => `/services/${slug}`,

  modalities: "/modalities",
  modality: (slug: string) => `/modalities/${slug}`,

  whoWeServe: "/who-we-serve",

  // One dynamic route serves every post: /blog/[slug] (see lib/blog).
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,

  // One integrated page; the former sub-pages are sections (see next.config redirects).
  technology: {
    index: "/technology-security",
    pacsRisIntegration: "/technology-security#pacs-ris-integration",
    dicomWorkflow: "/technology-security#dicom-workflow",
    secureImageTransfer: "/technology-security#secure-image-transfer",
    securityCompliance: "/technology-security#security-compliance",
  },

  // One integrated page; the former sub-pages are sections (see next.config redirects).
  quality: {
    index: "/quality",
    radiologists: "/quality#radiologists",
    qualityControl: "/quality#quality-control",
    reportingWorkflow: "/quality#reporting-workflow",
    criticalFindings: "/quality#critical-findings",
    reportingVisibility: "/quality#reporting-visibility",
    operationsSupport: "/quality#operations-support",
  },

  resources: {
    index: "/resources",
    insights: "/resources/insights",
    caseStudies: "/resources/case-studies",
    faqs: "/resources/faqs",
    teleradiologyResources: "/resources/teleradiology-resources",
    sampleReports: "/resources/sample-reports",
  },

  about: {
    index: "/about",
    ourApproach: "/about/our-approach",
    leadership: "/about/leadership",
    blog: "/blog",
  },

  contact: "/contact",
  // Demo requests use the contact form with the inquiry pre-selected.
  requestDemo: "/contact?inquiry=demo",

  legal: {
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookies",
  },
} as const;
