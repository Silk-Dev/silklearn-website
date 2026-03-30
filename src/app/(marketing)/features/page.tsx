import { ArrowRight, GitBranch, ShieldCheck } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { FloatingCta } from '@/components/marketing/floating-cta';
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
  "You have the sources. You still don't know which one to open first.",
  "Two of your sources disagree. Neither one flags it.",
  "AI answers your questions. It doesn't tell you which question to ask first.",
];

export const metadata: Metadata = buildMetadata({
  title: 'Features — Dependency Mapping & Leader Review',
  description:
    'Explore SILKLEARN features: dependency mapping that surfaces what to read first, contradiction detection across sources, and a path-building layer that turns documents into structure.',
  path: '/features',
  keywords: ['SILKLEARN features', 'dependency mapping', 'knowledge synthesis', 'contradiction detection'],
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="Every document you're learning from was organized by someone who already knew where to start — they wrote it in the order that made sense to them, which is almost never the order that makes sense to you. SILKLEARN maps what depends on what, surfaces where your sources disagree, and gives you a path through the structure your materials assume you already have."
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
          rightTitle="Two problems existing tools ignore: knowing what to read first, and being able to trust that order."
          title="Your documents already contain the path. You just can't see it yet."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                The structure comes from your sources. You inspect it before you follow it.
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
          title="The reading order is already in your documents. Let's find it."
        />
      </MarketingPageFrame>
      <FloatingCta />
    </PageShell>
  );
}