// pages/api/contact.js
import nodemailer from "nodemailer";

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "TO_EMAIL"];

function missingEnv() {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
  return missing.length ? missing : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const { name, email: contact, message } = req.body || {};
  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: "MISSING_FIELDS", hint: "name and email/telegram required" });
  }

  // If env is missing, tell client to fallback to mailto (so you still get the lead)
  const missing = missingEnv();
  if (missing) {
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
      // Hard timeouts so functions don’t hang
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    // Verify SMTP is reachable (great for spotting wrong app password)
    await transporter.verify();

    const subject = `🚀 New CYD inquiry from ${name}`;
    const html = `
      <h2>New client request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)")}</p>
    `;
    const text = `New client request
Name: ${name}
Contact: ${contact}
Message:
${message || "(none)"}
`;

    await transporter.sendMail({
      from: `"CYD Website" <${user}>`,  // MUST be your SMTP_USER for Gmail
      to,
      subject,
      text,
      html,
      replyTo: contact,                  // so you can hit reply to the client
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

// Basic sanitizer to avoid HTML injection in email
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
