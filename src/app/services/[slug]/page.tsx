import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { services, getService } from "@/content/services";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { TELERADIOLOGY_FAQ_ITEMS } from "@/content/teleradiology-reporting";
import { OVERNIGHT_FAQ_ITEMS } from "@/content/overnight-weekend-coverage";
import { OVERFLOW_FAQ_CONTENT } from "@/content/overflow-backlog-support";
import { EMERGENCY_FAQ_CONTENT } from "@/content/emergency-stat-reporting";
import { TeleradiologyHero } from "@/components/sections/services/teleradiology-reporting/hero";
import { OvernightHero } from "@/components/sections/services/overnight-weekend-coverage/hero";
import { OverflowHero } from "@/components/sections/services/overflow-backlog-reporting/hero";
import { EmergencyHero } from "@/components/sections/services/emergency-stat-reporting/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const ReportingSupportSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/reporting-support").then((m) => m.ReportingSupportSection));
const SubspecialtyCoverageSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/subspecialty-coverage").then((m) => m.SubspecialtyCoverageSection));
const ExistingWorkflowSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/existing-workflow").then((m) => m.ExistingWorkflowSection));
const WhatsIncludedSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/whats-included").then((m) => m.WhatsIncludedSection));
const HowItWorksSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/how-it-works").then((m) => m.HowItWorksSection));
const FAQSection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/faq").then((m) => m.FAQSection));
const FinalCTASection = dynamic(() => import("@/components/sections/services/teleradiology-reporting/final-cta").then((m) => m.FinalCTASection));
const CoverageNeedsSection = dynamic(() => import("@/components/sections/services/overnight-weekend-coverage/coverage-needs").then((m) => m.CoverageNeedsSection));
const CoverageTimelineSection = dynamic(() => import("@/components/sections/services/overnight-weekend-coverage/coverage-timeline").then((m) => m.CoverageTimelineSection));
const OvernightWhatsIncluded = dynamic(() => import("@/components/sections/services/overnight-weekend-coverage/whats-included").then((m) => m.WhatsIncludedSection));
const FAQCTASection = dynamic(() => import("@/components/sections/services/overnight-weekend-coverage/faq-cta").then((m) => m.FAQCTASection));
const BacklogTransformationSection = dynamic(() => import("@/components/sections/services/overflow-backlog-reporting/backlog-transformation").then((m) => m.BacklogTransformationSection));
const WhatsIncludedChallengeSection = dynamic(() => import("@/components/sections/services/overflow-backlog-reporting/whats-included-challenge").then((m) => m.WhatsIncludedChallengeSection));
const OverflowFAQCTA = dynamic(() => import("@/components/sections/services/overflow-backlog-reporting/faq-cta").then((m) => m.FAQCTASection));
const CommonUseCasesSection = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/common-use-cases").then((m) => m.CommonUseCasesSection));
const EmergencyHowItWorks = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/how-it-works").then((m) => m.HowItWorksSection));
const ServiceLevelsSection = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/service-levels").then((m) => m.ServiceLevelsSection));
const EmergencyFAQCTASection = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/faq-cta").then((m) => m.EmergencyFAQCTASection));
const StrokeProtocolWorkflowSection = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/stroke-protocol-workflow").then((m) => m.StrokeProtocolWorkflowSection));
const TraumaWorkflowSection = dynamic(() => import("@/components/sections/services/emergency-stat-reporting/trauma-workflow").then((m) => m.TraumaWorkflowSection));

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
      // Absolute: the title already carries the brand suffix.
      title: { absolute: "Teleradiology Services & Radiology Reporting | WE Healthcare" },
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
      // Absolute: the title already carries the brand suffix.
      title: { absolute: "Overnight & Weekend Teleradiology Coverage | WE Healthcare" },
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
      // Absolute: the title already carries the brand suffix.
      title: { absolute: "Radiology Overflow & Backlog Support | WE Healthcare" },
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
      // Absolute: the title already carries the brand suffix.
      title: { absolute: "Emergency & STAT Teleradiology Reporting | WE Healthcare" },
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
  specialties: ["Emergency Radiology", "Trauma Radiology", "Neuroradiology", "Diagnostic Radiology", "Teleradiology"],
  faqs: EMERGENCY_FAQ_CONTENT.items,
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
        <StrokeProtocolWorkflowSection />
        <TraumaWorkflowSection />
        <ServiceLevelsSection />
        <EmergencyFAQCTASection />
      </main>
    );
  }

  return <PagePlaceholder eyebrow="Service" title={entry.title} description={entry.summary} />;
}
