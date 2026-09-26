import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ImageCredits } from "@/components/sections/modalities/shared/image-credits";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NM_CTA_CONTENT as CTA, NM_FAQ_CONTENT as FAQ, NM_IMAGE_CREDITS, NM_IMAGES } from "@/content/nuclear-medicine";

/** Final section: shared FAQ accordion with a compact consultation card. */
export function NmFaqCtaSection() {
  return (
    <FaqSection
      eyebrow={FAQ.eyebrow}
      heading={FAQ.heading}
      intro={FAQ.intro}
      items={FAQ.items}
      aside={
        <>
          <aside aria-labelledby="nm-consultation" className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div aria-hidden="true" className="relative h-24 bg-black">
              <Image src={NM_IMAGES.cardiac.src} alt="" fill sizes="24rem" className="object-cover" />
            </div>
            <div className="p-6">
              <h3 id="nm-consultation" className="text-xl font-semibold leading-snug text-balance text-foreground">
                {CTA.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{CTA.body}</p>
              <Link href={CTA.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "md" }), "group mt-5")}>
                <span>{CTA.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
          <ImageCredits label="Nuclear medicine image credits" credits={NM_IMAGE_CREDITS} />
        </>
      }
    />
  );
}

export default NmFaqCtaSection;
