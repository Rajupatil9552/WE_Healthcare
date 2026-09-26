import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SPINAL_CTA_CONTENT as CTA, SPINAL_FAQ_CONTENT as FAQ, SPINE_IMAGES } from "@/content/spinal-annotation";

/** Final section: shared FAQ accordion with a compact consultation card. */
export function SpinalFaqCtaSection() {
  return (
    <FaqSection
      eyebrow={FAQ.eyebrow}
      heading={FAQ.heading}
      intro={FAQ.intro}
      items={FAQ.items}
      aside={
        <aside aria-labelledby="spinal-consultation" className="flex overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div aria-hidden="true" className="relative w-24 shrink-0 bg-black sm:w-28">
            <Image src={SPINE_IMAGES.cervicalCt.src} alt="" fill sizes="7rem" className="object-cover" />
          </div>
          <div className="p-5 sm:p-6">
            <h3 id="spinal-consultation" className="text-xl font-semibold leading-snug text-balance text-foreground">
              {CTA.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{CTA.body}</p>
            <Link href={CTA.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "md" }), "group mt-5")}>
              <span>{CTA.primaryCta.label}</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      }
    />
  );
}

export default SpinalFaqCtaSection;
