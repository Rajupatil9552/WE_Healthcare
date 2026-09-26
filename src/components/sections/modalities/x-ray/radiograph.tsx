"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import type { AnatomyPoint, Film } from "@/content/x-ray";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Fine film grain, inlined so it costs no request. */
export const FILM_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type RadiographProps = {
  film: Film;
  sizes: string;
  priority?: boolean;
  /** Show anatomy callouts (they animate in when `annotate` turns true). */
  annotate?: boolean;
  /** One-time exposure sweep across the film on mount. */
  sweep?: boolean;
  /** Show DICOM-style viewport text in the frame corners. */
  chrome?: boolean;
  /** Hide callout labels below `sm` (points stay) for small viewers. */
  compactLabels?: boolean;
  className?: string;
};

/**
 * Radiograph viewport: the film letterboxed on black like a reading-room
 * monitor, with anatomy callouts pinned in % of the image itself.
 *
 * The frame is a size container, so the film box is sized with cq units to
 * the largest rect of the film's aspect that fits; callouts never drift off
 * anatomy whatever the frame's shape. The parent must give it a height.
 */
export function Radiograph({
  film,
  sizes,
  priority = false,
  annotate = true,
  sweep = false,
  chrome = true,
  compactLabels = false,
  className,
}: RadiographProps) {
  const fitStyle: CSSProperties = {
    width: `min(100cqw, calc(100cqh * ${film.ratio}))`,
    height: `min(100cqh, calc(100cqw / ${film.ratio}))`,
  };

  return (
    <div
      className={cn("relative isolate h-full w-full overflow-hidden bg-black", className)}
      style={{ containerType: "size" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={fitStyle}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={film.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: MOTION.easeOut }}
              className="absolute inset-0"
            >
              <Image src={film.src} alt={film.alt} fill priority={priority} sizes={sizes} className="object-cover" />

              {film.marker && (
                <span
                  aria-hidden="true"
                  className="absolute left-[4%] top-[3%] grid size-6 place-items-center rounded-[3px] border border-white/70 font-mono text-xs font-semibold text-white/90"
                >
                  {film.marker}
                </span>
              )}

              {film.points?.map((point, i) => (
                <Callout
                  key={point.label}
                  point={point}
                  visible={annotate}
                  delay={0.25 + i * 0.09}
                  compact={compactLabels}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Film grain + vignette: the "lightbox" texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: FILM_GRAIN }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.55))]"
      />

      {sweep && (
        <motion.div
          aria-hidden="true"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2.2, delay: 0.35, ease: [0.45, 0, 0.2, 1] }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-sky-200/20" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-sky-200/80 shadow-[0_0_18px_2px_rgb(125_211_252/0.55)]" />
        </motion.div>
      )}

      {chrome && (
        <>
          <p className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-sky-100/80 sm:right-4 sm:top-4 sm:text-[11px]">
            {film.view}
          </p>
          <p className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 sm:bottom-4 sm:left-4">
            Illustrative · Non-PHI
          </p>
        </>
      )}
    </div>
  );
}

function Callout({
  point,
  visible,
  delay,
  compact,
}: {
  point: AnatomyPoint;
  visible: boolean;
  delay: number;
  compact: boolean;
}) {
  const toLeft = point.side === "left";

  // Outer box pins the dot's centre to the point; Motion owns the inner
  // element's transform, so the two never fight.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: toLeft ? "translate(calc(-100% + 5px), -50%)" : "translate(-5px, -50%)",
      }}
    >
    <motion.div
      initial={{ opacity: 0, x: toLeft ? 6 : -6 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: toLeft ? 6 : -6 }}
      transition={{ duration: 0.5, delay: visible ? delay : 0, ease: MOTION.easeOut }}
      className={cn("flex items-center", toLeft && "flex-row-reverse")}
    >
      <span className="relative block size-2.5 shrink-0 rounded-full border border-sky-300 bg-sky-300/25">
        <span className="absolute inset-0 rounded-full border border-sky-300/70 motion-safe:animate-ping" />
      </span>
      <span className="block h-px w-4 shrink-0 bg-sky-300/70 sm:w-6" />
      <span
        className={cn(
          "whitespace-nowrap rounded-[3px] bg-slate-950/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sky-100 backdrop-blur-sm sm:text-[11px]",
          compact && "hidden sm:block"
        )}
      >
        {point.label}
      </span>
    </motion.div>
    </div>
  );
}
