import type { Metadata } from 'next';

import { CheckCircle2 } from 'lucide-react';

import {
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { WaitlistForm } from '@/components/waitlist-form';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Get Early Access — SILKLEARN',
  description:
    'Your documents were written by someone who already knew the answer. SILKLEARN reads your sources and gives you back the path through them — dependency-ordered, contradiction-mapped, ready to use.',
  path: '/waitlist',
  keywords: ['SILKLEARN waitlist', 'knowledge path early access', 'dependency ordered learning', 'document structure AI'],
});

export default function WaitlistPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          description="Every document you're learning from was written by someone who already understood the subject — and they arranged it in the order that made sense to them, not to you. SILKLEARN reads your sources and gives you back the path through them that the author assumed you didn't need."
          kicker="Early access"
          rightChildren={
            <div className="grid gap-3">
              {[
                "You have the docs. You still don't know what to read first.",
                "You've got multiple sources. At least two of them disagree.",
                'No one left to ask what order it was meant to go in.',
                "AI answers your questions. It doesn't tell you which questions to ask first.",
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
                    'The reading order your documents never gave you',
                    "A contradiction map — so you know where sources disagree before you assume they don't",
                    'Context your AI tools can actually use — ordered by how the knowledge depends on itself',
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
          rightTitle="You'll recognize at least one of these."
          title="Your documents assume you already know where to start."
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Request access
              </p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Tell us what you're trying to understand.
              </h2>
              <p className="mt-4 max-w-[44ch] text-base leading-5 text-(--muted-foreground)">
                Best for teams where the knowledge lives in documents written by people who no longer work there — or who assumed you understood the domain when they wrote them.
              </p>
            </>
          }
          right={
            <>
              <div className="mb-6 border-l-2 border-(--primary) pl-4">
                <p className="text-sm font-medium text-(--foreground)">We review in the order we receive them</p>
                <p className="text-sm text-(--muted-foreground)">We work through applications as they come in. The earlier you apply, the earlier you're in.</p>
              </div>
              <WaitlistForm />
            </>
          }
        />

        <div className="mt-16 border-t border-(--border) pt-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            Before you apply
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-medium text-(--foreground)">Is this free?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                Free for the first three months — no credit card required to apply, ever. We&apos;d rather you see whether it works before we talk about pricing.
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
                We review every application within two business days — you&apos;ll get a real reply from someone who actually read what you submitted, not an automated sequence.
              </p>
            </div>
            <div>
              <p className="font-medium text-(--foreground)">Can I cancel anytime?</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                Yes. No contracts, no lock-ins during the beta. We want you to stay because it works, not because you&apos;re trapped.
              </p>
            </div>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
