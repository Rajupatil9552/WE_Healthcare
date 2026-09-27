import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { routes } from "@/config/routes";
import { INTERESTS, isInquiryType, type InquiryType } from "@/lib/contact/schema";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactInfo } from "@/components/sections/contact/contact-info";

const TITLE = "Contact Us | Request a Demo | WE Healthcare";
const DESCRIPTION =
  "Contact WE Healthcare to request a demo or discuss teleradiology coverage, reporting support, and healthcare services for your organization.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: routes.contact },
  openGraph: { title: TITLE, description: DESCRIPTION, url: routes.contact, type: "website" },
};

type Props = { searchParams: Promise<{ inquiry?: string | string[]; needs?: string | string[] }> };

const COPY: Record<"demo" | "default", { eyebrow: string; heading: string; accent: string; body: string }> = {
  demo: {
    eyebrow: "Request a Demo",
    heading: "See How WE Healthcare",
    accent: "Fits Your Workflow",
    body: "Tell us about your organization and what you'd like to see. We'll set up a walkthrough built around your imaging volume, coverage needs, and existing systems.",
  },
  default: {
    eyebrow: "Contact Us",
    heading: "Let's Talk About Your",
    accent: "Radiology Needs",
    body: "Whether you need additional reporting capacity, after-hours coverage, or support services, send us a message and our team will get back to you.",
  },
};

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;
  const rawInquiry = Array.isArray(sp.inquiry) ? sp.inquiry[0] : sp.inquiry;
  const inquiry: InquiryType = isInquiryType(rawInquiry) ? rawInquiry : "services";
  const rawNeeds = Array.isArray(sp.needs) ? sp.needs.join(",") : (sp.needs ?? "");
  const needs = rawNeeds.split(",").filter((n) => (INTERESTS as readonly string[]).includes(n));
  const copy = COPY[inquiry === "demo" ? "demo" : "default"];

  return (
    <main className="site-theme flex-1 bg-background text-foreground">
      <section className="relative isolate overflow-clip bg-background pb-section pt-36 lg:pb-section-lg lg:pt-44">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-40 [background-image:radial-gradient(color-mix(in_srgb,var(--color-primary)_35%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_30%_10%,black_15%,transparent_70%)]"
        />
        <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 size-[620px] rounded-full bg-primary/10 blur-[120px]" />
        <DecorativeLines variant="top-right" />

        <Container className="relative">
          <div className="max-w-3xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-6 text-display-sm font-semibold text-balance sm:text-display">
              {copy.heading}{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-200">
                {copy.accent}
              </span>
            </h1>
            <p className="mt-7 max-w-[58ch] text-lead text-foreground-muted">{copy.body}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            <div id="contact-form" className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-10 lg:col-span-7">
              <ContactForm initialInquiry={inquiry} initialInterests={needs} />
            </div>
            <aside aria-label="Contact information" className="lg:sticky lg:top-28 lg:col-span-5">
              <ContactInfo />
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
