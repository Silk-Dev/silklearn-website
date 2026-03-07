import Link from 'next/link';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUseCasePage, useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type UseCaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return useCasePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: UseCaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/use-cases/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'internal docs onboarding', 'team knowledge transfer'],
  });
}

export default async function UseCaseDetailPage({ params }: UseCaseDetailPageProps) {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <section className="rounded-[28px] border border-(--border) bg-(--surface) px-6 py-10 shadow-(--shadow) sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Use case</p>
        <h1 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-8 text-(--muted-foreground)">{page.summary}</p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Expected outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-(--muted-foreground)">
              {page.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-(--card)">
          <CardHeader>
            <CardTitle>Related paths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7">
            <p>
              <Link className="font-semibold text-(--foreground)" href={page.featureHref}>
                Relevant feature
              </Link>
            </p>
            <p>
              <Link className="font-semibold text-(--foreground)" href={page.guideHref}>
                Supporting guide
              </Link>
            </p>
            <Button asChild className="mt-2 w-full">
              <Link href="/waitlist">Talk to us</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}