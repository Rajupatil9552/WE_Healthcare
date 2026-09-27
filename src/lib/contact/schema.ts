/**
 * Contact form fields, options and validation. Shared by the client form
 * (options, limits) and the server action (validation). Keep it free of
 * server-only imports.
 */

export const INQUIRY_TYPES = [
  { value: "demo", label: "Request a Demo", hint: "See how it fits your workflow" },
  { value: "services", label: "Teleradiology Services", hint: "Coverage and reporting support" },
  { value: "partnership", label: "Partnership", hint: "Work with us long term" },
  { value: "general", label: "General Inquiry", hint: "Anything else" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];

export const ORGANIZATION_TYPES = [
  "Hospital / Health System",
  "Imaging Center",
  "Physician Group",
  "Emergency Department",
  "Healthcare Network",
  "Other",
] as const;

/** First four match the Who We Serve CTA chips, which arrive as `?needs=`. */
export const INTERESTS = [
  "Additional capacity",
  "After-hours coverage",
  "Overflow support",
  "Multi-location reporting",
  "Emergency / STAT reporting",
  "Subspecialty reporting",
  "Revenue cycle & AR support",
  "Staffing support",
] as const;

export const LIMITS = {
  name: 80,
  email: 254,
  phone: 30,
  organization: 150,
  jobTitle: 100,
  message: 5000,
  messageMin: 10,
} as const;

export type ContactValues = {
  inquiryType: InquiryType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  organizationType: string;
  interests: string[];
  message: string;
  consent: boolean;
};

export type ContactField = keyof ContactValues;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Echoed back so the form keeps what the visitor typed. */
      values?: Partial<ContactValues>;
    };

export function isInquiryType(v: unknown): v is InquiryType {
  return INQUIRY_TYPES.some((t) => t.value === v);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,}$/;

const str = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);

/** Parse and validate submitted form data. */
export function parseContactForm(fd: FormData):
  | { ok: true; values: ContactValues }
  | { ok: false; values: Partial<ContactValues>; fieldErrors: Partial<Record<ContactField, string>> } {
  const rawInquiry = String(fd.get("inquiryType") ?? "");
  const values: ContactValues = {
    inquiryType: isInquiryType(rawInquiry) ? rawInquiry : "general",
    firstName: str(fd, "firstName", LIMITS.name),
    lastName: str(fd, "lastName", LIMITS.name),
    email: str(fd, "email", LIMITS.email).toLowerCase(),
    phone: str(fd, "phone", LIMITS.phone),
    organization: str(fd, "organization", LIMITS.organization),
    jobTitle: str(fd, "jobTitle", LIMITS.jobTitle),
    organizationType: str(fd, "organizationType", 60),
    interests: fd
      .getAll("interests")
      .map(String)
      .filter((i): i is (typeof INTERESTS)[number] => (INTERESTS as readonly string[]).includes(i)),
    message: String(fd.get("message") ?? "").trim().slice(0, LIMITS.message),
    consent: fd.get("consent") === "on",
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (!values.firstName) errors.firstName = "Please enter your first name.";
  if (!values.lastName) errors.lastName = "Please enter your last name.";
  if (!values.email) errors.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.phone) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!values.organization) errors.organization = "Please enter your organization.";
  if (values.organizationType && !(ORGANIZATION_TYPES as readonly string[]).includes(values.organizationType)) {
    values.organizationType = "";
  }
  if (values.message.length < LIMITS.messageMin) errors.message = "Please tell us a little more (at least 10 characters).";
  if (!values.consent) errors.consent = "Please confirm we may contact you about your request.";

  return Object.keys(errors).length ? { ok: false, values, fieldErrors: errors } : { ok: true, values };
}
