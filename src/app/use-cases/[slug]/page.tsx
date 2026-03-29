import { ArrowRight, Network } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { getUseCasePage, useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type UseCaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return useCasePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: UseCaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/use-cases/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'internal docs onboarding', 'team knowledge transfer'],
  });
}

export default async function UseCaseDetailPage({ params }: UseCaseDetailPageProps) {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description={page.summary}
          kicker="Use case"
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
              This is a strong fit when the knowledge already exists in internal systems, but the onboarding or transfer sequence is still implicit and costly to repeat manually.
            </div>
          }
          rightEyebrow="Why this workflow fits"
          rightTitle="This is where the cost of hidden dependency order shows up first."
          title={page.title}
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Expected outcomes
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                The value shows up when teams stop relearning the same system by trial and error.
              </h2>
            </>
          }
          right={
            <div>
              {page.outcomes.map((outcome, index) => (
                <div key={outcome} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <Network className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Outcome 0{index + 1}
                    </p>
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
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Related paths
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Move from this workflow into the feature or guide that supports it.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: page.featureHref, title: 'Relevant feature' },
                { href: page.guideHref, title: 'Supporting guide' },
              ].map((item) => (
                <div key={item.href} className="border border-(--border) p-4">
                  <TransitionLink className="text-sm font-semibold text-(--foreground)" href={item.href}>
                    {item.title}
                  </TransitionLink>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button asChild>
                  <TransitionLink href="/waitlist">Talk to us</TransitionLink>
                </Button>
              </div>
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Talk to us
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="Start with one team-critical transfer problem."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}