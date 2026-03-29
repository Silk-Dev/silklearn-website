import { ShieldCheck } from 'lucide-react';

import type { Metadata } from 'next';

import {
  MarketingHero,
  MarketingPageFrame,
  MarketingSplitSection,
} from '@/components/marketing/page-structure';
import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';
import type { LegalDocument } from '@/lib/legal-content';

type LegalPageProps = {
  document: LegalDocument;
  path: string;
  kicker: string;
};

export function buildLegalMetadata({
  document,
  path,
}: {
  document: LegalDocument;
  path: string;
}): Metadata {
  return buildMetadata({
    title: document.title,
    description: document.description,
    path,
    keywords: [document.title.toLowerCase(), 'silklearn legal', 'legal information'],
  });
}

export function LegalPage({ document, kicker }: LegalPageProps) {
  return (
    <PageShell>
      <MarketingPageFrame>
        <MarketingHero
          kicker={kicker}
          title={document.title}
          description={document.description}
          rightEyebrow="Document status"
          rightTitle={`Effective ${document.effectiveDate}`}
          rightChildren={
            <div className="grid gap-3">
              {document.reviewNotice ? (
                <div className="border border-(--border) p-4 text-sm leading-6 text-(--muted-foreground)">
                  {document.reviewNotice}
                </div>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-1">
                {document.summaryItems.map((item) => (
                  <div key={item} className="border border-(--border) px-4 py-3 text-sm font-medium text-(--foreground)">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <MarketingSplitSection
          left={
            <>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">
                Legal summary
              </p>
              <h2 className="mt-4 max-w-[11ch] font-(family-name:--font-display) text-display-lg leading-none tracking-[-0.02em] text-(--foreground)">
                Structured, readable legal foundations for the product and site.
              </h2>
              <div className="mt-6 flex items-center gap-3 border border-(--border) p-4 text-sm text-(--foreground)">
                <ShieldCheck className="size-4.5 text-(--primary)" />
                Governed by the laws of Portugal.
              </div>
            </>
          }
          right={
            <div className="space-y-8">
              {document.sections.map((section, index) => (
                <section key={section.title} className={index > 0 ? 'border-t border-(--border) pt-8' : ''}>
                  <h2 className="text-[1.25rem] leading-tight tracking-[-0.02em] text-(--foreground)">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-6 text-(--muted-foreground)">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul className="space-y-3 pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="list-disc">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          }
        />
      </MarketingPageFrame>
    </PageShell>
  );
}
