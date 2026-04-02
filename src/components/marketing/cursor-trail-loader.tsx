'use client';

import dynamic from 'next/dynamic';

// ssr: false is only allowed in Client Components
const CursorTrailAnimation = dynamic(
  () => import('@/components/marketing/cursor-trail').then((m) => m.CursorTrailAnimation),
  { ssr: false },
);

export function CursorTrail() {
  return <CursorTrailAnimation />;
}
