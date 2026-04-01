'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TransitionLink } from '@/components/marketing/page-transition';
import { track } from '@/lib/analytics';

export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on the waitlist page itself
  if (pathname === '/waitlist') return null;

  return (
    <div
      className={`fixed bottom-24 right-6 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <Button
        asChild
        size="lg"
        className="shadow-lg"
        onClick={() =>
          track('cta_primary_clicked', {
            cta_label: 'Join the waitlist',
            cta_position: 'floating',
            section_name: 'floating-cta',
          })
        }
      >
        <TransitionLink href="/waitlist">
          Join the waitlist
          <ArrowRight className="ml-1.5 size-4" />
        </TransitionLink>
      </Button>
    </div>
  );
}
