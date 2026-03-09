import { ArrowRight, GitBranch, ShieldCheck } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { featurePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

const featureSignals = [
  'Structured extraction from real documents',
  'Dependency-aware sequencing across topics',
  'Reviewable outputs before team rollout',
];

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description:
    'Explore SILKLEARN features for dependency mapping, leader review, and turning source documents into structured learning paths.',
  path: '/features',
  keywords: ['SILKLEARN features', 'dependency mapping software', 'leader review workflow'],
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="The core capabilities of SILKLEARN exist to make hidden structure visible, reviewable, and reusable downstream."
          kicker="Features"
          rightChildren={
            <div className="grid gap-3">
              {featureSignals.map((signal) => (
                <div key={signal} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)">
                  {signal}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Feature families"
          rightTitle="The product surface stays focused on extracting structure and keeping review visible."
          title="Product capabilities built around real source material."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Each feature exists to make the compiled graph more defensible and useful.
              </h2>
            </>
          }
          right={
            <div>
              {featurePages.map((page, index) => {
                const Icon = index === 0 ? GitBranch : ShieldCheck;

                return (
                  <div key={page.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                        <Icon className="size-4.5" />
                      </div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                        {index === 0 ? 'Structure extraction' : 'Review layer'}
                      </p>
                    </div>
                    <TransitionLink className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)" href={`/features/${page.slug}`}>
                      {page.title}
                    </TransitionLink>
                    <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">{page.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {page.bullets.map((bullet) => (
                        <div key={bullet} className="border border-(--border) px-4 py-3 text-sm leading-6 text-(--foreground)">
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Request access
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="Start with the feature that unlocks your first workflow."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}