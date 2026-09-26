"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FILMS, XRAY_CTA_CONTENT as CTA, XRAY_FAQ_CONTENT as FAQ } from "@/content/x-ray";
import { FILM_GRAIN } from "./radiograph";

/**
 * Closing section: FAQ accordion beside a sticky "film jacket" consultation
 * panel, one composition instead of separate FAQ and CTA bands.
 */
export function FaqConsultationSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ.items[0].id);
  const uid = useId();

  return (
    <section id="faqs" className="relative scroll-mt-24 overflow-clip border-t border-border bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{FAQ.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{FAQ.heading}</RevealHeading>

            <div className="mt-10 space-y-3">
              {FAQ.items.map((item) => {
                const isOpen = openId === item.id;
                const triggerId = `${uid}-q-${item.id}`;
                const panelId = `${uid}-a-${item.id}`;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "rounded-lg border bg-card transition-colors duration-300",
                      isOpen ? "border-primary/40 shadow-sm" : "border-border"
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={triggerId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="flex w-full items-center justify-between gap-6 rounded-lg px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6"
                      >
                        <span className="text-base font-semibold leading-snug text-foreground sm:text-lg">{item.question}</span>
                        <CaretDown
                          size={18}
                          aria-hidden="true"
                          className={cn("shrink-0 transition-transform duration-300", isOpen ? "rotate-180 text-primary" : "text-foreground-subtle")}
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: MOTION.easeOut }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] px-5 pb-6 text-base leading-relaxed text-foreground-muted sm:px-6">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consultation "film jacket" */}
          <aside
            id="consultation"
            aria-labelledby={`${uid}-cta`}
            className="relative isolate overflow-hidden rounded-lg bg-[#03070b] p-8 text-white shadow-lg sm:p-10 lg:sticky lg:top-28 lg:col-span-5"
          >
            <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-3/5">
              <Image src={FILMS.hand.src} alt="" fill sizes="(max-width: 1024px) 60vw, 25vw" className="object-cover object-top opacity-45" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#03070b] via-[#03070b]/70 to-transparent" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-screen" style={{ backgroundImage: FILM_GRAIN }} />

            <p className="eyebrow [--eyebrow-color:var(--color-sky-300)]">{CTA.eyebrow}</p>
            <h2 id={`${uid}-cta`} className="mt-4 max-w-[14ch] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {CTA.heading}
            </h2>
            <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-slate-300">{CTA.body}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
              <Link href={CTA.primaryCta.href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group")}>
                <span>{CTA.primaryCta.label}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={CTA.secondaryCta.href}
                className="inline-flex h-13 items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-7 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {CTA.secondaryCta.label}
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default FaqConsultationSection;
