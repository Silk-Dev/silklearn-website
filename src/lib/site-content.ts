export type SiteMetric = {
  label: string;
  value: string;
};

export type SitePillar = {
  title: string;
  description: string;
};

export type SiteFaq = {
  question: string;
  answer: string;
};

export type HomePageContent = {
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  metrics: SiteMetric[];
  pillars: SitePillar[];
  faq: SiteFaq[];
};

export const fallbackHomePageContent: HomePageContent = {
  kicker: 'For leaders turning dense internal docs into team-ready knowledge.',
  headline: 'Turn dense internal docs into reviewable learning paths your team can use.',
  subheadline:
    'SILKLEARN compiles runbooks, onboarding docs, architecture specs, and policies into a dependency-ordered graph so leaders can review what comes first, ship clearer onboarding, and give people or AI the minimum context they actually need.',
  primaryCtaLabel: 'Request early access',
  primaryCtaHref: '#waitlist',
  secondaryCtaLabel: 'See how compilation works',
  secondaryCtaHref: '/how-it-works',
  metrics: [
    { label: 'Input', value: 'Runbooks, onboarding docs, specs, policies' },
    { label: 'Output', value: 'Reviewable graph, learning paths, AI context bundles' },
    { label: 'Best fit', value: 'Teams where missing context creates expensive mistakes' },
  ],
  pillars: [
    {
      title: 'Make hidden dependency order visible',
      description:
        'Turn dense, assumption-heavy documents into a source-backed sequence so teams can see what has to be understood first before rollout or onboarding.',
    },
    {
      title: 'Reuse one compiled structure across teams and tools',
      description:
        'Use the same reviewed graph to power onboarding, enablement, rollout review, and internal AI context instead of rebuilding logic in every workflow.',
    },
    {
      title: 'Keep leaders in review before anything ships',
      description:
        'Leaders inspect the graph, reconcile edge cases, and approve downstream outputs before they become team guidance or AI-delivered context.',
    },
  ],
  faq: [
    {
      question: 'Who is SILKLEARN for?',
      answer:
        'SILKLEARN is for engineering, product, operations, and compliance leaders working from dense private docs where onboarding errors, rollout confusion, or missing context are expensive.',
    },
    {
      question: 'What makes this different from RAG or a course builder?',
      answer:
        'RAG retrieves text after someone asks a question, and course builders usually depend on manual lesson design. SILKLEARN compiles prerequisite order from the source itself so teams can review the structure before it drives onboarding or AI.',
    },
    {
      question: 'What does a team actually get from the product?',
      answer:
        'The durable asset is a reviewable knowledge graph plus downstream outputs: dependency-ordered learning paths, onboarding ramps, rollout artifacts, and minimum-context bundles grounded in the source material.',
    },
  ],
};