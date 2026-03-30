import { ImageResponse } from 'next/og';
import { getFeaturePage, featurePages } from '@/lib/marketing-content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return featurePages.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getFeaturePage(slug);
  const title = page?.title ?? 'SILKLEARN';
  const eyebrow = 'Feature';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px', fontWeight: '500', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div style={{ color: '#ffffff', fontSize: '52px', fontWeight: '700', letterSpacing: '-1.5px', lineHeight: 1.15, maxWidth: '900px' }}>
            {title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}>
            silklearn.io/features
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
