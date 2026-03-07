import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

const steps = [
  {
    title: 'Parse source structure',
    body: 'SilkLearn reads the source and preserves enough structure to work with real documents instead of flattening everything into anonymous chunks.',
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

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'See how SilkLearn parses source material, maps dependencies, reconciles overlap, and produces reviewable outputs for teams and AI workflows.',
  path: '/how-it-works',
  keywords: ['how SilkLearn works', 'knowledge compilation workflow', 'dependency mapping workflow'],
});

export default function HowItWorksPage() {
  return (
    <PageShell>
      <section className="rounded-[28px] border border-(--border) bg-(--surface) px-6 py-10 shadow-(--shadow) sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">How it works</p>
        <h1 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.6rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          A 5-pass compiler for turning raw knowledge into usable structure.
        </h1>
        <p className="mt-5 max-w-[64ch] text-[1.02rem] leading-8 text-(--muted-foreground)">
          The pipeline is built around one core idea: access to text is not the same as access to usable structure. SilkLearn reconstructs dependency order, preserves provenance, and hands the result to leaders for review before it is used downstream.
        </p>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step.title} className="bg-white/78">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-(--surface-highlight) text-sm font-semibold text-(--primary)">
                0{index + 1}
              </div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-(--muted-foreground)">{step.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-5 rounded-[24px] border border-(--border) bg-white/82 px-6 py-8 shadow-[0_16px_40px_rgba(22,47,88,0.06)] sm:px-8">
        <h2 className="font-(family-name:--font-display) text-[clamp(2rem,5vw,3.2rem)] leading-[0.96] tracking-[-0.04em] text-(--foreground)">
          The system is only useful if leaders can trust it.
        </h2>
        <p className="mt-4 max-w-[62ch] text-[1rem] leading-8 text-(--muted-foreground)">
          That is why the output is designed for inspection, not blind automation. Compilation reduces manual effort, and review keeps the final graph, roadmap, or context bundle grounded in real domain expectations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/product">View the product page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/features/dependency-mapping">Explore dependency mapping</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}