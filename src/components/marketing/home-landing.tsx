import { Fragment } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
  FileStack,
  Sparkles,
} from 'lucide-react';

import { LinkedNodesGraph } from '@/components/marketing/linked-nodes-graph';
import { LottiePlaceholder } from '@/components/marketing/lottie-placeholder';
import { ScrollReveal, StaggerReveal } from '@/components/marketing/scroll-animations';
import { WaitlistForm } from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { type HomePageContent } from '@/lib/site-content';
import { getFaqPageSchema } from '@/lib/structured-data';

const trustMarks = [
  'Engineering onboarding',
  'Platform operations',
  'Support enablement',
  'Compliance handoff',
  'AI context packaging',
  'Internal documentation systems',
];

const operatingModes = [
  {
    title: 'Make prerequisite order obvious before teams make mistakes',
    body: 'Turn architecture docs, onboarding notes, and runbooks into a reviewed sequence so teams stop guessing what comes first.',
    eyebrow: 'Compile',
    metrics: ['See what must be learned first', 'Keep every step tied to source'],
  },
  {
    title: 'Reuse one compiled graph across onboarding, rollout, and AI',
    body: 'Build one reviewed structure that feeds onboarding, rollout review, and AI context delivery without rebuilding the logic each time.',
    eyebrow: 'Consolidate',
    metrics: ['One structure, multiple outputs', 'Leader-approved context bundles'],
  },
];

const actionPanels = [
  {
    step: 'Step 01',
    title: 'Start with the real document stack, not a rewritten summary',
    summary: 'Document boundaries stay visible so leaders can see what was actually compiled, what remains unresolved, and what still needs human review.',
    rows: [
      'Architecture spec.pdf',
      'Support escalation runbook.docx',
      'Internal onboarding handbook.md',
    ],
    note: 'Source provenance preserved',
  },
  {
    step: 'Step 02',
    title: 'Surface the dependency order before a rollout depends on it',
    summary: 'The graph makes hidden prerequisite logic visible before onboarding, handoff, or internal AI depends on it being correct.',
    rows: [
      'Auth model -> Access policy',
      'Access policy -> Incident recovery',
      'Incident recovery -> Escalation workflow',
    ],
    note: 'Cross-document links reviewed',
  },
  {
    step: 'Step 03',
    title: 'Ship outputs teams can actually use',
    summary: 'Teams publish onboarding ramps, review queues, and minimum-context bundles from the same compiled structure instead of rebuilding from scratch.',
    rows: [
      'Engineering onboarding path',
      'Support agent context bundle',
      'Leader review queue',
    ],
    note: 'Outputs stay reviewable',
  },
];

const stageJourney = [
  {
    label: 'Stage A',
    title: 'Raise team understanding from dense source material',
  },
  {
    label: 'Stage B',
    title: 'Connect the next document stack before the next handoff',
  },
  {
    label: 'Stage C',
    title: 'Reuse the compiled graph across teams and internal tools',
  },
  {
    label: 'Stage D',
    title: 'Standardize knowledge transfer without losing review',
  },
];

type HomeLandingProps = {
  content: HomePageContent;
  isSanityConfigured: boolean;
};

