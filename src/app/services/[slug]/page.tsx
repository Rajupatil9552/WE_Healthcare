import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { services, getService } from "@/content/services";
import { TeleradiologyHero } from "@/components/sections/services/teleradiology-reporting/hero";
import { ReportingSupportSection } from "@/components/sections/services/teleradiology-reporting/reporting-support";
import { SubspecialtyCoverageSection } from "@/components/sections/services/teleradiology-reporting/subspecialty-coverage";
import { ExistingWorkflowSection } from "@/components/sections/services/teleradiology-reporting/existing-workflow";
import { WhatsIncludedSection } from "@/components/sections/services/teleradiology-reporting/whats-included";
import { HowItWorksSection } from "@/components/sections/services/teleradiology-reporting/how-it-works";
import { CriticalFindingsSection } from "@/components/sections/services/teleradiology-reporting/critical-findings";
import { ReportingVisibilitySection } from "@/components/sections/services/teleradiology-reporting/reporting-visibility";
import { WhoWeSupportSection } from "@/components/sections/services/teleradiology-reporting/who-we-support";
import { FAQSection } from "@/components/sections/services/teleradiology-reporting/faq";
import { FinalCTASection } from "@/components/sections/services/teleradiology-reporting/final-cta";
import { OvernightHero } from "@/components/sections/services/overnight-weekend-coverage/hero";
import { CoverageNeedsSection } from "@/components/sections/services/overnight-weekend-coverage/coverage-needs";
import { CoverageTimelineSection } from "@/components/sections/services/overnight-weekend-coverage/coverage-timeline";
import { WhatsIncludedSection as OvernightWhatsIncluded } from "@/components/sections/services/overnight-weekend-coverage/whats-included";
import { CriticalFindingsTermsSection } from "@/components/sections/services/overnight-weekend-coverage/critical-findings-terms";
import { FAQCTASection } from "@/components/sections/services/overnight-weekend-coverage/faq-cta";
import { OverflowHero } from "@/components/sections/services/overflow-backlog-reporting/hero";
import { WhenWorklistGrowsSection } from "@/components/sections/services/overflow-backlog-reporting/when-worklist-grows";
import { CommonTriggersSection } from "@/components/sections/services/overflow-backlog-reporting/common-triggers";
import { BacklogTransformationSection } from "@/components/sections/services/overflow-backlog-reporting/backlog-transformation";
import { WhatsIncludedChallengeSection } from "@/components/sections/services/overflow-backlog-reporting/whats-included-challenge";
import { ReportingVisibilitySection as OverflowReportingVisibility } from "@/components/sections/services/overflow-backlog-reporting/reporting-visibility";
import { FAQCTASection as OverflowFAQCTA } from "@/components/sections/services/overflow-backlog-reporting/faq-cta";
import { EmergencyHero } from "@/components/sections/services/emergency-stat-reporting/hero";
import { WhenEveryStudyMattersSection } from "@/components/sections/services/emergency-stat-reporting/when-every-study-matters";
import { CommonUseCasesSection } from "@/components/sections/services/emergency-stat-reporting/common-use-cases";
import { HowItWorksSection as EmergencyHowItWorks } from "@/components/sections/services/emergency-stat-reporting/how-it-works";
import { CriticalFindingsProtocolSection } from "@/components/sections/services/emergency-stat-reporting/critical-findings-protocol";
import { ServiceLevelsSection } from "@/components/sections/services/emergency-stat-reporting/service-levels";
import { EmergencyFAQCTASection } from "@/components/sections/services/emergency-stat-reporting/faq-cta";
import { StrokeHero } from "@/components/sections/services/stroke-imaging-protocol/hero";
import { BuiltAroundWorkflowSection } from "@/components/sections/services/stroke-imaging-protocol/built-around-workflow";
import { OperationalNeedsSection } from "@/components/sections/services/stroke-imaging-protocol/operational-needs";
import { StrokeProtocolWorkflowSection } from "@/components/sections/services/stroke-imaging-protocol/stroke-protocol-workflow";
import { WhatsIncludedSection as StrokeWhatsIncluded } from "@/components/sections/services/stroke-imaging-protocol/whats-included";
import { StrokeFinalSection } from "@/components/sections/services/stroke-imaging-protocol/final-section";
import { TraumaHero } from "@/components/sections/services/trauma-critical-care/hero";
import { HighPressureEnvironmentsSection } from "@/components/sections/services/trauma-critical-care/high-pressure-environments";
import { NeedsAndIncludedSection } from "@/components/sections/services/trauma-critical-care/needs-and-included";
import { HowItWorksSection as TraumaHowItWorks } from "@/components/sections/services/trauma-critical-care/how-it-works";
import { ProtocolAndCriticalSection } from "@/components/sections/services/trauma-critical-care/protocol-and-critical";
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

