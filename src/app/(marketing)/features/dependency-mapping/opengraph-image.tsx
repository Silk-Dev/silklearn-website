import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Feature" title="The reading order your sources never gave you." footer="silklearn.io/features" titleSize={52} titleMaxWidth={920} />,
    { ...size }
  );
}
