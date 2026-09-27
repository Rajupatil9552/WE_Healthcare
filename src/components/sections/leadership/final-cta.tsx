"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cn } from "@/lib/utils";
import { LEADERSHIP_CTA as CONTENT } from "@/content/leadership";

/** Dark closing panel (both themes). */
export function LeadershipFinalCta() {
  return (
    <section className="bg-background pb-section lg:pb-section-lg">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl bg-slate-950 px-6 py-16 text-center text-white sm:px-12 lg:py-24">
          <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/25 blur-[120px]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgb(125_211_252/0.35)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_65%)]"
          />

          <RevealHeading className="mx-auto max-w-[20ch] text-h2 font-semibold text-balance text-white">{CONTENT.heading}</RevealHeading>

          <Link href={CONTENT.cta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
            <span>{CONTENT.cta.label}</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default LeadershipFinalCta;
