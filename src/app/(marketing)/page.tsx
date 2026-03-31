import type { Metadata } from 'next';

import { HomeLanding } from './_components/home-landing';
import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'SILKLEARN | The reading order your documents never gave you',
    description:
      'SILKLEARN synthesizes the structure of your documents — mapping what depends on what, surfacing contradictions between sources, and building a path you can actually follow. Upload what you\'re trying to learn.',
    path: '/',
    keywords: ['knowledge synthesis', 'dependency mapping', 'document structure', 'NotebookLM alternative', 'research paper synthesis', 'silklearn'],
  }),
  title: { absolute: 'SILKLEARN | The reading order your documents never gave you' },
};

export default function Home() {
  return (
    <PageShell>
      <HomeLanding />
    </PageShell>
  );
}