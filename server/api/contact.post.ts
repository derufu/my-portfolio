import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const name = (body?.name || "").toString().trim();
  const email = (body?.email || "").toString().trim();
  const message = (body?.message || "").toString().trim();
  const honey = (body?._honey || body?.honey || "").toString();

  // Honeypot: pretend success so bots don't retry.
  if (honey) return { success: true };

  if (!EMAIL_RE.test(email) || message.length < 5) {
    throw createError({
      statusCode: 400,
      statusMessage: "A valid email and a short message are required.",
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
