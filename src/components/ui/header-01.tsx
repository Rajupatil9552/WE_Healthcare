"use client";

import { Equal, X, Moon, Sun } from "@aliimam/icons";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const solutionsItems = [
  { name: "Teleradiology Reporting", href: "#solutions" },
  { name: "Overnight & Weekend Coverage", href: "#solutions" },
  { name: "Overflow & Backlog Support", href: "#solutions" },
];

const technologyItems = [
  { name: "PACS & RIS Integration", href: "#technology" },
  { name: "DICOM & HL7", href: "#technology" },
  { name: "Workflow & Connectivity", href: "#technology" },
  { name: "Security", href: "#technology" },
];

const aboutItems = [
  { name: "About WE Healthcare", href: "#about" },
  { name: "Our Approach", href: "#about" },
  { name: "Leadership", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = React.useState(false);
  const [mobileTechOpen, setMobileTechOpen] = React.useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== prevScrolled) {
        prevScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative z-50">
      <nav
        data-state={menuState ? "active" : undefined}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full px-3 md:px-6 transition-colors duration-300",
          isScrolled ? "border-transparent" : "border-b border-slate-200/40 dark:border-white/10"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-3 transition-all duration-300",
            isScrolled &&
              "bg-white/90 dark:bg-slate-950/75 max-w-6xl rounded-2xl border border-slate-200/80 dark:border-sky-500/20 backdrop-blur-xl px-4 py-1 shadow-lg shadow-slate-300/30 dark:shadow-sky-950/30"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-2.5">
            {/* Logo Section */}
            <div className="flex w-full justify-between lg:w-auto items-center">
              <Link href="/" aria-label="home" className="flex items-center gap-2.5">
                <img
                  src="/images/WE_Logo.png"
                  alt="WE Healthcare Logo"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.3)] transition-transform hover:scale-105"
                />
              </Link>
              <div className="flex gap-2 lg:hidden items-center">
                <ModeToggle />
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 block cursor-pointer p-2 text-slate-700 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-200"
                >
                  <Equal className="in-data-[state=active]:rotate-180 scale-120 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-120 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="absolute inset-0 m-auto hidden lg:block size-fit">
              <Menus />
            </div>

            {/* Actions & Mobile Menu */}
            <div className="in-data-[state=active]:block border border-slate-200/80 dark:border-sky-500/20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl lg:in-data-[state=active]:flex hidden w-full flex-wrap items-center justify-end space-y-6 rounded-2xl p-4 shadow-3xl lg:m-0 lg:flex lg:w-auto lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:max-h-none lg:overflow-visible">
              <div className="lg:hidden block w-full p-1 max-h-[75vh] overflow-y-auto">
                <ul className="space-y-3 text-base">
                  {/* Services Item with Modalities Submenu */}
                  <li className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center justify-between py-1">
                      <a
                        href="#services"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-bold duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        Services
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Toggle Services submenu"
                      >
                        <svg
                          className={cn("size-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {/* Submenu for modalities */}
                    {mobileServicesOpen && (
                      <div className="mt-2 space-y-3 pt-1">
                        {/* Core modalities */}
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                            Core modalities
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { name: "X-Ray", active: true },
                              { name: "CT", active: false },
                              { name: "MRI", active: false },
                              { name: "Ultrasound", active: false },
                            ].map((mod) => (
                              <a
                                key={mod.name}
                                href="#services"
                                onClick={() => setMenuState(false)}
                                className={cn(
                                  "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                                  mod.active
                                    ? "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-sky-50/50 dark:hover:bg-slate-900"
                                )}
                              >
                                <span className={cn("size-1.5 rounded-full shrink-0", mod.active ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-700")} />
                                <span>{mod.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Also supported */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                            Also supported
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {["PET-CT", "Nuclear Medicine", "CBCT", "Spinal Annotation"].map((mod) => (
                              <a
                                key={mod}
                                href="#services"
                                onClick={() => setMenuState(false)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
                              >
                                <span className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                                <span className="truncate">{mod}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Featured Mini Card */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          <a
                            href="#services"
                            onClick={() => setMenuState(false)}
                            className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                          >
                            <img
                              src="/images/accuray-6pQPFuD7nJY-unsplash.jpg"
                              alt="Subspecialty Teleradiology"
                              className="size-11 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                                Featured
                              </span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">
                                Subspecialty Teleradiology
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                24/7/365 routine &amp; emergency reads →
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* Solutions Item with Submenu */}
                  <li className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center justify-between py-1">
                      <a
                        href="#solutions"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-bold duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        Solutions
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Toggle Solutions submenu"
                      >
                        <svg
                          className={cn("size-4 transition-transform duration-200", mobileSolutionsOpen && "rotate-180")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {mobileSolutionsOpen && (
                      <div className="mt-2 space-y-1 pl-2">
                        {solutionsItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuState(false)}
                            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* Technology Item with Submenu */}
                  <li className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center justify-between py-1">
                      <a
                        href="#technology"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-bold duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        Technology
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileTechOpen(!mobileTechOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Toggle Technology submenu"
                      >
                        <svg
                          className={cn("size-4 transition-transform duration-200", mobileTechOpen && "rotate-180")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {mobileTechOpen && (
                      <div className="mt-2 space-y-1 pl-2">
                        {technologyItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuState(false)}
                            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors"
                          >
                            <span>{item.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* About Item with Submenu */}
                  <li className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center justify-between py-1">
                      <a
                        href="#about"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-bold duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        About
                      </a>
                      <button
                        type="button"
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Toggle About submenu"
                      >
                        <svg
                          className={cn("size-4 transition-transform duration-200", mobileAboutOpen && "rotate-180")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {mobileAboutOpen && (
                      <div className="mt-2 space-y-1 pl-2">
                        {aboutItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuState(false)}
                            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors"
                          >
                            <span>{item.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>

                  {/* Contact Direct Link */}
                  <li className="py-1">
                    <a
                      href="#contact"
                      className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-medium block duration-150 px-1"
                      onClick={() => setMenuState(false)}
                    >
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 lg:w-auto shrink-0">
                <div className="hidden lg:block shrink-0">
                  <ModeToggle />
                </div>
                <Link
                  href="#contact"
                  className={cn(
                    buttonVariants({ variant: "accent", size: "sm" }),
                    "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-semibold hover:from-sky-400 hover:to-cyan-300 border-0 shadow-lg shadow-sky-500/25 transition-all hover:scale-105 whitespace-nowrap shrink-0"
                  )}
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};



export function Menus() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-sky-500/20 shadow-2xl rounded-2xl w-[480px] lg:w-[540px]">
            <div className="grid grid-cols-12 gap-4">
              {/* Left Column: Modalities list */}
              <div className="col-span-7 flex flex-col justify-between py-1 pr-2">
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2.5 mb-1.5">
                    Core modalities
                  </span>
                  <ul className="space-y-0.5">
                    {[
                      { name: "X-Ray", active: true },
                      { name: "CT", active: false },
                      { name: "MRI", active: false },
                      { name: "Ultrasound", active: false },
                    ].map((mod) => (
                      <li key={mod.name}>
                        <NavigationMenuLink asChild>
                          <a
                            href="#services"
                            className={cn(
                              "block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                              mod.active
                                ? "text-sky-600 bg-sky-50 dark:bg-sky-950/50 dark:text-sky-400 font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/70 dark:hover:bg-sky-950/40"
                            )}
                          >
                            {mod.name}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2.5 mb-1.5">
                    Also supported
                  </span>
                  <ul className="space-y-0.5">
                    {["PET-CT", "Nuclear Medicine", "CBCT", "Spinal Annotation"].map((mod) => (
                      <li key={mod}>
                        <NavigationMenuLink asChild>
                          <a
                            href="#services"
                            className="block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/70 dark:hover:bg-sky-950/40 transition-colors"
                          >
                            {mod}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Featured Image Nav Item */}
              <div className="col-span-5 flex flex-col">
                <NavigationMenuLink asChild>
                  <a
                    href="#services"
                    className="relative flex flex-col justify-end h-full min-h-[220px] rounded-xl overflow-hidden group border border-slate-200/80 dark:border-slate-800 bg-slate-900 p-4 transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <img
                      src="/images/accuray-6pQPFuD7nJY-unsplash.jpg"
                      alt="Diagnostic radiology services"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="relative z-10 flex flex-col">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-sky-400 uppercase mb-1">
                        Featured
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        Subspecialty Teleradiology
                      </h4>
                      <p className="mt-1 text-[11px] text-slate-300 leading-snug line-clamp-2">
                        24/7/365 coverage across routine and emergency imaging studies.
                      </p>
                      <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 group-hover:text-sky-300">
                        <span>Explore services</span>
                        <span>→</span>
                      </span>
                    </div>
                  </a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Solutions Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-3 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-sky-500/20 shadow-2xl rounded-2xl w-[320px] min-w-[320px]">
            <ul className="space-y-1">
              {solutionsItems.map((item) => (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/70 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                    >
                      <span>{item.name}</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Technology Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10">
            Technology
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-3 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-sky-500/20 shadow-2xl rounded-2xl w-[300px] min-w-[300px]">
            <ul className="space-y-1">
              {technologyItems.map((item) => (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/70 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                    >
                      <span>{item.name}</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-3 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-sky-500/20 shadow-2xl rounded-2xl w-[260px] min-w-[260px]">
            <ul className="space-y-1">
              {aboutItems.map((item) => (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/70 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                    >
                      <span>{item.name}</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact Link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-xs md:text-sm text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10"
            )}
          >
            <a href="#contact">Contact</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}



/** Theme toggle featuring skyblue and white primary branding colors */
export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Toggle
          className="group relative cursor-pointer size-9 rounded-full border border-sky-400/40 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 hover:text-sky-700 dark:hover:text-white hover:border-sky-400 data-[state=on]:bg-sky-500/20 data-[state=on]:border-sky-300 transition-all shadow-sm"
          pressed={isDark}
          onPressedChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <Moon
            size={18}
            className="shrink-0 scale-0 opacity-0 transition-all duration-300 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 text-sky-400"
            aria-hidden="true"
          />
          <Sun
            size={18}
            className="absolute shrink-0 scale-100 opacity-100 transition-all duration-300 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 text-amber-500"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}

export { Header };
export default Header;
