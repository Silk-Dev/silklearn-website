import type { Metadata } from 'next';

import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

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
import { guidePages } from '@/lib/marketing-content';
import { getPostsByCategory } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};
  const config = categoryConfig[category];

  return buildMetadata({
    title: config.metadata.title,
    description: config.metadata.description,
    path: `/${category}`,
    keywords: config.metadata.keywords,
  });
}

async function getListItems(category: ContentCategory) {
  if (category === 'guides') {
    return guidePages.map((page, index) => ({
      slug: page.slug,
      title: page.title,
      excerpt: page.summary,
      label: `Guide ${index + 1}`,
      href: `/guides/${page.slug}`,
    }));
  }

  const posts = await getPostsByCategory(category);
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    label: `${post.eyebrow || config(category).label} · ${new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    href: `/${category}/${post.slug}`,
  }));
}

function config(category: ContentCategory) {
  return categoryConfig[category];
}

export default async function CategoryListPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const cfg = categoryConfig[category];
  const Icon = cfg.icon;
  const items = await getListItems(category);

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker={cfg.hero.kicker}
          title={cfg.hero.title}
          description={cfg.hero.description}
          rightEyebrow={cfg.hero.rightEyebrow}
          rightTitle={cfg.hero.rightTitle}
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {cfg.hero.rightItems.map((item) => (
                <div
                  key={item}
                  className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)"
                >
                  {item}
                </div>
              ))}
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                {cfg.list.label}
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {cfg.list.title}
              </h2>
            </>
          }
          right={
            <div>
              {items.map((item, index) => (
                <article
                  key={item.slug}
                  className={index > 0 ? 'border-t border-(--border) pt-6' : ''}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <Icon className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      {item.label}
                    </p>
                  </div>
                  <TransitionLink
                    className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)"
                    href={item.href}
                  >
                    {item.title}
                  </TransitionLink>
                  <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">
                    {item.excerpt}
                  </p>
                </article>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          kicker={cfg.cta.kicker}
          title={cfg.cta.title}
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                {cfg.cta.ctaLabel}
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
