import Link from 'next/link';
import Image from 'next/image';

import { featurePages, guidePages, primaryNavigation, useCasePages } from '@/lib/marketing-content';

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-(--border) pt-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
        <div>
          <Link className="inline-flex items-center" href="/">
            <Image
              alt="SILKLEARN"
              className="h-auto w-42 sm:w-46"
              height={145}
              src="/silklearn/black-tr-text.svg"
              width={633}
            />
          </Link>
          <p className="mt-4 max-w-[54ch] text-sm leading-6 text-(--muted-foreground)">
            SILKLEARN compiles dense source material into reviewable learning paths, dependency-aware graphs, and context-efficient outputs for teams working from complex internal knowledge.
          </p>
          <p className="mt-5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-(--primary)">
            Compile messy knowledge into usable structure.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-3">
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] text-(--foreground)">Pages</p>
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                className="text-[0.95rem] leading-6 text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="text-[0.95rem] leading-6 text-(--muted-foreground) transition-colors hover:text-(--foreground)" href="/waitlist">
              Waitlist
            </Link>
          </div>

          <div className="grid gap-3">
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] text-(--foreground)">Features</p>
            {featurePages.map((page) => (
              <Link
                key={page.slug}
                className="text-[0.95rem] leading-6 text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={`/features/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] text-(--foreground)">Use Cases</p>
            {useCasePages.map((page) => (
              <Link
                key={page.slug}
                className="text-[0.95rem] leading-6 text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                href={`/use-cases/${page.slug}`}
              >
                {page.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] text-(--foreground)">Guides</p>
            {guidePages.map((page) => (
              <Link
                key={page.slug}
                className="text-[0.95rem] leading-6 text-(--muted-foreground) transition-colors hover:text-(--foreground)"
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