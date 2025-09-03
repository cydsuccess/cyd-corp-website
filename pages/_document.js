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
        {/* Favicons */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Basic SEO */}
        <meta name="description" content={desc} />
        <meta name="theme-color" content="#06b6d4" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={img} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />

        {/* Preload icon for snappy header render */}
        <link rel="preload" href="/cyd-icon.png" as="image" />
      </Head>
      <body className="bg-neutral-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
