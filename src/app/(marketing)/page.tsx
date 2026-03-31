import type { Metadata } from 'next';

import { HomeLanding } from './_components/home-landing';
import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Synthesize Any Source Into Structured Knowledge — SILKLEARN',
    description:
      'SILKLEARN synthesizes any source — documents, papers, videos, links — into a dependency-ordered knowledge path you can follow or feed to an AI.',
    path: '/',
    keywords: ['knowledge synthesis', 'dependency mapping', 'source synthesis', 'NotebookLM alternative', 'research paper synthesis', 'silklearn'],
  }),
  title: { absolute: 'Synthesize Any Source Into Structured Knowledge — SILKLEARN' },
};

export default function Home() {
  return (
    <PageShell>
      <HomeLanding />
    </PageShell>
  );
}