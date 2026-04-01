'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function BlogHeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-kicker]', {
          opacity: 0,
          y: 8,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all',
        });
        gsap.from('[data-hero-heading]', {
          opacity: 0,
          y: 12,
          duration: 0.6,
          delay: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <p data-hero-kicker className="text-sm text-(--muted-foreground)">
        Blog
      </p>
      <h1
        data-hero-heading
        className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground) max-w-[18ch]"
      >
        Essays and thinking on structured knowledge
      </h1>
    </div>
  );
}
