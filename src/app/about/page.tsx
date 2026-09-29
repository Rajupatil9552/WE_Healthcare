import type { Metadata } from "next";
import { ABOUT_SEO as SEO } from "@/content/about";
import { AboutHero } from "@/components/sections/about/hero";
import { OurCommitment } from "@/components/sections/about/our-commitment";
import { WhoWeAre } from "@/components/sections/about/who-we-are";
import { WhatWeDo } from "@/components/sections/about/what-we-do";
import { HowWeWork } from "@/components/sections/about/how-we-work";
import { AdditionalSupport } from "@/components/sections/about/additional-support";
import { CoverageModel } from "@/components/sections/about/coverage-model";

export const metadata: Metadata = {
  // Absolute: the SEO title already carries the brand, so skip the layout template.
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: SEO.path },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.path,
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <AboutHero />
      <OurCommitment />
      <WhoWeAre />
      <WhatWeDo />
      <HowWeWork />
      {/* RCM and staffing: kept below the teleradiology story, with less weight. */}
      <AdditionalSupport />
      {/* Full-bleed closing band; doubles as the page's final CTA. */}
      <CoverageModel />
    </main>
  );
}
