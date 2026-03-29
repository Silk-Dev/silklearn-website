import dynamic from 'next/dynamic';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { getAllPosts } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

const BlogFilter = dynamic(() => import('./blog-filter').then(m => m.BlogFilter));

export const metadata = buildMetadata({
  title: 'Blog — Essays on Structured Knowledge',
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
        <div className="px-6 sm:px-8 lg:px-10 py-14 sm:py-20">
          <p className="text-sm text-(--muted-foreground)">Blog</p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground) max-w-[18ch]">
            Essays and thinking on structured knowledge
          </h1>

          <BlogFilter posts={posts} tags={tags} />
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
