// pages/api/contact.js
import nodemailer from "nodemailer";

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "TO_EMAIL"];
const hasMissingEnv = () =>
  REQUIRED_ENV.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  // Ensure JSON body
  let body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, error: "INVALID_JSON_BODY" });
  }

  // Accept name + (email | contact | telegram) + optional message
  const name = (body.name || "").trim();
  const email = (body.email || body.contact || body.telegram || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email) {
    return res.status(400).json({
      ok: false,
      error: "MISSING_FIELDS",
      hint: "Provide 'name' and 'email' (or 'contact' / 'telegram')."
    });
  }

  // If SMTP not configured, fall back gracefully (so you still get leads)
  const missing = hasMissingEnv();
  if (missing.length) {
    return res.status(200).json({
      ok: true,
      fallback: true,
      to: "cydsuccess@gmail.com",
      reason: `Missing env: ${missing.join(", ")}`
    });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to   = process.env.TO_EMAIL;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    await transporter.verify(); // validate SMTP credentials/connectivity

    const subject = `🚀 New CYD inquiry from ${name}`;
    const html = `
      <h2>New client request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)")}</p>
    `;
    const text = `New client request
Name: ${name}
Contact: ${email}
Message:
${message || "(none)"}
`;

    await transporter.sendMail({
      from: `"CYD Website" <${user}>`,  // must match SMTP_USER for Gmail
      to,
      subject,
      text,
      html,
      replyTo: email
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", {
      message: err?.message,
      code: err?.code,
      response: err?.response,
    });
    return res.status(500).json({ ok: false, error: "SMTP_SEND_FAILED" });
  }
}
