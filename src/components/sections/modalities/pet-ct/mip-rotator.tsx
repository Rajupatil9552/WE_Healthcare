"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { PET_MIP_SPRITE as SPRITE } from "@/content/pet-ct";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const FRAME_MS = 110;

/**
 * Whole-body PET MIP rotating slowly (one turn ~3.5s), played from a sprite
 * only while on screen. Reduced motion shows the frontal frame.
 */
export function MipRotator({
  className,
  showAngle = true,
  playing = true,
}: {
  className?: string;
  showAngle?: boolean;
  /** Pause the rotation (e.g. when the MIP is not the focused pane). */
  playing?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!inView || reduce || !playing) return;
    const timer = window.setInterval(() => setFrame((f) => (f + 1) % SPRITE.count), FRAME_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduce, playing]);

  const current = reduce ? 0 : frame;
  const col = current % SPRITE.columns;
  const row = Math.floor(current / SPRITE.columns);
  const angle = Math.round((current * 360) / SPRITE.count);

  return (
    <div ref={ref} className={cn("relative", className)} style={{ aspectRatio: SPRITE.ratio }}>
      <div
        role="img"
        aria-label={SPRITE.alt}
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${SPRITE.src})`,
          backgroundSize: `${SPRITE.columns * 100}% ${SPRITE.rows * 100}%`,
          backgroundPosition: `${(col / (SPRITE.columns - 1)) * 100}% ${(row / (SPRITE.rows - 1)) * 100}%`,
        }}
      />
      {showAngle && (
        <p aria-hidden="true" className="pointer-events-none absolute right-0 top-0 font-mono text-[10px] tabular-nums uppercase tracking-[0.14em] text-slate-500">
          {String(angle).padStart(3, "0")}°
        </p>
      )}
    </div>
  );
}
