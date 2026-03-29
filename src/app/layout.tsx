import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';

import dynamic from 'next/dynamic';

import { LenisProvider } from '@/components/marketing/lenis-provider';
import { CookieConsent } from '@/components/marketing/cookie-consent';

const GrainOverlay = dynamic(() => import('@/components/marketing/grain-overlay').then((m) => m.GrainOverlay));
const IntercomProvider = dynamic(() => import('@/components/marketing/intercom-provider').then((m) => m.IntercomProvider));
const MarketingAnalytics = dynamic(() => import('@/components/marketing/analytics').then((m) => m.MarketingAnalytics));
import { defaultMetadata } from '@/lib/seo';
import {
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getWebsiteSchema,
} from '@/lib/structured-data';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

const displayFont = Montserrat({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
        <Script id="silklearn-structured-data" type="application/ld+json">
          {JSON.stringify([
            getOrganizationSchema(),
            getWebsiteSchema(),
            getSoftwareApplicationSchema(),
          ])}
        </Script>
        <LenisProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <GrainOverlay />
          <IntercomProvider />
          <MarketingAnalytics />
        </LenisProvider>
        <CookieConsent />
      </body>
    </html>
  );
}