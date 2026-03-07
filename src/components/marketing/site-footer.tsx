import Link from 'next/link';

import { featurePages, guidePages, primaryNavigation, useCasePages } from '@/lib/marketing-content';

export function SiteFooter() {
  return (
    <footer className="mt-10 rounded-3xl border border-(--border) bg-white/82 px-6 py-8 shadow-[0_16px_40px_rgba(22,47,88,0.06)] sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1.8fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-(--foreground)">SilkLearn</p>
          <p className="mt-3 max-w-[54ch] text-sm leading-7 text-[color:var(--muted-foreground)]">
            SilkLearn compiles dense source material into reviewable learning paths, dependency-aware graphs, and context-efficient outputs for teams working from complex internal knowledge.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-(--primary)">
            Compile messy knowledge into usable structure.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-3">
            <p className="text-sm font-semibold text-(--foreground)">Pages</p>
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]" href="/waitlist">
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
            <p className="text-sm font-semibold text-[color:var(--foreground)]">Use Cases</p>
            {useCasePages.map((page) => (
              <Link
                key={page.slug}
                className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                href={`/use-cases/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-[color:var(--foreground)]">Guides</p>
            {guidePages.map((page) => (
              <Link
                key={page.slug}
                className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
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