const TELERADIOLOGY_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/teleradiology-reporting#webpage",
      url: "https://www.wehealthcare.com/services/teleradiology-reporting",
      name: "Teleradiology Services & Radiology Reporting | WE Healthcare",
      description:
        "Subspecialty teleradiology reporting support for U.S. hospitals, imaging centers, emergency departments, and healthcare networks.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/teleradiology-reporting#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who can use teleradiology reporting support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WE Healthcare provides teleradiology reporting support for hospitals, health systems, outpatient imaging centers, emergency departments, urgent care centers, and independent radiology groups across the United States seeking reliable diagnostic capacity.",
          },
        },
        {
          "@type": "Question",
          name: "How does WE Healthcare connect with an existing PACS or RIS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We establish secure, bidirectional connections with your facility's existing PACS, RIS, and EHR systems using standard DICOM and HL7 protocols over encrypted TLS 1.3 VPN tunnels or lightweight virtual appliances. Your technologists maintain their normal scanning workflow with no disruptive proprietary software required.",
          },
        },
        {
          "@type": "Question",
          name: "Can reporting support be used for overflow or after-hours coverage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our reporting models are fully customizable around your operational needs—including dedicated overnight shifts, weekend call coverage, holiday relief, scheduled daytime overflow surges, or secondary subspecialty consultations with no punitive minimum volume mandates.",
          },
        },
        {
          "@type": "Question",
          name: "How are studies routed to radiologists?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Studies are ingested into our intelligent clinical worklist and automatically routed according to modality, clinical acuity (STAT vs. routine), facility bylaws, and state medical licensing, ensuring each case is interpreted by an appropriately credentialed, board-certified radiologist.",
          },
        },
        {
          "@type": "Question",
          name: "How are critical findings communicated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When unexpected or acute critical findings are identified, our radiologist or 24/7 clinical coordination desk immediately initiates direct telephone contact with the referring physician or clinical care team. A closed-loop timestamped read-back confirmation is documented directly in the diagnostic report.",
          },
        },
        {
          "@type": "Question",
          name: "Which modalities are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We support all major diagnostic imaging modalities, including Magnetic Resonance Imaging (MRI), Computed Tomography (CT), Diagnostic Ultrasound, Digital Radiography (X-Ray), and Mammography across neuroradiology, musculoskeletal, body/abdominal, pediatric, and emergency subspecialties.",
          },
        },
        {
          "@type": "Question",
          name: "What information is needed to start an engagement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To initiate discovery, our team reviews your facility's estimated study volumes, modality breakdown, desired coverage windows, medical staff credentialing bylaws, and local PACS/RIS integration endpoints to design a seamless operational workflow.",
          },
        },
      ],
    },
  ],
};

