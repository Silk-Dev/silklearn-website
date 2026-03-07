import { ArrowRight, Database, FileStack, Workflow } from 'lucide-react';

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

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 pb-18 pt-6 sm:px-6 lg:px-8">
      <section className="relative grid gap-8 overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-xl lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:p-10">
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(15,122,95,0.18),transparent_65%)]" />

        <div>
          <p className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
            {content.kicker}
          </p>
          <h1 className="max-w-[10ch] font-[family-name:var(--font-display)] text-[clamp(3.4rem,9vw,6.9rem)] leading-[0.95] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[1.02rem] leading-7 text-[color:var(--muted-foreground)]">
            {content.subheadline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <a href={content.primaryCtaHref}>
                {content.primaryCtaLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</a>
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--primary)] shadow-[0_0_0_6px_rgba(15,122,95,0.12)]" />
            <span>
              {isSanityConfigured
                ? 'Marketing copy is loading from Sanity.'
                : 'Using local fallback copy until Sanity is configured.'}
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <Card className="rounded-[1.75rem] border-none bg-[linear-gradient(180deg,rgba(21,29,25,0.95),rgba(21,29,25,0.86))] text-[color:var(--card-dark-foreground)]">
            <CardHeader className="flex-row items-center justify-between gap-4 pb-2 text-[0.82rem] uppercase tracking-[0.16em] text-[color:var(--card-dark-muted)]">
              <span>Source material</span>
              <span>Compiler output</span>
            </CardHeader>
            <CardContent className="grid gap-5 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-[0.82rem] uppercase tracking-[0.16em] text-[color:var(--card-dark-muted)]">Input</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-7 text-[rgba(247,243,234,0.92)]">
                  <li>Security architecture spec.pdf</li>
                  <li>Internal onboarding handbook.md</li>
                  <li>Platform incident runbook.docx</li>
                </ul>
              </div>

              <div>
                <p className="text-[0.82rem] uppercase tracking-[0.16em] text-[color:var(--card-dark-muted)]">Output</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-7 text-[rgba(247,243,234,0.92)]">
                  <li>95 segments</li>
                  <li>29.8 estimated hours</li>
                  <li>Cycle-free prerequisite graph</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {content.metrics.map((metric) => (
              <Card key={metric.label} className="bg-white/55">
                <CardContent className="p-5">
                  <p className="text-sm text-[color:var(--muted-foreground)]">{metric.label}</p>
                  <strong className="mt-2 block text-base text-[color:var(--foreground)]">{metric.value}</strong>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="mb-7 grid gap-3">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Why this exists</p>
          <h2 className="max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            The order of knowledge is usually trapped in someone&apos;s head.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {content.pillars.map((pillar, index) => {
            const Icon = [FileStack, Workflow, Database][index] ?? Workflow;

            return (
              <Card key={pillar.title} className="bg-white/50">
                <CardHeader className="gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white/80 text-[color:var(--primary)]">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <CardTitle>{pillar.title}</CardTitle>
                    <CardDescription className="mt-2 text-base leading-7">
                      {pillar.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,252,246,0.82),rgba(255,252,246,0.7)),radial-gradient(circle_at_bottom_right,rgba(169,65,43,0.08),transparent_26%)] p-8 shadow-[var(--shadow)] backdrop-blur-xl">
        <div className="mb-7 grid gap-3">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">FAQ</p>
          <h2 className="max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-[color:var(--foreground)] max-sm:max-w-none">
            Core questions, answered directly.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {content.faq.map((item) => (
            <Card key={item.question} className="bg-white/50">
              <CardHeader>
                <CardTitle>{item.question}</CardTitle>
                <CardDescription className="text-base leading-7">{item.answer}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="relative mt-5 grid gap-7 overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]"
        id="waitlist"
      >
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(15,122,95,0.18),transparent_65%)]" />
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
    </main>
  );
}