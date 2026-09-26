"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import type { AnnotatedImage } from "@/content/spinal-annotation";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnnotatedSpineProps = {
  image: AnnotatedImage;
  sizes: string;
  /** How many levels (top-down) are labelled; defaults to all. */
  shown?: number;
  /** Show disc-space lines. */
  discs?: boolean;
  /** Mark each shown label as reviewed. */
  reviewed?: boolean;
  /** Stagger labels in when they appear. */
  stagger?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * A spine image with vertebral level labels: a marker on each vertebral
 * body, a leader line, and a label chip to the left. Positions are % of the
 * image, so the overlay tracks the image at any size.
 */
export function AnnotatedSpine({
  image,
  sizes,
  shown = image.levels.length,
  discs = false,
  reviewed = false,
  stagger = true,
  priority = false,
  className,
}: AnnotatedSpineProps) {
  return (
    <div className={cn("relative overflow-hidden bg-black", className)} style={{ aspectRatio: image.ratio }}>
      <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />

      {discs &&
        image.discs?.map((y, i) => (
          <motion.span
            key={y}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i < shown ? 1 : 0 }}
            transition={{ duration: 0.5, delay: stagger ? 0.15 + i * 0.12 : 0, ease: MOTION.easeOut }}
            className="absolute left-[18%] h-px w-[38%] origin-left border-t border-dashed border-amber-300/80"
            style={{ top: `${y}%` }}
          />
        ))}

      <ul aria-label="Annotated vertebral levels" className="absolute inset-0">
        <AnimatePresence>
          {image.levels.slice(0, shown).map((level, i) => (
            <motion.li
              key={level.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: stagger ? i * 0.12 : 0, ease: MOTION.easeOut }}
              className={cn("absolute flex -translate-y-1/2 items-center", level.side === "right" ? "flex-row-reverse" : "-translate-x-full")}
              style={{ left: level.side === "right" ? `calc(${level.x}% - 5px)` : `calc(${level.x}% + 5px)`, top: `${level.y}%` }}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-[3px] px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] shadow sm:text-[11px]",
                  reviewed ? "bg-emerald-400 text-emerald-950" : "bg-sky-300 text-slate-950"
                )}
              >
                {reviewed && <Check size={10} weight="bold" aria-hidden="true" />}
                {level.label}
              </span>
              <span aria-hidden="true" className={cn("block h-px w-3 sm:w-6", reviewed ? "bg-emerald-300" : "bg-sky-300")} />
              <span aria-hidden="true" className={cn("block size-2.5 rounded-full border-2 bg-black/40", reviewed ? "border-emerald-300" : "border-sky-300")} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
