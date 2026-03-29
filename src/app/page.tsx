import { HomeLanding } from './_components/home-landing';
import { PageShell } from '@/components/marketing/page-shell';
import { getHomePageContent, isSanityConfigured } from '@/lib/sanity';

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <PageShell>
      <HomeLanding content={content} isSanityConfigured={isSanityConfigured} />
    </PageShell>
  );
}