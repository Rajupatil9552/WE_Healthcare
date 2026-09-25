"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";

type RevealHeadingProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Section heading that reveals line by line from behind a mask when scrolled
 * into view. Use for H2s only: hero H1s are the LCP element and use
 * HERO_HEADING_MOTION instead. Renders as plain static text under
 * prefers-reduced-motion or before hydration.
 */
export function RevealHeading({ as: Tag = "h2", className, children }: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            // Tight display line-heights clip descenders/ascenders inside the
            // line masks; pad each mask and cancel the padding with a margin.
            self.masks.forEach((mask) => {
              (mask as HTMLElement).style.padding = "0.08em 0 0.14em";
              (mask as HTMLElement).style.margin = "-0.08em 0 -0.14em";
            });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: MOTION.duration.slow,
              ease: MOTION.ease.out,
              stagger: MOTION.stagger.lines,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
