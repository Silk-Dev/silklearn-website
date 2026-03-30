import type { Metadata } from 'next';

import { HomeLanding } from './_components/home-landing';
import { PageShell } from '@/components/marketing/page-shell';
import { getHomePageContent, isSanityConfigured } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'SILKLEARN | Knowledge Compilation for Technical Teams',
    description:
      'SILKLEARN compiles dense source material into dependency-ordered learning paths, reviewable context bundles, and structured knowledge for teams.',
    path: '/',
    keywords: ['knowledge compilation', 'learning paths', 'structured knowledge', 'silklearn'],
  }),
  title: { absolute: 'SILKLEARN | Knowledge Compilation for Technical Teams' },
};

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <PageShell>
      <HomeLanding content={content} isSanityConfigured={isSanityConfigured} />
    </PageShell>
  );
}