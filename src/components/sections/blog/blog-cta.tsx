import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/** Shared closing panel for the blog index and post pages. */
export function BlogCta() {
  return (
    <section className="bg-background py-section lg:py-section-lg">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl bg-slate-950 px-6 py-16 text-center text-white sm:px-12 lg:py-20">
          <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/25 blur-[120px]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgb(125_211_252/0.35)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_65%)]"
          />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">Work With Us</p>
          <h2 className="mx-auto mt-4 max-w-[22ch] text-h2 font-semibold text-balance">Need Support for Your Radiology Workflow?</h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-lead text-slate-300">
            Talk to us about coverage, reporting volume, and how a support model could fit your organization.
          </p>
          <Link href={routes.contact} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group mt-10")}>
            <span>Request a Consultation</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
