import { ArrowRight, GitBranch, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { AceternityBentoGrid } from '@/components/marketing/aceternity-bento-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { featurePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

const featureSignals = [
  'Structured extraction from real documents',
  'Dependency-aware sequencing across topics',
  'Reviewable outputs before team rollout',
];

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description:
    'Explore SILKLEARN features for dependency mapping, leader review, and turning source documents into structured learning paths.',
  path: '/features',
  keywords: ['SILKLEARN features', 'dependency mapping software', 'leader review workflow'],
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-10">
        <div>
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Features</p>
          <h1 className="mt-4 max-w-[9.75ch] font-(family-name:--font-display) text-[clamp(2.9rem,6.4vw,4.9rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
            Product capabilities built around real source material.
          </h1>
          <p className="mt-5 max-w-[54ch] text-base leading-7 text-(--muted-foreground)">
            The core capabilities of SILKLEARN exist to make hidden structure visible, reviewable, and reusable downstream.
          </p>
          <div className="mt-8 grid gap-3">
            {featureSignals.map((signal) => (
              <div key={signal} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-[rgba(247,250,253,0.92)] px-4 py-3 text-sm font-medium text-(--foreground)">
                {signal}
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader>
            <CardTitle>Feature families</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Structure extraction',
                body: 'Preserve source hierarchy, segment coherent units, and extract concepts before turning anything into a learning artifact.',
                icon: GitBranch,
              },
              {
                title: 'Leader review',
                body: 'Keep the compiled graph and downstream outputs visible so teams can inspect decisions before rollout.',
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-[rgba(10,25,49,0.08)] bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                    <Icon className="size-4.5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-(--foreground)">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">{item.body}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <AceternityBentoGrid
          className="lg:col-span-2"
          items={featurePages.map((page, index) => ({
            title: page.title,
            description: page.summary,
            icon: index === 0 ? GitBranch : ShieldCheck,
            eyebrow: index === 0 ? 'Feature deep dive' : 'Review layer',
            bullets: page.bullets,
            className: index === 0 ? 'md:col-span-4' : 'md:col-span-2',
            dark: index === 0,
          }))}
        />
      </section>

      <section className="mt-8 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-(family-name:--font-display) text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              Start with the feature that unlocks your first workflow.
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/waitlist">
              Request access
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}