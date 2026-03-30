import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { personas } from '@/lib/marketing-personas';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getBreadcrumbSchema, getWebPageSchema } from '@/lib/structured-data';
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
    title: `${persona.selector} — Knowledge Compilation Guide`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: absoluteUrl('/') },
              { name: 'For Teams', url: absoluteUrl('/for-teams') },
              { name: persona.selector, url: absoluteUrl(`/for-teams/${persona.id}`) },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageSchema({
              title: persona.selector,
              description: persona.problem.length > 160 ? persona.problem.slice(0, 157) + '...' : persona.problem,
              url: absoluteUrl(`/for-teams/${persona.id}`),
            })
          ),
        }}
      />
      <MarketingPageFrame>
        <PersonaPageContent persona={persona} />
      </MarketingPageFrame>
    </PageShell>
  );
}
