import { ArrowRight, Network } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Use Cases',
  description:
    'See how SILKLEARN is used for engineering onboarding, internal docs training, and other dense knowledge rollout workflows.',
  path: '/use-cases',
  keywords: ['engineering onboarding software', 'internal docs training', 'team enablement use cases'],
});

export default function UseCasesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="SILKLEARN is most valuable in workflows where dense private knowledge already exists but the reasoning order is still trapped in docs and expert memory."
          kicker="Use cases"
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {['High-cost mistakes', 'Dense documentation', 'Recurring onboarding', 'Private team knowledge'].map((item) => (
                <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Best fit"
          rightTitle="This is where compiled structure pays off before another training or handoff gets rebuilt manually."
          title="Where the product is most useful first."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Workflow fit
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Start with the workflow where missing context already hurts the team.
              </h2>
            </>
          }
          right={
            <div>
              {useCasePages.map((page, index) => (
                <div key={page.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <Network className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Use case {index + 1}
                    </p>
                  </div>
                  <Link className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)" href={`/use-cases/${page.slug}`}>
                    {page.title}
                  </Link>
                  <p className="mt-3 max-w-[56ch] text-sm leading-7 text-(--muted-foreground)">{page.summary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {page.outcomes.map((outcome) => (
                      <div key={outcome} className="border border-(--border) px-4 py-3 text-sm leading-6 text-(--foreground)">
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <Link href="/waitlist">
                Talk to us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          kicker="Next step"
          title="Pick one workflow and compile it end to end."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}