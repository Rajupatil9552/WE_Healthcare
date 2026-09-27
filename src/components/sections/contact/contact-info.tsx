import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";
import { contactEmail, contactPhones, offices, socialLinks, type SocialId } from "@/config/contact";

const SOCIAL_ICONS: Record<SocialId, typeof LinkedinLogo> = {
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  x: XLogo,
};

const NEXT_STEPS = [
  { title: "We review your request", body: "Our team looks at your coverage needs, volume, and workflow." },
  { title: "We schedule a conversation", body: "A short call to understand your requirements in detail." },
  { title: "We propose a support model", body: "Coverage, reporting, and communication built around you." },
];

/** Contact sidebar: direct channels, offices, next steps, socials. */
export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Direct channels */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">Talk to us directly</h2>
        <ul className="mt-5 space-y-5">
          <li>
            <a href={`mailto:${contactEmail}`} className="group flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <EnvelopeSimple size={20} weight="duotone" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-foreground-muted">Email</span>
                <span className="block break-all text-base font-semibold text-foreground transition-colors group-hover:text-primary">{contactEmail}</span>
              </span>
            </a>
          </li>
          {contactPhones.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className="group flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  <Phone size={20} weight="duotone" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-foreground-muted">Phone ({p.label})</span>
                  <span className="block text-base font-semibold text-foreground transition-colors group-hover:text-primary">{p.display}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Offices */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {offices.map((o) => (
          <div key={o.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary">
              <MapPin size={20} weight="duotone" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">{o.label}</h3>
            <address className="mt-2 text-sm not-italic leading-relaxed text-foreground-muted">
              {o.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={o.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary"
            >
              Get directions
              <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>

      {/* What happens next */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">What happens next</h2>
        <ol className="relative mt-5 space-y-5">
          <span aria-hidden="true" className="absolute bottom-4 left-4 top-4 w-px bg-border" />
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="relative flex gap-4">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card font-mono text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{s.title}</span>
                <span className="mt-0.5 block text-sm text-foreground-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Social */}
      <div className="flex flex-wrap items-center gap-3 px-1">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">Follow us</span>
        <ul className="flex gap-2">
          {socialLinks.map((s) => {
            const Icon = SOCIAL_ICONS[s.id];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WE Healthcare on ${s.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon size={17} weight="fill" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
