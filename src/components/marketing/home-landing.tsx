import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  FileStack,
  GitBranch,
  Layers3,
  LibraryBig,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Waypoints,
} from 'lucide-react';

import { WaitlistForm } from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type HomePageContent } from '@/lib/site-content';
import { getFaqPageSchema } from '@/lib/structured-data';

import { HomeProcessShowcase } from './home-process-showcase';

const trustMarks = [
  'Engineering onboarding',
  'Platform operations',
  'Support enablement',
  'Compliance handoff',
  'AI context packaging',
  'Internal documentation systems',
];

const features = [
  {
    title: 'Dependency-aware graph',
    body: 'Expose what depends on what instead of forcing teams to infer order from pages and tribal memory.',
    icon: GitBranch,
  },
  {
    title: 'Structured segmentation',
    body: 'Break dense documents into coherent knowledge units without losing provenance or scope.',
    icon: ScanSearch,
  },
  {
    title: 'Leader review loop',
    body: 'Approve sequence, unresolved edges, and downstream outputs before they become operational guidance.',
    icon: ShieldCheck,
  },
  {
    title: 'Minimum-context outputs',
    body: 'Generate the smallest defensible bundle of knowledge required for people or models to reason correctly.',
    icon: BrainCircuit,
  },
  {
    title: 'Learning path generation',
    body: 'Turn the compiled graph into onboarding plans and knowledge ramps grounded in the source material.',
    icon: LibraryBig,
  },
  {
    title: 'Reusable knowledge assets',
    body: 'Keep a durable compiled structure that can feed multiple workflows instead of rebuilding context every time.',
    icon: Layers3,
  },
];

const useCases = [
  'Engineering onboarding from system docs',
  'Support escalation training from runbooks',
  'Operational handoff between teams',
  'Compliance knowledge transfer',
  'AI context bundles for internal copilots',
  'Knowledge audits before major rollouts',
];

