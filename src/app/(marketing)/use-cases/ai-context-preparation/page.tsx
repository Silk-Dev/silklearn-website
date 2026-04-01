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
  title: 'Structured Knowledge Context for AI Agents and Workflows',
  description: 'Feed any sources into SILKLEARN. It maps the dependency structure and hands your agent a context bundle it can actually reason across — ordered, reviewed, and linked to source.',
  path: '/use-cases/ai-context-preparation',
  keywords: ['AI context', 'agent knowledge', 'structured context', 'RAG alternative'],
});

const outcomes = [
  'Dependency-ordered context your agent can traverse without RAG guesswork',
  'Every claim traced to its source — no hallucinated foundations',
  'Update your sources, re-synthesize, push a fresh context bundle to your workflow',
];

export default function AiContextPreparationPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Use Cases', url: absoluteUrl('/use-cases') },
        { name: 'AI Context Preparation', url: absoluteUrl('/use-cases/ai-context-preparation') },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
        title: 'You\'re building AI workflows. Your agents need structured knowledge, not a retrieval guess.',
        description: 'Feed any sources into SILKLEARN. It maps the dependency structure and hands your agent a context bundle it can actually reason across — ordered, reviewed, and linked to source.',
        url: absoluteUrl('/use-cases/ai-context-preparation'),
      })) }} />
      <MarketingPageFrame>
        <MarketingHero
          kicker="Use case"
          title="You're building AI workflows. Your agents need structured knowledge, not a retrieval guess."
          description="Vector stores retrieve. They don't reason about what depends on what. When your agent needs to understand a domain — not just retrieve from it — the reading order and dependency structure matter. SILKLEARN hands your agent the synthesized structure a human already inspected."
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
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/features/mcp-integration">Relevant feature</TransitionLink>
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
