import type { Metadata } from 'next';

import dynamic from 'next/dynamic';
import { CheckCircle2 } from 'lucide-react';

import {
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

const WaitlistForm = dynamic(
  () => import('@/components/waitlist-form').then(mod => mod.WaitlistForm),
);

export const metadata: Metadata = buildMetadata({
  title: 'Get Early Access to Knowledge Compilation',
  description:
    'Join the SILKLEARN waitlist if your team works from dense source material and wants reviewable learning paths, dependency graphs, and context bundles.',
  path: '/waitlist',
  keywords: ['SILKLEARN waitlist', 'knowledge compilation beta', 'reviewable learning path software'],
});

export default function WaitlistPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="Early access is aimed at teams testing onboarding flows, knowledge audits, and AI context workflows built from dense private material. If your problem is hidden structure, not missing documents, SILKLEARN is for you."
          kicker="Waitlist"
          rightChildren={
            <div className="grid gap-3">
              {[
                'Dense private docs already exist',
                'Onboarding or handoffs still depend on experts',
                'Wrong sequence creates expensive mistakes',
                'AI context needs better structure before retrieval',
              ].map((item) => (
                <div key={item} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
              <div className="mt-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                  What you get
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    'Dependency-ordered learning path from your own docs',
                    'Leader review workflow with full audit trail',
                    'AI-ready context bundle for internal LLMs',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-(--primary)" />
                      <span className="text-sm text-(--muted-foreground)">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
          rightEyebrow="Best fit"
          rightTitle="If the problem is hidden dependency order rather than missing documentation, this is the right entry point."
          title="Bring your team’s raw knowledge into reviewable structure."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Request access
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Tell us what document stack you want to compile first.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-5 text-(--muted-foreground)">
                The beta is best for leaders working from dense internal docs where onboarding, compliance review, operational handoffs, or internal AI delivery still depend on hidden structure.
              </p>
            </>
          }
          right={
            <>
              <div className="mb-6 border-l-2 border-(--primary) pl-4">
                <p className="text-sm font-medium text-(--foreground)">Applications reviewed in order</p>
                <p className="text-sm text-(--muted-foreground)">We accept teams on a rolling basis. Earlier applications get earlier access.</p>
              </div>
              <WaitlistForm />
            </>
          }
        />

        <div className="mt-16 border-t border-(--border) pt-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            Common questions
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-medium text-(--foreground)">Is this free?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                Early access is free for the first 3 months. No credit card required — ever, to apply.
              </p>
            </div>
            <div>
              <p className="font-medium text-(--foreground)">What kinds of docs work best?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                Technical runbooks, onboarding handbooks, architecture specs, compliance docs — anything with implicit prerequisite order buried across files.
              </p>
            </div>
            <div>
              <p className="font-medium text-(--foreground)">How long does review take?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                We review every application personally within 2 business days. You&apos;ll get a real email from a real human, not an automated sequence.
              </p>
            </div>
            <div>
              <p className="font-medium text-(--foreground)">Can I cancel anytime?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                Yes. There are no contracts or lock-ins during the beta. We want you to stay because it works, not because you&apos;re trapped.
              </p>
            </div>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}