const rolloutModes = [
  {
    title: 'Pilot',
    body: 'Start with one document stack and one team-critical workflow to validate the compiled graph.',
    bullets: ['Single domain focus', 'Leader review queue', 'Early artifacts'],
  },
  {
    title: 'Team rollout',
    body: 'Extend the graph across multiple sources and publish role-specific learning paths and context bundles.',
    bullets: ['Cross-source linking', 'Knowledge path outputs', 'Ops handoff support'],
  },
  {
    title: 'Private deployment',
    body: 'Run SilkLearn against sensitive internal knowledge with provenance, review, and structure preserved.',
    bullets: ['Private document stacks', 'Structured review controls', 'Enterprise workflow fit'],
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

      <section className="grid gap-10 px-1 pb-10 pt-6 text-center">
        <div className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-[rgba(31,63,122,0.14)] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-(--primary)">
          <Sparkles className="size-3.5" />
          {content.kicker}
        </div>

        <div className="mx-auto max-w-245">
          <h1 className="mx-auto max-w-[12ch] font-(family-name:--font-display) text-[clamp(3.8rem,8vw,7rem)] leading-[0.88] tracking-[-0.065em] text-(--foreground)">
            {content.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-[64ch] text-[1.06rem] leading-8 text-(--muted-foreground)">
            {content.subheadline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
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

        <div className="mx-auto flex items-center justify-center gap-2 text-sm text-(--muted-foreground)">
          <BadgeCheck className="size-4 text-(--primary)" />
          <span>
            {isSanityConfigured
              ? 'Homepage content is loading from Sanity.'
              : 'Using fallback marketing content until Sanity is configured.'}
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-295 overflow-hidden rounded-[34px] border border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#fbfdff_0%,#f1f6fc_100%)] p-4 shadow-[0_30px_120px_rgba(15,23,42,0.09)] sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-x-[16%] top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(31,63,122,0.14),transparent_65%)]" />
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="overflow-hidden rounded-[28px] border-[rgba(10,25,49,0.08)] bg-white shadow-none">
              <CardHeader className="flex-row items-center justify-between gap-4 border-b border-(--border) pb-4">
                <div className="text-left">
                  <CardTitle className="text-lg">Compiled knowledge workspace</CardTitle>
                  <CardDescription className="mt-1 text-sm leading-6">
                    Source material in, dependency-aware structure out.
                  </CardDescription>
                </div>
                <div className="rounded-full bg-[rgba(31,63,122,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-(--primary)">
                  5-pass system
                </div>
              </CardHeader>

              <CardContent className="grid gap-4 pt-6 xl:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[22px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.95)] p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                    Source stack
                  </p>
                  <div className="mt-4 grid gap-3">
                    {[
                      'Security architecture spec.pdf',
                      'Internal onboarding handbook.md',
                      'Customer support escalation runbook.docx',
                      'Product system glossary.export',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-white px-4 py-3"
                      >
                        <span className="text-sm font-medium text-(--foreground)">{item}</span>
                        <FileStack className="size-4 text-(--primary)" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 text-left">
                  <div className="rounded-[22px] border border-[rgba(31,63,122,0.12)] bg-[linear-gradient(180deg,rgba(24,45,84,1),rgba(28,58,106,0.96))] p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.66)]">
                      Output layer
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {content.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-[18px] border border-white/10 bg-white/6 p-4">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.56)]">
                            {metric.label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      'Reviewable graph',
                      'Learning path outputs',
                      'AI context bundles',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[20px] border border-[rgba(10,25,49,0.08)] bg-white px-4 py-4"
                      >
                        <p className="text-sm font-semibold text-(--foreground)">{item}</p>
                        <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">
                          Grounded in provenance and ready for review.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card className="rounded-[28px] border-[rgba(10,25,49,0.08)] bg-[rgba(255,255,255,0.9)] shadow-none">
                <CardHeader>
                  <CardTitle className="text-left text-lg">Why teams use it</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-left">
                  {[
                    'Reasoning mistakes become visible when dependency order is explicit.',
                    'Compiled outputs stay reviewable before they affect real teams or models.',
                    'Knowledge assets can be reused instead of rebuilt for every workflow.',
                  ].map((item) => (
                    <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.95)] px-4 py-3 text-sm leading-6 text-(--foreground)">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.95)] shadow-none">
                <CardHeader>
                  <CardTitle className="text-left text-lg">Current focus</CardTitle>
                  <CardDescription className="text-left">
                    Knowledge-heavy teams where onboarding and context quality matter.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 text-left text-sm text-(--muted-foreground)">
                  <div className="flex items-center gap-3">
                    <UsersRound className="size-4 text-(--primary)" />
                    Engineering, operations, compliance
                  </div>
                  <div className="flex items-center gap-3">
                    <Waypoints className="size-4 text-(--primary)" />
                    Dense private document stacks
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpenText className="size-4 text-(--primary)" />
                    Reviewable rollout artifacts
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[rgba(10,25,49,0.08)] bg-white px-6 py-6 shadow-[0_16px_60px_rgba(15,23,42,0.05)] sm:px-8">
        <p className="text-center text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-(--muted-foreground)">
          Built for teams working from dense internal knowledge
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {trustMarks.map((mark) => (
            <div
              key={mark}
              className="flex min-h-16 items-center justify-center rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] px-4 text-center text-sm font-semibold text-(--foreground)"
            >
              {mark}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <HomeProcessShowcase />
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="max-w-190">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">Features</p>
          <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground)">
            Built for knowledge work that cannot rely on guesswork.
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-8 text-(--muted-foreground)">
            The reference site uses a dense capability grid after the workflow section. SilkLearn needs the same density, but with features tied to structure, review, and provenance.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-(--primary)">
                    <Icon className="size-4.5" />
                  </div>
                  <CardTitle className="mt-4 text-[1.1rem] leading-tight">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-7">{feature.body}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="max-w-190">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">Use cases</p>
          <h2 className="mt-4 max-w-[10ch] font-(family-name:--font-display) text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground)">
            Apply the same compiled structure across teams.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <Card key={item} className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                  <Network className="size-4.5" />
                </div>
                <CardTitle className="mt-4 text-[1.1rem] leading-tight">{item}</CardTitle>
                <CardDescription className="text-sm leading-7">
                  Start from the source material your team already has and compile a reviewable path instead of manually redesigning knowledge every time.
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <Card className="overflow-hidden rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] text-white shadow-[0_26px_90px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.56)]">Benefits</p>
            <CardTitle className="max-w-[11ch] font-(family-name:--font-display) text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.05em] text-white">
              Better reasoning starts with better structure.
            </CardTitle>
            <CardDescription className="max-w-[54ch] text-base leading-7 text-[rgba(255,255,255,0.74)]">
              Notus uses a dashboard-style benefit section. Here the equivalent is a live-looking knowledge graph panel that shows why compiled structure improves downstream work.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.52)]">Signals</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[18px] bg-white/7 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.52)]">Segments</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">95</p>
                </div>
                <div className="rounded-[18px] bg-white/7 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.52)]">Resolved edges</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">241</p>
                </div>
                <div className="rounded-[18px] bg-white/7 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.52)]">Outputs</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">4</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <div className="grid gap-3">
                {[
                  'Reusable knowledge graph',
                  'Role-specific learning paths',
                  'Review queue for unresolved dependencies',
                  'Context bundles for internal AI tools',
                ].map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {content.pillars.map((pillar) => (
            <Card key={pillar.title} className="rounded-[26px] border-[rgba(10,25,49,0.08)] bg-white shadow-none">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                  <CheckCircle2 className="size-4.5" />
                </div>
                <CardTitle className="mt-4 text-[1.08rem] leading-tight">{pillar.title}</CardTitle>
                <CardDescription className="text-sm leading-7">{pillar.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">Core thesis</p>
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.05em] text-(--foreground)">
              Access to text is not the same thing as access to usable knowledge.
            </h2>
          </div>

          <Card className="rounded-[28px] border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none">
            <CardHeader>
              <CardTitle className="font-(family-name:--font-display) text-[2rem] leading-tight tracking-[-0.04em]">
                “The durable asset is the compiled graph, not another summary.”
              </CardTitle>
              <CardDescription className="text-base leading-7">
                SilkLearn produces a structure leaders can inspect and reuse across onboarding, knowledge transfer, and AI context delivery.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="max-w-190">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">Rollout modes</p>
          <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.05em] text-(--foreground)">
            Start small, then expand the compiled knowledge base.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {rolloutModes.map((mode, index) => (
            <Card
              key={mode.title}
              className={index === 1
                ? 'rounded-[26px] border-[rgba(31,63,122,0.18)] bg-[linear-gradient(180deg,#1b315a_0%,#25477d_100%)] text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)]'
                : 'rounded-[26px] border-[rgba(10,25,49,0.08)] bg-white shadow-none'}
            >
              <CardHeader>
                <CardTitle className={index === 1 ? 'text-white' : ''}>{mode.title}</CardTitle>
                <CardDescription className={index === 1 ? 'text-[rgba(255,255,255,0.72)]' : 'text-sm leading-7'}>
                  {mode.body}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6">
                {mode.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className={index === 1
                      ? 'rounded-[18px] border border-white/10 bg-white/6 px-4 py-3'
                      : 'rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] px-4 py-3'}
                  >
                    {bullet}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#162f58_0%,#1d3e74_100%)] px-6 py-8 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.6)]">For structure-first teams</p>
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.05em] text-white">
              Scale knowledge transfer without losing review or provenance.
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-8 text-[rgba(255,255,255,0.76)]">
              SilkLearn is designed for teams that need the output to stay grounded in private source material, explicit dependency order, and leader review before rollout.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {['Private source material', 'Leader review gates', 'Provenance-backed outputs'].map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-white/6 px-4 py-5 text-sm font-semibold text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">FAQs</p>
            <h2 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.94] tracking-[-0.05em] text-(--foreground)">
              Core questions, answered directly.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-8 text-(--muted-foreground)">
              The reference ends with a large FAQ and a final CTA. SilkLearn needs the same closing clarity.
            </p>
          </div>

          <div className="grid gap-3">
            {content.faq.map((item) => (
              <Card key={item.question} className="rounded-[22px] border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg leading-7">{item.question}</CardTitle>
                  <CardDescription className="text-sm leading-7">{item.answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mt-6 rounded-[36px] border border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#eef4fb_100%)] px-6 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:px-8 lg:px-10"
        id="waitlist"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">Early access</p>
            <h2 className="mt-4 max-w-[13ch] font-(family-name:--font-display) text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground)">
              Bring dense internal knowledge into reviewable structure.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-8 text-(--muted-foreground)">
              Early access is for teams testing onboarding flows, knowledge audits, and AI context workflows built from real source material rather than search overhead and document drift.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Roadmaps from private docs',
                'Dependency-aware onboarding',
                'Minimum-context AI bundles',
                'Leader-reviewed rollout artifacts',
              ].map((item) => (
                <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-white px-4 py-3 text-sm font-medium text-(--foreground)">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <WaitlistForm />
        </div>
      </section>
    </>
  );
}