import { ArrowRight, FileStack, GitBranch, Layers3, ScanSearch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">How it works</p>
          <h1 className="mt-4 max-w-[9.75ch] font-(family-name:--font-display) text-[clamp(2.9rem,6vw,4.8rem)] leading-[0.9] tracking-[-0.055em] text-(--foreground)">
            A 5-pass compiler for turning raw knowledge into usable structure.
          </h1>
          <p className="mt-5 max-w-[56ch] text-base leading-7 text-(--muted-foreground)">
            SILKLEARN processes source material in sequence so leaders can see how structure was derived, where dependencies came from, and what is ready for review.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {operatingPrinciples.map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] px-4 py-3 text-sm font-medium text-(--foreground)">
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader className="border-b border-(--border) pb-4">
            <CardTitle className="text-lg">Compilation overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6">
            {steps.slice(0, 4).map((step, index) => {
              const Icon = [FileStack, Layers3, ScanSearch, GitBranch][index] ?? FileStack;

              return (
                <div key={step.title} className="grid gap-4 rounded-3xl border border-[rgba(10,25,49,0.08)] bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-(--foreground)">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step.title} className={index === 4 ? 'rounded-3xl border-[rgba(31,63,122,0.18)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] text-white shadow-[0_20px_80px_rgba(15,23,42,0.16)]' : 'rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none'}>
            <CardHeader>
              <div className={index === 4 ? 'mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white' : 'mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-(--surface-highlight) text-sm font-semibold text-(--primary)'}>
                0{index + 1}
              </div>
              <CardTitle className={index === 4 ? 'text-white' : ''}>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className={index === 4 ? 'text-sm leading-6 text-[rgba(255,255,255,0.72)]' : 'text-sm leading-6 text-(--muted-foreground)'}>
              {step.body}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="font-(family-name:--font-display) text-[clamp(2.1rem,4vw,3.1rem)] leading-[0.95] tracking-[-0.04em]">
              The system is only useful if leaders can trust it.
            </CardTitle>
            <CardContent className="px-0 pt-4 text-base leading-7 text-(--muted-foreground)">
              That is why the output is designed for inspection, not blind automation. Compilation reduces manual effort, and review keeps the final graph, roadmap, or context bundle grounded in real domain expectations.
            </CardContent>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {outputModes.map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] px-4 py-3 text-sm font-medium text-(--foreground)">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] text-white shadow-[0_22px_90px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
              <ShieldCheck className="size-4.5" />
            </div>
            <CardTitle className="mt-4 text-white">Review is part of the product, not an afterthought.</CardTitle>
            <CardContent className="px-0 pt-4 text-sm leading-6 text-[rgba(255,255,255,0.72)]">
              The difference from flat retrieval or generic course generation is not just the data model. It is the fact that the compiled structure can be inspected and approved before anyone depends on it.
            </CardContent>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/product">
                View the product page
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
              <Link href="/features/dependency-mapping">Explore dependency mapping</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}