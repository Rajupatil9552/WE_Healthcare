import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { modalities, getModality } from "@/content/modalities";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { FILMS, XRAY_FAQ_CONTENT, XRAY_PAGE_METADATA } from "@/content/x-ray";
import { XRayHero } from "@/components/sections/modalities/x-ray/hero";
import { CT_FAQ_CONTENT, CT_IMAGES, CT_PAGE_METADATA } from "@/content/ct";
import { CtHero } from "@/components/sections/modalities/ct/hero";
import { MRI_FAQ_CONTENT, MRI_IMAGES, MRI_PAGE_METADATA } from "@/content/mri";
import { MriHero } from "@/components/sections/modalities/mri/hero";
import { US_FAQ_CONTENT, US_IMAGES, US_PAGE_METADATA } from "@/content/ultrasound";
import { UltrasoundHero } from "@/components/sections/modalities/ultrasound/hero";
import { PET_FAQ_CONTENT, PET_FUSION_IMAGES, PET_PAGE_METADATA } from "@/content/pet-ct";
import { PetCtHero } from "@/components/sections/modalities/pet-ct/hero";
import { CBCT_FAQ_CONTENT, CBCT_IMAGES, CBCT_PAGE_METADATA } from "@/content/cbct";
import { CbctHero } from "@/components/sections/modalities/cbct/hero";
import { NM_FAQ_CONTENT, NM_IMAGES, NM_PAGE_METADATA } from "@/content/nuclear-medicine";
import { NuclearMedicineHero } from "@/components/sections/modalities/nuclear-medicine/hero";

// Below-the-fold sections: code-split so their JS loads and hydrates in
// separate chunks after the hero (still server-rendered, so SEO/HTML is unchanged).
const StudiesWeReportSection = dynamic(() => import("@/components/sections/modalities/x-ray/studies-we-report").then((m) => m.StudiesWeReportSection));
const ReportingWorkflowSection = dynamic(() => import("@/components/sections/modalities/x-ray/reporting-workflow").then((m) => m.ReportingWorkflowSection));
const FaqConsultationSection = dynamic(() => import("@/components/sections/modalities/x-ray/faq-consultation").then((m) => m.FaqConsultationSection));
const StudiesCapabilityMapSection = dynamic(() => import("@/components/sections/modalities/ct/studies-capability-map").then((m) => m.StudiesCapabilityMapSection));
const SubspecialtyWorkflowSection = dynamic(() => import("@/components/sections/modalities/ct/subspecialty-workflow").then((m) => m.SubspecialtyWorkflowSection));
const CtFaqCtaSection = dynamic(() => import("@/components/sections/modalities/ct/faq-cta").then((m) => m.CtFaqCtaSection));
const StudyMapSection = dynamic(() => import("@/components/sections/modalities/mri/study-map").then((m) => m.StudyMapSection));
const SubspecialtyJourneySection = dynamic(() => import("@/components/sections/modalities/mri/subspecialty-journey").then((m) => m.SubspecialtyJourneySection));
const MriFaqCtaSection = dynamic(() => import("@/components/sections/modalities/mri/faq-cta").then((m) => m.MriFaqCtaSection));
const StudiesConsoleSection = dynamic(() => import("@/components/sections/modalities/ultrasound/studies-console").then((m) => m.StudiesConsoleSection));
const UltrasoundSubspecialtySection = dynamic(() => import("@/components/sections/modalities/ultrasound/subspecialty-workflow").then((m) => m.SubspecialtyWorkflowSection));
const UltrasoundFaqCtaSection = dynamic(() => import("@/components/sections/modalities/ultrasound/faq-cta").then((m) => m.UltrasoundFaqCtaSection));
const StudiesFusionSection = dynamic(() => import("@/components/sections/modalities/pet-ct/studies-fusion").then((m) => m.StudiesFusionSection));
const PetCtSubspecialtySection = dynamic(() => import("@/components/sections/modalities/pet-ct/subspecialty-workflow").then((m) => m.SubspecialtyWorkflowSection));
const PetCtFaqCtaSection = dynamic(() => import("@/components/sections/modalities/pet-ct/faq-cta").then((m) => m.PetCtFaqCtaSection));
const StudyAtlasSection = dynamic(() => import("@/components/sections/modalities/cbct/study-atlas").then((m) => m.StudyAtlasSection));
const CbctWorkflowSection = dynamic(() => import("@/components/sections/modalities/cbct/workflow").then((m) => m.CbctWorkflowSection));
const CbctFaqCtaSection = dynamic(() => import("@/components/sections/modalities/cbct/faq-cta").then((m) => m.CbctFaqCtaSection));
const ReviewScreenSection = dynamic(() => import("@/components/sections/modalities/nuclear-medicine/review-screen").then((m) => m.ReviewScreenSection));
const NmSubspecialtyWorkflowSection = dynamic(() => import("@/components/sections/modalities/nuclear-medicine/subspecialty-workflow").then((m) => m.NmSubspecialtyWorkflowSection));
const NmFaqCtaSection = dynamic(() => import("@/components/sections/modalities/nuclear-medicine/faq-cta").then((m) => m.NmFaqCtaSection));

