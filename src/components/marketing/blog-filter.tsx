'use client';

import { useState } from 'react';
import Image from 'next/image';

import { TransitionLink } from '@/components/marketing/page-transition';
import { sanityImageUrl } from '@/lib/sanity';
import type { MarketingPost } from '@/lib/site-content';

type BlogFilterProps = {
  posts: MarketingPost[];
  tags: string[];
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(body: Record<string, unknown>[]): string {
  if (!body || !Array.isArray(body)) return '3 min read';
  const text = (body as Record<string, unknown>[])
    .filter((b) => b._type === 'block')
    .map((b) =>
      ((b.children as Record<string, string>[]) || []).map((c) => c.text || '').join('')
    )
    .join(' ');
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}

export function BlogFilter({ posts, tags }: BlogFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((post) => post.tags?.includes(activeTag))
    : posts;

  return (
    <>
      <div className="mt-8 mb-12 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`text-xs uppercase tracking-wide px-3 py-2 rounded border transition-colors duration-150 cursor-pointer ${
            activeTag === null
              ? 'bg-(--foreground) text-(--background) border-(--foreground)'
              : 'bg-transparent text-(--muted-foreground) border-(--border) hover:border-(--foreground) hover:text-(--foreground)'
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`text-xs uppercase tracking-wide px-3 py-2 rounded border transition-colors duration-150 cursor-pointer ${
              activeTag === tag
                ? 'bg-(--foreground) text-(--background) border-(--foreground)'
                : 'bg-transparent text-(--muted-foreground) border-(--border) hover:border-(--foreground) hover:text-(--foreground)'
            }`}
          >
            {capitalize(tag)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {filtered.map((post) => {
          const imageUrl = post.mainImage?.asset?.url;

          return (
            <article key={post.slug} className="border-b border-(--border) pb-8">
              <TransitionLink href={`/blog/${post.slug}`} className="group flex gap-4">
                {imageUrl && (
                  <Image
                    src={sanityImageUrl(imageUrl, 240, 240)}
                    alt={post.mainImage?.alt || post.title}
                    width={120}
                    height={120}
                    className="min-w-[120px] object-cover rounded-sm"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="font-(family-name:--font-display) text-base tracking-[-0.01em] text-(--foreground) group-hover:text-(--primary) transition-colors duration-150 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-5 text-(--muted-foreground) line-clamp-2">
                    {post.description || post.excerpt}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--muted-foreground)">
                    <span>{post.author || 'SILKLEARN'}</span>
                    <span className="text-(--border)">·</span>
                    <time>{formatDate(post.publishedAt)}</time>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs text-(--muted-foreground)">
                    {post.tags?.[0] && (
                      <span>{capitalize(post.tags[0])}</span>
                    )}
                    <span className="text-(--border)">·</span>
                    <span>{estimateReadTime(post.body)}</span>
                  </div>
                </div>
              </TransitionLink>
            </article>
          );
        })}
      </div>
    </>
  );
}
