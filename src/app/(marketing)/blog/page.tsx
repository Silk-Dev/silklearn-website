import dynamic from 'next/dynamic';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

const BlogFilter = dynamic(() => import('./blog-filter').then(m => m.BlogFilter));

export const metadata = buildMetadata({
  title: 'Blog — Essays on Knowledge, Teams & AI',
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

          <section className="mt-20 border-t border-(--border) pt-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Early access</p>
            <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
              Ready to structure your knowledge?
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
              Join teams using SILKLEARN to compile their docs into learning paths that actually stick.
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
