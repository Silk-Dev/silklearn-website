'use client';

import { useState } from 'react';

import { TransitionLink } from '@/components/marketing/page-transition';
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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {filtered.map((post) => (
          <article key={post.slug}>
            <TransitionLink href={`/blog/${post.slug}`} className="group block">
              <h2 className="font-(family-name:--font-display) text-lg tracking-[-0.01em] text-(--foreground) group-hover:text-(--primary) transition-colors duration-150">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm leading-6 text-(--muted-foreground) line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--muted-foreground)">
                <span>{post.author || 'SILKLEARN'}</span>
                <span className="text-(--border)">·</span>
                <time>{formatDate(post.publishedAt)}</time>
                {post.tags?.[0] && (
                  <>
                    <span className="text-(--border)">·</span>
                    <span>{capitalize(post.tags[0])}</span>
                  </>
                )}
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>
    </>
  );
}
