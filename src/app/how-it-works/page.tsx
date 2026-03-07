import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

const steps = [
  {
    title: 'Parse the material',
    body: 'SilkLearn reads the source and preserves enough structure to work with real documents instead of flattened snippets.',
  },
  {
    title: 'Segment what is learnable',
    body: 'The system identifies meaningful chunks of knowledge instead of treating every paragraph like a separate lesson.',
  },
  {
    title: 'Enrich and classify',
    body: 'Each segment gets additional signals so the path is more useful than a simple outline.',
  },
  {
    title: 'Link dependencies',
    body: 'Segments are compared to determine what depends on what, producing a graph instead of a flat list.',
  },
  {
    title: 'Reconcile for review',
    body: 'The system outputs a cycle-free result that leaders can inspect before it turns into operational guidance.',
  },
];

export const metadata: Metadata = buildMetadata({
  title: 'How It Works',
  description:
    'See how SilkLearn parses source material, maps dependencies, and produces a reviewable learning path for teams.',
  path: '/how-it-works',
  keywords: ['how SilkLearn works', 'dependency mapping workflow', 'learning path generation process'],
});

export default function HowItWorksPage() {
  return (
    <PageShell>
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">How it works</p>
        <h1 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.6rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
          A 5-pass system for turning documents into learning order.
        </h1>
        <p className="mt-5 max-w-[64ch] text-[1.02rem] leading-8 text-[color:var(--muted-foreground)]">
          The pipeline is built around the idea that the order of knowledge matters. SilkLearn reconstructs that order from source material, then hands the result to leaders for review.
        </p>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step.title} className="bg-white/78">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--surface-highlight)] text-sm font-semibold text-[color:var(--primary)]">
                0{index + 1}
              </div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-[color:var(--muted-foreground)]">{step.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-5 rounded-[24px] border border-[color:var(--border)] bg-white/82 px-6 py-8 shadow-[0_16px_40px_rgba(22,47,88,0.06)] sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.2rem)] leading-[0.96] tracking-[-0.04em] text-[color:var(--foreground)]">
          The system is only useful if leaders can trust it.
        </h2>
        <p className="mt-4 max-w-[62ch] text-[1rem] leading-8 text-[color:var(--muted-foreground)]">
          That is why the output is designed for inspection, not blind automation. Generated structure reduces manual effort, and review keeps the final path grounded in real domain expectations.
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