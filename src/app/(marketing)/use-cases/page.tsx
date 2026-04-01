import { ArrowRight, Network } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { FloatingCta } from '@/components/marketing/floating-cta';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import {
  MarketingCtaSection,
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Research Synthesis and Knowledge Paths From Any Source',
  description:
    'SILKLEARN synthesizes your sources into a dependency-ordered path — for research, deep learning, and any domain where the reading order isn\'t obvious.',
  path: '/use-cases',
  keywords: ['research synthesis', 'knowledge path from sources', 'dependency ordered reading', 'research synthesis tool', 'knowledge compilation'],
});

export default function UseCasesPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="The structure is already implicit in the material. Your sources reference each other, assume prior concepts, and quietly contradict each other — but none of them tell you which one to read first. That order isn't missing. It's just not visible yet."
          kicker="Use cases"
          rightChildren={
            <div className="grid gap-3 sm:grid-cols-2">
              {['Twenty sources, no obvious starting point', 'They contradict each other and neither flags it', 'You finish one, realize you needed another first', 'The structure exists — it\'s just invisible'].map((item) => (
                <div key={item} className="bg-[oklch(from_var(--foreground)_l_c_h/0.04)] px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          }
          rightEyebrow="Best fit"
          rightTitle="This is where it pays off before you spend hours reading in the wrong order."
          title="Research synthesis and knowledge paths from any source."
          titleClassName="text-4xl sm:text-5xl lg:text-6xl"
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Workflow fit
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg max-sm:text-display-md leading-none tracking-[-0.02em] text-(--foreground)">
                Start where missing context is already costing something.
              </h2>
            </>
          }
          right={
            <div>
              {useCasePages.map((page, index) => (
                <div key={page.slug} className={index > 0 ? 'border-t border-(--border) pt-6' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 max-sm:size-8 items-center justify-center border border-(--border) text-(--primary)">
                      <Network className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      Use case {index + 1}
                    </p>
                  </div>
                  <TransitionLink className="group mt-4 block" href={`/use-cases/${page.slug}`}>
                    <h3 className="text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground) transition-colors duration-150 group-hover:underline underline-offset-4 decoration-1 decoration-(--border) group-hover:decoration-(--foreground)">
                      {page.title}
                    </h3>
                  </TransitionLink>
                  <p className="mt-3 max-w-[56ch] text-sm leading-5 text-(--muted-foreground)">{page.summary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {page.outcomes.map((outcome) => (
                      <div key={outcome} className="bg-[oklch(from_var(--foreground)_l_c_h/0.04)] px-4 py-3 max-sm:py-2.5 text-sm leading-6 text-(--foreground)">
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg" className="active:scale-[0.97] transition-transform duration-[160ms] ease-out">
              <TransitionLink href="/waitlist">
                Show us your workflow
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="Pick one workflow. Run it through. See what your sources actually contain."
        />
      </MarketingPageFrame>
      <FloatingCta />
    </PageShell>
  );
}