import { ArrowRight, BrainCircuit, FileStack, GitBranch, LibraryBig } from 'lucide-react';
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
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-10">
        <div>
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Product</p>
        <h1 className="mt-4 max-w-[9.75ch] font-(family-name:--font-display) text-[clamp(2.9rem,6.4vw,5rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          SILKLEARN compiles messy knowledge into reviewable outputs.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-7 text-(--muted-foreground)">
          SILKLEARN is knowledge compilation infrastructure for teams that already have the knowledge, but not the usable structure. It parses, segments, links, and reconciles source material into dependency-aware artifacts that leaders can inspect before they are used by teams or AI systems.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/waitlist">Join the waitlist</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/how-it-works">See how it works</Link>
          </Button>
        </div>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">What the product changes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Docs become structure', icon: FileStack },
              { title: 'Assumptions become edges', icon: GitBranch },
              { title: 'Knowledge becomes paths', icon: LibraryBig },
              { title: 'Context becomes reusable', icon: BrainCircuit },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-[rgba(10,25,49,0.08)] bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                    <Icon className="size-4.5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-(--foreground)">{item.title}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-(--muted-foreground)">
            Internal docs, architecture specs, runbooks, policies, onboarding handbooks, PDFs, and operational references your team already uses.
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <CardTitle>Compilation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-(--muted-foreground)">
            Parse, segment, enrich, link, and reconcile the material into a dependency-aware graph that exposes scope, order, provenance, and contradiction.
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-[rgba(31,63,122,0.18)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] shadow-[0_20px_80px_rgba(15,23,42,0.16)]">
          <CardHeader>
            <CardTitle className="text-white">Outputs</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-[rgba(255,255,255,0.72)]">
            Reviewable learning paths, onboarding flows, knowledge graphs, and context bundles that humans and models can use with less guesswork.
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none lg:col-span-1">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-(--muted-foreground)">
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

        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none lg:col-span-1">
          <CardHeader>
            <CardTitle>Use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-(--muted-foreground)">
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

        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none lg:col-span-1">
          <CardHeader>
            <CardTitle>Guides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-(--muted-foreground)">
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

      <section className="mt-8 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-[12ch] font-(family-name:--font-display) text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              The durable asset is the compiled graph, not another summary.
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-7 text-(--muted-foreground)">
              Every output on the product side exists to make that graph inspectable, reusable, and practical for teams working from complex private knowledge.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/waitlist">
              Request early access
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}