const OVERNIGHT_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/overnight-weekend-coverage#webpage",
      url: "https://www.wehealthcare.com/services/overnight-weekend-coverage",
      name: "Overnight & Weekend Teleradiology Coverage | WE Healthcare",
      description:
        "Extend radiology reporting coverage beyond regular business hours with flexible overnight and weekend support for U.S. healthcare organizations.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Emergency Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/overnight-weekend-coverage#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you provide overnight radiology coverage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WE Healthcare provides dedicated overnight teleradiology coverage for hospitals, health systems, outpatient imaging centers, and emergency departments across the United States. Radiologists interpret routine, acute, and emergency studies during off-hours to prevent overnight backlog.",
          },
        },
        {
          "@type": "Question",
          name: "Can weekend coverage be scheduled separately?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Coverage models are modular and flexible. You can engage our reporting team specifically for weekend coverage—including Saturday and Sunday shifts, holiday weekends, or partial weekend blocks—without requiring a full weekday contract.",
          },
        },
        {
          "@type": "Question",
          name: "Can overnight coverage support emergency departments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our overnight coverage is structured to support high-acuity emergency department imaging. Emergency studies flagged as STAT receive immediate priority routing, expedited interpretation, and direct clinical escalation for acute findings.",
          },
        },
        {
          "@type": "Question",
          name: "How are studies handed over between teams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Studies transition automatically via standard DICOM and HL7 connections established with your local PACS and RIS. At the beginning of the coverage window, pending studies and new orders route directly to our worklist. At morning shift handoff, completed reports and a shift summary are returned to your in-house team.",
          },
        },
        {
          "@type": "Question",
          name: "How are urgent or critical findings escalated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When critical or unexpected acute pathology is identified, our radiologist or clinical coordination desk directly initiates telephone contact with the ordering physician or emergency department care team, securing verbal confirmation and documenting a verified read-back in the EHR.",
          },
        },
        {
          "@type": "Question",
          name: "Can coverage be temporary or ongoing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We support both temporary engagements (such as interim coverage for radiologist leave, vacancies, seasonal surges, or system migrations) as well as standing, long-term 24/7/365 coverage partnerships.",
          },
        },
      ],
    },
  ],
};

const OVERFLOW_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/overflow-backlog-support#webpage",
      url: "https://www.wehealthcare.com/services/overflow-backlog-support",
      name: "Radiology Overflow & Backlog Support | WE Healthcare",
      description:
        "Flexible teleradiology support for imaging volume spikes, reporting backlogs, staffing gaps, and temporary radiology capacity constraints.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/overflow-backlog-support#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is overflow and backlog reporting support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Overflow and backlog reporting support provides supplemental teleradiology reading capacity when your imaging volume exceeds your in-house radiologist team's bandwidth. Whether caused by volume spikes, staffing gaps, or seasonal surges, our board-certified radiologists interpret studies to restore normal turnaround.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can overflow support be activated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For existing partners with pre-configured PACS/RIS connectivity and credentialed radiologists, overflow capacity can be mobilized on short notice. For new engagements, our onboarding team coordinates connectivity, credentialing, and workflow alignment to initiate reading as rapidly as institutional governance allows.",
          },
        },
        {
          "@type": "Question",
          name: "How are studies prioritized and routed during volume spikes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Studies are ingested into an organized triage queue and stratified by clinical priority (STAT, urgent, routine) and modality (CT, MRI, X-ray, Ultrasound). Emergent cases receive immediate priority attention, while routine outpatient studies are batched for focused subspecialty review.",
          },
        },
        {
          "@type": "Question",
          name: "Does our facility need to change its current PACS or RIS workflow?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We connect directly to your existing PACS and RIS infrastructure via standard DICOM and HL7 protocols over secure encrypted connections. Your technologists acquire and send scans normally, and completed reports return directly into your diagnostic system.",
          },
        },
        {
          "@type": "Question",
          name: "How are critical and urgent findings communicated during backlog reads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All critical or unexpected acute findings trigger an immediate closed-loop notification protocol. Our radiologist or clinical coordination team contacts the referring clinician directly by telephone and documents a verified read-back in the official diagnostic report.",
          },
        },
        {
          "@type": "Question",
          name: "Can backlog reporting support be scheduled on a temporary or ad-hoc basis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Engagements can be structured for short-term backlog clearing (such as post-holiday queue reductions or locum tenens coverage) as well as ongoing flexible surge support that activates whenever your internal thresholds are reached.",
          },
        },
      ],
    },
  ],
};

