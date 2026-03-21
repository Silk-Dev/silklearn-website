import { ArrowRight } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { ProductHeroGraph } from '../../components/marketing/product-hero-graph';
import { ProductScrollSections } from '../../components/marketing/product-scroll-sections';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

const productSummary = [
  {
    label: 'Compile',
    copy:
      'Feed in your document stack. Get back a prerequisite-ordered dependency graph grounded in the source — with every node traced to the exact section it came from.',
  },
  {
    label: 'Review',
    copy:
      'Leaders inspect the graph, reconcile edge conflicts, and approve the structure before it drives onboarding, rollout, or AI context. Nothing ships without sign-off.',
  },
  {
    label: 'Distribute',
    copy:
      'Publish onboarding paths, rollout checklists, review queues, and AI context bundles from one reviewed source. Update the graph — outputs refresh automatically.',
  },
];

export const metadata: Metadata = buildMetadata({
  title: 'Product',
  description:
    'Go deeper on how SILKLEARN compiles document stacks into reviewable graphs, approval workflows, and reusable outputs for onboarding, rollout, AI, and compliance.',
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
        <section className="border-b border-(--border)">
          <div className="grid lg:grid-cols-[1fr_1px_1fr]">
            <div className="px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
              <div className="max-w-165">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                  THE PRODUCT
                </p>
                <h1 className="mt-6 max-w-[15ch] font-(family-name:--font-display) text-[clamp(2.35rem,3.2vw,3.7rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                  A compiled knowledge graph your whole team can review and reuse.
                </h1>
                <p className="mt-5 max-w-[50ch] text-[1.03rem] leading-7 text-(--muted-foreground)">
                  Not a course builder. Not a RAG pipeline. A compilation layer that sits between your raw documents and every team workflow that depends on them — and keeps leaders in review before anything ships.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <TransitionLink href="/waitlist">
                      Request Early Access
                      <ArrowRight className="size-4" />
                    </TransitionLink>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden bg-(--border) lg:block" />

            <div className="hidden border-t border-(--border) sm:block lg:flex lg:items-stretch lg:border-t-0">
              <ProductHeroGraph />
            </div>
          </div>
        </section>

        <section className="grid border-b border-(--border) lg:grid-cols-3">
          {productSummary.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-8 sm:px-8 lg:px-10 lg:py-10 ${index > 0 ? 'border-t border-(--border) lg:border-t-0 lg:border-l' : ''}`}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {item.label}
              </p>
              <p className="mt-4 max-w-[34ch] text-sm leading-6 text-(--foreground)">{item.copy}</p>
            </div>
          ))}
        </section>

        <ProductScrollSections />

        <section className="grid lg:grid-cols-[1fr_1px_auto]">
          <div className="p-6 sm:p-8 lg:p-10 lg:py-14">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Closing CTA
            </p>
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Ready to compile your document stack?
            </h2>
          </div>

          <div className="hidden bg-(--border) lg:block" />

          <div className="border-t border-(--border) p-6 sm:p-8 lg:flex lg:items-center lg:gap-4 lg:border-t-0 lg:p-10 lg:py-14">
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Request Early Access
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <TransitionLink href="/waitlist">Or book a 20-minute walkthrough with the team</TransitionLink>
            </Button>
          </div>
        </section>
      </MarketingPageFrame>
    </PageShell>
  );
}