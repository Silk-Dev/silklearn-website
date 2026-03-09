import Image from 'next/image';

import { TransitionLink } from '@/components/marketing/page-transition';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-(--border)">
      <div className="grid gap-8 py-8 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-136">
            <TransitionLink className="inline-flex items-center" href="/">
              <Image
                alt="SILKLEARN"
                className="h-auto w-42 sm:w-46"
                height={145}
                src="/silklearn/black-tr-full-horizontal.svg"
                width={633}
              />
            </TransitionLink>
            <p className="mt-4 max-w-[48ch] text-sm leading-6 text-(--muted-foreground)">
              SILKLEARN compiles dense source material into reviewable learning paths, dependency-aware graphs, and context-efficient outputs for teams working from complex internal knowledge.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-(--muted-foreground) lg:justify-end">
            {primaryNavigation.map((item) => (
              <TransitionLink
                key={item.href}
                className="transition-colors hover:text-(--foreground)"
                href={item.href}
              >
                {item.label}
              </TransitionLink>
            ))}
            <TransitionLink className="transition-colors hover:text-(--foreground)" href="/waitlist">
              Waitlist
            </TransitionLink>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-(--border) pt-4 text-sm text-(--muted-foreground) sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>SILKLEARN</span>
            <span>Structure-first knowledge compilation</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <span>© {year} SILKLEARN</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}