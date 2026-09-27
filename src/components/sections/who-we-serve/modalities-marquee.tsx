"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { routes } from "@/config/routes";
import { MODALITIES_STRIP as CONTENT } from "@/content/who-we-serve";

/**
 * Endless strip of modality scans. The list is rendered twice and shifted by
 * half its width for a seamless loop; hover or keyboard focus pauses it.
 * The duplicate set is hidden from assistive tech and the tab order.
 */
export function ModalitiesMarquee() {
  return (
    <section className="relative overflow-clip bg-surface py-section lg:py-section-lg">
      <DecorativeLines variant="left" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Coverage</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">{CONTENT.heading}</RevealHeading>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted">{CONTENT.intro}</p>
          </div>
          <Link
            href={CONTENT.cta.href}
            className="group inline-flex items-center gap-2 self-start rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:self-end"
          >
            <span className="underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">{CONTENT.cta.label}</span>
            <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <div className="group/marquee relative mt-12 lg:mt-16 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-[wws-marquee_48s_linear_infinite] gap-5 py-2 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-container">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-5" aria-hidden={copy === 1 || undefined}>
              {CONTENT.items.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={routes.modality(m.slug)}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group/card block w-52 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-60"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-950">
                      <Image
                        src={m.image}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover opacity-80 grayscale transition-[transform,opacity,filter] duration-700 ease-out group-hover/card:scale-105 group-hover/card:opacity-100 group-hover/card:grayscale-0"
                      />
                      {/* Scanline sweep on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent opacity-0 group-hover/card:animate-[wws-scan_1.4s_ease-in-out_infinite] group-hover/card:opacity-100"
                      />
                      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                        {m.slug.replace("-", " ")}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-semibold text-foreground">{m.label}</span>
                      <ArrowRight size={14} weight="bold" aria-hidden="true" className="text-foreground-subtle transition-transform group-hover/card:translate-x-1 group-hover/card:text-primary" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModalitiesMarquee;
