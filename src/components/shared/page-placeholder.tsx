import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { NavLink } from "@/types";

interface PagePlaceholderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Sub-pages to list, e.g. on a hub page like /quality. */
  links?: NavLink[];
}

/**
 * Temporary body for routes whose real sections have not been built yet.
 * Replace with the page's components from `components/sections/<page>/`.
 *
 * The dark top band keeps the transparent (white-text) header readable.
 */
export function PagePlaceholder({ eyebrow, title, description, links }: PagePlaceholderProps) {
  return (
    <main className="flex-1">
      <section className="bg-[#061421] pt-36 pb-16 lg:pt-44 lg:pb-20 text-white">
        <Container>
          {eyebrow && (
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-sky-400">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              {description}
            </p>
          )}
        </Container>
      </section>

      <section className="bg-white dark:bg-[#080e11] py-16 lg:py-20 transition-colors duration-300">
        <Container>
          {links && links.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block h-full rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-sky-400 hover:bg-sky-50/60 dark:hover:bg-sky-950/30 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">{link.label}</span>
                    {link.description && (
                      <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                        {link.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Page content coming soon.</p>
          )}
        </Container>
      </section>
    </main>
  );
}
