"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "top-right" | "left" | "right" | "wide";

/**
 * Flowing dashed/solid linework used as quiet section texture (the original
 * WE Healthcare wave motif). Purely decorative: aria-hidden, no pointer events.
 * Lines draw in once when the section enters view.
 */
const PATHS: Record<Variant, { viewBox: string; className: string; paths: { d: string; dashed?: boolean; w: number }[] }> = {
  "top-right": {
    viewBox: "0 0 500 450",
    className: "-right-16 -top-10 h-[300px] w-[340px] sm:h-[450px] sm:w-[500px]",
    paths: [
      { d: "M50 0 C200 120, 350 80, 500 240 M100 0 C250 160, 400 120, 500 300 M150 0 C300 200, 450 160, 500 360", dashed: true, w: 1.2 },
      { d: "M0 50 C180 180, 320 140, 500 280 M0 100 C150 220, 300 180, 500 340", w: 1 },
    ],
  },
  left: {
    viewBox: "0 0 500 420",
    className: "-left-20 top-1/3 h-[420px] w-[500px] -translate-y-1/2",
    paths: [
      { d: "M-50 100 C150 20, 250 300, 450 180 C550 120, 450 350, 600 380", dashed: true, w: 1.5 },
      { d: "M-80 160 C120 80, 220 340, 420 220 C520 160, 420 390, 570 410", w: 1 },
    ],
  },
  right: {
    viewBox: "0 0 500 420",
    className: "-right-20 top-2/3 h-[420px] w-[500px] -translate-y-1/2",
    paths: [
      { d: "M550 100 C350 20, 250 300, 50 180 C-50 120, 50 350, -100 380", dashed: true, w: 1.5 },
      { d: "M580 160 C380 80, 280 340, 80 220 C-20 160, 80 390, -70 410", w: 1 },
    ],
  },
  wide: {
    viewBox: "0 0 1440 600",
    className: "inset-x-0 top-0 h-full w-full",
    paths: [
      { d: "M-100 200 C300 400, 700 50, 1100 250 C1300 350, 1500 200, 1600 280", dashed: true, w: 1.2 },
      { d: "M-50 250 C350 450, 750 100, 1150 300 C1350 400, 1550 250, 1650 330", w: 0.8 },
    ],
  },
};

export function DecorativeLines({ variant = "top-right", className }: { variant?: Variant; className?: string }) {
  const config = PATHS[variant];
  return (
    <svg
      aria-hidden="true"
      viewBox={config.viewBox}
      fill="none"
      preserveAspectRatio={variant === "wide" ? "none" : "xMidYMid meet"}
      className={cn(
        "pointer-events-none absolute select-none text-primary opacity-30 dark:opacity-20",
        config.className,
        className
      )}
    >
      {config.paths.map((p) => (
        <motion.path
          key={p.d}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.w}
          strokeDasharray={p.dashed ? "4 4" : undefined}
          vectorEffect="non-scaling-stroke"
          // Dashed strokes can't use pathLength (it overrides the dash array), so they fade in instead.
          initial={p.dashed ? { opacity: 0 } : { pathLength: 0 }}
          whileInView={p.dashed ? { opacity: 1 } : { pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: p.dashed ? 1.2 : 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}
