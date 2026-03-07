import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteHeader() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[color:var(--border)] bg-white/80 px-4 py-4 shadow-[0_14px_38px_rgba(22,47,88,0.06)] sm:px-5">
      <Link className="flex items-center" href="/">
        <Image
          alt="SilkLearn"
          className="h-auto w-[170px] sm:w-[190px]"
          height={145}
          priority
          src="/silklearn/black-tr-text.svg"
          width={633}
        />
      </Link>

      <nav className="hidden items-center gap-5 md:flex">
        {primaryNavigation.map((item) => (
          <Link
            key={item.href}
            className="text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href="/studio">Studio</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/waitlist">Join waitlist</Link>
        </Button>
      </div>
    </header>
  );
}