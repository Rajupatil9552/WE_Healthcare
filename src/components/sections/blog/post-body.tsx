import Image from "next/image";
import { Info, Quotes } from "@phosphor-icons/react/ssr";
import { headingId } from "@/lib/blog/utils";
import type { BlogBlock } from "@/lib/blog/types";

/**
 * Renders the typed body blocks. Add a case here when the CMS gains a new
 * block type; unknown types are skipped rather than breaking the page.
 */
export function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="text-foreground [&>*+*]:mt-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-lg leading-[1.8] text-foreground-muted">{block.text}</p>;

    case "heading": {
      const id = headingId(block.text);
      return block.level === 3 ? (
        <h3 id={id} className="!mt-10 scroll-mt-28 text-xl font-semibold tracking-tight">
          {block.text}
        </h3>
      ) : (
        <h2 id={id} className="!mt-14 scroll-mt-28 text-2xl font-semibold tracking-tight lg:text-3xl">
          {block.text}
        </h2>
      );
    }

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="space-y-3 text-lg leading-relaxed text-foreground-muted">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4">
              {block.ordered ? (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft font-mono text-xs font-semibold text-primary">
                  {i + 1}
                </span>
              ) : (
                <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <figure className="!my-12 relative rounded-lg border-l-4 border-primary bg-primary-soft/60 px-8 py-7">
          <Quotes size={28} weight="fill" aria-hidden="true" className="text-primary/40" />
          <blockquote className="mt-2 text-xl font-medium leading-relaxed tracking-tight text-foreground lg:text-2xl">{block.text}</blockquote>
          {block.cite && <figcaption className="mt-4 text-sm text-foreground-muted">{block.cite}</figcaption>}
        </figure>
      );

    case "image":
      return (
        <figure className="!my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-muted">
            <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-center text-sm text-foreground-subtle">{block.caption}</figcaption>}
        </figure>
      );

    case "callout":
      return (
        <aside className="flex gap-4 rounded-lg border border-primary/20 bg-card p-6 shadow-sm">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Info size={18} weight="bold" aria-hidden="true" />
          </span>
          <div>
            {block.title && <p className="font-semibold text-foreground">{block.title}</p>}
            <p className="mt-1 text-base leading-relaxed text-foreground-muted">{block.text}</p>
          </div>
        </aside>
      );

    default:
      return null;
  }
}
