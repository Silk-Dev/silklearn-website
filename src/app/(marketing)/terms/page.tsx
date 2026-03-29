import type { Metadata } from 'next';

import { LegalPage, buildLegalMetadata } from '@/components/marketing/legal-page';
import { termsOfServiceContent } from '@/lib/legal-content';

export const metadata: Metadata = buildLegalMetadata({
  document: termsOfServiceContent,
  path: '/terms',
});

export default function TermsPage() {
  return <LegalPage document={termsOfServiceContent} kicker="Terms" path="/terms" />;
}
