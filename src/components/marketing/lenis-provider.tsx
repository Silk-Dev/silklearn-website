'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.12,
      }}
    >
      {children}
    </ReactLenis>
  );
}