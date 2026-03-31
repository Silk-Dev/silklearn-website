import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="SILKLEARN"
      title="Turn dense internal docs into a reviewed path your team can follow"
      footer="silklearn.io"
      titleSize={58}
      titleMaxWidth={920}
    />,
    { ...size }
  );
}
