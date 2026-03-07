import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featurePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description:
    'Explore SilkLearn features for dependency mapping, leader review, and turning source documents into structured learning paths.',
  path: '/features',
  keywords: ['SilkLearn features', 'dependency mapping software', 'leader review workflow'],
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Features</p>
        <h1 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
          Product capabilities built around real source material.
        </h1>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        {featurePages.map((page) => (
          <Card key={page.slug} className="bg-white/78">
            <CardHeader>
              <CardTitle>
                <Link href={`/features/${page.slug}`}>{page.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">{page.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {page.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}