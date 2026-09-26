"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Lightning } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { XRAY_STUDIES_CONTENT as CONTENT } from "@/content/x-ray";
import { Radiograph } from "./radiograph";

/**
 * Studies index: a film strip of four regions (ARIA tabs) drives one large
 * radiograph viewer and a typographic list of the studies in that region.
 */
export function StudiesWeReportSection() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewerRef, { once: true, margin: "-20% 0px" });

  const group = CONTENT.groups[active];
  const count = CONTENT.groups.length;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: (active + 1) % count,
      ArrowDown: (active + 1) % count,
      ArrowLeft: (active - 1 + count) % count,
      ArrowUp: (active - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="studies" className="scroll-mt-24 bg-surface py-section lg:py-section-lg">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{CONTENT.eyebrow}</p>
            <RevealHeading className="mt-4 text-h2 font-semibold text-balance text-foreground">
              {CONTENT.heading}
            </RevealHeading>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-urgent/30 bg-urgent-soft px-4 py-2 text-sm font-semibold text-urgent sm:self-auto">
            <Lightning size={16} weight="fill" aria-hidden="true" />
            {CONTENT.priority}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
          {/* Film strip (tabs) */}
          <div
            role="tablist"
            aria-label="X-ray study regions"
            className="-mx-container flex snap-x scroll-px-container gap-3 overflow-x-auto px-container pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:col-span-7 lg:col-start-6 lg:row-start-1"
          >
            {CONTENT.groups.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className="group w-36 shrink-0 snap-start rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                >
                  <span
                    className={cn(
                      "relative block aspect-[4/3] overflow-hidden rounded-md bg-black ring-1 transition-all duration-300",
                      selected ? "ring-2 ring-primary" : "ring-border group-hover:ring-border-strong"
                    )}
                  >
                    <Image
                      src={item.film.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 144px, 180px"
                      className={cn(
                        "object-cover object-top transition-[filter,opacity] duration-300",
                        selected ? "opacity-100" : "opacity-55 grayscale group-hover:opacity-80"
                      )}
                    />
                  </span>
                  <span className="mt-2.5 flex items-baseline gap-2">
                    <span className={cn("font-mono text-xs tabular-nums", selected ? "text-primary" : "text-foreground-subtle")}>
                      {item.index}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold leading-snug transition-colors",
                        selected ? "text-foreground" : "text-foreground-muted group-hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Viewer */}
          <div
            ref={viewerRef}
            className="h-[26rem] overflow-hidden rounded-lg shadow-lg sm:h-[34rem] lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[38rem]"
          >
            <Radiograph film={group.film} annotate={inView} sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>

          {/* Active region */}
          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${group.id}`}
            className="lg:col-span-7 lg:col-start-6 lg:row-start-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: MOTION.easeOut }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                  Region {group.index} / {String(count).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{group.title}</h3>

                <ul className="mt-8 border-t border-border">
                  {group.studies.map((study) => (
                    <li
                      key={study}
                      className="flex items-baseline justify-between gap-6 border-b border-border py-4 sm:py-5"
                    >
                      <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{study}</span>
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">XR</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm text-foreground-muted">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">Read by&nbsp;&nbsp;</span>
                  {group.subspecialties.join(" · ")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Subspecialty expertise: hairline row, the active region's readers lit */}
        <div className="mt-16 border-t border-border-strong pt-8 lg:mt-20">
          <h3 className="text-lg font-semibold text-foreground">{CONTENT.subspecialty.heading}</h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENT.subspecialty.items.map((name, i) => {
              const lit = (group.subspecialties as readonly string[]).includes(name);
              return (
                <li
                  key={name}
                  className="flex items-center gap-4 border-b border-border py-4 sm:pr-6 lg:border-b-0 lg:border-l lg:py-2 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <span className="font-mono text-xs tabular-nums text-foreground-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-xl font-semibold tracking-tight transition-colors duration-300", lit ? "text-foreground" : "text-foreground-subtle")}>
                    {name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn("ml-auto size-2 rounded-full transition-colors duration-300 lg:ml-0", lit ? "bg-primary" : "bg-transparent")}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default StudiesWeReportSection;
