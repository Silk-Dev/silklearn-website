import type { Metadata } from 'next';

import { LegalPage, buildLegalMetadata } from '@/components/marketing/legal-page';
import { eulaContent } from '@/lib/legal-content';

export const metadata: Metadata = buildLegalMetadata({
  document: eulaContent,
  path: '/eula',
});

export default function EulaPage() {
  return <LegalPage document={eulaContent} kicker="EULA" path="/eula" />;
}
