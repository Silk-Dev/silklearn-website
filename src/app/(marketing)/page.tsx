import type { Metadata } from 'next';

import { HomeLanding } from './_components/home-landing';
import { PageShell } from '@/components/marketing/page-shell';
import { getHomePageContent, isSanityConfigured } from '@/lib/sanity';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'SILKLEARN | Knowledge Compilation for Technical Teams',
    description:
      'SILKLEARN synthesizes the structure of your documents — mapping what depends on what, surfacing contradictions between sources, and building a path you can actually follow. Upload what you\'re trying to learn.',
    path: '/',
    keywords: ['knowledge synthesis', 'dependency mapping', 'document structure', 'NotebookLM alternative', 'research paper synthesis', 'silklearn'],
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