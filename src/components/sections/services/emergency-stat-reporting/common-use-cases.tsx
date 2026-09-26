"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { COMMON_USE_CASES_CONTENT as CONTENT } from "@/content/emergency-stat-reporting";

export function CommonUseCasesSection() {
  const [activeId, setActiveId] = useState<string>(CONTENT.useCases[0].id);
  const activeCase = CONTENT.useCases.find((item) => item.id === activeId) ?? CONTENT.useCases[0];

  return (
    <section id="common-use-cases" className="relative overflow-clip py-section lg:py-section-lg bg-surface">
      <DecorativeLines variant="top-right" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: narrative + sticky preview that follows the open use case */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow [--eyebrow-color:var(--color-urgent)]">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-foreground text-balance">{CONTENT.heading}</RevealHeading>
            <p className="mt-6 text-base text-foreground-muted leading-relaxed">{CONTENT.supportingCopy}</p>

            <figure className="mt-10 hidden lg:block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-950">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeCase.id}
                    initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.55, ease: MOTION.easeOut }}
                    className="absolute inset-0"
                  >
                    <Image src={activeCase.image} alt={activeCase.alt} fill sizes="40vw" className="object-cover object-center" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <figcaption className="mt-3 text-[13px] text-foreground-subtle">
                <span className="font-mono text-urgent">{activeCase.number}</span> · Clinical Focus: {activeCase.clinicalFocus}
              </figcaption>
            </figure>

            <p className="mt-8 text-sm text-foreground-muted">
              {CONTENT.transition.lead} <span aria-hidden="true">→</span>{" "}
              <span className="font-semibold text-urgent">{CONTENT.transition.arrow}</span>
            </p>
          </div>

          {/* Right: single-open disclosure list */}
          <div className="lg:col-span-7">
            <div className="border-t border-border-strong">
              {CONTENT.useCases.map((useCase) => {
                const isActive = useCase.id === activeId;
                return (
                  <div key={useCase.id} className="relative border-b border-border">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-urgent transition-transform duration-300",
                        isActive ? "scale-y-100" : "scale-y-0"
                      )}
                    />
                    <h3>
                      <button
                        type="button"
                        id={`trigger-${useCase.id}`}
                        aria-expanded={isActive}
                        aria-controls={`panel-${useCase.id}`}
                        onClick={() => setActiveId(useCase.id)}
                        className="group w-full flex items-baseline gap-5 py-6 pl-5 pr-2 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urgent"
                      >
                        <span className={cn("font-mono text-sm tabular-nums shrink-0", isActive ? "text-urgent" : "text-foreground-subtle")}>
                          {useCase.number}
                        </span>
                        <span
                          className={cn(
                            "flex-1 text-xl font-semibold tracking-tight transition-colors",
                            isActive ? "text-foreground" : "text-foreground-muted group-hover:text-foreground"
                          )}
                        >
                          {useCase.title}
                        </span>
                        <Plus
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                          className={cn("shrink-0 transition-transform duration-300", isActive ? "rotate-45 text-urgent" : "text-foreground-subtle")}
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`panel-${useCase.id}`}
                          role="region"
                          aria-labelledby={`trigger-${useCase.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: MOTION.easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-14 pr-8">
                            <p className="text-base text-foreground-muted leading-relaxed">{useCase.description}</p>
                            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-md bg-slate-950 lg:hidden">
                              <Image src={useCase.image} alt={useCase.alt} fill sizes="100vw" className="object-cover object-center" />
                            </div>
                            <p className="mt-4 text-sm text-urgent lg:hidden">Clinical Focus: {useCase.clinicalFocus}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-foreground-subtle">
              Contextual operational reference scenarios. WE Healthcare teleradiology priority routing protocols are tailored to each facility&apos;s clinical bylaws and medical staff workflow.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CommonUseCasesSection;
