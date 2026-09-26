import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ImageCredits } from "@/components/sections/modalities/shared/image-credits";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PET_CTA_CONTENT as CTA, PET_FAQ_CONTENT as FAQ, PET_IMAGE_CREDITS } from "@/content/pet-ct";
import { FusionPanel } from "./fusion-panel";

/** Final section: shared FAQ accordion with a compact consultation card. */
export function PetCtFaqCtaSection() {
  return (
    <FaqSection
      eyebrow={FAQ.eyebrow}
      heading={FAQ.heading}
      intro={FAQ.intro}
      items={FAQ.items}
      aside={
        <>
          <aside aria-labelledby="pet-consultation" className="flex overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div aria-hidden="true" className="w-24 shrink-0 sm:w-28">
              <FusionPanel view="fused" aspect={0.5} position="50% 20%" sizes="7rem" className="h-full w-full" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 id="pet-consultation" className="text-xl font-semibold leading-snug text-balance text-foreground">
                {CTA.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{CTA.body}</p>
              <Link href={CTA.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "md" }), "group mt-5")}>
                <span>{CTA.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
          <ImageCredits label="PET-CT image credits" credits={PET_IMAGE_CREDITS} />
        </>
      }
    />
  );
}

export default PetCtFaqCtaSection;
