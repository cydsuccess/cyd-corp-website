# CYD Corp Website v3.1

## What's new
- ✅ Instant success animation on form submit (modal + contact section): “You're all set! We'll contact you ASAP 🚀”.
- ✅ Direct email to business Gmail via `/api/contact` (Nodemailer). If SMTP env vars are missing, it falls back to `mailto:`.
- ✅ Smoother nav animations + ripple buttons.
- ✅ Favicon & Logo override: use `/public/favicon.png` and `/public/cyd-icon.png` or env URLs.

## Env vars (Vercel → Project → Settings → Environment Variables)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=cydsuccess@gmail.com
SMTP_PASS=your_gmail_app_password
TO_EMAIL=cydsuccess@gmail.com
NEXT_PUBLIC_SITE_URL=https://cyd-corp.com
# Optional image overrides:
NEXT_PUBLIC_FAVICON_URL=
NEXT_PUBLIC_LOGO_URL=

## Dev
npm install
npm run dev
