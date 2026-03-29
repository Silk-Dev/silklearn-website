import type { Metadata } from 'next';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { PortableTextRenderer } from '../portable-text';
import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { getAllPosts, getPostBySlug, sanityImageUrl } from '@/lib/sanity';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getArticleSchema } from '@/lib/structured-data';

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

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.title.toLowerCase(), 'silklearn blog'],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) redirect('/blog');

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
                <p className="mt-1 text-(--foreground)">{post.author || 'SILKLEARN'}</p>
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

          <div className="mt-16 border-t border-(--border) pt-8">
            <TransitionLink
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-(--muted-foreground) transition-colors duration-150 hover:text-(--foreground)"
            >
              <ArrowLeft className="size-3.5" />
              Back to Blog
            </TransitionLink>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
