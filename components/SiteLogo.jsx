// components/SiteLogo.jsx
// Drop-in logo component for Next.js using your SVG assets in /public
// Supports: /logo-symbol.svg (icon) and /logo-full.svg (wordmark)
// Example usage:
//   <SiteLogo variant="symbol" size={40} />
//   <SiteLogo variant="full" size={28} className="ml-2" />

import Link from 'next/link';
import React from 'react';

/**
 * Props:
 * - variant: 'symbol' | 'full'   (default 'symbol')
 * - size: number                 For 'symbol': width/height px; for 'full': height px
 * - className: string             Extra CSS classes
 * - href: string                  Destination link (default '/')
 */
export default function SiteLogo({ variant = 'symbol', size = 40, className = '', href = '/' }) {
  const isSymbol = variant !== 'full';
  const src = isSymbol ? '/logo-symbol.svg' : '/logo-full.svg';
  const alt = isSymbol ? 'CYD Corp logo' : 'CYD Corp';

  const imgProps = isSymbol
    ? { width: size, height: size, style: { width: size, height: size } }
    : { height: size, style: { height: size, width: 'auto' } };

  return (
    <Link href={href} className={`inline-flex items-center ${className}`} aria-label="Go to homepage">
      <img src={src} alt={alt} decoding="async" loading="eager" {...imgProps} />
    </Link>
  );
}
