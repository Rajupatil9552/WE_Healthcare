import nodemailer, { type Transporter } from "nodemailer";
import { contactEmail } from "@/config/contact";
import { INQUIRY_TYPES, type ContactValues } from "./schema";

/**
 * SMTP delivery for contact-form submissions. Server only: import from
 * server actions / route handlers, never from client components.
 *
 * Configure in .env.local (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   CONTACT_TO_EMAIL (default sales@wehealthcare.us), CONTACT_FROM_EMAIL
 */

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  return {
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO_EMAIL || contactEmail,
    from: CONTACT_FROM_EMAIL || SMTP_USER,
  };
}

let transporter: Transporter | null = null;

function getTransporter(cfg: SmtpConfig) {
  transporter ??= nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    // Refuse to send credentials over an unencrypted connection.
    requireTLS: !cfg.secure,
  });
  return transporter;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Strip anything that could break out of a header line. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function buildContactEmail(v: ContactValues, meta: { submittedAt: Date; page?: string }) {
  const inquiry = INQUIRY_TYPES.find((t) => t.value === v.inquiryType)?.label ?? "Inquiry";
  const name = `${v.firstName} ${v.lastName}`;
  const subject = oneLine(`[Website] ${inquiry}: ${name}, ${v.organization}`).slice(0, 200);

  const rows: [string, string][] = [
    ["Inquiry type", inquiry],
    ["Name", name],
    ["Email", v.email],
    ["Phone", v.phone || "-"],
    ["Organization", v.organization],
    ["Job title", v.jobTitle || "-"],
    ["Organization type", v.organizationType || "-"],
    ["Interested in", v.interests.length ? v.interests.join(", ") : "-"],
  ];
  const submitted = meta.submittedAt.toUTCString();

  const text = [
    `New ${inquiry.toLowerCase()} from the WE Healthcare website`,
    "",
    ...rows.map(([k, val]) => `${k}: ${val}`),
    "",
    "Message:",
    v.message,
    "",
    `Submitted: ${submitted}${meta.page ? `\nPage: ${meta.page}` : ""}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px">
<tr><td style="padding:24px 28px;border-bottom:1px solid #e2e8f0">
<p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0284c7">WE Healthcare website</p>
<h1 style="margin:6px 0 0;font-size:20px">${escapeHtml(inquiry)}</h1></td></tr>
<tr><td style="padding:20px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${rows
  .map(
    ([k, val]) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${
        k === "Email" ? `<a href="mailto:${escapeHtml(val)}" style="color:#0284c7">${escapeHtml(val)}</a>` : escapeHtml(val)
      }</td></tr>`
  )
  .join("")}
</table></td></tr>
<tr><td style="padding:0 28px 24px"><p style="margin:0 0 6px;font-size:13px;color:#64748b">Message</p>
<div style="font-size:14px;line-height:1.6;white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px">${escapeHtml(v.message)}</div></td></tr>
<tr><td style="padding:14px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">Submitted ${escapeHtml(submitted)}${
    meta.page ? ` from ${escapeHtml(meta.page)}` : ""
  }. Reply to this email to respond to ${escapeHtml(v.firstName)}.</td></tr>
</table></td></tr></table></body></html>`;

  return { subject, text, html };
}

export async function sendContactEmail(cfg: SmtpConfig, v: ContactValues, meta: { submittedAt: Date; page?: string }) {
  const { subject, text, html } = buildContactEmail(v, meta);
  await getTransporter(cfg).sendMail({
    from: { name: "WE Healthcare Website", address: cfg.from },
    to: cfg.to,
    // Replying goes straight to the visitor.
    replyTo: { name: oneLine(`${v.firstName} ${v.lastName}`), address: v.email },
    subject,
    text,
    html,
  });
}
