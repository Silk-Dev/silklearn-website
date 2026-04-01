'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeaturesCapabilitiesStagger({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = containerRef.current ? Array.from(containerRef.current.children) : [];
        if (!rows.length) return;

        gsap.set(rows, { opacity: 0, y: 16 });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            });
          },
        });
      });
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
