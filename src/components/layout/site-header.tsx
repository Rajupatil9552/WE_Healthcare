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
} from "@/components/ui/navigation-menu";
import { mainNav } from "@/config/navigation";
import { primaryCta } from "@/config/site";

type DropdownAlign = "left" | "center" | "right";

/** Desktop dropdown placement per nav section. Menu data lives in config/navigation. */
const DROPDOWN_LAYOUT: Record<string, { align: DropdownAlign; width: string }> = {
  services: { align: "left", width: "w-[320px] min-w-[320px]" },
  modalities: { align: "left", width: "w-[400px] min-w-[400px]" },
  "who-we-serve": { align: "center", width: "w-[290px] min-w-[290px]" },
  technology: { align: "center", width: "w-[300px] min-w-[300px]" },
  quality: { align: "center", width: "w-[290px] min-w-[290px]" },
  resources: { align: "right", width: "w-[320px] min-w-[320px]" },
  about: { align: "right", width: "w-[250px] min-w-[250px]" },
};

const DEFAULT_LAYOUT = { align: "center" as const, width: "w-[300px] min-w-[300px]" };

const getAlignmentClass = (align: DropdownAlign) => {
  switch (align) {
    case "left":
      return "left-0";
    case "center":
      return "left-1/2 -translate-x-1/2";
    case "right":
      return "right-0 left-auto";
  }
};

