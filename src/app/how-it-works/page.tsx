import { ArrowRight, FileStack, GitBranch, Layers3, ScanSearch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import type { Metadata } from 'next';

import {
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

const steps = [
  {
    title: 'Parse source structure',
    body: 'SILKLEARN reads the source and preserves enough structure to work with real documents instead of flattening everything into anonymous chunks.',
  },
  {
    title: 'Segment coherent units',
    body: 'The system identifies meaningful units of knowledge instead of treating every paragraph like a separate lesson or every chunk like a peer.',
  },
  {
    title: 'Enrich with scope and metadata',
    body: 'Each segment gains concepts, difficulty, and related signals so the result is useful for reasoning, not just display.',
  },
  {
    title: 'Link dependencies across sources',
    body: 'Segments are compared to determine what depends on what, producing a graph instead of a flat list of vaguely similar text.',
  },
  {
    title: 'Reconcile for review',
    body: 'The system reconciles overlaps and contradictions, then outputs a reviewable structure before it turns into operational guidance.',
  },
];

const outputModes = [
  'Reviewable dependency graph',
  'Compiled learning path',
  'Minimum-context bundle',
  'Leader review queue',
];

const operatingPrinciples = [
  'Preserve source structure instead of flattening it',
  'Separate coherent concepts before generating outputs',
  'Infer dependency order across documents and scopes',
  'Keep review in the loop before rollout',
];

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'See how SILKLEARN parses source material, maps dependencies, reconciles overlap, and produces reviewable outputs for teams and AI workflows.',
  path: '/how-it-works',
  keywords: ['how SILKLEARN works', 'knowledge compilation workflow', 'dependency mapping workflow'],
});

export default function HowItWorksPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="SILKLEARN processes source material in sequence so leaders can see how structure was derived, where dependencies came from, and what is ready for review."
          kicker="How it works"
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {operatingPrinciples.map((item) => (
                <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Operating principles"
          rightTitle="The pipeline only works if structure stays grounded in the source and visible in review."
          title="A 5-pass compiler for turning raw knowledge into usable structure."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                The compilation path
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Five passes turn source material into reviewable outputs.
              </h2>
            </>
          }
          right={
            <div>
              {steps.map((step, index) => {
                const Icon = [FileStack, Layers3, ScanSearch, GitBranch, ShieldCheck][index] ?? FileStack;

                return (
                  <div key={step.title} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                        <Icon className="size-4.5" />
                      </div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                        0{index + 1}
                      </p>
                    </div>
                    <h3 className="mt-4 text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-(--muted-foreground)">{step.body}</p>
                  </div>
                );
              })}
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Why review matters
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                The system is only useful if leaders can trust what it produces.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-7 text-(--muted-foreground)">
                That is why the output is designed for inspection, not blind automation. Compilation reduces manual effort, and review keeps the final graph, roadmap, or context bundle grounded in real domain expectations.
              </p>
            </>
          }
          right={
            <div className="grid lg:grid-cols-2">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Output modes</p>
                <div className="mt-4 grid gap-3">
                  {outputModes.map((item) => (
                    <div key={item} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-(--border) pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Review layer</p>
                <h3 className="mt-4 text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                  Review is part of the product, not an afterthought.
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--muted-foreground)">
                  The difference from flat retrieval or generic course generation is not just the data model. It is the fact that the compiled structure can be inspected and approved before anyone depends on it.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/product">
                      View the product page
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/features/dependency-mapping">Explore dependency mapping</Link>
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}