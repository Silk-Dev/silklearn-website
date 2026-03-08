import { ArrowRight, Network } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCasePages } from '@/lib/marketing-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Use Cases',
  description:
    'See how SILKLEARN is used for engineering onboarding, internal docs training, and other dense knowledge rollout workflows.',
  path: '/use-cases',
  keywords: ['engineering onboarding software', 'internal docs training', 'team enablement use cases'],
});

export default function UseCasesPage() {
  return (
    <PageShell>
      <section className="grid gap-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-10">
        <div>
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Use cases</p>
        <h1 className="mt-4 max-w-[12ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
          Where the product is most useful first.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-7 text-(--muted-foreground)">
          SILKLEARN is most valuable in workflows where dense private knowledge already exists but the reasoning order is still trapped in docs and expert memory.
        </p>
        </div>

        <Card className="rounded-4xl border-[rgba(10,25,49,0.08)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] shadow-none">
          <CardHeader>
            <CardTitle>Best fit</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {['High-cost mistakes', 'Dense documentation', 'Recurring onboarding', 'Private team knowledge'].map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(10,25,49,0.08)] bg-white px-4 py-3 text-sm font-medium text-(--foreground)">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        {useCasePages.map((page) => (
          <Card key={page.slug} className="rounded-3xl border-[rgba(10,25,49,0.08)] bg-white shadow-none">
            <CardHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(31,63,122,0.08)] text-(--primary)">
                <Network className="size-4.5" />
              </div>
              <CardTitle>
                <Link href={`/use-cases/${page.slug}`}>{page.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-(--muted-foreground)">{page.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-(--muted-foreground)">
                {page.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6 rounded-4xl border border-[rgba(10,25,49,0.08)] bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-(family-name:--font-display) text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.04em] text-(--foreground)">
              Pick one workflow and compile it end to end.
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/waitlist">
              Talk to us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}