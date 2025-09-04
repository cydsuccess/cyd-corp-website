import Image from 'next/image';
import Link from 'next/link';

export default function SiteLogo({ variant = "symbol", size = 40, withLink = false, href = "/" }) {
  // Choose the right SVG file
  const src = variant === "full" ? "/logo-full.svg" : "/logo-symbol.svg";

  const logo = (
    <Image
      src={src}
      alt="CYD Logo"
      width={size}
      height={size}
      priority
    />
  );

  // Wrap in <Link> only if explicitly asked
  if (withLink) {
    return (
      <Link href={href}>
        {logo}
      </Link>
    );
  }

  return logo;
}
