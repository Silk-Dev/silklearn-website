'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function UseCasesCardsStagger({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const cards = container.querySelectorAll('[data-usecase-card]');
        gsap.set(Array.from(cards), { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = container.querySelectorAll('[data-usecase-card]');
        if (!cards.length) return;

        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 16,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
