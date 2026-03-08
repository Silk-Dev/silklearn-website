import { ArrowRight, BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageShell } from '@/components/marketing/page-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGuidePage, guidePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

type GuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/guides/${page.slug}`,
    keywords: [page.title.toLowerCase(), 'knowledge transfer guide', 'team onboarding guide'],
  });
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <article className="rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Guide</p>
        <h1 className="mt-4 max-w-[13ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[66ch] text-[1.02rem] leading-7 text-(--muted-foreground)">{page.summary}</p>

        <div className="mt-8 grid gap-5">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-3xl border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] p-6">
              <h2 className="font-(family-name:--font-display) text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-[-0.03em] text-(--foreground)">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-[66ch] text-[1rem] leading-7 text-(--muted-foreground)">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
              <BookOpenText className="size-4.5" />
            </div>
            <CardTitle>Related feature</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6">
            <Link className="font-semibold text-(--foreground)" href={page.featureHref}>
              Continue to the relevant feature page
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
          <CardHeader>
            <CardTitle>Related use case</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6">
            <Link className="font-semibold text-(--foreground)" href={page.useCaseHref}>
              See where this guide applies in practice
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-(family-name:--font-display) text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              Apply this guide to your own private source base.
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