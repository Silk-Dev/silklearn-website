import type { Metadata } from 'next';

import { LegalPage, buildLegalMetadata } from '@/components/marketing/legal-page';
import { privacyPolicyContent } from '@/lib/legal-content';

export const metadata: Metadata = buildLegalMetadata({
  document: privacyPolicyContent,
  path: '/privacy',
});

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicyContent} kicker="Privacy" path="/privacy" />;
}
