import Link from 'next/link';

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
      <article className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Guide</p>
        <h1 className="mt-4 max-w-[13ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[66ch] text-[1.02rem] leading-8 text-[color:var(--muted-foreground)]">{page.summary}</p>

        <div className="mt-8 grid gap-5">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] leading-[1] tracking-[-0.03em] text-[color:var(--foreground)]">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-[66ch] text-[1rem] leading-8 text-[color:var(--muted-foreground)]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Related feature</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7">
            <Link className="font-semibold text-[color:var(--foreground)]" href={page.featureHref}>
              Continue to the relevant feature page
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/78">
          <CardHeader>
            <CardTitle>Related use case</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7">
            <Link className="font-semibold text-[color:var(--foreground)]" href={page.useCaseHref}>
              See where this guide applies in practice
            </Link>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}