"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once; import GSAP from here (never directly from "gsap") so every
// component gets the same plugin set. Plugins only one component needs
// (DrawSVG, MotionPath) are registered in that component so they stay out of
// the bundle every page loads.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Media query every scroll/text effect must sit behind. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
