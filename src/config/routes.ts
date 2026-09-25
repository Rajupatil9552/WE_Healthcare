/**
 * Every internal URL in the site. Import from here instead of hard-coding
 * paths so a renamed route only changes in one place.
 *
 * Detail pages for services, modalities and audiences are generated from
 * `src/content/*` via `[slug]` routes - use the helpers below for those.
 */
export const routes = {
  home: "/",

  services: "/services",
  service: (slug: string) => `/services/${slug}`,

  modalities: "/modalities",
  modality: (slug: string) => `/modalities/${slug}`,

  whoWeServe: "/who-we-serve",
  audience: (slug: string) => `/who-we-serve/${slug}`,

  technology: {
    index: "/technology",
    pacsRisIntegration: "/technology/pacs-ris-integration",
    dicomWorkflow: "/technology/dicom-workflow",
    secureImageTransfer: "/technology/secure-image-transfer",
    securityCompliance: "/technology/security-compliance",
    credentialingLicensing: "/technology/credentialing-licensing",
  },

  quality: {
    index: "/quality",
    radiologists: "/quality/radiologists",
    qualityControl: "/quality/quality-control",
    reportingWorkflow: "/quality/reporting-workflow",
    criticalFindings: "/quality/critical-findings",
    clientReportingAnalytics: "/quality/client-reporting-analytics",
    operationsSupport: "/quality/operations-support",
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
  },

  contact: "/contact",
  requestDemo: "/request-a-demo",

  legal: {
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/cookies",
  },
} as const;
