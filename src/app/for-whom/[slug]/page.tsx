
"use client";
import { useParams } from "next/navigation";

import dynamic from 'next/dynamic';

import { personas } from '@/lib/marketing-personas';

import { PageShell } from '@/components/marketing/page-shell';
import { MarketingPageFrame, MarketingCtaSection } from '@/components/marketing/page-structure';
import { LottiePlaceholder } from '@/components/marketing/lottie-placeholder';
import { Button } from '@/components/ui/button';
import { TransitionLink } from '@/components/marketing/page-transition';
import { ArrowRight } from 'lucide-react';

const PersonaScrollSections = dynamic(
  () => import('@/components/marketing/persona-scroll-sections').then(mod => mod.PersonaScrollSections),
);

export default function ForWhomPersonaPage() {
	const params = useParams();
	const persona = personas.find(p => p.id === params.slug);

	return (
		<PageShell>
			<MarketingPageFrame>
				   {persona ? (
					   <div className="grid grid-cols-1 gap-y-12     lg:grid-cols-[1.2fr_1px_1fr]  ">
						<div className="col-span-1">
							<PersonaScrollSections persona={persona} />
						</div>
						   <div className="hidden bg-(--border) lg:block h-full col-span-1" />
						   {/* Sticky Lottie only on large screens, normal flow on mobile */}
						   <div className="col-span-1 flex justify-center lg:block">
							   <div className="lg:sticky lg:top-20 py-25">
								<LottiePlaceholder
									animationSrc={persona.animationSrc}
									animationClassName="h-full w-full max-h-80 max-w-80"
									className="mx-auto flex h-full w-full max-w-[20rem] px-2 py-2"
									description={`${persona.selector} workflow animation`}
									height="h-60 md:h-80"
									label={persona.selector}
								/>
								<div className="mt-2 text-center text-4xl font-bold text-(--foreground)">{persona.selector}</div>
							   </div>
						   </div>
					   </div>
				   ) : (
					<div className="p-12 text-xl text-(--muted-foreground)">
						<p>Persona not found for slug: <strong>{params.slug}</strong></p>
					</div>
				)}

				<MarketingCtaSection
					actions={
						<Button asChild size="lg">
							<TransitionLink href="/waitlist">
								Request Early Access
								<ArrowRight className="size-4" />
							</TransitionLink>
						</Button>
					}
					kicker="Next step"
					title="See whether your document stack is a fit for early access."
				/>
			</MarketingPageFrame>
		</PageShell>
	);
}