const EMERGENCY_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/emergency-stat-reporting#webpage",
      url: "https://www.wehealthcare.com/services/emergency-stat-reporting",
      name: "Emergency & STAT Teleradiology Reporting | WE Healthcare",
      description:
        "Priority teleradiology reporting support for emergency departments, trauma studies, inpatient escalations, and time-sensitive imaging.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Emergency Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/emergency-stat-reporting#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is STAT radiology reporting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "STAT radiology reporting refers to a priority workflow designed specifically for time-sensitive imaging studies. When high clinical urgency or acute trauma presentation is identified, the study is flagged upon transmission and immediately routed ahead of routine reporting queues for expedited diagnostic interpretation.",
          },
        },
        {
          "@type": "Question",
          name: "Can emergency departments use teleradiology support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Emergency departments and acute-care environments frequently utilize teleradiology support when imaging volume, patient acuity, after-hours nocturnal demand, or local staffing constraints increase. Workflows are configured to align seamlessly with existing hospital RIS, PACS, and departmental bylaws.",
          },
        },
        {
          "@type": "Question",
          name: "How are STAT studies prioritized?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Priority categories and routing rules are configured around the facility's specific operational and clinical requirements. Studies tagged with acute HL7/DICOM priority parameters bypass routine worklists and automatically match to credentialed, subspecialty-trained diagnostic radiologists on active duty.",
          },
        },
        {
          "@type": "Question",
          name: "How are critical findings communicated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Critical or unexpected findings follow the facility's agreed clinical escalation pathway. The interpreting radiologist or 24/7 coordination team initiates direct telephone outreach to the treating emergency physician or designated clinical team, and a closed-loop verbal read-back confirmation is documented directly in the EHR.",
          },
        },
        {
          "@type": "Question",
          name: "Can the service support after-hours emergency imaging?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Emergency and after-hours coverage can be configured based on your organization's specific operational needs. Support models can be established for dedicated overnight shifts, weekend call coverage, holiday relief, daytime volume surge absorption, or continuous coverage windows.",
          },
        },
        {
          "@type": "Question",
          name: "What turnaround commitments are available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Turnaround commitments are formally agreed upon and codified as part of the service-level configuration prior to operational launch. Commitments are established collaboratively based on clinical urgency, modality complexity, historical volume patterns, and departmental benchmarks.",
          },
        },
      ],
    },
  ],
};

const STROKE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/stroke-imaging-protocol#webpage",
      url: "https://www.wehealthcare.com/services/stroke-imaging-protocol",
      name: "Stroke Imaging Teleradiology Support | WE Healthcare",
      description:
        "Teleradiology support for stroke imaging workflows, including priority routing, radiologist assignment, and defined communication processes.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Neuroradiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/stroke-imaging-protocol#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can teleradiology support stroke imaging workflows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stroke imaging workflows can be supported through defined study routing, radiologist assignment, communication, and documentation processes aligned with the facility’s requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How are stroke studies prioritized?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stroke-related studies can be handled through defined priority rules established as part of the facility’s workflow.",
          },
        },
        {
          "@type": "Question",
          name: "How is the radiologist assigned?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Radiologist assignment can follow defined workflow and subspecialty requirements established for the facility.",
          },
        },
        {
          "@type": "Question",
          name: "How are urgent findings communicated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Time-sensitive or critical findings follow the facility-established communication and documentation pathway.",
          },
        },
        {
          "@type": "Question",
          name: "Can the workflow align with existing facility protocols?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The workflow can be designed around the facility’s existing clinical pathway and operational requirements, subject to capability and implementation verification.",
          },
        },
        {
          "@type": "Question",
          name: "What information is required during onboarding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The implementation process may require information about the facility’s existing workflow, imaging routing, priority requirements, communication process, documentation requirements, and operational expectations.",
          },
        },
      ],
    },
  ],
};

