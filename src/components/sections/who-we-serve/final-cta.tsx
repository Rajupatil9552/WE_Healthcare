"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Plus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cn } from "@/lib/utils";
import { WHO_WE_SERVE_CTA as CONTENT } from "@/content/who-we-serve";

/**
 * Closing band: visitors can tag what they need before requesting a
 * consultation; the selection is passed to the contact page as `?needs=`.
 */
export function WhoWeServeFinalCta() {
  const [needs, setNeeds] = useState<string[]>([]);
  const toggle = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));
  const href = needs.length ? `${CONTENT.cta.href}?needs=${encodeURIComponent(needs.join(","))}` : CONTENT.cta.href;

  return (
    <section id="consultation" className="bg-background py-section lg:py-section-lg">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl border border-primary/15 bg-primary-soft px-6 py-16 text-foreground sm:px-12 lg:px-20 lg:py-24">
          {/* Radar rings */}
          <div aria-hidden="true" className="absolute -right-40 top-1/2 -z-10 size-[720px] -translate-y-1/2">
            {[1, 0.78, 0.56, 0.34].map((s) => (
              <span key={s} className="absolute inset-0 m-auto rounded-full border border-primary/15" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
            ))}
            <motion.span
              className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,transparent_0deg,color-mix(in_srgb,var(--color-primary)_18%,transparent)_40deg,transparent_60deg)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-2xl">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-5 text-h2 font-semibold text-balance">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-lead text-foreground-muted">{CONTENT.body}</p>

            <fieldset className="mt-10">
              <legend className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">What do you need? (optional)</legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {CONTENT.needs.map((n) => {
                  const on = needs.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(n)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        on ? "border-primary bg-primary text-on-primary" : "border-border-strong bg-card text-foreground hover:bg-surface-muted"
                      )}
                    >
                      {on ? <Check size={14} weight="bold" aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
                      {n}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Link href={href} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
              <span>{CONTENT.cta.label}</span>
              {needs.length > 0 && (
                <span className="rounded-full bg-slate-950/15 px-2 py-0.5 font-mono text-xs tabular-nums">{needs.length}</span>
              )}
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServeFinalCta;
