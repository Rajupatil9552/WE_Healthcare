"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChatCircleText,
  Check,
  CheckCircle,
  CircleNotch,
  Handshake,
  Monitor,
  PresentationChart,
  WarningCircle,
} from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { contactEmail } from "@/config/contact";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { submitContact } from "@/app/contact/actions";
import {
  INQUIRY_TYPES,
  INTERESTS,
  LIMITS,
  ORGANIZATION_TYPES,
  type ContactField,
  type ContactFormState,
  type InquiryType,
} from "@/lib/contact/schema";

type Props = {
  /** Pre-selected from ?inquiry= (e.g. Request a Demo CTAs). */
  initialInquiry: InquiryType;
  /** Pre-ticked from ?needs= (Who We Serve CTA). */
  initialInterests: string[];
};

const INITIAL: ContactFormState = { status: "idle" };

const INQUIRY_ICONS: Record<InquiryType, typeof Monitor> = {
  demo: PresentationChart,
  services: Monitor,
  partnership: Handshake,
  general: ChatCircleText,
};

/** Remounts the form (fresh state) when the visitor chooses to send another message. */
export function ContactForm(props: Props) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ initialInquiry, initialInterests, onReset }: Props & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const startedAt = useRef<HTMLInputElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const err = state.status === "error" ? state : undefined;
  const values = err?.values;
  const [messageLength, setMessageLength] = useState(values?.message?.length ?? 0);

  // Time the form was shown, for the server's bot check.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "error") errorSummary.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: MOTION.easeOut }}
        className="flex flex-col items-center px-4 py-16 text-center focus:outline-none sm:py-24"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle size={36} weight="duotone" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Thank you. We&apos;ve received your message.</h2>
        <p className="mt-4 max-w-[46ch] text-base text-foreground-muted">
          A member of our team will review your request and get back to you by email. If it&apos;s urgent, call us using the numbers on this page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onReset} className={buttonVariants({ variant: "outline", size: "md" })}>
            Send another message
          </button>
          <Link href={routes.home} className={buttonVariants({ variant: "ghost", size: "md" })}>
            Back to home
          </Link>
        </div>
      </motion.div>
    );
  }

  const fieldError = (f: ContactField) => err?.fieldErrors?.[f];
  const inquiryDefault = values?.inquiryType ?? initialInquiry;
  const interestsDefault = values?.interests ?? initialInterests;

  return (
    <form action={formAction} noValidate>
      {/* Bot traps: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Send us a message</h2>
          <p className="mt-1 text-sm text-foreground-muted">We&apos;ll get back to you by email.</p>
        </div>
        <p className="text-xs text-foreground-subtle">
          <span className="text-primary">*</span> Required
        </p>
      </div>

      {err && (
        <div
          ref={errorSummary}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-urgent/30 bg-urgent-soft px-4 py-3 text-sm text-foreground focus:outline-none"
        >
          <WarningCircle size={20} weight="fill" aria-hidden="true" className="mt-px shrink-0 text-urgent" />
          <p>
            {err.message}{" "}
            {!err.fieldErrors && (
              <a href={`mailto:${contactEmail}`} className="font-semibold text-primary underline-offset-2 hover:underline">
                {contactEmail}
              </a>
            )}
          </p>
        </div>
      )}

      {/* Inquiry type */}
      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-foreground">
          What can we help you with? <span className="text-primary">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INQUIRY_TYPES.map((t) => {
            const Icon = INQUIRY_ICONS[t.value];
            return (
              <label key={t.value} className="group relative cursor-pointer">
                <input type="radio" name="inquiryType" value={t.value} defaultChecked={t.value === inquiryDefault} className="peer sr-only" />
                <span className="flex h-full items-center gap-3.5 rounded-xl border border-border bg-surface/60 p-4 transition-[border-color,background-color,box-shadow] hover:border-border-strong peer-checked:border-primary peer-checked:bg-primary-soft/70 peer-checked:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-card text-primary shadow-sm ring-1 ring-border">
                    <Icon size={20} weight="duotone" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{t.label}</span>
                    <span className="block text-xs text-foreground-muted">{t.hint}</span>
                  </span>
                </span>
                {/* Selected tick */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 flex size-5 scale-50 items-center justify-center rounded-full bg-primary text-on-primary opacity-0 transition-[opacity,transform] peer-checked:scale-100 peer-checked:opacity-100"
                >
                  <Check size={12} weight="bold" />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <FormSection step={1} title="About you">
        <Field label="First name" name="firstName" autoComplete="given-name" maxLength={LIMITS.name} error={fieldError("firstName")} defaultValue={values?.firstName} />
        <Field label="Last name" name="lastName" autoComplete="family-name" maxLength={LIMITS.name} error={fieldError("lastName")} defaultValue={values?.lastName} />
        <Field label="Work email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} error={fieldError("email")} defaultValue={values?.email} placeholder="name@organization.com" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} error={fieldError("phone")} defaultValue={values?.phone} placeholder="+1 000 000 0000" />
      </FormSection>

      <FormSection step={2} title="Your organization">
        <Field label="Organization" name="organization" autoComplete="organization" maxLength={LIMITS.organization} error={fieldError("organization")} defaultValue={values?.organization} />
        <Field label="Job title" name="jobTitle" optional autoComplete="organization-title" maxLength={LIMITS.jobTitle} defaultValue={values?.jobTitle} />
        <div className="sm:col-span-2">
          <FieldShell label="Organization type" htmlFor="organizationType" optional>
            {(id) => (
              <div className="relative">
                <select id={id} name="organizationType" defaultValue={values?.organizationType ?? ""} className={cn(inputClass(false), "cursor-pointer appearance-none pr-11")}>
                  <option value="">Select organization type</option>
                  {ORGANIZATION_TYPES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <svg aria-hidden="true" viewBox="0 0 256 256" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 fill-foreground-subtle">
                  <path d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z" />
                </svg>
              </div>
            )}
          </FieldShell>
        </div>
      </FormSection>

      <FormSection step={3} title="Your request">
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-foreground">
            Areas of interest <span className="font-normal text-foreground-subtle">(optional)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <label key={i} className="cursor-pointer">
                <input type="checkbox" name="interests" value={i} defaultChecked={interestsDefault.includes(i)} className="peer sr-only" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring [&_svg]:hidden peer-checked:[&_svg]:block">
                  <Check size={13} weight="bold" aria-hidden="true" className="text-primary" />
                  {i}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <FieldShell label="Message" htmlFor="message" error={fieldError("message")}>
            {(id, describedBy) => (
              <>
                <textarea
                  id={id}
                  name="message"
                  rows={5}
                  required
                  maxLength={LIMITS.message}
                  defaultValue={values?.message}
                  onInput={(e) => setMessageLength(e.currentTarget.value.length)}
                  aria-invalid={Boolean(fieldError("message")) || undefined}
                  aria-describedby={describedBy}
                  placeholder="Tell us about your imaging volume, coverage needs, or what you'd like to see in a demo."
                  className={cn(inputClass(Boolean(fieldError("message"))), "h-auto min-h-36 resize-y py-3 leading-relaxed")}
                />
                <p className="mt-1.5 text-right font-mono text-[11px] tabular-nums text-foreground-subtle">
                  {messageLength} / {LIMITS.message}
                </p>
              </>
            )}
          </FieldShell>
        </div>
      </FormSection>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface/60 p-4 text-sm text-foreground-muted">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values?.consent}
            aria-invalid={Boolean(fieldError("consent")) || undefined}
            aria-describedby={fieldError("consent") ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--color-primary)]"
          />
          <span>
            I agree that WE Healthcare may contact me about this request, as described in the{" "}
            <Link href={routes.legal.privacy} className="font-medium text-primary underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            . <span className="text-primary">*</span>
          </span>
        </label>
        {fieldError("consent") && <ErrorText id="consent-error">{fieldError("consent")}</ErrorText>}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground-subtle">Please don&apos;t include patient health information.</p>
        <button type="submit" disabled={pending} className={cn(buttonVariants({ variant: "brand", size: "lg" }), "group w-full sm:w-auto")}>
          {pending ? (
            <>
              <CircleNotch size={18} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <span>Send Message</span>
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** Numbered group of fields with a hairline divider above. */
function FormSection({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <section className="mt-8 border-t border-border pt-8">
      <h3 className="flex items-center gap-3 text-sm font-semibold text-foreground">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary-soft font-mono text-[11px] text-primary">{step}</span>
        {title}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block h-12 w-full rounded-xl border bg-surface/60 px-4 text-[15px] text-foreground placeholder:text-foreground-subtle transition-[border-color,background-color,box-shadow] duration-200 hover:border-border-strong focus:bg-background focus:outline-none focus:ring-4",
    invalid ? "border-urgent focus:border-urgent focus:ring-urgent/15" : "border-border focus:border-primary focus:ring-primary/15"
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-urgent">
      <WarningCircle size={14} weight="fill" aria-hidden="true" />
      {children}
    </p>
  );
}

function FieldShell({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}) {
  const uid = useId();
  const id = `${htmlFor}-${uid}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {optional ? (
          <span className="font-normal text-foreground-subtle"> (optional)</span>
        ) : (
          <span aria-hidden="true" className="text-primary"> *</span>
        )}
      </label>
      {children(id, error ? errorId : undefined)}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  autoComplete,
  maxLength,
  error,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <FieldShell label={label} htmlFor={name} optional={optional} error={error}>
      {(id, describedBy) => (
        <input
          id={id}
          name={name}
          type={type}
          required={!optional}
          autoComplete={autoComplete}
          maxLength={maxLength}
          defaultValue={defaultValue}
          placeholder={placeholder}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={inputClass(Boolean(error))}
        />
      )}
    </FieldShell>
  );
}
