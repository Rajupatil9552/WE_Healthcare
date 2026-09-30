import Image from "next/image";

type Props = {
  /** Every image the switcher can show (duplicates are ignored). */
  srcs: readonly string[];
  /** Must match the visible image's `sizes` so both resolve to the same optimized URL. */
  sizes: string;
};

/**
 * Invisibly mounts every image an interactive switcher can show, so the browser
 * lazy-loads them all as the section scrolls near. Switching then paints from
 * cache instead of wiping in an empty frame while the next file downloads.
 * Place it inside the positioned frame, before the visible image.
 */
export function PreloadImages({ srcs, sizes }: Props) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-0">
      {[...new Set(srcs)].map((src) => (
        <Image key={src} src={src} alt="" fill sizes={sizes} />
      ))}
    </div>
  );
}
