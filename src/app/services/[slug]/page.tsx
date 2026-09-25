import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { services, getService } from "@/content/services";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { TELERADIOLOGY_FAQ_ITEMS } from "@/content/teleradiology-reporting";
import { OVERNIGHT_FAQ_ITEMS } from "@/content/overnight-weekend-coverage";
import { OVERFLOW_FAQ_CONTENT } from "@/content/overflow-backlog-support";
import { EMERGENCY_FAQ_CONTENT } from "@/content/emergency-stat-reporting";
import { STROKE_FAQ_CONTENT } from "@/content/stroke-imaging-protocol";
import { TRAUMA_FAQ_CONTENT } from "@/content/trauma-critical-care";
import { TeleradiologyHero } from "@/components/sections/services/teleradiology-reporting/hero";
import { ReportingSupportSection } from "@/components/sections/services/teleradiology-reporting/reporting-support";
import { SubspecialtyCoverageSection } from "@/components/sections/services/teleradiology-reporting/subspecialty-coverage";
import { ExistingWorkflowSection } from "@/components/sections/services/teleradiology-reporting/existing-workflow";
import { WhatsIncludedSection } from "@/components/sections/services/teleradiology-reporting/whats-included";
import { HowItWorksSection } from "@/components/sections/services/teleradiology-reporting/how-it-works";
import { FAQSection } from "@/components/sections/services/teleradiology-reporting/faq";
import { FinalCTASection } from "@/components/sections/services/teleradiology-reporting/final-cta";
import { OvernightHero } from "@/components/sections/services/overnight-weekend-coverage/hero";
import { CoverageNeedsSection } from "@/components/sections/services/overnight-weekend-coverage/coverage-needs";
import { CoverageTimelineSection } from "@/components/sections/services/overnight-weekend-coverage/coverage-timeline";
import { WhatsIncludedSection as OvernightWhatsIncluded } from "@/components/sections/services/overnight-weekend-coverage/whats-included";
import { FAQCTASection } from "@/components/sections/services/overnight-weekend-coverage/faq-cta";
import { OverflowHero } from "@/components/sections/services/overflow-backlog-reporting/hero";
import { BacklogTransformationSection } from "@/components/sections/services/overflow-backlog-reporting/backlog-transformation";
import { WhatsIncludedChallengeSection } from "@/components/sections/services/overflow-backlog-reporting/whats-included-challenge";
import { FAQCTASection as OverflowFAQCTA } from "@/components/sections/services/overflow-backlog-reporting/faq-cta";
import { EmergencyHero } from "@/components/sections/services/emergency-stat-reporting/hero";
import { CommonUseCasesSection } from "@/components/sections/services/emergency-stat-reporting/common-use-cases";
import { HowItWorksSection as EmergencyHowItWorks } from "@/components/sections/services/emergency-stat-reporting/how-it-works";
import { ServiceLevelsSection } from "@/components/sections/services/emergency-stat-reporting/service-levels";
import { EmergencyFAQCTASection } from "@/components/sections/services/emergency-stat-reporting/faq-cta";
import { StrokeHero } from "@/components/sections/services/stroke-imaging-protocol/hero";
import { BuiltAroundWorkflowSection } from "@/components/sections/services/stroke-imaging-protocol/built-around-workflow";
import { StrokeProtocolWorkflowSection } from "@/components/sections/services/stroke-imaging-protocol/stroke-protocol-workflow";
import { StrokeFinalSection } from "@/components/sections/services/stroke-imaging-protocol/final-section";
import { TraumaHero } from "@/components/sections/services/trauma-critical-care/hero";
import { HighPressureEnvironmentsSection } from "@/components/sections/services/trauma-critical-care/high-pressure-environments";
import { NeedsAndIncludedSection } from "@/components/sections/services/trauma-critical-care/needs-and-included";
import { HowItWorksSection as TraumaHowItWorks } from "@/components/sections/services/trauma-critical-care/how-it-works";
import { FAQAndCTASection } from "@/components/sections/services/trauma-critical-care/faq-and-cta";

type Props = { params: Promise<{ slug: string }> };

