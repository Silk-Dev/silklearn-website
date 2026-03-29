import { ArrowRight } from 'lucide-react';

import { ForWhomExperience } from '@/components/marketing/for-whom-experience';
import { TransitionLink } from '@/components/marketing/page-transition';

import type { Metadata } from 'next';
import { personas } from '@/lib/marketing-personas';

import {
  MarketingCtaSection,
  MarketingPageFrame,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';


export const metadata: Metadata = buildMetadata({
  title: 'Who Benefits from SILKLEARN',
  description:
    'See which teams get the most value from SILKLEARN when missing context, hidden dependencies, and wrong sequencing create expensive mistakes.',
  path: '/for-teams',
  keywords: ['silklearn for teams', 'team leads onboarding docs', 'ops compliance AI context'],
});

export default function ForWhomPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <ForWhomExperience personas={personas} />

        <MarketingCtaSection
          actions={
            <Button asChild size="lg">
              <TransitionLink href="/waitlist">
                Request Early Access
                <ArrowRight className="size-4" />
              </TransitionLink>
            </Button>
          }
          kicker="Next step"
          title="See whether your document stack is a fit for early access."
        />
      </MarketingPageFrame>
    </PageShell>
  );
}