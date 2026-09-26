type Credit = { image: string; author: string; license: string; href: string };

/** Collapsible attribution for licensed (e.g. CC BY-SA) modality imagery. */
export function ImageCredits({ label, credits }: { label: string; credits: readonly Credit[] }) {
  return (
    <details className="mt-5 text-xs text-foreground-subtle">
      <summary className="cursor-pointer rounded-sm hover:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {label}
      </summary>
      <ul className="mt-2 space-y-1">
        {credits.map((c) => (
          <li key={c.href}>
            {c.image}:{" "}
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              {c.author}
            </a>
            , {c.license}, via Wikimedia Commons (cropped)
          </li>
        ))}
      </ul>
    </details>
  );
}
