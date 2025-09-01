import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error: "Method not allowed" });
  try {
    const { name, contact, message } = req.body || {};
    if (!name || !contact) return res.status(400).json({ ok:false, error: "Missing name or contact" });

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to   = process.env.TO_EMAIL || "cydsuccess@gmail.com";

    if (!host || !user || !pass) {
      // Fallback: allow mailto if SMTP isn't configured
      return res.status(200).json({ ok:true, fallback:true, to });
    }

    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

    await transporter.sendMail({
      from: `${name} <no-reply@${(new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com")).hostname}>`,
      to,
      subject: `New CYD inquiry from ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nMessage: ${message || ""}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Contact:</b> ${contact}</p><p><b>Message:</b> ${message || ""}</p>`
    });

    res.status(200).json({ ok:true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error: "Failed to send" });
  }
}
