import { ArrowRight, GitBranch } from 'lucide-react';

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
import { featurePages, getFeaturePage } from '@/lib/marketing-content';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getBreadcrumbSchema, getFaqPageSchema, getWebPageSchema } from '@/lib/structured-data';

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: absoluteUrl('/') },
              { name: 'Features', url: absoluteUrl('/features') },
              { name: page.title, url: absoluteUrl(`/features/${page.slug}`) },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              title: page.title,
              description: page.description,
              url: absoluteUrl(`/features/${page.slug}`),
            })
          ),
        }}
      />
      <MarketingPageFrame>
        <MarketingHero
          description={page.summary}
          kicker="Feature"
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
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
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
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
                  <p className="mt-4 text-sm leading-5 text-(--foreground)">{bullet}</p>
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
                  <TransitionLink className="text-sm font-semibold text-(--foreground)" href={item.href}>
                    {item.title}
                  </TransitionLink>
                </div>
              ))}
              <div className="sm:col-span-2">
                <Button asChild>
                  <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
                </Button>
              </div>
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
          title="Use this capability to make the graph more defensible."
        />

        {page.deepSummary && (
          <section className="border-t border-(--border) py-14 px-6 sm:px-8 lg:px-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">In depth</p>
            <p className="mt-4 max-w-[72ch] text-base leading-7 text-(--foreground)">{page.deepSummary}</p>
          </section>
        )}

        {page.howItWorks && page.howItWorks.length > 0 && (
          <section className="border-t border-(--border) py-14 px-6 sm:px-8 lg:px-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">How it works</p>
            <h2 className="mt-4 font-(family-name:--font-display) text-2xl tracking-tight text-(--foreground)">Step by step</h2>
            <ol className="mt-8 space-y-8">
              {page.howItWorks.map((item, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="text-sm font-bold text-(--muted-foreground) tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-semibold text-(--foreground)">{item.step}</p>
                    <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {page.faqs && page.faqs.length > 0 && (
          <section className="border-t border-(--border) py-14 px-6 sm:px-8 lg:px-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Common questions</p>
            <h2 className="mt-4 font-(family-name:--font-display) text-2xl tracking-tight text-(--foreground)">Frequently asked</h2>
            <dl className="mt-8 space-y-8">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="border-t border-(--border) pt-6">
                  <dt className="text-sm font-semibold text-(--foreground)">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-(--muted-foreground)">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {page.faqs && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageSchema(page.faqs)) }} />
        )}
      </MarketingPageFrame>
    </PageShell>
  );
}