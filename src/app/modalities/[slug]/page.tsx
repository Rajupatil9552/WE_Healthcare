import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { modalities, getModality } from "@/content/modalities";

type Props = { params: Promise<{ slug: string }> };

// Only slugs listed in content/modalities.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return modalities.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getModality((await params).slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

export default async function Page({ params }: Props) {
  const entry = getModality((await params).slug);
  if (!entry) notFound();

  return <PagePlaceholder eyebrow="Modality" title={entry.title} description={entry.summary} />;
}
