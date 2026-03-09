import { ArrowRight, GitBranch } from 'lucide-react';
import Link from 'next/link';

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
import { featurePages, getFeaturePage } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type FeatureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: FeatureDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/features/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'team learning paths', 'source material training'],
  });
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description={page.summary}
          kicker="Feature"
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-7 text-(--foreground)">
              This capability exists to make hidden knowledge structure inspectable and reusable instead of leaving it embedded in long source documents.
            </div>
          }
          rightEyebrow="Why this matters"
          rightTitle="A feature is only valuable if it makes the compiled graph more defensible in real use."
          title={page.title}
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                What it does
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                This feature turns hidden assumptions into something teams can inspect.
              </h2>
            </>
          }
          right={
            <div>
              {page.bullets.map((bullet, index) => (
                <div key={bullet} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <GitBranch className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Capability 0{index + 1}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-(--foreground)">{bullet}</p>
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
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                See where this capability becomes operationally useful.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: page.useCaseHref, title: 'Relevant use case' },
                { href: page.guideHref, title: 'Supporting guide' },
              ].map((item) => (
                <div key={item.href} className="border border-(--border) p-4">
                  <Link className="text-sm font-semibold text-(--foreground)" href={item.href}>
                    {item.title}
                  </Link>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button asChild>
                  <Link href="/waitlist">Join waitlist</Link>
                </Button>
              </div>
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <Link href="/waitlist">
                Request access
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          kicker="Next step"
          title="Use this capability to make the graph more defensible."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}