export function HomeLanding({ content, isSanityConfigured }: HomeLandingProps) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqPageSchema(content.faq)),
        }}
        type="application/ld+json"
      />

      {/* Outer rails — border-left + border-right form the two continuous vertical lines */}
      <div className="border-x border-(--border)  ">

        <div className="grid lg:grid-cols-[1fr_1px_1fr] ">
          <div className="px-6 py-10 sm:px-8 lg:px-10 lg:py-50">
            <div className="max-w-125">

              <h1 className=" font-(family-name:--font-display) text-[clamp(2.4rem,3vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {content.headline}
              </h1>

              <div className="mt-2 max-w-[56ch] text-[1.02rem] leading-7 text-(--muted-foreground)">
                {content.subheadline}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" >
                  <a href={content.primaryCtaHref}>
                    {content.primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
                </Button>
              </div>

              
            </div>
          </div>

          {/* Structural vertical divider — a real 1px column, not an absolute div */}
          <div className="hidden bg-(--border) lg:block" />

          <div className="border-t border-(--border) lg:flex lg:items-end lg:border-t-0">
            <LinkedNodesGraph />
          </div>
        </div>

        {/* ── HERO ── grid with 1px structural divider column */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] ">
          <div className="px-6 py-14 sm:px-8 lg:px-10 lg:py-20 bg-red-100">
            <div className="max-w-125">
              <ScrollReveal delay={0.1} start="top 99%">
              <div className="flex max-w-fit items-center gap-2 rounded-full border border-[oklch(from_var(--primary)_l_c_h/0.18)] bg-[oklch(from_var(--primary)_l_c_h/0.06)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--primary)">
                <Sparkles className="size-3.5" />
                {content.kicker}
              </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25} start="top 99%">
              <h1 className="mt-10 max-w-[9.5ch] font-(family-name:--font-display) text-[clamp(2.4rem,4.2vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
                {content.headline}
              </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.4} start="top 99%">
              <p className="mt-6 max-w-[56ch] text-[1.02rem] leading-5 text-(--muted-foreground)">
                {content.subheadline}
              </p>
              </ScrollReveal>

              <ScrollReveal delay={0.55} start="top 99%">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href={content.primaryCtaHref}>
                    {content.primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
                </Button>
              </div>

              </ScrollReveal>

              {!isSanityConfigured && (
                <div className="mt-8 flex items-center gap-2 text-sm text-(--muted-foreground)">
                  <BadgeCheck className="size-4 text-(--primary)" />
                  <span>Using fallback marketing content until Sanity is configured.</span>
                </div>
              )}
            </div>
          </div>

          {/* Structural vertical divider — a real 1px column, not an absolute div */}
          <div className="hidden bg-(--border) lg:block" />

          <div className="border-t border-(--border) px-6 py-14 sm:px-8 lg:border-t-0 lg:px-10 lg:py-20">
            <div className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              <span>From raw docs to usable output</span>
              <span>Live preview</span>
            </div>

            <div className="mt-6 grid lg:grid-cols-[0.86fr_1px_1.14fr]">
              <div className="py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Source stack</p>
                <div className="mt-5 grid gap-3">
                  {[
                    'Security architecture spec.pdf',
                    'Internal onboarding handbook.md',
                    'Support escalation runbook.docx',
                    'Product system glossary.export',
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-(--border) px-1 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-sm font-medium text-(--foreground)">{item}</span>
                      <FileStack className="size-4 text-(--primary)" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden bg-(--border) lg:block" />

              <div className="border-t border-(--border) py-5 lg:border-t-0 lg:pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Output layer</p>
                <div className="mt-5 grid gap-3">
                  {content.metrics.map((metric) => (
                    <div key={metric.label} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-(--muted-foreground)">{metric.label}</p>
                      <p className="mt-1 text-sm leading-6 text-(--foreground)">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3">
                  {['Reviewable graph', 'Learning path outputs', 'AI context bundles'].map((item) => (
                    <div key={item} className="border-b border-(--border) pb-3 last:border-b-0 last:pb-0">
                      <p className="text-sm font-semibold text-(--foreground)">{item}</p>
                      <p className="mt-1 text-sm leading-6 text-(--muted-foreground)">Grounded in provenance and ready for review.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST MARKS ── horizontal rule via border-top, items divided by border */}
        <StaggerReveal className="grid border-t border-(--border) sm:grid-cols-2 lg:grid-cols-6" stagger={0.06}>
          {trustMarks.map((mark, i) => (
            <div key={mark} className={`px-5 py-5 text-sm font-semibold text-(--foreground)${i > 0 ? ' border-t sm:border-t-0 sm:border-l border-(--border)' : ''}`}>
              {mark}
            </div>
          ))}
        </StaggerReveal>

        {/* ── SOLUTIONS ── centered header then 2-col grid */}
        <div className="border-t border-(--border) px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <ScrollReveal className="mx-auto max-w-140 text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">SILKLEARN solutions</p>
            <h2 className="mt-4 font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Two ways teams use SILKLEARN to reduce guesswork.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1fr]">
          {operatingModes.map((mode, i) => {
            return (
              <Fragment key={mode.title}>
                {i > 0 && <div className="bg-(--border) max-lg:h-px" />}
                <ScrollReveal className="p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{mode.eyebrow}</p>
                  <h3 className="mt-3 max-w-[18ch] text-[1.5rem] leading-tight tracking-[-0.02em] text-(--foreground)">{mode.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-sm leading-5 text-(--muted-foreground)">{mode.body}</p>

                  <LottiePlaceholder
                    className="mt-8"
                    description={mode.eyebrow === 'Compile'
                      ? 'Animated diagram: raw document pages (PDF, MD, DOCX) feed into a funnel that outputs a structured dependency graph with nodes and directed edges. Nodes light up in sequence to show prerequisite order being discovered.'
                      : 'Animated diagram: a single compiled graph branches into three output lanes — an onboarding path, a review queue, and an AI context bundle. Each lane pulses to show reuse from one source structure.'}
                    height="h-48"
                    label={`Lottie · ${mode.eyebrow}`}
                  />

                  <div className="mt-4">
                    {mode.metrics.map((metric) => (
                      <div key={metric} className="border-t border-(--border) py-3 text-sm font-medium text-(--foreground)">
                        {metric}
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </Fragment>
            );
          })}
        </div>

        {/* ── IN ACTION ── left rail + stacked cards, Rollups pattern */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_2fr]">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">SILKLEARN in action</p>
            <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Use one compiled source across onboarding, handoff, and AI.
            </h2>
            <p className="mt-4 max-w-[42ch] text-base leading-5 text-(--muted-foreground)">
              Each operating view shows how dense source material becomes something a team can review, trust, and reuse.
            </p>

            <div className="mt-8">
              {[
                'Review dense internal knowledge before rollout.',
                'Make prerequisite logic visible before teams guess.',
                'Ship outputs that stay tied to the source.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-t border-(--border) py-3 text-sm leading-5 text-(--muted-foreground) first:border-t-0 first:pt-0">
                  <ChevronRight className="mt-1 size-4 shrink-0 text-(--primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Structural divider between left rail and cards */}
          <div className="hidden bg-(--border) lg:block" />

          <div>
            {actionPanels.map((panel, i) => (
              <div key={panel.step} className={`grid lg:grid-cols-[1.3fr_1px_1fr]${i > 0 ? ' border-t border-(--border)' : ''}`}>
                {/* Illustration / data side */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                    <span>{panel.step}</span>
                    <span>{panel.note}</span>
                  </div>
                  <div className="mt-6">
                    <LottiePlaceholder
                      className="mb-5"
                      description={panel.step === 'Step 01'
                        ? 'Animated stack of documents fanning out with file-type badges, then being drawn into a scanning beam that highlights headings and structure.'
                        : panel.step === 'Step 02'
                          ? 'Animated dependency graph building itself: nodes appear one by one, then directed edges draw between them showing prerequisite order. Cross-document links highlight in a different color.'
                          : 'Animated split view: a compiled graph on the left emits three output artifacts to the right — a learning path, a review checklist, and a context bundle — each sliding into place.'}
                      height="h-28"
                      label={`Lottie · ${panel.step}`}
                    />
                    {panel.rows.map((row) => (
                      <div key={row} className="flex items-center justify-between border-t border-(--border) py-3 text-sm">
                        <span className="font-medium text-(--foreground)">{row}</span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-(--muted-foreground)">mapped</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structural divider */}
                <div className="hidden bg-(--border) lg:block" />

                {/* Text side */}
                <div className="border-t border-(--border) p-6 sm:p-8 lg:border-t-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{panel.step}</p>
                  <h3 className="mt-4 max-w-[16ch] text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">{panel.title}</h3>
                  <p className="mt-4 text-sm leading-5 text-(--muted-foreground)">{panel.summary}</p>
                  <a className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-(--foreground)" href="#waitlist">
                    Learn more
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STAGES ── left text block + right sidebar, Rollups "Used by companies" */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1.3fr_1px_1fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <ScrollReveal>
            <h2 className="max-w-[11ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Built for teams where missing context creates expensive mistakes.
            </h2>
            </ScrollReveal>

            <StaggerReveal className="mt-10" stagger={0.1}>
              {stageJourney.map((stage) => (
                <div key={stage.label} className="grid gap-2 border-t border-(--border) py-5 first:border-t-0 first:pt-0 lg:grid-cols-[110px_1fr]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">{stage.label}</p>
                  <p className="text-base leading-5 text-(--foreground)">{stage.title}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>

          <div className="hidden bg-(--border) lg:block" />

          <ScrollReveal className="border-t border-(--border) p-6 sm:p-8 lg:border-t-0 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Why this works</p>
            <h3 className="mt-4 max-w-[16ch] text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
              When order is visible, teams ramp faster and handoffs break less often.
            </h3>
            <p className="mt-4 text-sm leading-5 text-(--muted-foreground)">
              Teams can only reuse internal knowledge safely when the order, provenance, and downstream implications are visible before rollout, onboarding, or AI delivery.
            </p>

            <LottiePlaceholder
              className="mt-6"
              description="Animated timeline/flowchart: a team onboarding ramp shortening visually as dependency order becomes visible. Steps snap into sequence, gaps highlight in red then resolve to green, total time compresses."
              height="h-40"
              label="Lottie · Stages"
            />

            <div className="mt-4">
              {[
                'Raise team understanding from dense documents',
                'Connect the next source stack before the next handoff',
                'Standardize outputs for humans and internal AI tools',
              ].map((item) => (
                <div key={item} className="border-t border-(--border) py-4 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── CORE PILLARS ── */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1.3fr]">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Core pillars</p>
            <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Structure is the product. Everything else is downstream.
            </h2>
          </ScrollReveal>

          <div className="hidden bg-(--border) lg:block" />

          <StaggerReveal stagger={0.1}>
            {content.pillars.map((pillar, i) => (
              <div key={pillar.title} className={`grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8${i > 0 ? ' border-t border-(--border)' : ''}`}>
                <div className="flex size-11 items-center justify-center rounded-xl border border-[oklch(from_var(--primary)_l_c_h/0.14)] bg-(--card) text-(--primary)">
                  <CheckCircle2 className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-[1.05rem] leading-tight text-(--foreground)">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-5 text-(--muted-foreground)">{pillar.description}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>

        {/* ── FAQ ── */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1.3fr]">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Common questions</p>
            <h2 className="mt-4 max-w-[9ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              Core questions, answered directly.
            </h2>
          </ScrollReveal>

          <div className="hidden bg-(--border) lg:block" />

          <StaggerReveal stagger={0.1}>
            {content.faq.map((item, i) => (
              <div key={item.question} className={`px-6 py-6 sm:px-8${i > 0 ? ' border-t border-(--border)' : ''}`}>
                <h3 className="text-base font-semibold text-(--foreground)">{item.question}</h3>
                <p className="mt-3 text-sm leading-5 text-(--muted-foreground)">{item.answer}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>

        {/* ── WAITLIST ── */}
        <div className="grid border-t border-(--border) lg:grid-cols-[1fr_1px_1fr]" id="waitlist">
          <ScrollReveal className="p-6 sm:p-8 lg:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">Early access</p>
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2rem,3.6vw,3.375rem)] leading-none tracking-[-0.02em] text-(--foreground)">
              See whether your document stack is a fit for early access.
            </h2>
            <p className="mt-5 max-w-[56ch] text-base leading-5 text-(--muted-foreground)">
              Early access is for leaders using private docs for onboarding, operational handoffs, compliance review, or internal AI context. If missing dependency order is slowing the team down, this is what the beta is built for.
            </p>

            <div className="mt-8">
              {[
                'Roadmaps from private docs',
                'Dependency-aware onboarding',
                'Minimum-context AI bundles',
                'Leader-reviewed rollout artifacts',
              ].map((item) => (
                <div key={item} className="border-t border-(--border) py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="hidden bg-(--border) lg:block" />

          <ScrollReveal className="border-t border-(--border) p-6 sm:p-8 lg:border-t-0 lg:p-10">
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}