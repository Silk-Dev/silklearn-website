import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Jesser & Oussama Bedoui — Cofounders of SILKLEARN',
  description:
    'Jesser and Oussama Bedoui are the cofounders of SILKLEARN, building knowledge compilation infrastructure for teams working from dense source material.',
  path: '/about',
  keywords: ['jesser bedoui', 'oussama bedoui', 'silklearn cofounders', 'knowledge compilation'],
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
            The Cofounders
          </h1>
          <p className="mt-3 text-base leading-7 text-(--muted-foreground) max-w-[52ch]">
            Two brothers building SILKLEARN — knowledge compilation infrastructure for teams working from dense source material.
          </p>

          {/* Founders grid — equal columns, equal depth */}
          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {/* Jesser */}
            <div>
              <div className="mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
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
                Building the product and the vision. Saw teams fail not from missing docs but from
                docs with no order — and decided to fix that.
              </p>
            </div>

            {/* Oussama */}
            <div>
              <div className="mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
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
                Building the system. Six years shipping production software across Angular, Java,
                and Spring Boot — owns the engineering at SILKLEARN.
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
              A raw day-by-day founder journal documenting the build from zero. Written in real
              time, published unfiltered.
            </p>
            <div className="mt-4">
              <TransitionLink
                href="/the-reset"
                className="inline-flex items-center gap-1.5 text-sm text-(--foreground) underline underline-offset-4 decoration-(--border) hover:decoration-(--foreground) transition-colors duration-150"
              >
                Read The Reset
                <ArrowRight className="size-3.5" />
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
