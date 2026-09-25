"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide Motion defaults. `reducedMotion="user"` disables transform and
 * layout animations for visitors with prefers-reduced-motion, so components
 * no longer need per-element `shouldReduceMotion ? false : {...}` guards.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
