import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const faviconUrl = process.env.NEXT_PUBLIC_FAVICON_URL || "/favicon.png";
  return (
    <>
      <Head>
        <title>CYD Corp – AI Automation Agency</title>
        <meta name="description" content="Automating your future with AI + n8n." />
        <link rel="icon" href={faviconUrl} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
