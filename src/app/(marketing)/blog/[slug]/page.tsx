import type { Metadata } from 'next';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { PortableTextRenderer } from '../portable-text';
import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { getAllPosts, getPostBySlug, sanityImageUrl } from '@/lib/sanity';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getArticleSchema } from '@/lib/structured-data';

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const rawDesc = post.excerpt || '';
  const desc = rawDesc.length > 155 ? rawDesc.slice(0, 152) + '...' : rawDesc;

  const rawTitle = post.title || '';
  const title = rawTitle.length > 68 ? rawTitle.slice(0, 65) + '...' : rawTitle;

  return buildMetadata({
    title,
    description: desc,
    path: `/blog/${post.slug}`,
    keywords: [post.title.toLowerCase(), 'silklearn blog'],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) redirect('/blog');

  // Get Reset series navigation if applicable
  let resetPrev: { title: string; slug: string } | null = null;
  let resetNext: { title: string; slug: string } | null = null;

  if (slug.startsWith('the-reset-')) {
    const allPosts = await getAllPosts();
    const resetPosts = allPosts
      .filter(p => p.slug.startsWith('the-reset-'))
      .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());

    const currentIndex = resetPosts.findIndex(p => p.slug === slug);
    if (currentIndex > 0) resetPrev = { title: resetPosts[currentIndex - 1].title, slug: resetPosts[currentIndex - 1].slug };
    if (currentIndex < resetPosts.length - 1) resetNext = { title: resetPosts[currentIndex + 1].title, slug: resetPosts[currentIndex + 1].slug };
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getArticleSchema({
              title: post.title,
              description: post.excerpt,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.publishedAt,
              ...(post.mainImage?.asset?.url && {
                imageUrl: sanityImageUrl(post.mainImage.asset.url, 1200, 630),
              }),
            })
          ),
        }}
      />
      <MarketingPageFrame>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-(--muted-foreground) transition-colors duration-150 hover:text-(--foreground)"
          >
            <ArrowLeft className="size-3.5" />
            Blog
          </TransitionLink>

          {post.mainImage?.asset?.url && (
            <Image
              src={sanityImageUrl(post.mainImage.asset.url, 1200, 630)}
              alt={post.mainImage.alt || post.title}
              width={1200}
              height={630}
              priority
              className="mt-8 w-full object-cover rounded-sm"
            />
          )}

          <div className="mt-10 grid gap-12 md:grid-cols-[200px_1fr]">
            <aside className="text-sm text-(--muted-foreground)">
              <div className="mb-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                  Written by
                </p>
                <TransitionLink
                  href="/about"
                  className="mt-1 text-(--foreground) underline underline-offset-4 decoration-(--border) hover:decoration-(--foreground) transition-colors duration-150"
                >
                  {post.author || 'SILKLEARN'}
                </TransitionLink>
              </div>
              <div className="mb-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                  Published
                </p>
                <p className="mt-1 text-(--foreground)">{formattedDate}</p>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                    Tags
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-(--foreground)"
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <article>
              <h1 className="font-(family-name:--font-display) text-3xl tracking-[-0.02em] text-(--foreground) sm:text-4xl">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-4 max-w-[58ch] text-base leading-7 text-(--muted-foreground)">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-10 border-t border-(--border) pt-10">
                <PortableTextRenderer blocks={post.body} />
              </div>
            </article>
          </div>

          {slug.startsWith('the-reset-') && (
            <nav className="border-t border-(--border) mt-16 pt-10 px-6 sm:px-8 lg:px-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  {resetPrev && (
                    <TransitionLink href={`/blog/${resetPrev.slug}`} className="group flex flex-col gap-1">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">← Previous</span>
                      <span className="text-sm font-medium text-(--foreground) group-hover:underline line-clamp-2">{resetPrev.title}</span>
                    </TransitionLink>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <TransitionLink href="/the-reset" className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground) hover:text-(--foreground) transition-colors">
                    All Episodes
                  </TransitionLink>
                </div>
                <div className="flex-1 text-right">
                  {resetNext && (
                    <TransitionLink href={`/blog/${resetNext.slug}`} className="group flex flex-col gap-1 items-end">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Next →</span>
                      <span className="text-sm font-medium text-(--foreground) group-hover:underline line-clamp-2">{resetNext.title}</span>
                    </TransitionLink>
                  )}
                </div>
              </div>
            </nav>
          )}

          <div className="mt-16 border-t border-(--border) pt-12">
            <div className="rounded-sm border border-(--border) bg-[oklch(from_var(--foreground)_l_c_h/0.03)] px-8 py-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Early access</p>
              <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
                Start compiling your knowledge.
              </h2>
              <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
                SILKLEARN turns complex source material into reviewable learning paths your team can actually follow.
              </p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
                </Button>
              </div>
            </div>
            <div className="mt-8">
              <TransitionLink
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-(--muted-foreground) transition-colors duration-150 hover:text-(--foreground)"
              >
                <ArrowLeft className="size-3.5" />
                Back to Blog
              </TransitionLink>
            </div>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
