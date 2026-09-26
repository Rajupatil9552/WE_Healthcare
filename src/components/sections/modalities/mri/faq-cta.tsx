import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ImageCredits } from "@/components/sections/modalities/shared/image-credits";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MRI_CTA_CONTENT as CTA, MRI_FAQ_CONTENT as FAQ, MRI_IMAGE_CREDITS, MRI_IMAGES } from "@/content/mri";

/**
 * Final section: the shared accessible FAQ accordion, with a compact MRI
 * consultation card and the image-credit disclosure in its heading column.
 */
export function MriFaqCtaSection() {
  return (
    <FaqSection
      eyebrow={FAQ.eyebrow}
      heading={FAQ.heading}
      intro={FAQ.intro}
      items={FAQ.items}
      aside={
        <>
          <aside aria-labelledby="mri-consultation" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div aria-hidden="true" className="relative size-16 shrink-0 overflow-hidden rounded-full bg-black ring-2 ring-primary/30">
                <Image
                  src={MRI_IMAGES.sagittalHead.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="scale-[1.8] object-cover object-[45%_28%]"
                />
              </div>
              <h3 id="mri-consultation" className="text-xl font-semibold leading-snug text-balance text-foreground">
                {CTA.heading}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{CTA.body}</p>
            <Link href={CTA.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "md" }), "group mt-5")}>
              <span>{CTA.primaryCta.label}</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </aside>

          <ImageCredits label="MRI image credits" credits={MRI_IMAGE_CREDITS} />
        </>
      }
    />
  );
}

export default MriFaqCtaSection;
