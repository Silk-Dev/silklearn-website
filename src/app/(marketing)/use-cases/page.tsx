import { ArrowRight, Network } from 'lucide-react';

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
import { useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Use Cases — Knowledge Compilation for Teams',
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
          description="The knowledge is written down somewhere — in runbooks, papers, architecture docs, decision records. The order you're supposed to encounter it in lives in one person's head. When that person's unavailable, so is the path."
          kicker="Use cases"
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {['The expert explains it every time', "Docs exist, order doesn't", 'Every new hire starts from scratch', 'The knowledge left when she did'].map((item) => (
                <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Best fit"
          rightTitle="This is where it pays off before another onboarding or handoff gets rebuilt from scratch."
          title="The knowledge exists. The path through it doesn't."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Workflow fit
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Start where missing context is already costing something.
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
                  <TransitionLink className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)" href={`/use-cases/${page.slug}`}>
                    {page.title}
                  </TransitionLink>
                  <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">{page.summary}</p>
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
              <TransitionLink href="/waitlist">
                Show us your workflow
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="Pick one workflow. Run it through. See what your docs actually contain."
        />
      </MarketingPageFrame>
      <FloatingCta />
    </PageShell>
  );
}