// Only slugs listed in content/services.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "teleradiology-reporting") {
    return {
      title: "Teleradiology Services & Radiology Reporting | WE Healthcare",
      description:
        "Subspecialty teleradiology reporting support for U.S. hospitals, imaging centers, emergency departments, and healthcare networks.",
      alternates: {
        canonical: "/services/teleradiology-reporting",
      },
      openGraph: {
        title: "Teleradiology Services & Radiology Reporting | WE Healthcare",
        description:
          "Subspecialty teleradiology reporting support for U.S. hospitals, imaging centers, emergency departments, and healthcare networks.",
        url: "/services/teleradiology-reporting",
        type: "website",
      },
    };
  }
  if (slug === "overnight-weekend-coverage") {
    return {
      title: "Overnight & Weekend Teleradiology Coverage | WE Healthcare",
      description:
        "Extend radiology reporting coverage beyond regular business hours with flexible overnight and weekend support for U.S. healthcare organizations.",
      alternates: {
        canonical: "/services/overnight-weekend-coverage",
      },
      openGraph: {
        title: "Overnight & Weekend Teleradiology Coverage | WE Healthcare",
        description:
          "Extend radiology reporting coverage beyond regular business hours with flexible overnight and weekend support for U.S. healthcare organizations.",
        url: "/services/overnight-weekend-coverage",
        type: "website",
      },
    };
  }
  if (slug === "overflow-backlog-support") {
    return {
      title: "Radiology Overflow & Backlog Support | WE Healthcare",
      description:
        "Flexible teleradiology support for imaging volume spikes, reporting backlogs, staffing gaps, and temporary radiology capacity constraints.",
      alternates: {
        canonical: "/services/overflow-backlog-support",
      },
      openGraph: {
        title: "Radiology Overflow & Backlog Support | WE Healthcare",
        description:
          "Flexible teleradiology support for imaging volume spikes, reporting backlogs, staffing gaps, and temporary radiology capacity constraints.",
        url: "/services/overflow-backlog-support",
        type: "website",
      },
    };
  }
  if (slug === "emergency-stat-reporting") {
    return {
      title: "Emergency & STAT Teleradiology Reporting | WE Healthcare",
      description:
        "Priority teleradiology reporting support for emergency departments, trauma studies, inpatient escalations, and time-sensitive imaging.",
      alternates: {
        canonical: "/services/emergency-stat-reporting",
      },
      openGraph: {
        title: "Emergency & STAT Teleradiology Reporting | WE Healthcare",
        description:
          "Priority teleradiology reporting support for emergency departments, trauma studies, inpatient escalations, and time-sensitive imaging.",
        url: "/services/emergency-stat-reporting",
        type: "website",
      },
    };
  }
  if (slug === "stroke-imaging-protocol") {
    return {
      title: "Stroke Imaging Teleradiology Support | WE Healthcare",
      description:
        "Teleradiology support for stroke imaging workflows, including priority routing, radiologist assignment, and defined communication processes.",
      alternates: {
        canonical: "/services/stroke-imaging-protocol",
      },
      openGraph: {
        title: "Stroke Imaging Teleradiology Support | WE Healthcare",
        description:
          "Teleradiology support for stroke imaging workflows, including priority routing, radiologist assignment, and defined communication processes.",
        url: "/services/stroke-imaging-protocol",
        type: "website",
      },
    };
  }
  if (slug === "trauma-critical-care") {
    return {
      title: "Trauma & Critical Care Teleradiology | WE Healthcare",
      description:
        "Priority radiology reporting support for trauma and critical care imaging, including multi-study workflows and direct clinical communication.",
      alternates: {
        canonical: "/services/trauma-critical-care",
      },
      openGraph: {
        title: "Trauma & Critical Care Teleradiology | WE Healthcare",
        description:
          "Priority radiology reporting support for trauma and critical care imaging, including multi-study workflows and direct clinical communication.",
        url: "/services/trauma-critical-care",
        type: "website",
      },
    };
  }
  const entry = getService(slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

const TELERADIOLOGY_JSON_LD = buildServiceJsonLd({
  slug: "teleradiology-reporting",
  name: "Teleradiology Services & Radiology Reporting | WE Healthcare",
  description:
    "Subspecialty teleradiology reporting support for U.S. hospitals, imaging centers, emergency departments, and healthcare networks.",
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: TELERADIOLOGY_FAQ_ITEMS,
});

const OVERNIGHT_JSON_LD = buildServiceJsonLd({
  slug: "overnight-weekend-coverage",
  name: "Overnight & Weekend Teleradiology Coverage | WE Healthcare",
  description:
    "Extend radiology reporting coverage beyond regular business hours with flexible overnight and weekend support for U.S. healthcare organizations.",
  specialties: ["Diagnostic Radiology", "Emergency Radiology", "Teleradiology"],
  faqs: OVERNIGHT_FAQ_ITEMS,
});

const OVERFLOW_JSON_LD = buildServiceJsonLd({
  slug: "overflow-backlog-support",
  name: "Radiology Overflow & Backlog Support | WE Healthcare",
  description:
    "Flexible teleradiology support for imaging volume spikes, reporting backlogs, staffing gaps, and temporary radiology capacity constraints.",
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: OVERFLOW_FAQ_CONTENT,
});

const EMERGENCY_JSON_LD = buildServiceJsonLd({
  slug: "emergency-stat-reporting",
  name: "Emergency & STAT Teleradiology Reporting | WE Healthcare",
  description:
    "Priority teleradiology reporting support for emergency departments, trauma studies, inpatient escalations, and time-sensitive imaging.",
  specialties: ["Emergency Radiology", "Diagnostic Radiology", "Teleradiology"],
  faqs: EMERGENCY_FAQ_CONTENT.items,
});

const STROKE_JSON_LD = buildServiceJsonLd({
  slug: "stroke-imaging-protocol",
  name: "Stroke Imaging Teleradiology Support | WE Healthcare",
  description:
    "Teleradiology support for stroke imaging workflows, including priority routing, radiologist assignment, and defined communication processes.",
  specialties: ["Diagnostic Radiology", "Neuroradiology", "Teleradiology"],
  faqs: STROKE_FAQ_CONTENT.items,
});

const TRAUMA_JSON_LD = buildServiceJsonLd({
  slug: "trauma-critical-care",
  name: "Trauma & Critical Care Teleradiology | WE Healthcare",
  description:
    "Priority radiology reporting support for trauma and critical care imaging, including multi-study workflows and direct clinical communication.",
  specialties: ["Trauma Radiology", "Emergency Radiology", "Diagnostic Radiology", "Teleradiology"],
  faqs: TRAUMA_FAQ_CONTENT.items,
});

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) notFound();

  if (slug === "teleradiology-reporting") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(TELERADIOLOGY_JSON_LD) }}
        />
        <TeleradiologyHero />
        <ReportingSupportSection />
        <SubspecialtyCoverageSection />
        <ExistingWorkflowSection />
        <WhatsIncludedSection />
        <HowItWorksSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    );
  }

  if (slug === "overnight-weekend-coverage") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OVERNIGHT_JSON_LD) }}
        />
        <OvernightHero />
        <CoverageNeedsSection />
        <CoverageTimelineSection />
        <OvernightWhatsIncluded />
        <FAQCTASection />
      </main>
    );
  }

  if (slug === "overflow-backlog-support") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OVERFLOW_JSON_LD) }}
        />
        <OverflowHero />
        <BacklogTransformationSection />
        <WhatsIncludedChallengeSection />
        <OverflowFAQCTA />
      </main>
    );
  }

  if (slug === "emergency-stat-reporting") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EMERGENCY_JSON_LD) }}
        />
        <EmergencyHero />
        <CommonUseCasesSection />
        <EmergencyHowItWorks />
        <ServiceLevelsSection />
        <EmergencyFAQCTASection />
      </main>
    );
  }

  if (slug === "stroke-imaging-protocol") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STROKE_JSON_LD) }}
        />
        <StrokeHero />
        <BuiltAroundWorkflowSection />
        <StrokeProtocolWorkflowSection />
        <StrokeFinalSection />
      </main>
    );
  }

  if (slug === "trauma-critical-care") {
    return (
      <main className="services-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(TRAUMA_JSON_LD) }}
        />
        <TraumaHero />
        <HighPressureEnvironmentsSection />
        <NeedsAndIncludedSection />
        <TraumaHowItWorks />
        <FAQAndCTASection />
      </main>
    );
  }

  return <PagePlaceholder eyebrow="Service" title={entry.title} description={entry.summary} />;
}
