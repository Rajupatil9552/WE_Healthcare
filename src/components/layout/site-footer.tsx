"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  ShieldCheck,
  UsersThree,
  ChartLineUp,
  ArrowRight,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
  Check,
  Phone,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { mainNav, legalNav } from "@/config/navigation";
import { routes } from "@/config/routes";
import { primaryCta } from "@/config/site";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinLogo },
  { name: "X (Twitter)", href: "https://x.com", icon: XLogo },
  { name: "YouTube", href: "https://youtube.com", icon: YoutubeLogo },
];

interface SiteFooterProps {
  hideCta?: boolean;
}

/** Global footer: final CTA panel, sitemap, contact details, legal bar. */
export function SiteFooter({ hideCta }: SiteFooterProps = {}) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Pages with their own bespoke CTA sections or action forms suppress the global footer CTA
  const shouldHideCta =
    hideCta ||
    pathname?.startsWith("/services") ||
    pathname === "/contact" ||
    pathname === "/request-a-demo";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <footer className="relative bg-[#061421] text-slate-300 scroll-mt-20">
      {/* ========================================================= */}
      {/* 1. FINAL CTA PANEL (Overhanging Card on Light-to-Dark bg) */}
      {/* ========================================================= */}
      {!shouldHideCta && (
        <div className="relative z-20 bg-gradient-to-b from-white via-sky-50/30 to-[#061421]/90 dark:from-[#080e11] dark:via-[#091419] dark:to-[#061421] pt-12 pb-16 lg:pt-16 lg:pb-20 transition-colors duration-300">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl lg:rounded-[36px] border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0c1b26] p-7 sm:p-10 lg:p-14 shadow-2xl overflow-hidden backdrop-blur-md"
          >
            {/* Integrated Right-Side Medical Monitor Visual */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-full sm:w-[50%] lg:w-[42%] overflow-hidden select-none opacity-40 dark:opacity-20 hidden md:block">
              <Image
                src="/images/general/accuray-6pQPFuD7nJY-unsplash.jpg"
                alt="Radiologist interpreting diagnostic studies on medical workstation"
                fill
                sizes="(max-width: 1024px) 50vw, 42vw"
                className="object-cover object-center"
                priority={false}
              />
              {/* Horizontal Fade Mask */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-35% to-transparent dark:from-[#0c1b26] dark:via-[#0c1b26]/80 dark:via-35% dark:to-transparent" />
            </div>

            {/* Left Content Area */}
            <div className="relative z-10 max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-400">
                  Let&apos;s Work Together
                </span>
                <span className="h-px w-6 bg-sky-300 dark:bg-sky-700" />
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
                Ready to strengthen your <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                  radiology capabilities?
                </span>
              </h2>

              {/* Supporting text */}
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-lg">
                Let&apos;s discuss how our teleradiology solutions can support your organization&apos;s clinical and operational goals.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1c4d74] hover:bg-[#153a57] dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-semibold text-sm px-7 py-3.5 shadow-md shadow-sky-900/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>

                <Link
                  href={routes.contact}
                  className="inline-flex items-center justify-center rounded-full border border-sky-300 dark:border-sky-700/80 bg-white/60 dark:bg-slate-900/40 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-sky-800 dark:text-sky-200 font-semibold text-sm px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Secure Collaboration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersThree size={18} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Experienced Radiologists
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartLineUp size={18} weight="bold" className="text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Support for Your Goals
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
      )}

      {/* ========================================================= */}
      {/* 2. DEEP NAVY FOOTER NAVIGATION & BRAND AREA              */}
      {/* ========================================================= */}
      <div
        className={cn(
          "relative pb-10 overflow-hidden",
          shouldHideCta
            ? "pt-16 lg:pt-20 border-t border-slate-800/80"
            : "pt-12"
        )}
      >
        {/* Subtle Decorative Geometric Circles in Bottom-Right */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-[420px] rounded-full border border-sky-500/10" />
        <div className="pointer-events-none absolute -right-40 -bottom-40 size-[620px] rounded-full border border-sky-500/10" />

        <Container className="relative z-10">
          {/* 1. All 7 Menu Categories & Submenus Sitemap Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-5 pb-12 border-b border-slate-800/80">
            {mainNav.map((section) => (
              <div key={section.id} className="flex flex-col">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  {section.label}
                </h3>
                {section.groups ? (
                  <div className="mt-3.5 space-y-3">
                    {section.groups.map((group) => (
                      <div key={group.label}>
                        <span className="block text-[9.5px] font-mono font-bold uppercase tracking-wider text-sky-400/80 mb-1">
                          {group.label}
                        </span>
                        <ul className="space-y-1.5">
                          {group.items.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-xs text-slate-400 hover:text-sky-300 transition-colors duration-150 block leading-snug"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-3.5 space-y-2">
                    {section.items?.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-xs text-slate-400 hover:text-sky-300 transition-colors duration-150 block leading-snug"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* 2. Brand Identity, Contact Info & Newsletter Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10">
            {/* Column 1: Brand & Identity (Span 4) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-block transition-transform duration-200 hover:scale-[1.02]">
                  <Image
                    src="/images/branding/WE_Logo.png"
                    alt="WE Healthcare Logo"
                    width={160}
                    height={44}
                    className="h-9 w-auto object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(56,189,248,0.3)]"
                  />
                </Link>

                <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
                  Delivering high-quality, reliable teleradiology solutions to support patients and healthcare providers across the care continuum.
                </p>
              </div>

              {/* Social Profile Links */}
              <div className="mt-6 flex items-center gap-2.5">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit WE Healthcare on ${s.name}`}
                      className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-sky-600 text-white transition-all duration-200 hover:scale-105"
                    >
                      <Icon size={16} weight="fill" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Contact Us (Span 5) */}
            <div id="contact" className="md:col-span-5 scroll-mt-28">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-400">
                {/* Phone Numbers */}
                <li className="flex items-start gap-2.5">
                  <Phone size={15} weight="bold" className="text-sky-400 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <a href="tel:+919511917233" className="hover:text-sky-300 transition-colors">
                      +919511917233
                    </a>
                    <span className="mx-1 text-slate-600">|</span>
                    <a href="tel:+12028106050" className="hover:text-sky-300 transition-colors">
                      +12028106050
                    </a>
                  </div>
                </li>

                {/* Email Address */}
                <li className="flex items-center gap-2.5">
                  <EnvelopeSimple size={15} weight="bold" className="text-sky-400 shrink-0" />
                  <a
                    href="mailto:sales@wehealthcare.us"
                    className="hover:text-sky-300 transition-colors leading-snug"
                  >
                    sales@wehealthcare.us
                  </a>
                </li>

                {/* Pune Location */}
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} weight="bold" className="text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Amanora chambers, 4th floor, Office no. 421, Pune - 411028, Maharashtra, India.
                  </span>
                </li>

                {/* USA Location */}
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} weight="bold" className="text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    10080 Reflections Blvd West, Sunrise, Florida, 33351, USA
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Stay Informed / Newsletter (Span 3) */}
            <div className="md:col-span-3">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Stay Informed
              </h3>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed font-normal">
                Get the latest insights on teleradiology and clinical trends.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="mt-3.5">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for healthcare newsletter"
                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none pr-9 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors"
                  >
                    {isSubscribed ? <Check size={13} weight="bold" /> : <ArrowRight size={13} weight="bold" />}
                  </button>
                </div>
                {isSubscribed && (
                  <span className="mt-1.5 block text-[11px] text-sky-400">
                    Thank you for subscribing!
                  </span>
                )}
                <span className="mt-2 block text-[10px] text-slate-500">
                  We respect your privacy. No spam, ever.
                </span>
              </form>
            </div>
          </div>

          {/* Understated Trust Note */}
          <div className="mt-12 text-center">
            <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
              Healthcare-focused • Security-conscious • Built for dependable collaboration
            </p>
          </div>

          {/* Bottom Legal Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 WE Healthcare. All rights reserved.</p>

            <div className="flex items-center gap-4 sm:gap-6">
              {legalNav.map((link, i) => (
                <Fragment key={link.href}>
                  {i > 0 && <span>|</span>}
                  <Link href={link.href} className="hover:text-slate-300 transition-colors">
                    {link.label}
                  </Link>
                </Fragment>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                Imaging A Brighter Tomorrow
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
