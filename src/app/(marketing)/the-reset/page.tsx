import Image from 'next/image';

import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';
import { getAllPosts, sanityImageUrl } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'The Reset — Building SILKLEARN From Zero',
  description:
    'A raw, day-by-day account of building SILKLEARN from scratch — skill synthesis, market selection, product decisions, and hitting walls.',
  path: '/the-reset',
  keywords: ['the reset series', 'founder journal', 'silklearn founder'],
});

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(body: Record<string, unknown>[]): string {
  if (!body || !Array.isArray(body)) return '3 min read';
  const text = body
    .filter((b) => b._type === 'block')
    .map((b) =>
      ((b.children as Record<string, string>[]) || []).map((c) => c.text || '').join(''),
    )
    .join(' ');
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}

export default async function TheResetPage() {
  const allPosts = await getAllPosts();

  const posts = allPosts
    .filter((post) => post.slug.startsWith('the-reset-'))
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());

  return (
    <PageShell>
      <MarketingPageFrame>
        <div className="px-6 sm:px-8 lg:px-10 py-14 sm:py-20">
          <p className="text-sm text-(--muted-foreground)">The Reset — Series</p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground) max-w-[24ch]">
            The Reset — Building SILKLEARN from Zero
          </h1>
          <p className="mt-3 text-base text-(--muted-foreground)">
            A raw day-by-day founder journal. No polish, no retrospective — written in real time.
          </p>
          <p className="mt-4 max-w-[60ch] text-sm leading-6 text-(--muted-foreground)">
            The Reset is a live document of what it actually looks like to start over — picking a
            market, synthesising a skill set, making product calls in the dark, and hitting walls
            without knowing when they'll move. Every entry is written the same day it happens.
          </p>

          <div className="mt-12 flex flex-col gap-8">
            {posts.map((post) => {
              const imageUrl = post.mainImage?.asset?.url;

              return (
                <article key={post.slug} className="border-b border-(--border) pb-8">
                  <TransitionLink href={`/blog/${post.slug}`} className="group flex gap-5">
                    {imageUrl && (
                      <Image
                        src={sanityImageUrl(imageUrl, 240, 240)}
                        alt={post.mainImage?.alt || post.title}
                        width={120}
                        height={120}
                        className="min-w-[120px] object-cover rounded-sm shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      {post.eyebrow ? (
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                          {post.eyebrow}
                        </p>
                      ) : (
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                          The Reset
                        </p>
                      )}
                      <h2 className="mt-1 font-(family-name:--font-display) text-lg tracking-[-0.01em] text-(--foreground) group-hover:text-(--primary) transition-colors duration-150">
                        {post.title}
                      </h2>
                      <p className="mt-1.5 text-[13px] leading-5 text-(--muted-foreground) line-clamp-2">
                        {post.description || post.excerpt}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--muted-foreground)">
                        <time>{formatDate(post.publishedAt)}</time>
                        <span className="text-(--border)">·</span>
                        <span>{estimateReadTime(post.body)}</span>
                      </div>
                    </div>
                  </TransitionLink>
                </article>
              );
            })}
          </div>

          <section className="mt-20 border-t border-(--border) pt-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Follow the build
            </p>
            <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
              Want to follow the build?
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
              Get new Reset entries and early access to SILKLEARN as the product takes shape.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
              </Button>
            </div>
          </section>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
