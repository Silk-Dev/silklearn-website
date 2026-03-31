import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Features"
      title="Dependency Mapping & Leader Review"
      footer="silklearn.io/features"
      titleSize={56}
      titleMaxWidth={920}
    />,
    { ...size }
  );
}
