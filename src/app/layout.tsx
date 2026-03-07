import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Instrument_Serif, Space_Grotesk } from 'next/font/google';

import './globals.css';

const displayFont = Instrument_Serif({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
});

const bodyFont = Space_Grotesk({
  variable: '--font-body',
  subsets: ['latin'],
});

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return configuredUrl;
  }

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (productionUrl) {
    return `https://${productionUrl}`;
  }

  const previewUrl = process.env.VERCEL_URL;

  if (previewUrl) {
    return `https://${previewUrl}`;
  }

  return 'http://localhost:3000';
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'SilkLearn',
  description:
    'Turn dense knowledge into dependency-ordered learning paths for your team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}