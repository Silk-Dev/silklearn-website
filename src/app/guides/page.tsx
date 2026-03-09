import { ArrowRight, BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { guidePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guides',
  description:
    'Read practical guides on dependency-ordered learning, turning docs into onboarding paths, and structuring team knowledge transfer.',
  path: '/guides',
  keywords: ['team learning guides', 'docs to training guide', 'dependency ordered learning'],
});

export default function GuidesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="These guides explain the underlying logic of dependency-ordered knowledge, not just the UI surface of the product."
          kicker="Guides"
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {['Explain dependency order', 'Clarify product thesis', 'Support SEO depth', 'Connect to practical workflows'].map((item) => (
                <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Guide intent"
          rightTitle="The educational layer should explain why structured learning matters before someone ever sees the product."
          title="Educational content that can rank on its own."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Reading list
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                Read the theory, then apply it to real internal knowledge.
              </h2>
            </>
          }
          right={
            <div>
              {guidePages.map((page, index) => (
                <div key={page.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <BookOpenText className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Guide {index + 1}
                    </p>
                  </div>
                  <Link className="mt-4 block text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)" href={`/guides/${page.slug}`}>
                    {page.title}
                  </Link>
                  <p className="mt-3 max-w-[56ch] text-sm leading-7 text-(--muted-foreground)">{page.summary}</p>
                </div>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <Link href="/waitlist">
                Start with your docs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          kicker="Next step"
          title="Use the theory on a real document stack."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}