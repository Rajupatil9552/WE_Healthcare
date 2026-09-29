"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Receipt, UsersThree } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { MOTION } from "@/lib/motion";
import { ADDITIONAL_SUPPORT as CONTENT } from "@/content/about";

const ICONS: Record<(typeof CONTENT.services)[number]["id"], typeof Receipt> = {
  "revenue-cycle": Receipt,
  staffing: UsersThree,
};

/**
 * Secondary services, deliberately lighter than the teleradiology sections above:
 * compact padding, a smaller heading and no per-service pages.
 */
export function AdditionalSupport() {
  return (
    <section className="relative bg-background py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">{CONTENT.heading}</h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-foreground-muted">{CONTENT.body}</p>
            <Link
              href={CONTENT.cta.href}
              className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="underline decoration-primary/30 underline-offset-4 transition-colors group-hover:decoration-primary">
                {CONTENT.cta.label}
              </span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {CONTENT.services.map((s, i) => {
              const Icon = ICONS[s.id];
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: MOTION.easeOut }}
                  className="flex gap-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon size={20} weight="duotone" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{s.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default AdditionalSupport;
