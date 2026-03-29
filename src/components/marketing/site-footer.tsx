"use client";

import Image from 'next/image';
import { ArrowUp, ShieldCheck } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { primaryNavigation } from '@/lib/marketing-content';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className=" pt-15 border-t border-(--border)">
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
            <p className="mt-2 text-sm text-(--muted-foreground)">
              Questions?{' '}
              <a
                href="mailto:hello@silklearn.io"
                className="underline underline-offset-3 transition-colors hover:text-(--foreground)"
              >
                hello@silklearn.io
              </a>
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex max-w-120 flex-wrap gap-x-5 gap-y-3 text-sm text-(--muted-foreground) lg:justify-end">
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
                Join the waitlist
              </TransitionLink>
              <TransitionLink className="transition-colors hover:text-(--foreground)" href="/privacy">
                Privacy
              </TransitionLink>
              <TransitionLink className="transition-colors hover:text-(--foreground)" href="/terms">
                Terms
              </TransitionLink>
              <TransitionLink className="transition-colors hover:text-(--foreground)" href="/eula">
                EULA
              </TransitionLink>
            </div>
            <div className="flex gap-2">
              <a
                aria-label="X (Twitter)"
                className="size-8 flex items-center justify-center rounded-sm border border-(--border) text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                href="https://x.com/silklearn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn"
                className="size-8 flex items-center justify-center rounded-sm border border-(--border) text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                href="https://linkedin.com/company/silklearn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pb-4 text-sm text-(--muted-foreground)">
          {[
            'Privacy-first analytics',
            'GDPR ready',
            'Your data never leaves your team',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 shrink-0 text-(--primary)" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-(--border) pt-4 text-sm text-(--muted-foreground) sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>SILKLEARN</span>
            <span>Structure-first knowledge compilation</span>
          </div>

          <p className="hidden text-center text-xs md:block">
            Early-stage product — your feedback shapes what we build.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
            <span>© {year} SILKLEARN</span>
            <span>All rights reserved</span>
            <button
              aria-label="Back to top"
              className="flex items-center gap-1.5 transition-colors hover:text-(--foreground)"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="size-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}