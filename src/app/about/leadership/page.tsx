import type { Metadata } from "next";
import { LEADERSHIP_SEO as SEO } from "@/content/leadership";
import { LeadershipHero } from "@/components/sections/leadership/hero";
import { LeaderProfiles } from "@/components/sections/leadership/leader-profiles";
import { KeyFunctions } from "@/components/sections/leadership/key-functions";
import { Partnerships } from "@/components/sections/leadership/partnerships";
import { LeadershipFinalCta } from "@/components/sections/leadership/final-cta";

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
      <LeadershipHero />
      <LeaderProfiles />
      <KeyFunctions />
      <Partnerships />
      <LeadershipFinalCta />
    </main>
  );
}
