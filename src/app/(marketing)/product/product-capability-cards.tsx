'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProductCapabilityCards({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cardEls = containerRef.current?.querySelectorAll('[data-capability-card]');
      if (!cardEls?.length) return;

      gsap.set(cardEls, { opacity: 0, y: 20, filter: 'blur(4px)' });

      gsap.to(cardEls, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const cardEls = containerRef.current?.querySelectorAll('[data-capability-card]');
      if (cardEls?.length) gsap.set(cardEls, { opacity: 1 });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="grid border-b border-(--border) lg:grid-cols-2">
      {children}
    </section>
  );
}
