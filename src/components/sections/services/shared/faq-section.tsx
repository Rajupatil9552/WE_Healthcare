"use client";

import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type FaqItem = { id: string; question: string; answer: string };

type FaqSectionProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: readonly FaqItem[];
  /** Optional block under the intro (e.g. a governance note). */
  aside?: ReactNode;
  /** Accent for the open state and eyebrow; "urgent" on Emergency/Trauma. */
  tone?: "primary" | "urgent";
};

/**
 * Shared service-page FAQ: sticky heading column + hairline accordion.
 * Disclosure pattern (button[aria-expanded] → region), first item open.
 */
export function FaqSection({
  id = "faqs",
  eyebrow,
  heading,
  intro,
  items,
  aside,
  tone = "primary",
}: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const uid = useId();
  const accent = tone === "urgent" ? "text-urgent" : "text-primary";

  return (
    <section id={id} className="relative overflow-clip py-section lg:py-section-lg bg-surface border-t border-border">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            {eyebrow && (
              <p className={cn("eyebrow", tone === "urgent" && "[--eyebrow-color:var(--color-urgent)]")}>
                {eyebrow}
              </p>
            )}
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">
              {heading}
            </RevealHeading>
            {intro && (
              <p className="mt-5 text-base text-foreground-muted leading-relaxed max-w-[42ch]">{intro}</p>
            )}
            {aside && <div className="mt-8">{aside}</div>}
          </div>

          <div className="lg:col-span-8 border-t border-border">
            {items.map((item, index) => {
              const isOpen = openId === item.id;
              const triggerId = `${uid}-trigger-${item.id}`;
              const panelId = `${uid}-panel-${item.id}`;

              return (
                <div key={item.id} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="group w-full flex items-start gap-5 py-6 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="pt-1 font-mono text-xs text-foreground-subtle tabular-nums shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-lg font-semibold leading-snug transition-colors",
                          isOpen ? accent : "text-foreground group-hover:text-primary-strong"
                        )}
                      >
                        {item.question}
                      </span>
                      <Plus
                        size={18}
                        weight="bold"
                        aria-hidden="true"
                        className={cn(
                          "mt-1 shrink-0 transition-transform duration-300",
                          isOpen ? cn("rotate-45", accent) : "text-foreground-subtle"
                        )}
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
                        <p className="pl-10 pr-8 pb-7 text-base text-foreground-muted leading-relaxed max-w-[68ch]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
