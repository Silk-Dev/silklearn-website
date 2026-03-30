'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { animatePageIn } from '@/components/marketing/page-transition/animations';

const PAGE_ROUTES: Record<string, string> = {
  '/': 'SILKLEARN',
  '/product': 'How It Works',
  '/features': 'Features',
  '/use-cases': 'Use Cases',
  '/blog': 'Blog',
  '/guides': 'Guides',
  '/waitlist': 'Waitlist',
};

function resolvePageName(pathname: string): string {
  return (
    PAGE_ROUTES[pathname] ??
    PAGE_ROUTES[
      Object.keys(PAGE_ROUTES).find((r) => r !== '/' && pathname.startsWith(r + '/')) ?? ''
    ] ??
    ''
  );
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageName = useMemo(() => resolvePageName(pathname), [pathname]);

  useEffect(() => {
    const el = document.querySelector('#page-name-display span');
    if (el) el.textContent = pageName;

    const curveTransition = document.getElementById('curve-transition');
    const curvePath = document.getElementById('curve-path');
    if (curveTransition && curvePath) {
      curveTransition.style.visibility = 'visible';
      curvePath.setAttribute('d', 'M 0,0 Q 50,-15 100,0 L 100,100 Q 50,115 0,100 Z');
    }

    animatePageIn();
  }, [pathname, pageName]);

  return (
    <div className="relative min-h-screen">
      {/* Curve transition overlay */}
      <div
        id="curve-transition"
        className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
        style={{ visibility: 'visible' }}
      >
        <svg
          id="curve-svg"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.6231 0.1880 259.8145)" />
              <stop offset="100%" stopColor="oklch(0.6231 0.1880 259.8145)" />
            </linearGradient>
          </defs>
          <path
            id="curve-path"
            d="M 0,0 Q 50,-15 100,0 L 100,100 Q 50,115 0,100 Z"
            fill="url(#curveGradient)"
          />
        </svg>

        <div
          id="page-name-display"
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <span className="text-5xl font-semibold tracking-[-0.04em] text-(--background) md:text-6xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {pageName}
          </span>
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
