"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cn } from "@/lib/utils";
import { QUALITY_CTA as CONTENT } from "@/content/quality";

/** Full-bleed photo band (stays dark in both themes, like other photo areas). */
export function QualityFinalCta() {
  return (
    <section id="consultation" className="relative isolate overflow-hidden bg-slate-950 text-white">
      <Image
        src={CONTENT.image.src}
        alt={CONTENT.image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-60 motion-safe:animate-[hero-kenburns_24s_ease-in-out_infinite_alternate]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
      <Container className="py-section-lg">
        <div className="max-w-2xl">
          <p className="eyebrow [--eyebrow-color:#7dd3fc]">Get Started</p>
          <RevealHeading className="mt-4 text-h2 font-semibold text-balance">{CONTENT.heading}</RevealHeading>
          <p className="mt-6 text-lead text-slate-300">{CONTENT.body}</p>
          <Link href={CONTENT.cta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
            <span>{CONTENT.cta.label}</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default QualityFinalCta;
