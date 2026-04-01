import { ArrowRight, Network } from 'lucide-react';
import { TransitionLink } from '@/components/marketing/page-transition';
import type { Metadata } from 'next';
import {
  MarketingCtaSection, MarketingHero, MarketingPageFrame, MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = buildMetadata({
  title: 'Researcher Reconciling Multiple Sources on the Same Topic',
  description: 'Upload the papers, reports, and sources you\'re working across. SILKLEARN maps which findings depend on which foundations, and surfaces where your sources contradict each other.',
  path: '/use-cases/internal-docs-training',
  keywords: ['research synthesis', 'source reconciliation', 'knowledge mapping', 'academic research'],
});

const outcomes = [
  'See which papers depend on which foundations so your reading order stops being accidental',
  'Surface contradictions between sources before they corrupt your mental model',
  'Build a structure you can inspect and refine as you add new material',
];

export default function InternalDocsTrainingPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Use Cases', url: absoluteUrl('/use-cases') },
        { name: 'Research Synthesis', url: absoluteUrl('/use-cases/internal-docs-training') },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
        title: 'You\'re working across multiple sources. They quietly disagree on the foundations.',
        description: 'Upload the papers, reports, and sources you\'re working across. SILKLEARN maps which findings depend on which foundations, and surfaces where your sources contradict each other.',
        url: absoluteUrl('/use-cases/internal-docs-training'),
      })) }} />
      <MarketingPageFrame>
        <MarketingHero
          kicker="Use case"
          title="You're working across multiple sources. They quietly disagree on the foundations."
          description="Research moves fast and sources conflict. When you're working across ten papers on the same topic, you're manually tracking which findings assume which priors, which studies replicate each other, and which ones quietly disagree. SILKLEARN makes that structure explicit — so the contradictions you'd otherwise discover at the wrong moment become visible from the start."
          rightEyebrow="Why this workflow fits"
          rightTitle="This is where the cost of hidden dependency order shows up first."
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
              This is a strong fit when the knowledge already exists in internal systems, but the onboarding or transfer sequence is still implicit and costly to repeat manually.
            </div>
          }
        />
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Expected outcomes</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                The value shows up when teams stop relearning the same system by trial and error.
              </h2>
            </>
          }
          right={
            <div>
              {outcomes.map((outcome, index) => (
                <div key={outcome} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <Network className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Outcome 0{index + 1}</p>
                  </div>
                  <p className="mt-4 text-sm leading-5 text-(--foreground)">{outcome}</p>
                </div>
              ))}
            </div>
          }
        />
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Related paths</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Move from this workflow into the feature or guide that supports it.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/features/canvas">Relevant feature</TransitionLink>
              </div>
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/blog">Supporting guide</TransitionLink>
              </div>
              <div className="sm:col-span-2">
                <Button asChild><TransitionLink href="/waitlist">Talk to us</TransitionLink></Button>
              </div>
            </div>
          }
        />
        <MarketingCtaSection
          kicker="Next step"
          title="Start with one team-critical transfer problem."
          actions={<Button asChild size="lg"><TransitionLink href="/waitlist">Talk to us<ArrowRight className="size-4" /></TransitionLink></Button>}
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
