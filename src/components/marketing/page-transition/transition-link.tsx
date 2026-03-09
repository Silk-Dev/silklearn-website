'use client';

import type { ComponentProps, MouseEvent } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { animatePageOut } from './animations';

type TransitionLinkProps = ComponentProps<typeof Link> & {
  onBeforeNavigate?: () => void;
};

export function TransitionLink({
  href,
  onBeforeNavigate,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = typeof href === 'string' ? href : href.pathname ?? '/';

    // Let the browser handle external links, anchors, or same-page
    if (target.startsWith('http') || target.startsWith('#') || target === pathname) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);
    onBeforeNavigate?.();
    animatePageOut(target, router);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
