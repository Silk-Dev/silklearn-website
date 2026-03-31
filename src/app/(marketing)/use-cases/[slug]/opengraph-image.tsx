import { ImageResponse } from 'next/og';
import { getUseCasePage, useCasePages } from '@/lib/marketing-content';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return useCasePages.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getUseCasePage(slug);
  const title = page?.title ?? 'SILKLEARN';

  return new ImageResponse(
    <OgCard
      eyebrow="Use Case"
      title={title}
      footer="silklearn.io/use-cases"
      titleSize={52}
      titleMaxWidth={920}
    />,
    { ...size }
  );
}
