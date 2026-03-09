import { ArrowRight, BookOpenText } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { getGuidePage, guidePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type GuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/guides/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'knowledge transfer guide', 'team onboarding guide'],
  });
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description={page.summary}
          kicker="Guide"
          rightChildren={
            <div className="grid gap-3">
              {page.sections.map((section) => (
                <div key={section.heading} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-(--foreground)">{section.heading}</p>
                </div>
              ))}
            </div>
          }
          rightEyebrow="What this guide covers"
          rightTitle="The guide should explain the sequencing logic clearly enough to stand on its own."
          title={page.title}
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Sections
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Read the argument in sequence, not as isolated tips.
              </h2>
            </>
          }
          right={
            <div>
              {page.sections.map((section, index) => (
                <section key={section.heading} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <BookOpenText className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Section 0{index + 1}
                    </p>
                  </div>
                  <h2 className="mt-4 text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">{section.heading}</h2>
                  <p className="mt-3 max-w-[62ch] text-sm leading-5 text-(--muted-foreground)">{section.body}</p>
                </section>
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
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Move from theory into the feature or workflow where it applies.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href={page.featureHref}>
                  Continue to the relevant feature page
                </TransitionLink>
              </div>
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href={page.useCaseHref}>
                  See where this guide applies in practice
                </TransitionLink>
              </div>
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Start with your docs
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="Apply this guide to your own private source base."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}