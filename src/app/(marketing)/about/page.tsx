import { ArrowRight } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Jesser Bedoui — Founder of SILKLEARN',
  description:
    'Jesser Bedoui is the founder of SILKLEARN, building knowledge compilation infrastructure for teams working from dense source material.',
  path: '/about',
  keywords: ['jesser bedoui', 'silklearn founder', 'knowledge compilation'],
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jesser Bedoui',
  url: 'https://www.silklearn.io/about',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'SILKLEARN',
    url: 'https://www.silklearn.io',
  },
  description: 'Founder of SILKLEARN, building knowledge compilation infrastructure for teams.',
  sameAs: ['https://x.com/silklearn'],
};

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <MarketingPageFrame>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          {/* Header */}
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            Founder
          </p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground)">
            Jesser Bedoui
          </h1>
          <p className="mt-3 text-base leading-7 text-(--muted-foreground) max-w-[52ch]">
            Building SILKLEARN — knowledge compilation infrastructure for teams.
          </p>

          {/* Bio */}
          <div className="mt-14 max-w-[62ch] space-y-6 text-base leading-7 text-(--muted-foreground)">
            <p>
              I&apos;m building SILKLEARN after spending years watching teams fail not because they
              lacked documentation, but because the documentation had no visible order. Engineers
              would read the right docs in the wrong sequence. Leads would ship onboarding that made
              sense in their heads but not on paper.
            </p>
            <p>
              SILKLEARN is the infrastructure I wanted to exist. It compiles dense source material
              into dependency-ordered learning paths that leaders can review before they ship to the
              team.
            </p>
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
