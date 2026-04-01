import dynamic from 'next/dynamic';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { getAllPosts } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';
import { BlogHeroReveal } from './blog-hero-reveal';
import { BlogCtaReveal } from './blog-cta-reveal';

export const revalidate = 60;

const BlogFilter = dynamic(() => import('./blog-filter').then(m => m.BlogFilter));

export const metadata = buildMetadata({
  title: 'Essays on Structured Knowledge — SILKLEARN Blog',
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
          <BlogHeroReveal />

          <BlogFilter posts={posts} tags={tags} />

          <BlogCtaReveal />
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
