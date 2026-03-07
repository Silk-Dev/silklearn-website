import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import { defaultMetadata } from '@/lib/seo';

import './globals.css';

const displayFont = Montserrat({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = defaultMetadata;

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