import { ArrowRight, BookOpenText } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { getPostsByCategory } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description:
    'Longer-form essays and thinking from SILKLEARN on knowledge compilation, synthesis, learning paths, and structured reasoning.',
  path: '/blog',
  keywords: ['silklearn blog', 'knowledge compilation blog', 'structured reasoning'],
});

export default async function BlogListPage() {
  const posts = await getPostsByCategory('blog');

  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker="Blog"
          title="Thinking in public about compiled knowledge."
          description="Essays, product thinking, and deeper articulation of why structure matters more than flat retrieval or generic AI output."
          rightEyebrow="What belongs here"
          rightTitle="The blog should carry longer-form arguments that explain SILKLEARN's worldview, not just announce product updates."
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Knowledge compilation',
                'Canvas & synthesis',
                'Team learning design',
                'Structured reasoning',
              ].map((item) => (
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
                Recent writing
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Essays that explain the product&apos;s deepest logic.
              </h2>
            </>
          }
          right={
            <div>
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={index > 0 ? 'border-t border-(--border) pt-6' : ''}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <BookOpenText className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      {post.eyebrow || 'Blog'} ·{' '}
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <TransitionLink
                    className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)"
                    href={`/blog/${post.slug}`}
                  >
                    {post.title}
                  </TransitionLink>
                  <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          kicker="Next step"
          title="Want the product to think with your actual documents?"
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
