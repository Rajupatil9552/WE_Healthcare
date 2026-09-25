"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Tailwind aspect utility, e.g. "aspect-[16/10]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Scrubbed parallax drift inside the frame (desktop only). */
  parallax?: boolean;
};

/**
 * Editorial image frame: clip-path reveal on scroll, optional parallax, and a
 * caption set below the image (never a glass card on top of it).
 * Priority (above-the-fold) images skip the reveal so LCP isn't delayed.
 */
export function Figure({
  src,
  alt,
  caption,
  aspect = "aspect-[16/10]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  className,
  imageClassName,
  parallax = false,
}: FigureProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const frame = ref.current?.querySelector<HTMLElement>(".js-frame");
      const img = ref.current?.querySelector<HTMLElement>(".js-img");
      if (!frame || !img) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        if (!priority) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 0% 12% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: frame, start: "top 85%", once: true },
            },
          );
          gsap.fromTo(img, { scale: 1.08 }, {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          });
        }
        if (parallax) {
          gsap.matchMedia().add("(min-width: 1024px)", () => {
            gsap.fromTo(img, { yPercent: -5 }, {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            });
          });
        }
      });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={cn("w-full", className)}>
      <div className={cn("js-frame relative w-full overflow-hidden rounded-lg bg-surface-muted", aspect)}>
        <div className={cn("js-img absolute", parallax ? "-inset-y-[6%] inset-x-0" : "inset-0")}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover object-center", imageClassName)}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] leading-snug text-foreground-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
