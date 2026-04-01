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
  title: 'Get Early Access to SILKLEARN',
  description:
    'Your sources were written by someone who already knew the answer. SILKLEARN reads your sources and gives you back the path through them — dependency-ordered, contradiction-mapped, ready to use.',
  path: '/waitlist',
  keywords: ['SILKLEARN waitlist', 'knowledge synthesis early access', 'dependency ordered learning', 'synthesize sources'],
});

const faqs = [
  { question: 'What happens when I join the waitlist?', answer: "You'll get early access before the public launch. We're onboarding in small batches so we can work closely with each user — expect an invite within a few weeks, not months." },
  { question: 'What formats does SILKLEARN support?', answer: 'PDFs, documents, Notion pages, web links, and code repositories today. Video, audio, images, and API feeds (Confluence, etc.) are on the roadmap. If you can point to it, the synthesis engine can process it.' },
  { question: 'Is this a team product?', answer: "No. SILKLEARN is built for the individual doing the synthesis work — the researcher, the developer, the consultant. You don't need a team to use it. Canvas supports sharing when you want it, but the core product runs solo." },
  { question: 'How much will it cost?', answer: "Early access is free while we're in private beta. Pricing hasn't been finalized — early users will get founding-member terms." },
  { question: 'Can I use this as an AI agent or with my own AI stack?', answer: "Yes. MCP integration is in progress — any AI agent will be able to call the synthesis engine directly and get back a structured dependency map as clean context. If you're building on AI, get on the waitlist now." },
];

export default function WaitlistPage() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <div className="px-6 sm:px-8 lg:px-10 py-10 sm:py-14">
          <h1 className="font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
            Get early access to SILKLEARN.
          </h1>
        </div>
        <MarketingHero
          description="Every source you're learning from was written by someone who already understood the subject — and they arranged it in the order that made sense to them, not to you. SILKLEARN reads your sources and gives you back the path through them that the author assumed you didn't need."
          kicker="Early access"
          titleAs="h2"
          rightChildren={
            <div className="grid gap-3">
              {[
                "You have the sources. You still don't know what to read first.",
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
                    'The reading order your sources never gave you',
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
          title="Your sources assume you already know where to start."
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
                Best for anyone working across sources that were never written with your starting point in mind — technical papers, runbooks, course materials, or anything that assumes you already know what to read first.
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
          <div className="mt-6 grid gap-2 sm:grid-cols-1">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-(--border) py-4 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-(--foreground) [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-4 w-4 shrink-0 text-(--muted-foreground) transition-transform duration-200 group-open:rotate-180"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-6 text-(--muted-foreground)">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
