import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { WaitlistForm } from '@/components/waitlist-form';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Waitlist',
  description:
    'Join the SILKLEARN waitlist if your team works from dense source material and wants reviewable learning paths, dependency graphs, and context bundles.',
  path: '/waitlist',
  keywords: ['SILKLEARN waitlist', 'knowledge compilation beta', 'reviewable learning path software'],
});

export default function WaitlistPage() {
  return (
    <PageShell>
      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[28px] border border-(--border) bg-(--surface) px-6 py-10 shadow-(--shadow) sm:px-8 lg:px-10">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-(--primary)">Waitlist</p>
          <h1 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-(--foreground) max-sm:max-w-none">
            Bring your team’s raw knowledge into reviewable structure.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-7 text-(--muted-foreground)">
            Early access is aimed at teams testing onboarding flows, knowledge audits, and AI context workflows built from dense private material. If your problem is hidden structure, not missing documents, SILKLEARN is for you.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </PageShell>
  );
}