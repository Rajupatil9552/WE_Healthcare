"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Figure } from "@/components/sections/services/shared/figure";
import { cn } from "@/lib/utils";

type CtaLink = { label: string; href: string };

type ServiceCtaProps = {
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: readonly string[];
  primary: CtaLink;
  secondary?: CtaLink;
  image?: { src: string; alt: string };
  tone?: "primary" | "urgent";
};

/** Closing consultation band shared by every service page. */
export function ServiceCta({
  eyebrow,
  heading,
  body,
  bullets,
  primary,
  secondary,
  image,
  tone = "primary",
}: ServiceCtaProps) {
  return (
    <section id="consultation" className="py-section lg:py-section-lg bg-primary-soft">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className={cn(image ? "lg:col-span-7" : "lg:col-span-10")}>
            {eyebrow && (
              <p className={cn("eyebrow", tone === "urgent" && "[--eyebrow-color:var(--color-urgent)]")}>
                {eyebrow}
              </p>
            )}
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance max-w-[18ch]">
              {heading}
            </RevealHeading>
            <p className="mt-6 text-lead text-foreground-muted max-w-[52ch]">{body}</p>

            {bullets && bullets.length > 0 && (
              <ul className="mt-8 border-t border-primary/15">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-4 py-3 border-b border-primary/15 text-sm text-foreground"
                  >
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href={primary.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{primary.label}</span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              {secondary && (
                <Link href={secondary.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>

          {image && (
            <div className="lg:col-span-5">
              <Figure src={image.src} alt={image.alt} aspect="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
