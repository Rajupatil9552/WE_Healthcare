"use client";

import { motion } from "motion/react";
import { Buildings, Desktop, LockKey, UploadSimple, UserCircleCheck, FileArrowDown, Database, Eye } from "@phosphor-icons/react";
import { MOTION } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SECURE_TRANSFER as CONTENT } from "@/content/technology-security";
import { ChapterHeader, ChapterNote } from "./chapter-layout";

const ITEM_ICONS = [UploadSimple, UserCircleCheck, FileArrowDown, Database, Eye];

/**
 * Chapter 03: facility and reading environment joined by a secure channel.
 * Studies travel out on the upper lane, reports return on the lower lane.
 */
export function SecureTransferChapter() {
  return (
    <section id="secure-image-transfer" className="scroll-mt-28 border-b border-border py-16 lg:py-24">
      <ChapterHeader id="secure-image-transfer" title={CONTENT.heading} body={CONTENT.body} />

      <TransferChannel />

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CONTENT.items.map((item, i) => {
          const Icon = ITEM_ICONS[i];
          return (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: MOTION.easeOut }}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} weight="duotone" aria-hidden="true" />
              </span>
              <span className="text-[15px] font-medium text-foreground">{item}</span>
            </motion.li>
          );
        })}
      </ul>

      <ChapterNote>{CONTENT.note}</ChapterNote>
    </section>
  );
}

function Lane({ direction, label }: { direction: "out" | "back"; label: string }) {
  const reduce = usePrefersReducedMotion();
  const out = direction === "out";
  return (
    <div className="relative h-9">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-strong" />
      <span
        className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-card px-2 font-mono sm:inline text-[10px] uppercase tracking-[0.14em] ${out ? "left-3 text-primary" : "right-3 text-success"}`}
      >
        {label}
      </span>
      {!reduce &&
        [0, 1, 2].map((k) => (
          <motion.span
            key={k}
            aria-hidden="true"
            className={`absolute top-1/2 h-2 w-8 -translate-y-1/2 rounded-full ${out ? "bg-primary" : "bg-success"}`}
            initial={{ left: out ? "-10%" : "105%", opacity: 0 }}
            animate={{ left: out ? ["-10%", "105%"] : ["105%", "-10%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, delay: k * 1.05 + (out ? 0 : 0.5), repeat: Infinity, ease: "linear" }}
          />
        ))}
    </div>
  );
}

function TransferChannel() {
  return (
    <div className="mt-12 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg border border-border bg-surface p-3 sm:gap-5 sm:p-6">
      <Endpoint icon={Buildings} title="Your facility" sub="PACS / RIS" />

      <div className="relative">
        <div className="relative overflow-hidden rounded-full border border-primary/30 bg-card px-2 py-1 shadow-inner">
          <Lane direction="out" label="Studies" />
          <Lane direction="back" label="Reports" />
        </div>
        {/* Lock at the centre of the channel */}
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
          className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface bg-primary text-on-primary shadow-md"
        >
          <LockKey size={18} weight="fill" aria-hidden="true" />
        </motion.span>
      </div>

      <Endpoint icon={Desktop} title="Reading environment" sub="Radiologist access" />
    </div>
  );
}

function Endpoint({ icon: Icon, title, sub }: { icon: typeof Buildings; title: string; sub: string }) {
  return (
    <div className="flex w-16 flex-col items-center text-center sm:w-32">
      <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm sm:size-14">
        <Icon size={24} weight="duotone" aria-hidden="true" />
      </span>
      <span className="mt-2 text-[11px] font-semibold leading-tight text-foreground sm:text-sm">{title}</span>
      <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle sm:block">{sub}</span>
    </div>
  );
}

export default SecureTransferChapter;
