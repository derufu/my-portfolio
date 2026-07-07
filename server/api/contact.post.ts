import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

// Lightweight in-memory rate limiting (per warm serverless instance).
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5; // messages per IP per window
const MIN_INTERVAL_MS = 15 * 1000; // min gap between messages
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length && now - recent[recent.length - 1] < MIN_INTERVAL_MS) {
    return false;
  }
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return true;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const name = (body?.name || "").toString().trim();
  const email = (body?.email || "").toString().trim();
  const message = (body?.message || "").toString().trim();
  const honey = (body?._honey || body?.honey || "").toString();

  // Honeypot: pretend success so bots don't retry.
  if (honey) return { success: true };

  if (
    !EMAIL_RE.test(email) ||
    message.length < 5 ||
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "A valid email and a message (max 5000 chars) are required.",
    });
  }

  const ip =
    getRequestIP(event, { xForwardedFor: true }) ||
    getRequestHeader(event, "x-real-ip") ||
    "unknown";
  if (!allow(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many messages. Please wait a bit and try again.",
    });
  }

  const config = useRuntimeConfig();
  const user = config.gmailUser || process.env.GMAIL_USER || "";
  const pass = config.gmailAppPassword || process.env.GMAIL_APP_PASSWORD || "";
  const to =
    config.contactTo || process.env.CONTACT_TO || "delf.boston@gmail.com";

  // Not configured yet → let the client fall back to its relay.
  if (!user || !pass) {
    throw createError({
      statusCode: 503,
      statusMessage: "email-not-configured",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const safe = (s: string) =>
    s.replace(/[<>&]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
    );

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name || email}`,
    text: `From: ${name || "Anonymous"} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${safe(name || "Anonymous")} &lt;${safe(
      email
    )}&gt;</p><p style="white-space:pre-wrap">${safe(message)}</p>`,
  });

  return { success: true, via: "gmail" };
});
