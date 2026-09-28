"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  LockKey,
  Phone,
  PlugsConnected,
  ShieldCheck,
} from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { VideoSources } from "@/components/ui/video-sources";
import { routes } from "@/config/routes";
import { HERO_HEADING_MOTION, heroFadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Hero background video. The desktop file is wide (4096x2160), so on a portrait
 * phone `object-cover` keeps only the middle quarter of the frame.
 *
 * `mobile`: a portrait render (9:16, 1080x1920, H.264, ideally under 5 MB) served
 * to screens up to 767px wide. Drop the file in /public/videos and set the path.
 * `mobileFocus`: until then, which part of the wide frame to keep on phones
 * (CSS object-position, e.g. "30% 50%" to favour the left side).
 */
const HERO_VIDEO = {
  desktop: "/videos/Hero%20Video.mp4",
  mobile: null as string | null,
  mobileFocus: "50% 50%",
};

const TRUST_POINTS = [
  { label: "ABR-Certified Final Reads", icon: ShieldCheck },
  { label: "24x7 STAT Coverage", icon: Clock },
  { label: "PACS/RIS Integration", icon: PlugsConnected },
  { label: "HIPAA BAA Available", icon: LockKey },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-slate-950 text-white">
      {/* Background video (always dark, in both themes) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-[var(--hero-focus)] md:object-center"
          style={{ "--hero-focus": HERO_VIDEO.mobileFocus } as CSSProperties}
        >
          {/* Browsers pick the first playable, matching source: portrait file on phones when provided. */}
          {HERO_VIDEO.mobile && <VideoSources src={HERO_VIDEO.mobile} media="(max-width: 767px)" />}
          <VideoSources src={HERO_VIDEO.desktop} />
        </video>
        {/* Scrim keeps the headline legible: bottom-up on phones (text sits low), left-to-right from md */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 via-50% to-transparent md:hidden" />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-slate-950/85 via-slate-950/45 via-45% to-transparent md:block" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/60 to-transparent" />
      </div>

      {/* Blend the video into the first section's surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 lg:h-28 bg-gradient-to-b from-transparent via-surface/80 via-60% to-surface"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-max)] px-container pb-16 pt-24 sm:pb-28 sm:pt-28 lg:pb-32">
        <motion.h1
          {...HERO_HEADING_MOTION}
          className="max-w-[24ch] text-[clamp(2.25rem,1.3rem+3vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white text-balance [text-shadow:0_2px_24px_rgb(2_6_23/0.55)]"
        >
          ABR-Certified Final Reads. <br />
          24x7 Coverage. <br />
          <span className="text-sky-300">Anytime. Anywhere.</span>
        </motion.h1>

        <motion.div {...heroFadeIn(0.2)}>
          <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed sm:mt-5 text-white/85 sm:text-lg [text-shadow:0_1px_12px_rgb(2_6_23/0.6)]">
            U.S.-based ABR-certified radiologists sign your final reports,
            supported by Indian Board-Certified radiologists for preliminary
            reads. Overnight, weekend, STAT and overflow studies get read on
            time without adding to your headcount.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:flex sm:items-center sm:gap-3">
            <Link
              href={routes.requestDemo}
              className={cn(buttonVariants({ variant: "brand", size: "md" }), "group")}
            >
              <span>Request a Demo</span>
              <ArrowRight
                size={16}
                weight="bold"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={routes.contact}
              className={cn(
                buttonVariants({ size: "md" }),
                "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
              )}
            >
              <Phone size={16} weight="bold" aria-hidden="true" />
              <span>Book a 15-Minute Call</span>
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/85 sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-sm">
            {TRUST_POINTS.map(({ label, icon: Icon }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon size={16} weight="regular" aria-hidden="true" className="shrink-0 text-sky-300 sm:size-[18px]" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
