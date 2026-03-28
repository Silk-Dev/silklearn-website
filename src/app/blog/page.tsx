import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
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
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <header className="mb-12">
            <h1 className="font-(family-name:--font-display) text-4xl tracking-[-0.02em] text-(--foreground)">
              Blog
            </h1>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
              Essays and thinking on structured knowledge, dependency order, and why sequence matters.
            </p>
          </header>

          <div className="divide-y divide-(--border)">
            {posts.map((post) => (
              <article key={post.slug}>
                <TransitionLink
                  href={`/blog/${post.slug}`}
                  className="block py-8 transition-colors duration-150 hover:opacity-80"
                >
                  <h2 className="font-(family-name:--font-display) text-xl tracking-[-0.01em] text-(--foreground)">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 max-w-[56ch] text-sm leading-6 text-(--muted-foreground)">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-4 flex items-center gap-3 text-xs text-(--muted-foreground)">
                    <span>{post.author || 'SILKLEARN'}</span>
                    <span className="text-(--border)">·</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-(--border)">·</span>
                    <span>Blog</span>
                  </div>
                </TransitionLink>
              </article>
            ))}
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
