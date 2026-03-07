import type { Metadata } from 'next';

import { PageShell } from '@/components/marketing/page-shell';
import { WaitlistForm } from '@/components/waitlist-form';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Waitlist',
  description:
    'Join the SilkLearn waitlist to follow early access for turning dense source material into structured team learning paths.',
  path: '/waitlist',
  keywords: ['SilkLearn waitlist', 'learning path software beta', 'team training workflow beta'],
});

export default function WaitlistPage() {
  return (
    <PageShell>
      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-8 lg:px-10">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">Waitlist</p>
          <h1 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-[color:var(--foreground)] max-sm:max-w-none">
            Follow the product as early access opens.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-8 text-[color:var(--muted-foreground)]">
            The current site is built to explain the product clearly, gather demand, and keep content editable while the full application continues to mature.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </PageShell>
  );
}