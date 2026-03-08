"use client";

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    if (mobileOpen) {
      scrollPositionRef.current = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.width = '100%';
    } else {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';

      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-(--border) bg-(--primary) px-4 py-3 text-center text-sm font-medium tracking-[-0.01em] text-(--primary-foreground) sm:px-6">
        <span>Early access for structure-first teams is opening soon.</span>{' '}
        <Link className="font-semibold underline underline-offset-3" href="/waitlist">
          View waitlist
        </Link>
      </div>

      {/* Fixed glassmorphic header */}
      <header
        className={`fixed inset-x-0 top-[2.75rem] border-b border-(--border) z-40 backdrop-blur-[10px] ${
          mobileOpen
            ? 'bottom-0 overflow-y-auto bg-(--background)'
            : 'bg-[oklch(from_var(--background)_l_c_h/0.25)]'
        }`}
      >
        <div className="mx-auto max-w-400  px-4 sm:px-6 lg:px-8">
          {/* Nav bar row */}
          <div className="flex h-16 items-center justify-between border-x border-(--border) px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link className="flex shrink-0 items-center" href="/">
              <Image
                alt="SILKLEARN"
                className="h-7 w-auto"
                height={161}
                priority
                src="/silklearn/black-tr-full-horizontal.svg"
                width={788}
              />
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden items-center gap-1 lg:flex">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  className="px-4 py-2 text-sm font-medium text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button asChild size="lg" className="px-6">
                <Link href="/waitlist">Join waitlist</Link>
              </Button>
            </div>

            {/* Mobile burger — border-left divider like Rollups */}
            <button
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="-mr-4 flex h-16 w-16 items-center justify-center border-l border-(--border) text-(--foreground) sm:-mr-6 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Mobile menu — stays inside border-x rails, fills remaining viewport */}
          {mobileOpen && (
            <div className="flex min-h-[calc(100dvh-2.75rem-4rem)] flex-col lg:hidden">
              <nav className="flex flex-col">
                {primaryNavigation.map((item) => (
                  <Link
                    key={item.href}
                    className="border-t border-(--border) px-4 py-5 text-lg font-medium text-(--foreground) transition-colors hover:bg-[oklch(from_var(--foreground)_l_c_h/0.04)] sm:px-6"
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto grid border-t border-(--border) sm:grid-cols-2">
                <Link
                  className="px-4 py-4 text-lg font-medium text-(--foreground) sm:px-6"
                  href="/waitlist"
                  onClick={() => setMobileOpen(false)}
                >
                  Join waitlist
                </Link>
                <Link
                  className="border-t border-(--border) px-4 py-4 text-lg font-medium text-(--foreground) sm:border-l sm:border-t-0 sm:px-6"
                  href="/studio"
                  onClick={() => setMobileOpen(false)}
                >
                  Studio
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header + announcement bar */}
      <div aria-hidden className="h-[6.75rem]" />
    </>
  );
}