import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { BlogFilter } from '@/components/marketing/blog-filter';
import { getAllPosts } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description:
    'Longer-form essays and thinking from SILKLEARN on knowledge compilation, synthesis, learning paths, and structured reasoning.',
  path: '/blog',
  keywords: ['silklearn blog', 'knowledge compilation blog', 'structured reasoning'],
});

export default async function BlogListPage() {
  const posts = await getAllPosts();

  const tags = Array.from(
    new Set(posts.flatMap((post) => post.tags ?? [])),
  );

  return (
    <PageShell>
      <MarketingPageFrame>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <p className="text-sm text-(--muted-foreground)">Blog</p>
          <h1 className="mt-3 font-(family-name:--font-display) text-4xl sm:text-5xl tracking-tight text-(--foreground)">
            Essays and thinking on structured knowledge
          </h1>

          <BlogFilter posts={posts} tags={tags} />
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
