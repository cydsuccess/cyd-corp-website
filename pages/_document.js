// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const title = "CYD Corp — AI Automation Agency";
  const desc =
    "We design, build, and maintain AI automations with n8n and modern LLMs. Save time, scale ops, grow revenue.";
  const url = "https://cyd-corp.com";
  const img = "/og.png"; // add this to /public if you want a custom social preview

  return (
    <Html lang="en" className="bg-neutral-950">
     <Head>
  {/* Basic SEO (keep your own values) */}
  <meta name="theme-color" content="#0A0F1C" />

  {/* --- FAVICONS & PWA ICONS (canonical set) --- */}
  <link rel="icon" type="image/svg+xml" href="/icon.svg?v=6" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="shortcut icon" href="/favicon-32x32.png" />


  {/* Social preview (adjust to your actual preview image if you have one) */}
  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="CYD Corp — AI Automation Agency" />
  <meta property="og:description" content="We design, build, and maintain AI automations." />
  <meta property="og:url" content="https://cyd-corp.com" />
  <meta property="og:image" content="https://cyd-corp.com/og.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CYD Corp — AI Automation Agency" />
  <meta name="twitter:description" content="We design, build, and maintain AI automations." />
  <meta name="twitter:image" content="https://cyd-corp.com/og.jpg" />
</Head>
      <body className="bg-neutral-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
