"use client";

import type { RefObject } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed step sequence: `.js-track` fills left→right while each
 * `.js-node` inside `root` activates as the fill reaches it. Order comes from
 * DOM order, so steps can never light up out of sequence. Desktop only;
 * mobile and reduced-motion users see the static, fully-active state.
 */
export function useScrubSequence(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const nodes = gsap.utils.toArray<HTMLElement>(".js-node");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", end: "bottom 55%", scrub: 0.6 },
        });
        tl.fromTo(
          ".js-track",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", ease: "none", duration: 1 },
          0,
        );
        nodes.forEach((node, i) => {
          tl.fromTo(
            node,
            { opacity: 0.35, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.08 },
            nodes.length > 1 ? i / (nodes.length - 1) : 0,
          );
        });
      });
    },
    { scope: root },
  );
}
