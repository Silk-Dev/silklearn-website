import { ImageResponse } from 'next/og';
import { OgCard } from '@/lib/og-card';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Use Case" title="You're working across multiple sources. They quietly disagree on the foundations." footer="silklearn.io/use-cases" titleSize={52} titleMaxWidth={920} />,
    { ...size }
  );
}
