import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { audiences, getAudience } from "@/content/audiences";

type Props = { params: Promise<{ slug: string }> };

// Only slugs listed in content/audiences.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getAudience((await params).slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

export default async function Page({ params }: Props) {
  const entry = getAudience((await params).slug);
  if (!entry) notFound();

  return <PagePlaceholder eyebrow="Who We Serve" title={entry.title} description={entry.summary} />;
}
