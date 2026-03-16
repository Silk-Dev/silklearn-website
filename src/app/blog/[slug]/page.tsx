import type { Metadata } from 'next';

import { ArrowRight } from 'lucide-react';
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
import { buildMetadata } from '@/lib/seo';
import { getPostBySlug, getPostsByCategory } from '@/lib/sanity';

export async function generateStaticParams() {
  const posts = await getPostsByCategory('blog');
  return posts.map((post) => ({ slug: post.slug }));
}

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('blog', slug);

  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.title.toLowerCase(), 'silklearn blog'],
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug('blog', slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker={post.eyebrow || 'Blog'}
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
                Category: Blog
              </div>
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Article
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Read the argument in sequence.
              </h2>
            </>
          }
          right={<PortableTextRenderer blocks={post.body} />}
        />

        <MarketingCtaSection
          kicker="Explore more"
          title="Keep reading, then bring your own source base."
          actions={
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <TransitionLink href="/blog">
                  Back to blog
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
