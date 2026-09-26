import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { modalities, getModality } from "@/content/modalities";
import { buildServiceJsonLd } from "@/lib/structured-data";
import { FILMS, XRAY_FAQ_CONTENT, XRAY_PAGE_METADATA } from "@/content/x-ray";
import { XRayHero } from "@/components/sections/modalities/x-ray/hero";
import { StudiesWeReportSection } from "@/components/sections/modalities/x-ray/studies-we-report";
import { ReportingWorkflowSection } from "@/components/sections/modalities/x-ray/reporting-workflow";
import { FaqConsultationSection } from "@/components/sections/modalities/x-ray/faq-consultation";
import { CT_FAQ_CONTENT, CT_IMAGES, CT_PAGE_METADATA } from "@/content/ct";
import { CtHero } from "@/components/sections/modalities/ct/hero";
import { StudiesCapabilityMapSection } from "@/components/sections/modalities/ct/studies-capability-map";
import { SubspecialtyWorkflowSection } from "@/components/sections/modalities/ct/subspecialty-workflow";
import { CtFaqCtaSection } from "@/components/sections/modalities/ct/faq-cta";
import { MRI_FAQ_CONTENT, MRI_IMAGES, MRI_PAGE_METADATA } from "@/content/mri";
import { MriHero } from "@/components/sections/modalities/mri/hero";
import { StudyMapSection } from "@/components/sections/modalities/mri/study-map";
import { SubspecialtyJourneySection } from "@/components/sections/modalities/mri/subspecialty-journey";
import { MriFaqCtaSection } from "@/components/sections/modalities/mri/faq-cta";
import { US_FAQ_CONTENT, US_IMAGES, US_PAGE_METADATA } from "@/content/ultrasound";
import { UltrasoundHero } from "@/components/sections/modalities/ultrasound/hero";
import { StudiesConsoleSection } from "@/components/sections/modalities/ultrasound/studies-console";
import { SubspecialtyWorkflowSection as UltrasoundSubspecialtySection } from "@/components/sections/modalities/ultrasound/subspecialty-workflow";
import { UltrasoundFaqCtaSection } from "@/components/sections/modalities/ultrasound/faq-cta";
import { PET_FAQ_CONTENT, PET_FUSION_IMAGES, PET_PAGE_METADATA } from "@/content/pet-ct";
import { PetCtHero } from "@/components/sections/modalities/pet-ct/hero";
import { StudiesFusionSection } from "@/components/sections/modalities/pet-ct/studies-fusion";
import { SubspecialtyWorkflowSection as PetCtSubspecialtySection } from "@/components/sections/modalities/pet-ct/subspecialty-workflow";
import { PetCtFaqCtaSection } from "@/components/sections/modalities/pet-ct/faq-cta";
import { CBCT_FAQ_CONTENT, CBCT_IMAGES, CBCT_PAGE_METADATA } from "@/content/cbct";
import { CbctHero } from "@/components/sections/modalities/cbct/hero";
import { StudyAtlasSection } from "@/components/sections/modalities/cbct/study-atlas";
import { CbctWorkflowSection } from "@/components/sections/modalities/cbct/workflow";
import { CbctFaqCtaSection } from "@/components/sections/modalities/cbct/faq-cta";
import { NM_FAQ_CONTENT, NM_IMAGES, NM_PAGE_METADATA } from "@/content/nuclear-medicine";
import { NuclearMedicineHero } from "@/components/sections/modalities/nuclear-medicine/hero";
import { ReviewScreenSection } from "@/components/sections/modalities/nuclear-medicine/review-screen";
import { NmSubspecialtyWorkflowSection } from "@/components/sections/modalities/nuclear-medicine/subspecialty-workflow";
import { NmFaqCtaSection } from "@/components/sections/modalities/nuclear-medicine/faq-cta";
import { SPINAL_FAQ_CONTENT, SPINAL_PAGE_METADATA, SPINE_IMAGES } from "@/content/spinal-annotation";
import { SpinalAnnotationHero } from "@/components/sections/modalities/spinal-annotation/hero";
import { WhatIsSection } from "@/components/sections/modalities/spinal-annotation/what-is";
import { SpinalWorkflowSection } from "@/components/sections/modalities/spinal-annotation/workflow";
import { SpinalFaqCtaSection } from "@/components/sections/modalities/spinal-annotation/faq-cta";

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
  if (slug === "spinal-annotation") {
    const { title, description, canonical } = SPINAL_PAGE_METADATA;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [{ url: SPINE_IMAGES.lumbarMri.src, alt: SPINE_IMAGES.lumbarMri.alt }],
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

const SPINAL_JSON_LD = buildServiceJsonLd({
  section: "modalities",
  slug: "spinal-annotation",
  name: SPINAL_PAGE_METADATA.title,
  description: SPINAL_PAGE_METADATA.description,
  specialties: ["Diagnostic Radiology"],
  faqs: SPINAL_FAQ_CONTENT.items,
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

  if (slug === "spinal-annotation") {
    return (
      <main className="site-theme flex-1 bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SPINAL_JSON_LD) }}
        />
        <SpinalAnnotationHero />
        <WhatIsSection />
        <SpinalWorkflowSection />
        <SpinalFaqCtaSection />
      </main>
    );
  }

  return <PagePlaceholder eyebrow="Modality" title={entry.title} description={entry.summary} />;
}
