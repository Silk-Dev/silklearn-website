import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/marketing/page-shell';
import { MarketingPageFrame } from '@/components/marketing/page-structure';
import { TransitionLink } from '@/components/marketing/page-transition';

export default function NotFound() {
  return (
    <PageShell>
      <MarketingPageFrame>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--muted-foreground)">404</p>
          <h1 className="mt-4 text-display-lg font-(family-name:--font-display) tracking-tight text-(--foreground)">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-4 max-w-[48ch] text-base leading-7 text-(--muted-foreground)">
            You may have followed a broken link, or this page has moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <TransitionLink href="/">Go home</TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <TransitionLink href="/blog">Read the blog</TransitionLink>
            </Button>
          </div>
        </div>
      </MarketingPageFrame>
    </PageShell>
  );
}
