
# CYD Corp Website v2.0

**Changes in 2.0**
- Removed the entire "Inspired by leaders • Privacy-first • Human-in-the-loop" brand grid section.
- Added animations to **every button** (nav links + CTAs) using NeonButton (glow + ripple).
- Favicon support via `/public/favicon.png` or `NEXT_PUBLIC_FAVICON_URL`.
- Site logo can be swapped via `/public/cyd-icon.png` or `NEXT_PUBLIC_LOGO_URL`.

## How to use your provided images
You sent links hosted on ibb.co. Since the build cannot download external files automatically, choose one:
1) **File replace (recommended):**
   - Save your favicon image as `public/favicon.png` (square, 256–512px).
   - Save your site icon as `public/cyd-icon.png`.
2) **Env URL (no file needed):** set in Vercel → Settings → Environment Variables
   - `NEXT_PUBLIC_FAVICON_URL=https://<direct-image-url>`
   - `NEXT_PUBLIC_LOGO_URL=https://<direct-image-url>`

> Note: ibb pages like `https://ibb.co/...` are HTML pages; use the direct image URL (`https://i.ibb.co/...`).

## Email form (serverless)
Set env vars in Vercel:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_gmail_username@gmail.com
SMTP_PASS=your_gmail_app_password
TO_EMAIL=cydsuccess@gmail.com
NEXT_PUBLIC_SITE_URL=https://cyd-corp.com
```

## Develop
```
npm install
npm run dev
```

## Deploy
Push to GitHub → Vercel auto-deploy. If `nodemailer` not found, **Clear build cache** and redeploy.
