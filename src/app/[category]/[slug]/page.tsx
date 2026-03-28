import type { Metadata } from 'next';

import { ArrowRight, BookOpenText } from 'lucide-react';
import { notFound } from 'next/navigation';

import { PortableTextRenderer } from '@/components/marketing/portable-text';
import { TransitionLink } from '@/components/marketing/page-transition';
import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import {
  categoryConfig,
  isValidCategory,
  validCategories,
  type ContentCategory,
} from '@/lib/content-categories';
import { getGuidePage, guidePages } from '@/lib/marketing-content';
import { getPostBySlug, getPostsByCategory } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

type DetailPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const [blogPosts, newsPosts] = await Promise.all([
    getPostsByCategory('blog'),
    getPostsByCategory('news'),
  ]);

  return [
    ...blogPosts.map((p) => ({ category: 'blog', slug: p.slug })),
    ...newsPosts.map((p) => ({ category: 'news', slug: p.slug })),
    ...guidePages.map((p) => ({ category: 'guides', slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isValidCategory(category)) return {};

  if (category === 'guides') {
    const page = getGuidePage(slug);
    if (!page) return {};
    return buildMetadata({
      title: page.title,
      description: page.description,
      path: `/guides/${page.slug}`,
      keywords: [page.title.toLowerCase(), 'knowledge transfer guide', 'team onboarding guide'],
    });
  }

  const post = await getPostBySlug(category, slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/${category}/${post.slug}`,
    keywords: [post.title.toLowerCase(), `silklearn ${category}`],
  });
}

function GuideDetail({ slug, category }: { slug: string; category: ContentCategory }) {
  const page = getGuidePage(slug);
  if (!page) notFound();

  const cfg = categoryConfig[category];

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker="Guide"
          title={page.title}
          description={page.summary}
          rightEyebrow="What this guide covers"
          rightTitle="The guide should explain the sequencing logic clearly enough to stand on its own."
          rightChildren={
            <div className="grid gap-3">
              {page.sections.map((section) => (
                <div
                  key={section.heading}
                  className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0"
                >
                  <p className="text-sm font-semibold text-(--foreground)">{section.heading}</p>
                </div>
              ))}
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {cfg.detail.sectionLabel}
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {cfg.detail.sectionTitle}
              </h2>
            </>
          }
          right={
            <div>
              {page.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className={index > 0 ? 'border-t border-(--border) pt-6' : ''}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <BookOpenText className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Section 0{index + 1}
                    </p>
                  </div>
                  <h2 className="mt-4 text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                    {section.heading}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-sm leading-5 text-(--muted-foreground)">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Related paths
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Move from theory into the feature or workflow where it applies.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-(--border) p-4">
                <TransitionLink
                  className="text-sm font-semibold text-(--foreground)"
                  href={page.featureHref}
                >
                  Continue to the relevant feature page
                </TransitionLink>
              </div>
              <div className="border border-(--border) p-4">
                <TransitionLink
                  className="text-sm font-semibold text-(--foreground)"
                  href={page.useCaseHref}
                >
                  See where this guide applies in practice
                </TransitionLink>
              </div>
            </div>
          }
        />

        <MarketingCtaSection
          kicker={cfg.detail.ctaKicker}
          title={cfg.detail.ctaTitle}
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Start with your docs
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}

async function PostDetail({ slug, category }: { slug: string; category: ContentCategory }) {
  const post = await getPostBySlug(category as 'blog' | 'news', slug);
  if (!post) notFound();

  const cfg = categoryConfig[category];

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker={post.eyebrow || cfg.label}
          title={post.title}
          description={post.excerpt}
          rightEyebrow="Published"
          rightTitle={new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
          rightChildren={
            <div className="grid gap-3">
              <div className="border border-(--border) px-4 py-3 text-sm text-(--foreground)">
                Author: {post.author || 'SILKLEARN'}
              </div>
              <div className="border border-(--border) px-4 py-3 text-sm text-(--foreground)">
                Category: {cfg.label}
              </div>
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {cfg.detail.sectionLabel}
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {cfg.detail.sectionTitle}
              </h2>
            </>
          }
          right={<PortableTextRenderer blocks={post.body} />}
        />

        <MarketingCtaSection
          kicker={cfg.detail.ctaKicker}
          title={cfg.detail.ctaTitle}
          actions={
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <TransitionLink href={`/${category}`}>
                  {cfg.detail.backLabel}
                  <ArrowRight className="size-4" />
                </TransitionLink>
              </Button>
            </div>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}

export default async function CategoryDetailPage({ params }: DetailPageProps) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) notFound();

  if (category === 'guides') {
    return <GuideDetail slug={slug} category={category} />;
  }

  return <PostDetail slug={slug} category={category} />;
}
