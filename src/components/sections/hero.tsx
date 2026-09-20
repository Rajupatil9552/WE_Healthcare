"use client";

import Link from "next/link";
import AirlockHero from "@/components/ui/airlock-hero";
import { buttonVariants } from "@/components/ui/button";
import { primaryCta, secondaryHeroCta } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Healthcare Teleradiology Hero section using the multi-image Airlock scrub animation.
 * Features 4 high-resolution diagnostic images from public/images/ starting with
 * /images/accuray-nhZWIUJBVVc-unsplash.jpg.
 */
export function Hero() {
  const heroImages = [
    "/images/accuray-nhZWIUJBVVc-unsplash.jpg",
    "/images/accuray-6pQPFuD7nJY-unsplash.jpg",
    "/images/accuray-36i9vuZrVjc-unsplash.jpg",
    "/images/national-cancer-institute-rUfUd-7WW78-unsplash.jpg",
  ];

  return (
    <section className="relative w-full">
      <AirlockHero
        theme="medical"
        images={heroImages}
        title={
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl leading-[1.05]">
              Expert Radiology. <br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-200 to-white bg-clip-text text-transparent">
                Anytime. Anywhere.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-xl text-slate-300 max-w-2xl font-normal">
              Empowering hospitals and imaging centers with dependable subspecialty coverage.
            </p>
          </div>
        }
        midTitle={
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.1]">
              Subspecialty Accuracy. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                Rapid Turnaround.
              </span>
            </h2>
            <p className="mt-6 text-base md:text-xl text-slate-200 max-w-2xl font-normal">
              Board-certified radiologists delivering seamless PACS/RIS integration for emergency and routine studies.
            </p>
          </div>
        }
        tagline={
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.15]">
              Empowering Healthcare Providers Nationwide.
            </h2>
            <p className="mt-4 text-base md:text-xl text-slate-200 max-w-2xl font-normal">
              Extend your group&apos;s reading capacity without extending burnout.
            </p>
          </div>
        }
        scrollHint="SCROLL TO EXPLORE"
        skipLabel="Skip intro"
        scrubDistance={2000}
        holdDistance={400}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Link
            href={primaryCta.href}
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "shadow-xl shadow-sky-500/25 px-8 py-6 text-base font-semibold transition-transform hover:scale-105"
            )}
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryHeroCta.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 text-white hover:bg-white/10 backdrop-blur-md px-8 py-6 text-base font-semibold transition-transform hover:scale-105"
            )}
          >
            {secondaryHeroCta.label}
          </Link>
        </div>
      </AirlockHero>
    </section>
  );
}