const TRAUMA_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.wehealthcare.com/services/trauma-critical-care#webpage",
      url: "https://www.wehealthcare.com/services/trauma-critical-care",
      name: "Trauma & Critical Care Teleradiology | WE Healthcare",
      description:
        "Priority radiology reporting support for trauma and critical care imaging, including multi-study workflows and direct clinical communication.",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Trauma Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Emergency Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Diagnostic Radiology",
        },
        {
          "@type": "MedicalSpecialty",
          name: "Teleradiology",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wehealthcare.com/services/trauma-critical-care#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can teleradiology support trauma imaging?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trauma and critical-care imaging workflows can be supported through defined priority workflows, communication requirements, and capacity needs, subject to the facility's requirements and verified capabilities.",
          },
        },
        {
          "@type": "Question",
          name: "Can multiple trauma studies be handled together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The workflow can support multi-study trauma workups through defined batch routing and priority review processes, subject to the configured workflow.",
          },
        },
        {
          "@type": "Question",
          name: "Can overnight trauma volume be supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Overnight trauma volume can be incorporated into the workflow based on the facility's coverage and operational requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How are priority studies routed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Priority studies can be routed according to the facility's defined priority and workflow requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How are critical findings communicated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Critical findings are communicated through the agreed escalation process and documented according to the client's requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Can the workflow align with facility requirements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The workflow should align with the facility's existing trauma and critical-care processes rather than impose a standard workflow.",
          },
        },
      ],
    },
  ],
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) notFound();

  if (slug === "teleradiology-reporting") {
    return (
      <main className="flex-1">
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
        <CriticalFindingsSection />
        <ReportingVisibilitySection />
        <WhoWeSupportSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    );
  }

  if (slug === "overnight-weekend-coverage") {
    return (
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OVERNIGHT_JSON_LD) }}
        />
        <OvernightHero />
        <CoverageNeedsSection />
        <CoverageTimelineSection />
        <OvernightWhatsIncluded />
        <CriticalFindingsTermsSection />
        <FAQCTASection />
      </main>
    );
  }

  if (slug === "overflow-backlog-support") {
    return (
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OVERFLOW_JSON_LD) }}
        />
        <OverflowHero />
        <WhenWorklistGrowsSection />
        <CommonTriggersSection />
        <BacklogTransformationSection />
        <WhatsIncludedChallengeSection />
        <OverflowReportingVisibility />
        <OverflowFAQCTA />
      </main>
    );
  }

  if (slug === "emergency-stat-reporting") {
    return (
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EMERGENCY_JSON_LD) }}
        />
        <EmergencyHero />
        <WhenEveryStudyMattersSection />
        <CommonUseCasesSection />
        <EmergencyHowItWorks />
        <CriticalFindingsProtocolSection />
        <ServiceLevelsSection />
        <EmergencyFAQCTASection />
      </main>
    );
  }

  if (slug === "stroke-imaging-protocol") {
    return (
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STROKE_JSON_LD) }}
        />
        <StrokeHero />
        <BuiltAroundWorkflowSection />
        <OperationalNeedsSection />
        <StrokeProtocolWorkflowSection />
        <StrokeWhatsIncluded />
        <StrokeFinalSection />
      </main>
    );
  }

  if (slug === "trauma-critical-care") {
    return (
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(TRAUMA_JSON_LD) }}
        />
        <TraumaHero />
        <HighPressureEnvironmentsSection />
        <NeedsAndIncludedSection />
        <TraumaHowItWorks />
        <ProtocolAndCriticalSection />
        <FAQAndCTASection />
      </main>
    );
  }

  return <PagePlaceholder eyebrow="Service" title={entry.title} description={entry.summary} />;
}
