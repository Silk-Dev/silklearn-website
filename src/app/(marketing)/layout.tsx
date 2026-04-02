import type { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { LenisProvider } from '@/components/marketing/lenis-provider';
import { CookieConsent } from '@/components/marketing/cookie-consent';
import { PageTransitionOverlay } from '@/components/marketing/page-transition/page-transition-overlay';

import { CursorTrail } from '@/components/marketing/cursor-trail-loader';

const GrainOverlay = dynamic(() => import('@/components/marketing/grain-overlay').then((m) => m.GrainOverlay));
const IntercomProvider = dynamic(() => import('@/components/marketing/intercom-provider').then((m) => m.IntercomProvider));
const MarketingAnalytics = dynamic(() => import('@/components/marketing/analytics').then((m) => m.MarketingAnalytics));

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      {/* Overlay lives here (layout = persistent) so it never remounts on nav */}
      <PageTransitionOverlay />
      {children}
      <GrainOverlay />
      <CursorTrail />
      <IntercomProvider />
      <MarketingAnalytics />
      <CookieConsent />
    </LenisProvider>
  );
}
