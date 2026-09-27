"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { WHO_WE_ARE as CONTENT } from "@/content/about";

/** Two-column story: narrative and facts on the left, photo on the right. */
export function WhoWeAre() {
  return (
    <section className="relative overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 max-w-[18ch] text-h2 font-semibold text-balance text-foreground">
              {CONTENT.heading}
            </RevealHeading>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground-muted lg:text-lg">
              {CONTENT.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
              {CONTENT.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">{f.label}</dt>
                  <dd className="mt-2 text-lg font-semibold tracking-tight text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>

            <Link href={CONTENT.cta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
              <span>{CONTENT.cta.label}</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: MOTION.easeOut }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-950 lg:aspect-[4/5]">
              <Image
                src={CONTENT.image.src}
                alt={CONTENT.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[70%_50%]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default WhoWeAre;
