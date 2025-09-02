import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error: "Method not allowed" });
  try {
    const { name, email, contact, message } = req.body || {};
    const contactValue = contact || email;
    if (!name || !contactValue) return res.status(400).json({ ok:false, error: "Missing name or contact" });

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to   = process.env.TO_EMAIL || "cydsuccess@gmail.com";

    // If SMTP isn't configured, let the client fallback to mailto so no lead is lost
    if (!host || !user || !pass) {
      return res.status(200).json({ ok:true, fallback:true, to });
    }

    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transporter.sendMail({
      from: `CYD Website <${user}>`,
      to,
      subject: `New CYD inquiry from ${name}`,
      text: `Name: ${name}\nContact: ${contactValue}\nMessage: ${message || ""}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Contact:</b> ${contactValue}</p><p><b>Message:</b> ${message || ""}</p>`
    });

    res.status(200).json({ ok:true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error: "Failed to send" });
  }
}
