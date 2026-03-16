import type { Metadata } from 'next';

import { ArrowRight, Newspaper } from 'lucide-react';

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
import { getPostsByCategory } from '@/lib/sanity';

export const metadata: Metadata = buildMetadata({
  title: 'News',
  description:
    'Product updates, launch notes, and progress from SILKLEARN as the synthesis canvas and structured knowledge workflow evolve.',
  path: '/news',
  keywords: ['silklearn news', 'silklearn updates', 'product updates'],
});

export default async function NewsPage() {
  const posts = await getPostsByCategory('news');

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker="News"
          title="Product movement, not just promises."
          description="Updates on the canvas, roadmap builder, website, and the broader shift toward structure-first knowledge operations."
          rightEyebrow="Why this exists"
          rightTitle="News should show momentum and clarity: what changed, why it matters, and where the product is going next."
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {['Launch notes', 'Feature updates', 'Architecture shifts', 'Product direction'].map((item) => (
                <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
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
                Latest updates
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                A running record of product direction and execution.
              </h2>
            </>
          }
          right={
            <div>
              {posts.map((post, index) => (
                <article key={post.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <Newspaper className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      {post.eyebrow || 'News'} · {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <TransitionLink className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)" href={`/news/${post.slug}`}>
                    {post.title}
                  </TransitionLink>
                  <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">{post.excerpt}</p>
                </article>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          kicker="Next step"
          title="Follow progress, then get your own source base into the system."
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Join the waitlist
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
