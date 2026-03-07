import Link from 'next/link';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featurePages, getFeaturePage } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type FeatureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: FeatureDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/features/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'team learning paths', 'source material training'],
  });
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Feature</p>
        <h1 className="mt-4 max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-8 text-[color:var(--muted-foreground)]">{page.summary}</p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>What it does</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {page.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[color:var(--card)]">
          <CardHeader>
            <CardTitle>Related paths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7">
            <p>
              <Link className="font-semibold text-[color:var(--foreground)]" href={page.useCaseHref}>
                Relevant use case
              </Link>
            </p>
            <p>
              <Link className="font-semibold text-[color:var(--foreground)]" href={page.guideHref}>
                Supporting guide
              </Link>
            </p>
            <Button asChild className="mt-2 w-full">
              <Link href="/waitlist">Join waitlist</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}