/** Global site header: logo, desktop mega-menu, mobile drawer, theme toggle, CTA. */
export function SiteHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [openMobileSections, setOpenMobileSections] = React.useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = React.useState(false);

  const toggleMobileSection = (id: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          "fixed top-0 left-0 right-0 z-50 w-full px-2 sm:px-4 md:px-6 transition-colors duration-300",
          isScrolled ? "border-transparent" : "border-b border-slate-200/40 dark:border-white/10"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 sm:mt-2.5 transition-all duration-300 w-full max-w-[var(--container-max)]",
            isScrolled &&
              "bg-white/90 dark:bg-slate-950/85 rounded-2xl border border-slate-200/80 dark:border-sky-500/20 backdrop-blur-xl px-3 sm:px-4 xl:px-5 py-1 sm:py-1.5 shadow-lg shadow-slate-300/30 dark:shadow-sky-950/30"
          )}
        >
          <div className="relative flex items-center justify-between gap-1.5 xl:gap-2.5 py-1.5 sm:py-2 min-h-[52px] sm:min-h-[56px] xl:min-h-[60px]">
            {/* Logo Section */}
            <div className="flex w-full justify-between lg:w-auto items-center shrink-0">
              <Link href="/" aria-label="home" className="flex items-center gap-2">
                <img
                  src="/images/branding/WE_Logo.png"
                  alt="WE Healthcare Logo"
                  className="h-8 sm:h-8.5 xl:h-9.5 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.35)] transition-transform hover:scale-105"
                />
              </Link>
              <div className="flex gap-2 lg:hidden items-center">
                <ModeToggle />
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className={cn(
                    "relative z-20 block cursor-pointer p-2 transition-colors",
                    isScrolled
                      ? "text-slate-700 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-200"
                      : "text-white hover:text-sky-300"
                  )}
                >
                  <Equal className={cn("m-auto duration-200", menuState ? "scale-0 opacity-0 rotate-180" : "scale-100 opacity-100 rotate-0")} />
                  <X className={cn("absolute inset-0 m-auto size-6 duration-200", menuState ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-180")} />
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-1">
              <Menus isScrolled={isScrolled} />
            </div>

            {/* Actions & CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 pl-1">
              <ModeToggle />
              <Link
                href={primaryCta.href}
                className={cn(
                  buttonVariants({ variant: "accent", size: "sm" }),
                  "bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-semibold hover:from-sky-400 hover:to-cyan-300 border-0 shadow-lg shadow-sky-500/25 transition-all hover:scale-105 whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-1.5 xl:py-2 shrink-0"
                )}
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          {menuState && (
            <div className="lg:hidden mt-2 border border-slate-200/80 dark:border-sky-500/20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl w-full rounded-2xl p-4 shadow-3xl max-h-[75vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
              <ul className="space-y-2 text-base">
                {mainNav.map((section) => {
                  const isOpen = !!openMobileSections[section.id];
                  return (
                    <li key={section.id} className="border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                      <div className="flex items-center justify-between py-1">
                        <Link
                          href={section.href}
                          className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-bold duration-150"
                          onClick={() => setMenuState(false)}
                        >
                          {section.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleMobileSection(section.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors"
                          aria-label={`Toggle ${section.label} submenu`}
                        >
                          <svg
                            className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      {isOpen && (
                        <div className="mt-2 space-y-2 pl-2 pt-1 animate-in fade-in-0 duration-150">
                          {section.groups ? (
                            section.groups.map((group) => (
                              <div key={group.label}>
                                <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2.5 mb-1">
                                  {group.label}
                                </span>
                                <div className="space-y-0.5">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setMenuState(false)}
                                      className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              {section.items?.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setMenuState(false)}
                                  className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-slate-900 transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <ModeToggle />
                <Link
                  href={primaryCta.href}
                  onClick={() => setMenuState(false)}
                  className={cn(
                    buttonVariants({ variant: "accent", size: "sm" }),
                    "flex-1 text-center bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-semibold hover:from-sky-400 hover:to-cyan-300 border-0 shadow-lg shadow-sky-500/25 transition-all py-2"
                  )}
                >
                  {primaryCta.label}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export function Menus({ isScrolled }: { isScrolled?: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0 xl:gap-0.5">
        {mainNav.map((section) => (
          <NavigationMenuItem key={section.id} className="relative">
            <NavigationMenuTrigger
              className={cn(
                "bg-transparent h-auto text-xs xl:text-[13px] 2xl:text-sm px-1.5 lg:px-2 xl:px-2.5 py-1.5 xl:py-2 font-medium whitespace-nowrap transition-colors rounded-lg flex items-center gap-0.5 xl:gap-1",
                isScrolled
                  ? "text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-50/80 dark:hover:bg-sky-500/10 data-[state=open]:text-sky-600 dark:data-[state=open]:text-sky-400 data-[state=open]:bg-sky-50/80 dark:data-[state=open]:bg-sky-500/10"
                  : "text-white/95 hover:text-white dark:text-white/95 hover:bg-white/15 dark:hover:bg-white/15 data-[state=open]:text-white data-[state=open]:bg-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              )}
            >
              {section.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(
                getAlignmentClass((DROPDOWN_LAYOUT[section.id] ?? DEFAULT_LAYOUT).align),
                (DROPDOWN_LAYOUT[section.id] ?? DEFAULT_LAYOUT).width,
                "p-3 bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-sky-500/20 shadow-2xl rounded-2xl backdrop-blur-xl"
              )}
            >
              {section.groups ? (
                <div className="grid grid-cols-2 gap-3 p-1">
                  {/* Column 1: Diagnostic Imaging */}
                  <div>
                    <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
                      {section.groups[0].label}
                    </span>
                    <ul className="space-y-0.5">
                      {section.groups[0].items.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Advanced Imaging with Specialized Services directly below */}
                  <div className="flex flex-col pl-3 border-l border-slate-100 dark:border-slate-800/80 space-y-3">
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
                        {section.groups[1].label}
                      </span>
                      <ul className="space-y-0.5">
                        {section.groups[1].items.map((item) => (
                          <li key={item.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2.5 mb-1.5">
                        {section.groups[2].label}
                      </span>
                      <ul className="space-y-0.5">
                        {section.groups[2].items.map((item) => (
                          <li key={item.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className="space-y-1">
                  {section.items?.map((item) => (
                    <li key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap"
                        >
                          <span>{item.label}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
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
    <div className="flex flex-col justify-center shrink-0">
      <div>
        <Toggle
          className="group relative cursor-pointer size-8 xl:size-9 rounded-full border border-sky-400/40 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 hover:text-sky-700 dark:hover:text-white hover:border-sky-400 data-[state=on]:bg-sky-500/20 data-[state=on]:border-sky-300 transition-all shadow-sm"
          pressed={isDark}
          onPressedChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <Moon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all duration-300 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 text-sky-400"
            aria-hidden="true"
          />
          <Sun
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all duration-300 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 text-amber-500"
            aria-hidden="true"
          />
        </Toggle>
      </div>
    </div>
  );
}
