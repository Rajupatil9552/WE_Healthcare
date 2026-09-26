"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PET_FUSION_IMAGES as IMG } from "@/content/pet-ct";
import { cn } from "@/lib/utils";

export type FusionView = "ct" | "pet" | "fused";

/**
 * One coronal PET-CT panel. The fused view is composited live: the PET
 * activity layer (transparent, hot colour map) fades in over the CT.
 * `position` (object-position) picks the region shown in shorter frames.
 */
export function FusionPanel({
  view,
  sizes,
  position,
  aspect,
  className,
}: {
  view: FusionView;
  sizes: string;
  /** object-position, e.g. "50% 10%" to show the head in a short frame. */
  position?: string;
  /** Frame aspect (width / height); defaults to the full coronal image. */
  aspect?: number;
  className?: string;
}) {
  const alt = view === "ct" ? IMG.ct.alt : view === "pet" ? IMG.pet.alt : IMG.fusedAlt;
  const fit = { objectPosition: position ?? "50% 50%" };

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative overflow-hidden", view === "pet" ? "bg-white" : "bg-black", className)}
      style={{ aspectRatio: aspect ?? IMG.ratio }}
    >
      <div className="absolute inset-0">
        {view === "pet" ? (
          <Image src={IMG.pet.src} alt="" fill sizes={sizes} className="object-cover" style={fit} />
        ) : (
          <>
            <Image src={IMG.ct.src} alt="" fill sizes={sizes} className="object-cover" style={fit} />
            {view === "fused" && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-0"
              >
                <Image src={IMG.petOverlay.src} alt="" fill sizes={sizes} className="object-cover" style={fit} />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
