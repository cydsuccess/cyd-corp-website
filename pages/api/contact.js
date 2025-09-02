// pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "cydsuccess@gmail.com",
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CYD Website" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || "cydsuccess@gmail.com",
      subject: "🚀 New Lead from CYD Website",
      html: `
        <h2>New client request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email/Telegram:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || "(none)"}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
