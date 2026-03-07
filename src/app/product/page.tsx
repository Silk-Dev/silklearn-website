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
    'Learn how SilkLearn turns internal docs, specs, and source material into dependency-ordered learning paths for teams.',
  path: '/product',
  keywords: [
    'learning path software',
    'docs to learning paths',
    'team learning path generation',
  ],
});

export default function ProductPage() {
  return (
    <PageShell>
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Product</p>
        <h1 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.6rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
          Source material becomes a structured learning path.
        </h1>
        <p className="mt-5 max-w-[64ch] text-[1.02rem] leading-8 text-[color:var(--muted-foreground)]">
          SilkLearn is built for teams that already have the knowledge in documents, but do not have the dependency order made explicit. The system decomposes source material into segments, links prerequisite logic, and keeps leaders in review before rollout.
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
          <CardContent className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            Internal docs, architecture specs, onboarding handbooks, PDFs, and operational references your team already uses.
          </CardContent>
        </Card>

        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Process</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            Parse, segment, enrich, link, and reconcile the material into a cycle-free graph that exposes actual learning order.
          </CardContent>
        </Card>

        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-[color:var(--muted-foreground)]">
            A dependency-ordered learning path leaders can inspect, refine, and eventually use for team rollout.
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="bg-[color:var(--card)] lg:col-span-1">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
            {featurePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-[color:var(--foreground)]" href={`/features/${page.slug}`}>
                  {page.title}
                </Link>
                <br />
                {page.description}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[color:var(--card)] lg:col-span-1">
          <CardHeader>
            <CardTitle>Use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
            {useCasePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-[color:var(--foreground)]" href={`/use-cases/${page.slug}`}>
                  {page.title}
                </Link>
                <br />
                {page.description}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[color:var(--card)] lg:col-span-1">
          <CardHeader>
            <CardTitle>Guides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
            {guidePages.map((page) => (
              <p key={page.slug}>
                <Link className="font-semibold text-[color:var(--foreground)]" href={`/guides/${page.slug}`}>
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