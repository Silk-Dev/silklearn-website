import { ArrowRight, Network } from 'lucide-react';
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
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-10">
        <div>
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Use case</p>
        <h1 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-7 text-(--muted-foreground)">{page.summary}</p>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
              <Network className="size-4.5" />
            </div>
            <CardTitle className="mt-4">Why this workflow fits</CardTitle>
            <CardContent className="px-0 pt-4 text-sm leading-6 text-(--muted-foreground)">
              This is a strong fit when the knowledge already exists in internal systems, but the onboarding or transfer sequence is still implicit and costly to repeat manually.
            </CardContent>
          </CardHeader>
        </Card>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <CardTitle>Expected outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-6 text-(--muted-foreground)">
              {page.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-[rgba(31,63,122,0.18)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] shadow-[0_20px_80px_rgba(15,23,42,0.16)]">
          <CardHeader>
            <CardTitle className="text-white">Related paths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-[rgba(255,255,255,0.78)]">
            <p>
              <Link className="font-semibold text-white" href={page.featureHref}>
                Relevant feature
              </Link>
            </p>
            <p>
              <Link className="font-semibold text-white" href={page.guideHref}>
                Supporting guide
              </Link>
            </p>
            <Button asChild className="mt-2 w-full">
              <Link href="/waitlist">Talk to us</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-(family-name:--font-display) text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              Start with one team-critical transfer problem.
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/waitlist">
              Talk to us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}