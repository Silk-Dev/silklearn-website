import Link from 'next/link';

import { featurePages, guidePages, primaryNavigation, useCasePages } from '@/lib/marketing-content';

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-[rgba(10,25,49,0.08)] pt-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-(--foreground)">SilkLearn</p>
          <p className="mt-4 max-w-[54ch] text-sm leading-7 text-(--muted-foreground)">
            SilkLearn compiles dense source material into reviewable learning paths, dependency-aware graphs, and context-efficient outputs for teams working from complex internal knowledge.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-(--primary)">
            Compile messy knowledge into usable structure.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-3">
            <p className="text-sm font-semibold text-(--foreground)">Pages</p>
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)" href="/waitlist">
              Waitlist
            </Link>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-(--foreground)">Features</p>
            {featurePages.map((page) => (
              <Link
                key={page.slug}
                className="text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={`/features/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-(--foreground)">Use Cases</p>
            {useCasePages.map((page) => (
              <Link
                key={page.slug}
                className="text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={`/use-cases/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-(--foreground)">Guides</p>
            {guidePages.map((page) => (
              <Link
                key={page.slug}
                className="text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={`/guides/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}