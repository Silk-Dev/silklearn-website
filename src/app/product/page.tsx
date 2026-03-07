import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featurePages, guidePages, useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Product',
  description:
    'Learn how SilkLearn compiles internal docs, specs, and source material into reviewable learning paths, dependency graphs, and context bundles.',
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
      <section className="rounded-[28px] border border-(--border) bg-(--surface) px-6 py-10 shadow-(--shadow) sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Product</p>
        <h1 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.6rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          SilkLearn compiles messy knowledge into reviewable outputs.
        </h1>
        <p className="mt-5 max-w-[64ch] text-[1.02rem] leading-8 text-(--muted-foreground)">
          SilkLearn is knowledge compilation infrastructure for teams that already have the knowledge, but not the usable structure. It parses, segments, links, and reconciles source material into dependency-aware artifacts that leaders can inspect before they are used by teams or AI systems.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/waitlist">Join the waitlist</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/how-it-works">See how it works</Link>
          </Button>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-(--muted-foreground)">
            Internal docs, architecture specs, runbooks, policies, onboarding handbooks, PDFs, and operational references your team already uses.
          </CardContent>
        </Card>

        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Compilation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-(--muted-foreground)">
            Parse, segment, enrich, link, and reconcile the material into a dependency-aware graph that exposes scope, order, provenance, and contradiction.
          </CardContent>
        </Card>

        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Outputs</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-(--muted-foreground)">
            Reviewable learning paths, onboarding flows, knowledge graphs, and context bundles that humans and models can use with less guesswork.
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="bg-(--card) lg:col-span-1">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-(--muted-foreground)">
            {featurePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-(--foreground)" href={`/features/${page.slug}`}>
                  {page.title}
                </Link>
                <br />
                {page.description}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-(--card) lg:col-span-1">
          <CardHeader>
            <CardTitle>Use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-(--muted-foreground)">
            {useCasePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-(--foreground)" href={`/use-cases/${page.slug}`}>
                  {page.title}
                </Link>
                <br />
                {page.description}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-(--card) lg:col-span-1">
          <CardHeader>
            <CardTitle>Guides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-(--muted-foreground)">
            {guidePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-(--foreground)" href={`/guides/${page.slug}`}>
                  {page.title}
                </Link>
                <br />
                {page.description}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}