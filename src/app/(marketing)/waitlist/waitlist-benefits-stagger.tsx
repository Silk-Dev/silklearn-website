'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Benefits (CheckCircle items) ───────────────────────────────────────────

interface WaitlistBenefitsStaggerProps {
  items: string[];
}

export function WaitlistBenefitsStagger({ items }: WaitlistBenefitsStaggerProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const liEls = listRef.current?.querySelectorAll<HTMLLIElement>('[data-benefit]');
      if (!liEls?.length) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(Array.from(liEls), { opacity: 1, x: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(Array.from(liEls), {
          opacity: 0,
          x: -8,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 90%',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: listRef },
  );

  return (
    <ul ref={listRef} className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} data-benefit className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-(--primary)" />
          <span className="text-sm text-(--muted-foreground)">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Signals (problem statement items) ───────────────────────────────────────

interface WaitlistSignalsStaggerProps {
  items: string[];
}

export function WaitlistSignalsStagger({ items }: WaitlistSignalsStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const divEls = containerRef.current?.querySelectorAll<HTMLDivElement>('[data-signal]');
      if (!divEls?.length) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(Array.from(divEls), { opacity: 1, x: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(Array.from(divEls), {
          opacity: 0,
          x: -8,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          data-signal
          className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
