import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CT_CTA_CONTENT as CTA, CT_FAQ_CONTENT as FAQ, CT_IMAGES } from "@/content/ct";

const STRIP = [CT_IMAGES.head, CT_IMAGES.chest, CT_IMAGES.abdomenPelvis, CT_IMAGES.spine];

/**
 * Final section: the shared accessible FAQ accordion, with a compact CT
 * consultation panel in its sticky heading column (no separate CTA band).
 */
export function CtFaqCtaSection() {
  return (
    <FaqSection
      eyebrow={FAQ.eyebrow}
      heading={FAQ.heading}
      intro={FAQ.intro}
      items={FAQ.items}
      aside={
        <aside aria-labelledby="ct-consultation" className="overflow-hidden rounded-lg border border-primary/20 bg-primary-soft">
          {/* Slice strip */}
          <div aria-hidden="true" className="grid grid-cols-4 gap-px bg-slate-900">
            {STRIP.map((image) => (
              <div key={image.src} className="relative aspect-square bg-black">
                <Image src={image.src} alt="" fill sizes="100px" className="object-contain opacity-90" />
              </div>
            ))}
          </div>
          <div className="p-6">
            <h3 id="ct-consultation" className="text-xl font-semibold leading-snug text-balance text-foreground">
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

export default CtFaqCtaSection;
