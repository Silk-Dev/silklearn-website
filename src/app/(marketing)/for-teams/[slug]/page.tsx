import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { personas } from '@/lib/marketing-personas';
import { buildMetadata } from '@/lib/seo';
import { PageShell } from '@/components/marketing/page-shell';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PersonaPageContent } from './persona-page-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const persona = personas.find((p) => p.id === slug);
  if (!persona) return {};

  return buildMetadata({
    title: `${persona.selector} — Knowledge Compilation for Teams`,
    description: persona.problem.length > 152 ? persona.problem.slice(0, 152) + '...' : persona.problem,
    path: `/for-teams/${persona.id}`,
    keywords: [persona.selector.toLowerCase(), "silklearn", "knowledge compilation"],
  });
}

export async function generateStaticParams() {
  return personas.map((p) => ({ slug: p.id }));
}

export default async function ForWhomPersonaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = personas.find((p) => p.id === slug);
  if (!persona) notFound();

  return (
    <PageShell>
      <MarketingPageFrame>
        <PersonaPageContent persona={persona} />
      </MarketingPageFrame>
    </PageShell>
  );
}
