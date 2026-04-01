import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { TransitionLink } from '@/components/marketing/page-transition';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { AboutTimeline } from './about-timeline';

export const metadata = buildMetadata({
  title: 'The Team Behind SILKLEARN — Jesser & Oussama Bedoui',
  description:
    'Jesser and Oussama Bedoui built SILKLEARN after years of working with sources that had all the knowledge but none of the order — and no tool that could find it.',
  path: '/about',
  keywords: ['jesser bedoui', 'oussama bedoui', 'silklearn cofounders', 'knowledge synthesis'],
});

const foundersSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Jesser Bedoui',
      url: 'https://www.silklearn.io/about',
      jobTitle: 'Cofounder',
      worksFor: { '@type': 'Organization', name: 'SILKLEARN', url: 'https://www.silklearn.io' },
    },
    {
      '@type': 'Person',
      name: 'Oussama Bedoui',
      url: 'https://www.silklearn.io/about',
      jobTitle: 'Cofounder',
      alumniOf: [
        { '@type': 'EducationalOrganization', name: 'Université Sesame' },
        { '@type': 'EducationalOrganization', name: 'Institut Supérieur de Gestion de Tunis' },
      ],
      worksFor: { '@type': 'Organization', name: 'SILKLEARN', url: 'https://www.silklearn.io' },
    },
  ],
};

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersSchema) }}
      />
      <MarketingPageFrame>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">

          {/* ── Header ── */}
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
            Cofounders
          </p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl sm:text-[2.75rem] sm:leading-[1.15] tracking-tight text-(--foreground)">
            The team behind SILKLEARN — and why we built it.
          </h1>
          <p className="mt-3 text-base leading-7 text-(--muted-foreground) max-w-[52ch]">
            One career reset. A skill inventory. Seven years teaching music, years in code, and a
            pattern that kept showing up everywhere: the knowledge existed. The structure didn&apos;t.
          </p>

          {/* Founders grid — equal columns, staggered entry */}
          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {/* Jesser — enters first */}
            <div style={{ animation: 'fade-up 0.5s cubic-bezier(0.23,1,0.32,1) both' }}>
              <div className="founder-photo mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
                <Image
                  src="/founders/jesser-bedoui.png"
                  alt="Jesser Bedoui — Cofounder of SILKLEARN"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                Cofounder
              </p>
              <h2 className="mt-1 font-(family-name:--font-display) text-xl tracking-[-0.02em] text-(--foreground)">
                Jesser Bedoui
              </h2>
              <p className="mt-4 text-sm leading-7 text-(--muted-foreground)">
                Did a career reset and a full skill inventory: programming, design, seven years
                teaching music. Used Hormozi&apos;s 0→$1M framework to map the gap. Saw AI-induced
                panic learning — people scrambling to stay relevant as their fields shifted. The
                insight: every source had the knowledge. None had the order. He&apos;s building the
                product that finds it.
              </p>
            </div>

            {/* Oussama — enters 80ms after */}
            <div style={{ animation: 'fade-up 0.5s cubic-bezier(0.23,1,0.32,1) 80ms both' }}>
              <div className="founder-photo mb-5 overflow-hidden rounded-sm w-24 h-24 bg-(--muted)">
                <Image
                  src="/founders/oussama-bedoui.jpg"
                  alt="Oussama Bedoui — Cofounder of SILKLEARN"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-(--muted-foreground)">
                Cofounder
              </p>
              <h2 className="mt-1 font-(family-name:--font-display) text-xl tracking-[-0.02em] text-(--foreground)">
                Oussama Bedoui
              </h2>
              <p className="mt-4 text-sm leading-7 text-(--muted-foreground)">
                Six years shipping production software in Angular, Java, and Spring Boot before any
                of this started — which is why the architecture doesn&apos;t look like something
                stitched together over weekends. He owns the engineering.
              </p>
            </div>
          </div>

          {/* ── The Dream — editorial manifesto ── */}
          <div className="mt-20 border-t border-(--border) pt-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              The thesis
            </p>
            <h2 className="mt-4 font-(family-name:--font-display) text-[clamp(1.8rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-(--foreground) max-w-[18ch]">
              The knowledge already exists. The structure doesn&apos;t.
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-base leading-7 text-(--muted-foreground)">
              <p>
                We&apos;re building the layer between knowledge and understanding. Not a search
                engine. Not a chatbot. The thing that reads across everything you&apos;re trying to
                learn, maps how it all depends on each other, and hands you back the order that was
                always implicit in the material — just invisible.
              </p>
              <p>
                Any source. Docs, papers, videos, links, Notion, runbooks — whatever you&apos;re
                working from. You bring the material. SILKLEARN finds the dependency structure,
                generates a path, and puts a human in the loop before anything gets followed.
              </p>
              <p>
                The AI code assistant doesn&apos;t write perfect code — a developer reviews, fixes,
                ships in a fraction of the time. Same logic here. AI generates structure. You
                inspect before you follow. That reframe turned an NP-hard problem into the right
                architecture.
              </p>
              <p>
                Current LLMs retrieve. They don&apos;t build world models. Structured dependency
                paths build actual understanding. Following a path built from your own sources, in
                the right order, is categorically different from asking a chatbot to summarize them.
              </p>
              <p>
                The long game: community-forged knowledge paths. The next Wikipedia — but for
                understanding, not facts. Where paths are contested, updated, forked, and improved
                by the people who&apos;ve followed them. And callable by any AI agent via MCP —
                because understanding shouldn&apos;t be locked in a dashboard.
              </p>
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="mt-20 border-t border-(--border) pt-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              The build
            </p>
            <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
              From reset to product.
            </h2>
            <p className="mt-3 text-sm leading-7 text-(--muted-foreground) max-w-[52ch]">
              What shipped, when it shipped, and what&apos;s still in progress.
            </p>
            <div className="mt-10">
              <AboutTimeline />
            </div>
          </div>

          {/* ── The Reset ── */}
          <div className="mt-20 border-t border-(--border) pt-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
              Writing
            </p>
            <h2 className="mt-2 font-(family-name:--font-display) text-2xl tracking-[-0.02em] text-(--foreground) sm:text-3xl">
              The Reset
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-(--muted-foreground)">
              A day-by-day founder journal — written the same day it happens, not reconstructed
              later. What actually went wrong, what we shipped, and what we changed our minds about.
            </p>
            <div className="mt-4">
              <TransitionLink
                href="/the-reset"
                className="group inline-flex items-center gap-1.5 text-sm text-(--foreground) underline underline-offset-4 decoration-(--border) hover:decoration-(--foreground) [transition:color_150ms_ease-out,text-decoration-color_150ms_ease-out]"
              >
                Read The Reset
                <ArrowRight className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
              </TransitionLink>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="mt-16 border-t border-(--border) pt-12 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <TransitionLink href="/the-reset">Read The Reset</TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <TransitionLink href="/waitlist">Join the waitlist</TransitionLink>
            </Button>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
