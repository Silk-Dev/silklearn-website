import { ArrowRight, BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-10">
        <div>
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Guides</p>
        <h1 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          Educational content that can rank on its own.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-7 text-(--muted-foreground)">
          These guides explain the underlying logic of dependency-ordered knowledge, not just the UI surface of the product.
        </p>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader>
            <CardTitle>Guide intent</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {['Explain dependency order', 'Clarify product thesis', 'Support SEO depth', 'Connect to practical workflows'].map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-white px-4 py-3 text-sm font-medium text-(--foreground)">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        {guidePages.map((page) => (
          <Card key={page.slug} className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                <BookOpenText className="size-4.5" />
              </div>
              <CardTitle>
                <Link href={`/guides/${page.slug}`}>{page.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-(--muted-foreground)">{page.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-(family-name:--font-display) text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              Read the theory, then apply it to real internal knowledge.
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/waitlist">
              Start with your docs
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}