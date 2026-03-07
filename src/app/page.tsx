import {
  ArrowRight,
  Database,
  FileStack,
  Link2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WaitlistForm } from '@/components/waitlist-form';
import { getHomePageContent, isSanityConfigured } from '@/lib/sanity';

export default async function Home() {
  const content = await getHomePageContent();

  const workflowSteps = [
    {
      title: 'Ingest source material',
      body: 'Upload the documents, specs, and internal references your team already uses.',
    },
    {
      title: 'Map dependency order',
      body: 'SilkLearn decomposes the knowledge into steps with explicit prerequisite logic.',
    },
    {
      title: 'Review before rollout',
      body: 'Leaders inspect the graph, approve edits, and ship a roadmap grounded in the source.',
    },
  ];

  const proofPoints = [
    'Leaders review the graph before rollout',
    'Built for dense private knowledge, not generic course slides',
    'Operational capture via Postgres and editable marketing content via Sanity',
  ];

  return (
    <PageShell>

      <section className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-8 shadow-[var(--shadow)] sm:px-8 sm:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-x-[12%] top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(38,72,127,0.14),transparent_62%)]" />
        <div className="pointer-events-none absolute right-[-8%] top-[16%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(22,47,88,0.12),transparent_66%)]" />
        <div className="pointer-events-none absolute left-[-8%] bottom-[-12%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(228,228,228,0.9),transparent_68%)]" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/82 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)] shadow-[0_12px_32px_rgba(22,47,88,0.08)]">
              <Sparkles className="size-3.5" />
              {content.kicker}
            </div>

            <h1 className="mt-6 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
              {content.headline}
            </h1>

            <p className="mt-6 max-w-[58ch] text-[1.04rem] leading-8 text-[color:var(--muted-foreground)]">
              {content.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.metrics.map((metric) => (
                <Card key={metric.label} className="rounded-[20px] bg-white/72 shadow-[0_16px_34px_rgba(22,47,88,0.06)] backdrop-blur-sm">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                      {metric.label}
                    </p>
                    <strong className="mt-2 block text-sm leading-6 text-[color:var(--foreground)]">
                      {metric.value}
                    </strong>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--primary)] shadow-[0_0_0_6px_rgba(22,47,88,0.12)]" />
              <span>
                {isSanityConfigured
                  ? 'Marketing copy is loading from Sanity.'
                  : 'Using local fallback copy until Sanity is configured.'}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-[18%] top-5 h-24 rounded-full bg-[radial-gradient(circle,rgba(38,72,127,0.22),transparent_68%)] blur-2xl" />

            <Card className="relative overflow-hidden rounded-[26px] border-[rgba(22,47,88,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(241,245,251,0.92))] shadow-[0_26px_70px_rgba(22,47,88,0.14)]">
              <CardHeader className="flex-row items-center justify-between gap-3 border-b border-[color:var(--border)] pb-4">
                <div>
                  <CardTitle className="text-base">Learning path compiler</CardTitle>
                  <CardDescription className="mt-1 text-sm leading-6">
                    Source material goes in. Reviewed dependency order comes out.
                  </CardDescription>
                </div>
                <div className="rounded-full bg-[color:var(--surface-highlight)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--primary)]">
                  5 passes
                </div>
              </CardHeader>

              <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <Card className="rounded-[22px] border-[rgba(22,47,88,0.1)] bg-[color:var(--card-strong)]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                        Input stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {['Security architecture spec.pdf', 'Internal onboarding handbook.md', 'Platform incident runbook.docx'].map((item) => (
                          <div
                            className="flex items-center justify-between rounded-2xl border border-[rgba(22,47,88,0.08)] bg-white/78 px-4 py-3 text-sm text-[color:var(--foreground)]"
                            key={item}
                          >
                            <span>{item}</span>
                            <FileStack className="size-4 text-[color:var(--primary)]" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[22px] border-[rgba(22,47,88,0.1)] bg-[linear-gradient(180deg,rgba(22,47,88,0.98),rgba(24,54,100,0.92))] text-[color:var(--card-dark-foreground)]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm uppercase tracking-[0.16em] text-[color:var(--card-dark-muted)]">
                        Output
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3 text-sm leading-6">
                        <div className="rounded-2xl bg-white/8 px-4 py-3">95 segments</div>
                        <div className="rounded-2xl bg-white/8 px-4 py-3">29.8 estimated hours</div>
                        <div className="rounded-2xl bg-white/8 px-4 py-3">Cycle-free prerequisite graph</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {workflowSteps.map((step, index) => (
                    <Card key={step.title} className="rounded-[20px] border-[rgba(22,47,88,0.1)] bg-white/76">
                      <CardHeader className="gap-3 pb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--surface-highlight)] text-sm font-semibold text-[color:var(--primary)]">
                          0{index + 1}
                        </div>
                        <CardTitle className="text-base">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-6">
                          {step.body}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[26px] border border-[color:var(--border)] bg-white/80 px-6 py-6 shadow-[0_18px_52px_rgba(22,47,88,0.08)] backdrop-blur-xl sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Trusted by the workflow</p>
            <h2 className="mt-3 max-w-[16ch] text-3xl font-[family-name:var(--font-display)] leading-[0.96] tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[2.8rem]">
              The site should look like a product team built it, not a placeholder launch page.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[52%]">
            {['Dependency graph', 'Leader review', 'Structured rollout'].map((item) => (
              <div
                className="rounded-[18px] border border-[rgba(22,47,88,0.1)] bg-[color:var(--card-strong)] px-4 py-4 text-sm font-semibold text-[color:var(--foreground)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[26px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(242,246,251,0.92))] p-8 shadow-[0_18px_52px_rgba(22,47,88,0.08)]">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Why this exists</p>
          <h2 className="mt-4 max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.2rem)] leading-[0.94] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            The order of knowledge is usually trapped in someone&apos;s head.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-[color:var(--muted-foreground)]">
            SilkLearn reconstructs that order from the material itself. Instead of building a parallel training layer from memory, teams start with the source and expose the real prerequisite logic underneath it.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.pillars.map((pillar, index) => {
              const Icon = [FileStack, Workflow, Database][index] ?? Workflow;

              return (
                <Card key={pillar.title} className="rounded-[22px] border-[rgba(22,47,88,0.1)] bg-white/76 shadow-none">
                  <CardHeader className="gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[color:var(--surface-highlight)] text-[color:var(--primary)]">
                      <Icon className="size-4.5" />
                    </div>
                    <div>
                      <CardTitle className="text-[1.1rem]">{pillar.title}</CardTitle>
                      <CardDescription className="mt-2 text-base leading-7">
                        {pillar.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5">
          <Card className="rounded-[26px] border-[rgba(22,47,88,0.1)] bg-[linear-gradient(180deg,rgba(22,47,88,0.98),rgba(24,54,100,0.94))] text-[color:var(--card-dark-foreground)] shadow-[0_24px_60px_rgba(22,47,88,0.18)]">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10 text-white">
                <Link2 className="size-4.5" />
              </div>
              <CardTitle className="text-[1.2rem] text-white">What leaders actually get</CardTitle>
              <CardDescription className="text-[rgba(255,255,255,0.72)]">
                A dependency-ordered path that can be reviewed, assigned, and trusted.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {proofPoints.map((item) => (
                <div key={item} className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[26px] border-[rgba(22,47,88,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(243,247,252,0.9))]">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[color:var(--surface-highlight)] text-[color:var(--primary)]">
                <ShieldCheck className="size-4.5" />
              </div>
              <CardTitle>Operationally simple</CardTitle>
              <CardDescription className="text-base leading-7">
                Marketing content lives in Sanity. Operational capture lives in Postgres. The website stays fast, editable, and deployable.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="mt-5 rounded-[26px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(242,246,251,0.94))] p-8 shadow-[0_18px_52px_rgba(22,47,88,0.08)]">
        <div className="mb-7 grid gap-3">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">FAQ</p>
          <h2 className="max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            Core questions, answered directly.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {content.faq.map((item) => (
            <Card key={item.question} className="bg-[color:var(--card)]">
              <CardHeader>
                <CardTitle>{item.question}</CardTitle>
                <CardDescription className="text-base leading-7">{item.answer}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="relative mt-5 grid gap-7 overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(239,244,250,0.94))] p-8 shadow-[0_18px_52px_rgba(22,47,88,0.1)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]"
        id="waitlist"
      >
        <div className="pointer-events-none absolute inset-x-[18%] top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(38,72,127,0.12),transparent_65%)]" />
        <div>
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Early access</p>
          <h2 className="mt-4 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            Start with a site that can market the product and collect demand now.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-7 text-[color:var(--muted-foreground)]">
            This scaffold keeps content editable in Sanity and waitlist capture in
            Postgres so the marketing site can move before the full application is
            public.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </PageShell>
  );
}