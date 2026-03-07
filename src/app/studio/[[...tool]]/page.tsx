import { metadata } from 'next-sanity/studio';

import { isSanityConfigured } from '@/lib/sanity';
import { StudioShell } from '@/app/studio/[[...tool]]/components/studio-shell';

export { metadata };

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-placeholder">
        <div className="studio-card">
          <p className="eyebrow">Sanity needs credentials</p>
          <h1>Set your project ID and dataset to enable the embedded studio.</h1>
          <p>
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> to your env file, then reload the app.
          </p>
        </div>
      </main>
    );
  }

  return <StudioShell />;
}