import { ArrowRight, GitBranch } from 'lucide-react';
import { TransitionLink } from '@/components/marketing/page-transition';
import type { Metadata } from 'next';
import {
  MarketingCtaSection, MarketingHero, MarketingPageFrame, MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { getBreadcrumbSchema, getFaqPageSchema, getWebPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = buildMetadata({
  title: 'The reading order your sources never gave you.',
  description: 'Surface the prerequisite structure across your source material so you know what to read first, what unlocks the next concept, and where your sources disagree.',
  path: '/features/dependency-mapping',
  keywords: ['dependency mapping', 'knowledge synthesis', 'reading order', 'source structure'],
});

const bullets = [
  'Researchers: find which papers assume which priors — and stop assembling your model backwards.',
  'Developers: see which architecture decisions your code depends on — before you ship something that breaks one of them.',
  'Students: see where your textbooks disagree before that gap distorts your reasoning.',
];

const howItWorks = [
  { step: 'Ingest your sources', detail: 'Upload whatever you\'re trying to learn from — research papers, technical docs, textbooks, codebases, PDFs. SILKLEARN begins identifying the conceptual relationships between them.' },
  { step: 'Identify dependencies', detail: 'Using structural analysis, it finds where one concept assumes another has been understood — and makes those implicit assumptions into explicit prerequisite edges.' },
  { step: 'Build the graph', detail: 'The result is a directed acyclic graph (DAG) showing which concepts must come before others. The order is extracted from your sources, not invented.' },
  { step: 'You review it', detail: 'Before you follow the path, you inspect the graph. You see every edge, every source reference, every place where your sources conflict. You decide what to trust.' },
  { step: 'Follow the path', detail: 'The approved graph becomes your reading order — the exact sequence your material demands, with contradictions flagged and dependencies visible.' },
];

const faqs = [
  { question: 'Does this work with research papers?', answer: 'Yes. Research papers are one of the best inputs for SILKLEARN — they\'re dense, heavily cross-referenced, and assume a lot of prior knowledge. SILKLEARN surfaces those assumptions as explicit edges so you can see what you need to read before a given paper will make sense.' },
  { question: 'What if my sources contradict each other?', answer: 'That\'s exactly what SILKLEARN is built to surface. When two sources give conflicting accounts of the same concept, the graph flags the contradiction so you can see it — and decide which source to trust — instead of unknowingly building a mental model on inconsistent foundations.' },
  { question: 'How is this different from just asking an AI to summarize my sources?', answer: 'Summarization answers questions about what\'s in your sources. SILKLEARN synthesizes the structure — what depends on what, where sources agree, where they don\'t, and what order you should encounter the material in. It\'s not a query interface. It\'s a map.' },
  { question: 'Does it work with unstructured sources?', answer: 'Yes. SILKLEARN is designed for dense, unstructured source material — PDF papers, technical wikis, raw documentation, textbook chapters. You don\'t need clean formatting to start.' },
];

export default function DependencyMappingPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Features', url: absoluteUrl('/features') },
        { name: 'Dependency Mapping', url: absoluteUrl('/features/dependency-mapping') },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
        title: 'The reading order your sources never gave you.',
        description: 'Surface the prerequisite structure across your source material so you know what to read first, what unlocks the next concept, and where your sources disagree.',
        url: absoluteUrl('/features/dependency-mapping'),
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageSchema(faqs)) }} />
      <MarketingPageFrame>
        <MarketingHero
          kicker="Feature"
          title="The reading order your sources never gave you."
          description="You're starting with three textbooks on the same topic, a stack of papers that reference each other in circles, and a codebase README that assumes you already know the architecture — and none of them tell you which one to open first. SILKLEARN reads across all of them, maps what depends on what, and gives you the dependency order your source material never made explicit."
          rightEyebrow="Why this matters"
          rightTitle="A feature is only valuable if it makes the compiled graph more defensible in real use."
          rightChildren={
            <div className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0 text-sm leading-5 text-(--foreground)">
              This capability exists to make hidden knowledge structure inspectable and reusable instead of leaving it embedded in long source material.
            </div>
          }
        />
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">What it does</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                This feature turns hidden assumptions into something you can inspect.
              </h2>
            </>
          }
          right={
            <div>
              {bullets.map((bullet, index) => (
                <div key={bullet} className={index > 0 ? 'border-t border-(--border) pt-5' : ''}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center border border-(--border) text-(--primary)">
                      <GitBranch className="size-4.5" />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Capability 0{index + 1}</p>
                  </div>
                  <p className="mt-4 text-sm leading-5 text-(--foreground)">{bullet}</p>
                </div>
              ))}
            </div>
          }
        />
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">In depth</p>
          <p className="mt-4 max-w-prose text-base leading-7 text-(--foreground)">
            Most sources don't fail because the information is wrong — they fail because the reading order is invisible. When you're dropped into a new research area, a large codebase, or a pile of conflicting textbooks, there's no signal about what to read first. You build a mental model by accident, filling gaps in whatever order you happen to encounter them. SILKLEARN's dependency mapping makes that prerequisite structure explicit. It traces what each concept assumes you already know, finds where two sources give you different answers to the same question, and builds the graph your brain was trying to construct anyway — surfaced, inspectable, and ready to follow.
          </p>
        </section>
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">How it works</p>
          <h2 className="mt-4 font-(family-name:--font-display) text-2xl tracking-tight text-(--foreground)">Step by step</h2>
          <ol className="mt-8 space-y-8">
            {howItWorks.map((item, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-4">
                <span className="text-sm font-bold text-(--muted-foreground) tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-sm font-semibold text-(--foreground)">{item.step}</p>
                  <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="border-t border-(--border) px-6 py-14 sm:px-8 lg:px-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Common questions</p>
          <dl className="mt-8 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-(--border) pt-6">
                <dt className="text-sm font-semibold text-(--foreground)">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-(--muted-foreground)">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Related paths</p>
              <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                See where this capability becomes operationally useful.
              </h2>
            </>
          }
          right={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/use-cases/engineering-onboarding">Developer onboarding</TransitionLink>
              </div>
              <div className="border border-(--border) p-4">
                <TransitionLink className="text-sm font-semibold text-(--foreground)" href="/blog">Supporting guide</TransitionLink>
              </div>
              <div className="sm:col-span-2">
                <Button asChild><TransitionLink href="/waitlist">Join the waitlist</TransitionLink></Button>
              </div>
            </div>
          }
        />
        <MarketingCtaSection
          kicker="Next step"
          title="Use this capability to make the graph more defensible."
          actions={<Button asChild size="lg"><TransitionLink href="/waitlist">Request access<ArrowRight className="size-4" /></TransitionLink></Button>}
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