type Props = { params: Promise<{ slug: string }> };

// Only slugs listed in content/modalities.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return modalities.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "x-ray") {
    const { title, description, canonical } = XRAY_PAGE_METADATA;
    return {
      // Absolute: the title already carries the brand suffix.
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: FILMS.chestPa.src, alt: FILMS.chestPa.alt }],
      },
    };
  }
  if (slug === "ct") {
    const { title, description, canonical } = CT_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: CT_IMAGES.abdomenPelvis.src, alt: CT_IMAGES.abdomenPelvis.alt }],
      },
    };
  }
  if (slug === "mri") {
    const { title, description, canonical } = MRI_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: MRI_IMAGES.sagittalHead.src, alt: MRI_IMAGES.sagittalHead.alt }],
      },
    };
  }
  if (slug === "ultrasound") {
    const { title, description, canonical } = US_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: US_IMAGES.abdominal.src, alt: US_IMAGES.abdominal.alt }],
      },
    };
  }
  if (slug === "pet-ct") {
    const { title, description, canonical } = PET_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: PET_FUSION_IMAGES.ct.src, alt: PET_FUSION_IMAGES.ct.alt }],
      },
    };
  }
  if (slug === "cbct") {
    const { title, description, canonical } = CBCT_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: CBCT_IMAGES.volume.src, alt: CBCT_IMAGES.volume.alt }],
      },
    };
  }
  if (slug === "nuclear-medicine") {
    const { title, description, canonical } = NM_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: NM_IMAGES.boneAnterior.src, alt: NM_IMAGES.boneAnterior.alt }],
      },
    };
  }
  const entry = getModality(slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

const XRAY_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "x-ray",
  name: XRAY_PAGE_METADATA.title,
  description: XRAY_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: XRAY_FAQ_CONTENT.items,
});

const CT_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "ct",
  name: CT_PAGE_METADATA.title,
  description: CT_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology", "Neuroradiology", "Teleradiology"],
  faqs: CT_FAQ_CONTENT.items,
});

const MRI_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "mri",
  name: MRI_PAGE_METADATA.title,
  description: MRI_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology", "Neuroradiology", "Teleradiology"],
  faqs: MRI_FAQ_CONTENT.items,
});

const US_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "ultrasound",
  name: US_PAGE_METADATA.title,
  description: US_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: US_FAQ_CONTENT.items,
});

const PET_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "pet-ct",
  name: PET_PAGE_METADATA.title,
  description: PET_PAGE_METADATA.description,
  specialties: ["Nuclear Medicine", "Diagnostic Radiology", "Teleradiology"],
  faqs: PET_FAQ_CONTENT.items,
});

const CBCT_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "cbct",
  name: CBCT_PAGE_METADATA.title,
  description: CBCT_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology", "Teleradiology"],
  faqs: CBCT_FAQ_CONTENT.items,
});

const NM_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "nuclear-medicine",
  name: NM_PAGE_METADATA.title,
  description: NM_PAGE_METADATA.description,
  specialties: ["Nuclear Medicine", "Diagnostic Radiology", "Teleradiology"],
  faqs: NM_FAQ_CONTENT.items,
});

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const entry = getModality(slug);
  if (!entry) notFound();

  if (slug === "x-ray") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(XRAY_JSON_LD) }}
        />
        <XRayHero />
        <StudiesWeReportSection />
        <ReportingWorkflowSection />
        <FaqConsultationSection />
      </main>
    );
  }

  if (slug === "ct") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CT_JSON_LD) }}
        />
        <CtHero />
        <StudiesCapabilityMapSection />
        <SubspecialtyWorkflowSection />
        <CtFaqCtaSection />
      </main>
    );
  }

  if (slug === "mri") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(MRI_JSON_LD) }}
        />
        <MriHero />
        <StudyMapSection />
        <SubspecialtyJourneySection />
        <MriFaqCtaSection />
      </main>
    );
  }

  if (slug === "ultrasound") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(US_JSON_LD) }}
        />
        <UltrasoundHero />
        <StudiesConsoleSection />
        <UltrasoundSubspecialtySection />
        <UltrasoundFaqCtaSection />
      </main>
    );
  }

  if (slug === "pet-ct") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PET_JSON_LD) }}
        />
        <PetCtHero />
        <StudiesFusionSection />
        <PetCtSubspecialtySection />
        <PetCtFaqCtaSection />
      </main>
    );
  }

  if (slug === "cbct") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CBCT_JSON_LD) }}
        />
        <CbctHero />
        <StudyAtlasSection />
        <CbctWorkflowSection />
        <CbctFaqCtaSection />
      </main>
    );
  }

  if (slug === "nuclear-medicine") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NM_JSON_LD) }}
        />
        <NuclearMedicineHero />
        <ReviewScreenSection />
        <NmSubspecialtyWorkflowSection />
        <NmFaqCtaSection />
      </main>
    );
  }

  return <PagePlaceholder eyebrow="Modality" title={entry.title} description={entry.summary} />;
}
