import type { Metadata } from 'next';

import dynamic from 'next/dynamic';

import {
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

const WaitlistForm = dynamic(
  () => import('@/components/waitlist-form').then(mod => mod.WaitlistForm),
);

export const metadata: Metadata = buildMetadata({
  title: 'Waitlist',
  description:
    'Join the SILKLEARN waitlist if your team works from dense source material and wants reviewable learning paths, dependency graphs, and context bundles.',
  path: '/waitlist',
  keywords: ['SILKLEARN waitlist', 'knowledge compilation beta', 'reviewable learning path software'],
});

export default function WaitlistPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="Early access is aimed at teams testing onboarding flows, knowledge audits, and AI context workflows built from dense private material. If your problem is hidden structure, not missing documents, SILKLEARN is for you."
          kicker="Waitlist"
          rightChildren={
            <div className="grid gap-3">
              {[
                'Dense private docs already exist',
                'Onboarding or handoffs still depend on experts',
                'Wrong sequence creates expensive mistakes',
                'AI context needs better structure before retrieval',
              ].map((item) => (
                <div key={item} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Best fit"
          rightTitle="If the problem is hidden dependency order rather than missing documentation, this is the right entry point."
          title="Bring your team’s raw knowledge into reviewable structure."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Request access
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Tell us what document stack you want to compile first.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-5 text-(--muted-foreground)">
                The beta is best for leaders working from dense internal docs where onboarding, compliance review, operational handoffs, or internal AI delivery still depend on hidden structure.
              </p>
            </>
          }
          right={<WaitlistForm />}
        />
      </MarketingPageFrame>
    </PageShell>
  );
}