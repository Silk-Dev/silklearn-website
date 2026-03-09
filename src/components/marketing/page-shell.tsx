import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/marketing/site-footer';
import { SiteHeader } from '@/components/marketing/site-header';

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-400 px-4 pb-24 sm:px-6 lg:px-8 ">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}