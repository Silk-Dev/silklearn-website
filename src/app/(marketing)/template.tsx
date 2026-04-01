'use client';

import { useLayoutEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { animatePageIn } from '@/components/marketing/page-transition/animations';
import { usePageAnalytics } from '@/lib/use-page-analytics';

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

  // useLayoutEffect fires before browser paint so the overlay is made visible
  // before any new page content is shown, preventing the flash.
  useLayoutEffect(() => {
    const el = document.querySelector('#page-name-display span');
    if (el) el.textContent = pageName;
    animatePageIn();
  }, [pathname, pageName]);

  // Scroll depth, time-on-page, section views, form abandoned — resets per page
  usePageAnalytics();

  return <div className="relative min-h-screen">{children}</div>;
}
