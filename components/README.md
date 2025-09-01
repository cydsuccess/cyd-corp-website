# CYD Corp Website — Updated (Full Project)

Includes:
- Modal lead form (opens via buttons, posts to `/api/contact`), Gmail fallback
- Your CYD icon at `/public/cyd-icon.png`
- Neon case-study SVGs in `/public`
- Animated technical background component
- Neon hover + ripple click buttons

## Dev
npm install
npm run dev

## Env (Vercel → Settings → Environment Variables)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_gmail_username@gmail.com
SMTP_PASS=your_gmail_app_password
TO_EMAIL=cydsuccess@gmail.com
NEXT_PUBLIC_SITE_URL=https://cyd-corp.com
