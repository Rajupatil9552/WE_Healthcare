"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CaretDown,
  CaretRight,
  ShieldCheck,
  CheckCircle,
  Sliders,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { cn } from "@/lib/utils";
import { SERVICE_LEVELS_CONTENT } from "@/content/emergency-stat-reporting";

export function ServiceLevelsSection() {
  const [activeParamId, setActiveParamId] = useState<string>(
    SERVICE_LEVELS_CONTENT.parameters[0].id
  );


  return (
    <section
      id="service-levels"
      className="relative overflow-clip py-section lg:py-section-lg bg-surface"
    >
      <DecorativeLines variant="top-right" />
      <Container className="relative z-10">
        
        {/* ============================================================== */}
        {/* EDITORIAL SPECIFICATION SPLIT (~42% Left / ~58% Right)         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT ~42%: Editorial Narrative & Operating Principles (~5 cols)*/}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Eyebrow */}
            <motion.span
              className="eyebrow [--eyebrow-color:var(--color-urgent)]"
            >
              {SERVICE_LEVELS_CONTENT.eyebrow}
            </motion.span>

            {/* Main Editorial Heading */}
            <RevealHeading className="mt-3 text-h2 font-semibold text-foreground text-balance">
              {SERVICE_LEVELS_CONTENT.heading}
            </RevealHeading>

            {/* Supporting Copy */}
            <motion.p
              className="mt-5 text-base sm:text-lg text-foreground-muted leading-relaxed font-normal"
            >
              {SERVICE_LEVELS_CONTENT.body}
            </motion.p>

            {/* Structured Governance Narrative Card */}
            <motion.div
              className="mt-8 w-full border-l-2 border-urgent/40 pl-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Sliders size={16} className="text-urgent" />
                <span>Pre-Launch Clinical Alignment</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed font-normal">
                Priority reporting agreements are formal clinical partnerships. All triage protocols, credentialing parameters, and notification contact trees are mutually established and validated before study transmission begins.
              </p>
              
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-foreground-subtle">
                <span className="flex items-center gap-1.5 font-medium text-foreground-muted">
                  <ShieldCheck size={14} className="text-urgent" />
                  Facility Bylaw Compliance
                </span>
              </div>
            </motion.div>

            {/* Internal verification audit: [VERIFY: service-level details] */}

            {/* Transition Bridge Toward FAQ */}
            <motion.div
              className="mt-8 pt-6 border-t border-border w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-foreground-muted font-medium">
                  {SERVICE_LEVELS_CONTENT.transition.message}
                </span>
                <a
                  href="#faqs"
                  className="inline-flex items-center gap-1 text-urgent font-semibold shrink-0 hover:underline underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-urgent rounded-sm"
                >
                  <span>{SERVICE_LEVELS_CONTENT.transition.nextSectionName}</span>
                  <CaretRight size={13} />
                </a>
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT ~58%: Specification Operating Framework (~7 cols)        */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            <div className="rounded-lg border border-border bg-card shadow-md overflow-hidden">
              
              {/* Specification Panel Header */}
              <div className="px-5 py-3.5 bg-surface border-b border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-foreground uppercase tracking-wider text-xs">
                    Service Operating Framework
                  </span>
                </div>
                <span className="font-mono text-xs text-foreground-subtle uppercase tracking-wider">
                  {SERVICE_LEVELS_CONTENT.parameters.length} Operational Parameters
                </span>
              </div>

              {/* Vertically Stacked Specification Rows */}
              <div className="divide-y divide-border">
                {SERVICE_LEVELS_CONTENT.parameters.map((param, index) => {
                  const isActive = param.id === activeParamId;

                  return (
                    <motion.div
                      key={param.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className={cn(
                        "relative transition-colors duration-200",
                        isActive
                          ? "bg-surface/80 "
                          : "hover:bg-surface/40 "
                      )}
                    >
                        {/* Active Indicator Line */}
                        {isActive && (
                          <motion.span
                            layoutId="active-param-indicator"
                            className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-urgent"
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Parameter Header: Number + Title (disclosure trigger) */}
                        <h3>
                        <button
                          type="button"
                          id={`trigger-param-${param.id}`}
                          aria-expanded={isActive}
                          aria-controls={`panel-param-${param.id}`}
                          onClick={() => setActiveParamId(param.id)}
                          className="w-full text-left px-5 pt-5 sm:px-6 sm:pt-6 flex items-baseline justify-between gap-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-urgent"
                        >
                          <div className="flex items-baseline gap-3 sm:gap-4">
                            <span
                              className={cn(
                                "font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors",
                                isActive
                                  ? "text-urgent "
                                  : "text-slate-400 "
                              )}
                            >
                              {param.number}
                            </span>
                            <span
                              className={cn(
                                "text-base sm:text-lg font-bold tracking-tight transition-colors",
                                isActive
                                  ? "text-foreground "
                                  : "text-foreground-muted "
                              )}
                            >
                              {param.title}
                            </span>
                          </div>

                          <CaretDown
                            size={14}
                            weight="bold"
                            aria-hidden="true"
                            className={cn(
                              "shrink-0 text-slate-400 transition-transform duration-200",
                              isActive && "rotate-180 text-urgent "
                            )}
                          />
                        </button>
                        </h3>

                        {/* Parameter Description */}
                        <p className="ml-5 sm:ml-6 pr-5 sm:pr-6 mt-2 text-xs sm:text-sm text-foreground-muted pl-7 sm:pl-8 leading-relaxed font-normal">
                          {param.description}
                        </p>

                        {/* ============================================================== */}
                        {/* CONCEPTUAL PARAMETER VISUALIZATION (No Fake SLAs or Timers)   */}
                        {/* ============================================================== */}
                        {isActive && (
                          <motion.div
                            id={`panel-param-${param.id}`}
                            role="region"
                            aria-labelledby={`trigger-param-${param.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 ml-5 sm:ml-6 pl-7 sm:pl-8 pr-7 overflow-hidden"
                          >
                            <p className="text-xs text-foreground-subtle mb-3 leading-relaxed">
                              {param.detail}
                            </p>

                            {/* Parameter 01 Visual: Priority Categories */}
                            {param.visualType === "categories" && (
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {param.tiers.map((tier) => (
                                  <div
                                    key={tier.label}
                                    className="rounded-sm border border-border bg-card p-2.5"
                                  >
                                    <span
                                      className={cn(
                                        "block font-bold text-xs uppercase font-mono",
                                        tier.label === "STAT" && "text-urgent ",
                                        tier.label === "HIGH" && "text-warning ",
                                        tier.label === "ROUTINE" && "text-foreground-muted "
                                      )}
                                    >
                                      {tier.label}
                                    </span>
                                    <span className="block text-xs text-foreground-subtle mt-0.5">
                                      {tier.tag}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 02 Visual: Coverage Windows */}
                            {param.visualType === "windows" && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                                {param.windows.map((win) => (
                                  <div
                                    key={win.label}
                                    className="rounded-sm border border-border bg-card p-2"
                                  >
                                    <span className="block font-bold text-xs text-foreground uppercase">
                                      {win.label}
                                    </span>
                                    <span className="block text-xs text-foreground-subtle mt-0.5">
                                      {win.desc}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 03 Visual: Escalation Rules */}
                            {param.visualType === "escalation" && (
                              <div className="flex items-center justify-between gap-1 p-2.5 rounded-lg bg-card border border-border text-xs">
                                {param.steps.map((st, sIdx) => (
                                  <div key={st} className="flex items-center gap-1.5 flex-1 justify-center">
                                    <span className="font-semibold text-xs text-foreground text-center">
                                      {st}
                                    </span>
                                    {sIdx < param.steps.length - 1 && (
                                      <CaretRight size={12} className="text-urgent shrink-0" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Parameter 04 Visual: Turnaround Commitments */}
                            {param.visualType === "commitments" && (
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                {param.phases.map((ph) => (
                                  <div
                                    key={ph.phase}
                                    className="rounded-sm border border-border bg-card p-2.5"
                                  >
                                    <span className="block font-bold text-xs text-foreground uppercase font-mono">
                                      {ph.phase}
                                    </span>
                                    <span className="block text-xs text-foreground-subtle mt-0.5">
                                      {ph.note}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                          </motion.div>
                        )}
                        <div className="pb-5 sm:pb-6" aria-hidden="true" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Framework Annotation Bar */}
              <div className="px-5 py-3 bg-surface-muted/70 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-foreground-subtle">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} weight="fill" className="text-success" />
                  Service Level Commitments Codified in Written Client Agreement
                </span>
              </div>

            </div>

            {/* Bottom Clarification Note */}
            <p className="mt-4 text-xs text-foreground-subtle px-2">
              Parameters are agreed on a per-facility basis. WE Healthcare does not publish generic universal turnaround guarantees; all commitments reflect verified operational capacity.
            </p>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default ServiceLevelsSection;
