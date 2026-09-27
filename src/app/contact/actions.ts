"use server";

import { headers } from "next/headers";
import { parseContactForm, type ContactFormState } from "@/lib/contact/schema";
import { getSmtpConfig, sendContactEmail } from "@/lib/contact/mailer";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 3000;

/**
 * Best-effort per-IP limit. In-memory, so it resets on restart and is per
 * instance on serverless hosts; put a WAF / edge rate limit in front for more.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const GENERIC_ERROR = `Sorry, we couldn't send your message. Please try again, or email us directly.`;

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field. Pretend success so bots don't retry.
  if (String(formData.get("website") ?? "")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const parsed = parseContactForm(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values: parsed.values,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
      values: parsed.values,
    };
  }

  const cfg = getSmtpConfig();
  const meta = { submittedAt: new Date(), page: h.get("referer") ?? undefined };

  if (!cfg) {
    // Local development without SMTP: log instead of failing so the form can be tested.
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] SMTP not configured; submission not emailed:", parsed.values);
      return { status: "success" };
    }
    console.error("[contact] SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS).");
    return { status: "error", message: GENERIC_ERROR, values: parsed.values };
  }

  try {
    await sendContactEmail(cfg, parsed.values, meta);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return { status: "error", message: GENERIC_ERROR, values: parsed.values };
  }
}
