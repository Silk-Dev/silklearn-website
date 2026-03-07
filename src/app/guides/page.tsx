import Link from 'next/link';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { guidePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guides',
  description:
    'Read practical guides on dependency-ordered learning, turning docs into onboarding paths, and structuring team knowledge transfer.',
  path: '/guides',
  keywords: ['team learning guides', 'docs to training guide', 'dependency ordered learning'],
});

export default function GuidesPage() {
  return (
    <PageShell>
      <section className="rounded-[28px] border border-(--border) bg-(--surface) px-6 py-10 shadow-(--shadow) sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Guides</p>
        <h1 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          Educational content that can rank on its own.
        </h1>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        {guidePages.map((page) => (
          <Card key={page.slug} className="bg-white/78">
            <CardHeader>
              <CardTitle>
                <Link href={`/guides/${page.slug}`}>{page.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-(--muted-foreground)">{page.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}