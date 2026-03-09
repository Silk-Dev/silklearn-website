import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { featurePages, guidePages, useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Product',
  description:
    'Learn how SILKLEARN compiles internal docs, specs, and source material into reviewable learning paths, dependency graphs, and context bundles.',
  path: '/product',
  keywords: [
    'knowledge compilation infrastructure',
    'docs to learning paths',
    'reviewable context bundles',
  ],
});

export default function ProductPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          actions={
            <>
              <Button asChild>
                <Link href="/waitlist">Request early access</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/how-it-works">See how it works</Link>
              </Button>
            </>
          }
          description="SILKLEARN is knowledge compilation infrastructure for teams that already have the knowledge, but not the usable structure. It parses, segments, links, and reconciles source material into dependency-aware artifacts that leaders can inspect before they are used by teams or AI systems."
          kicker="Product"
          rightChildren={
            <div className="grid gap-3">
              {[
                'Docs become structure',
                'Assumptions become edges',
                'Knowledge becomes paths',
                'Context becomes reusable',
              ].map((item) => (
                <div key={item} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-(--foreground)">{item}</p>
                </div>
              ))}
            </div>
          }
          rightEyebrow="What the product changes"
          rightTitle="One compiled structure replaces scattered interpretation across docs, teams, and tools."
          title="SILKLEARN compiles messy knowledge into reviewable outputs."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Input to output
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                The product exists to turn document stacks into something teams can act on.
              </h2>
            </>
          }
          right={
            <div className="grid lg:grid-cols-3">
              {[
                {
                  label: 'Input',
                  value:
                    'Internal docs, architecture specs, runbooks, policies, onboarding handbooks, PDFs, and operational references your team already uses.',
                },
                {
                  label: 'Compilation',
                  value:
                    'Parse, segment, enrich, link, and reconcile the material into a dependency-aware graph that exposes scope, order, provenance, and contradiction.',
                },
                {
                  label: 'Outputs',
                  value:
                    'Reviewable learning paths, onboarding flows, knowledge graphs, and context bundles that humans and models can use with less guesswork.',
                },
              ].map((item, index) => (
                <div key={item.label} className={index > 0 ? 'border-t border-(--border) pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0' : ''}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-(--foreground)">{item.value}</p>
                </div>
              ))}
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Explore the surface area
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                The product story is one system viewed through different operational entry points.
              </h2>
            </>
          }
          right={
            <div className="grid lg:grid-cols-3">
              {[
                {
                  label: 'Features',
                  items: featurePages.map((page) => ({
                    href: `/features/${page.slug}`,
                    title: page.title,
                    description: page.description,
                  })),
                },
                {
                  label: 'Use cases',
                  items: useCasePages.map((page) => ({
                    href: `/use-cases/${page.slug}`,
                    title: page.title,
                    description: page.description,
                  })),
                },
                {
                  label: 'Guides',
                  items: guidePages.map((page) => ({
                    href: `/guides/${page.slug}`,
                    title: page.title,
                    description: page.description,
                  })),
                },
              ].map((group, index) => (
                <div key={group.label} className={index > 0 ? 'border-t border-(--border) pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0' : ''}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{group.label}</p>
                  <div className="mt-4 grid gap-4">
                    {group.items.map((item) => (
                      <div key={item.href} className="border-b border-(--border) pb-4 last:border-b-0 last:pb-0">
                        <Link className="text-sm font-semibold text-(--foreground)" href={item.href}>
                          {item.title}
                        </Link>
                        <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">{item.description}</p>
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
                Request early access
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          description="Every output on the product side exists to make that graph inspectable, reusable, and practical for teams working from complex private knowledge."
          kicker="Next step"
          title="The durable asset is the compiled graph, not another summary."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}