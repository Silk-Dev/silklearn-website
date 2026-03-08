"use client";

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuRoute, setMobileMenuRoute] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const scrollPositionRef = useRef(0);
  const isMobileMenuOpen = mobileMenuRoute === pathname;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);
      setShowFloatingNav(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    if (isMobileMenuOpen) {
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
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 border-b border-(--border) bg-(--primary) px-4 py-3 text-center text-sm font-medium tracking-[-0.01em] text-(--primary-foreground) sm:px-6">
        <span>Early access for structure-first teams is opening soon.</span>{' '}
        <Link className="font-semibold underline underline-offset-3" href="/waitlist">
          View waitlist
        </Link>
      </div>

      <div className="fixed inset-x-0 top-[3.05rem] z-40 px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'mx-auto max-w-400 transition-all duration-300 ease-out',
            scrollY > 100 || isMobileMenuOpen
              ? '-translate-y-[140%] opacity-0 pointer-events-none'
              : 'translate-y-0 opacity-100',
          )}
        >
          <div className="overflow-hidden rounded-b-[var(--radius-xl)] border border-(--border) bg-(--popover) shadow-(--shadow) backdrop-blur-xl">
            <div className="relative px-4 py-5 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <Link className="relative z-20 flex items-center" href="/">
                  <Image
                    alt="SILKLEARN"
                    className="h-auto w-42 sm:w-47"
                    height={145}
                    priority
                    src="/silklearn/black-tr-text.svg"
                    width={633}
                  />
                </Link>

                <div className="absolute left-1/2 hidden -translate-x-1/2 lg:flex">
                  <nav className="flex items-center gap-7 rounded-[var(--radius-xl)] border border-(--border) bg-(--secondary) px-8 py-2.5 backdrop-blur-sm">
                    {primaryNavigation.map((item) => (
                      <Link
                        key={item.href}
                        className="text-[1rem] font-medium tracking-[-0.01em] text-(--muted-foreground) transition-colors hover:text-(--foreground)"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="hidden lg:flex">
                  <Button asChild size="lg" className="px-7 shadow-(--shadow-sm)">
                    <Link href="/waitlist">Join waitlist</Link>
                  </Button>
                </div>

                <button
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] border border-(--border) bg-(--card) text-(--foreground) transition-colors hover:bg-(--secondary) lg:hidden"
                  onClick={() => setMobileMenuRoute(isMobileMenuOpen ? null : pathname)}
                  type="button"
                >
                  {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'fixed right-4 z-60 transition-all duration-300 ease-out sm:right-6 md:right-8',
          showFloatingNav || isMobileMenuOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-2 scale-90 opacity-0 pointer-events-none',
        )}
        style={{ top: '4.75rem' }}
      >
        <button
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-2xl)] bg-(--primary) text-(--primary-foreground) shadow-(--shadow-md) transition-transform duration-200 hover:scale-105"
          onClick={() => setMobileMenuRoute(isMobileMenuOpen ? null : pathname)}
          type="button"
        >
          <div className="relative h-4 w-4">
            <span
              className={cn(
                'absolute left-0 top-1/2 h-px w-full -translate-y-1.25 bg-current transition-transform duration-300',
                isMobileMenuOpen && 'translate-y-0 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1/2 h-px w-full translate-y-1.25 bg-current transition-transform duration-300',
                isMobileMenuOpen && 'translate-y-0 -rotate-45',
              )}
            />
          </div>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-50 bg-transparent"
          onClick={() => setMobileMenuRoute(null)}
          type="button"
        />
      ) : null}

      <div
        className={cn(
          'fixed inset-x-4 top-19 z-60 overflow-hidden transition-all duration-200 ease-out sm:left-auto sm:right-6 sm:w-[24rem] md:right-8',
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none',
        )}
      >
        <div className="grid gap-3 rounded-[var(--radius-2xl)] border border-(--border) bg-(--popover) p-4 shadow-(--shadow-md)">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              className="rounded-[var(--radius)] px-3 py-3 text-[1rem] font-medium tracking-[-0.01em] text-(--foreground) transition-colors hover:bg-(--secondary) hover:text-(--foreground)"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Button asChild size="lg">
              <Link href="/waitlist">
                Join waitlist
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-(--card) text-(--foreground) hover:bg-(--secondary) hover:text-(--foreground)">
              <Link href="/studio">
                Studio
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div aria-hidden className="mb-12 h-38 sm:h-40" />
    </>
  );
}