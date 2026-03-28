'use client';

import dynamic from 'next/dynamic';

const MarketingAnalytics = dynamic(
  () => import('@/components/marketing/analytics').then((m) => m.MarketingAnalytics),
  { ssr: false },
);

const GrainOverlay = dynamic(
  () => import('@/components/marketing/grain-overlay').then((m) => m.GrainOverlay),
  { ssr: false },
);

const IntercomProvider = dynamic(
  () => import('@/components/marketing/intercom-provider').then((m) => m.IntercomProvider),
  { ssr: false },
);

export function DeferredProviders() {
  return (
    <>
      <GrainOverlay />
      <MarketingAnalytics />
      <IntercomProvider />
    </>
  );
}
