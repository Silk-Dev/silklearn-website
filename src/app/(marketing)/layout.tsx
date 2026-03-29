import type { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { LenisProvider } from '@/components/marketing/lenis-provider';
import { CookieConsent } from '@/components/marketing/cookie-consent';

const GrainOverlay = dynamic(() => import('@/components/marketing/grain-overlay').then((m) => m.GrainOverlay));
const IntercomProvider = dynamic(() => import('@/components/marketing/intercom-provider').then((m) => m.IntercomProvider));
const MarketingAnalytics = dynamic(() => import('@/components/marketing/analytics').then((m) => m.MarketingAnalytics));

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      {children}
      <GrainOverlay />
      <IntercomProvider />
      <MarketingAnalytics />
      <CookieConsent />
    </LenisProvider>
  );
}
