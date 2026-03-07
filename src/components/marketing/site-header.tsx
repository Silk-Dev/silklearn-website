import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 mb-8 border-b border-(--border) bg-[rgba(251,252,254,0.88)] py-4 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
      <Link className="flex items-center" href="/">
        <Image
          alt="SilkLearn"
          className="h-auto w-42.5 sm:w-47.5"
          height={145}
          priority
          src="/silklearn/black-tr-text.svg"
          width={633}
        />
      </Link>

      <nav className="hidden items-center gap-6 md:flex">
        {primaryNavigation.map((item) => (
          <Link
            key={item.href}
            className="text-sm font-medium text-(--muted-foreground) transition-colors hover:text-(--foreground)"
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
      </div>
    </header>
  );
}