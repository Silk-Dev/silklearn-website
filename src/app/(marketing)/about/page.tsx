import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'The Team Behind SILKLEARN — Jesser & Oussama Bedoui',
  description:
    'Jesser and Oussama Bedoui built SILKLEARN after years of working with sources that had no reading order — and no tool that could find it.',
  path: '/about',
  keywords: ['jesser bedoui', 'oussama bedoui', 'silklearn cofounders', 'knowledge synthesis'],
});

const foundersSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Jesser Bedoui',
      url: 'https://www.silklearn.io/about',
      jobTitle: 'Cofounder',
      worksFor: { '@type': 'Organization', name: 'SILKLEARN', url: 'https://www.silklearn.io' },
    },
    {
      '@type': 'Person',
      name: 'Oussama Bedoui',
      url: 'https://www.silklearn.io/about',
      jobTitle: 'Cofounder',
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'Université Sesame' },
        { '@type': 'EducationalOrganization', name: 'Institut Supérieur de Gestion de Tunis' },
      ],
      worksFor: { '@type': 'Organization', name: 'SILKLEARN', url: 'https://www.silklearn.io' },
    },
  ],
};

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersSchema) }}
      />
      <MarketingPageFrame>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          {/* Header */}
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            Cofounders
          </p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground)">
            The team behind SILKLEARN — and why we built it.
          </h1>
          <p className="mt-3 text-base leading-7 text-(--muted-foreground) max-w-[52ch]">
            Two brothers who spent years working across sources that had all the knowledge and none of the order — and no tool that could surface it.
          </p>

          {/* Founders grid — equal columns, staggered entry */}
          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {/* Jesser — enters first */}
            <div style={{ animation: 'fade-up 0.5s cubic-bezier(0.23,1,0.32,1) both' }}>
              <div className="founder-photo mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
                <Image
                  src="/founders/jesser-bedoui.png"
                  alt="Jesser Bedoui — Cofounder of SILKLEARN"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                Cofounder
              </p>
              <h2 className="mt-1 font-(family-name:--font-display) text-xl tracking-[-0.02em] text-(--foreground)">
                Jesser Bedoui
              </h2>
              <p className="mt-4 text-sm leading-7 text-(--muted-foreground)">
                Spent years watching people fail to synthesize knowledge not because the sources
                were missing — but because the structure in them was invisible. He&apos;s building
                the product that makes it visible.
              </p>
            </div>

            {/* Oussama — enters 80ms after */}
            <div style={{ animation: 'fade-up 0.5s cubic-bezier(0.23,1,0.32,1) 80ms both' }}>
              <div className="founder-photo mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
                <Image
                  src="/founders/oussama-bedoui.jpg"
                  alt="Oussama Bedoui — Cofounder of SILKLEARN"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                Cofounder
              </p>
              <h2 className="mt-1 font-(family-name:--font-display) text-xl tracking-[-0.02em] text-(--foreground)">
                Oussama Bedoui
              </h2>
              <p className="mt-4 text-sm leading-7 text-(--muted-foreground)">
                Six years shipping production software in Angular, Java, and Spring Boot before any
                of this started — which is why the architecture doesn&apos;t look like something
                stitched together over weekends. He owns the engineering.
              </p>
            </div>
          </div>

          {/* The Reset section */}
          <div className="mt-16 border-t border-(--border) pt-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Writing
            </p>
            <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
              The Reset
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
              A day-by-day founder journal — written the same day it happens, not reconstructed
              later. What actually went wrong, what we shipped, and what we changed our minds about.
            </p>
            <div className="mt-4">
              <TransitionLink
                href="/the-reset"
                className="group inline-flex items-center gap-1.5 text-sm text-(--foreground) underline underline-offset-4 decoration-(--border) hover:decoration-(--foreground) [transition:color_150ms_ease-out,text-decoration-color_150ms_ease-out]"
              >
                Read The Reset
                <ArrowRight className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
              </TransitionLink>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-16 border-t border-(--border) pt-12 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <TransitionLink href="/the-reset">Read The Reset</TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
            </Button>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
