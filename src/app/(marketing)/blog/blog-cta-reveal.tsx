'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function BlogCtaReveal() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(containerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="mt-20 border-t border-(--border) pt-12">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
        Early access
      </p>
      <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
        Ready to structure your knowledge?
      </h2>
      <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
        Join individuals using SILKLEARN to build learning paths through the material that matters to them.
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
        </Button>
      </div>
    </section>
  );
}
