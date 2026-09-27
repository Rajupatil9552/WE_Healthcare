"use client";

import { useEffect, useState } from "react";
import { Check, EnvelopeSimple, LinkSimple, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { BlogTocItem } from "@/lib/blog/types";

/** Sticky sidebar: table of contents with the current section highlighted, then share links. */
export function PostAside({ toc, title, url }: { toc: BlogTocItem[]; title: string; url: string }) {
  const active = useActiveHeading(toc);

  return (
    <div className="sticky top-28 space-y-10">
      {toc.length > 0 && (
        <nav aria-label="On this page">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">On this page</p>
          <ol className="mt-4 space-y-1 border-l border-border">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                    item.level === 3 ? "pl-7" : "pl-4",
                    active === item.id
                      ? "border-primary font-medium text-foreground"
                      : "border-transparent text-foreground-muted hover:text-foreground"
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <ShareLinks title={title} url={url} />
    </div>
  );
}

export function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, Icon: LinkedinLogo },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, Icon: XLogo },
    { label: "Share by email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}`, Icon: EnvelopeSimple },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked: the other share options still work. */
    }
  };

  const btn =
    "flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">Share</p>
      <div className="mt-4 flex gap-2">
        {links.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={btn}>
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}
        <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={btn}>
          {copied ? <Check size={18} className="text-success" aria-hidden="true" /> : <LinkSimple size={18} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

/** Id of the last heading scrolled past the top third of the viewport. */
function useActiveHeading(toc: BlogTocItem[]) {
  const [active, setActive] = useState<string | undefined>(toc[0]?.id);

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.33;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  return active;
}
