'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Reveal on scroll ──
// Rollups pattern: elements start translated 20px down, blurred 5px, opacity 0
// and animate to their natural position when entering viewport.

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay between direct children if wrapping multiple items */
  stagger?: number;
  /** Extra delay before the animation starts */
  delay?: number;
  /** Override the starting y offset (default 20) */
  y?: number;
  /** Override starting blur in px (default 5) */
  blur?: number;
  /** Trigger point: e.g. "top 90%" means when top of el hits 90% of viewport */
  start?: string;
  as?: ElementType;
};

export function ScrollReveal({
  children,
  className,
  stagger = 0,
  delay = 0,
  y = 20,
  blur = 5,
  start = 'top 88%',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const targets = stagger > 0 ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger > 0 ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 0, y, filter: `blur(${blur}px)` });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay,
        ease: 'power2.out',
        stagger: stagger > 0 ? stagger : 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: ref, dependencies: [y, blur, stagger, delay, start], revertOnUpdate: true });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

// ── Staggered list reveal ──
// Each direct child animates in sequence on scroll.

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child (default 0.08) */
  stagger?: number;
  as?: ElementType;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  as: Tag = 'div',
}: StaggerRevealProps) {
  return (
    <ScrollReveal as={Tag} className={className} stagger={stagger}>
      {children}
    </ScrollReveal>
  );
}

// ── Parallax shift ──
// Element moves at a different rate than scroll, like rollups hero background.

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** How many px the element shifts over the scroll range (default 40) */
  distance?: number;
};

export function Parallax({ children, className, distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
  }, { scope: ref, dependencies: [distance], revertOnUpdate: true });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ── Counter ──
// Animates a number from 0 to target when scrolled into view.

type CounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export function Counter({ target, suffix = '', prefix = '', className, duration = 1.2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      el.textContent = `${prefix}${target}${suffix}`;
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    });
  }, { scope: ref, dependencies: [target, suffix, prefix, duration], revertOnUpdate: true });

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
