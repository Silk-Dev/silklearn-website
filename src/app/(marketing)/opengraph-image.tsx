import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="SILKLEARN"
      title="Knowledge compilation infrastructure for technical teams"
      footer="silklearn.io"
      titleSize={60}
      titleMaxWidth={900}
    />,
    { ...size }
  );
}
