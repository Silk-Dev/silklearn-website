import Link from 'next/link';

import { primaryNavigation } from '@/lib/marketing-content';

export function SiteFooter() {
  return (
    <footer className="mt-10 rounded-[24px] border border-[color:var(--border)] bg-white/82 px-6 py-8 shadow-[0_16px_40px_rgba(22,47,88,0.06)] sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">SilkLearn</p>
          <p className="mt-3 max-w-[54ch] text-sm leading-7 text-[color:var(--muted-foreground)]">
            Turn dense source material into structured, dependency-ordered learning paths without rebuilding your knowledge as a separate course library.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
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
      </div>
    </footer>
  );
}