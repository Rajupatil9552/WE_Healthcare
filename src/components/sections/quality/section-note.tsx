import type { ReactNode } from "react";
import { Info } from "@phosphor-icons/react/dist/ssr";

/** Small process caveat shown under a Quality section. */
export function SectionNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex max-w-[70ch] items-start gap-2.5 text-sm leading-relaxed text-foreground-subtle">
      <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
      {children}
    </p>
  );
}
