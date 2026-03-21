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

export type PortableTextSpan = {
  _type: 'span';
  text: string;
};

export type PortableTextBlock = {
  _type: 'block';
  style?: string;
  children?: PortableTextSpan[];
};

export type PortableTextCallout = {
  _type: 'callout';
  title?: string;
  body?: string;
};

export type MarketingPostCategory = 'blog' | 'news';

export type MarketingPost = {
  title: string;
  slug: string;
  category: MarketingPostCategory;
  eyebrow?: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  featured?: boolean;
  body: Array<PortableTextBlock | PortableTextCallout>;
};

export const fallbackHomePageContent: HomePageContent = {
  kicker: 'For leaders turning dense internal docs into team-ready knowledge.',
  headline: 'Turn internal docs into learning paths.',
  subheadline:
    'SILKLEARN compiles runbooks, onboarding docs, and specs into a dependency-ordered, leader-reviewed knowledge graph so teams stop guessing what comes first.',
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
      title: 'Onboarding',
      description:
        'Cut engineer ramp time without rewriting a single doc. Compile your existing runbooks into a sequence that makes sense from day one.',
    },
    {
      title: 'Rollout',
      description:
        'Ship rollouts where teams actually understand what comes first. Surface dependency logic before a handoff depends on it.',
    },
    {
      title: 'AI Context',
      description:
        'Give your internal AI assistant structured context, not a RAG guess. Every output is grounded in a leader-reviewed source.',
    },
    {
      title: 'Compliance',
      description:
        'Generate a reviewable audit trail from your source documents — reviewer names, timestamps, and source links included.',
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

export const fallbackPosts: MarketingPost[] = [
  {
    title: 'Why knowledge compilation matters more than another AI wrapper',
    slug: 'why-knowledge-compilation-matters',
    category: 'blog',
    eyebrow: 'Blog',
    excerpt:
      'SILKLEARN is strongest when it acts as structure-first knowledge infrastructure, not a thin layer over retrieval or generic summarization.',
    publishedAt: '2026-03-16T09:00:00.000Z',
    author: 'SILKLEARN',
    featured: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Most AI products stop at retrieval or repackaging. SILKLEARN gets more valuable when it exposes the structure inside knowledge: what depends on what, what conflicts, and what should happen downstream.',
          },
        ],
      },
      {
        _type: 'callout',
        title: 'Core thesis',
        body: 'The durable asset is not the answer. It is the compiled structure that makes better answers, roadmaps, audits, and context bundles possible.',
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'That is why the website should eventually support essays, product notes, and deeper articulation of the synthesis/canvas thesis through Sanity-backed publishing.',
          },
        ],
      },
    ],
  },
  {
    title: 'Synthesis canvas is now the center of the multi-source workflow',
    slug: 'synthesis-canvas-center-of-workflow',
    category: 'news',
    eyebrow: 'News',
    excerpt:
      'The marketing site should be able to publish product updates around the canvas, roadmap composition, and future Challenge mode work.',
    publishedAt: '2026-03-16T12:00:00.000Z',
    author: 'SILKLEARN',
    featured: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The synthesis canvas reframes SILKLEARN from a one-shot generator into a persistent knowledge workspace where leaders can compose, challenge, and evolve structured artifacts over time.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Adding blog and news support through Sanity gives the marketing site a better place to tell that story than hard-coded pages alone.',
          },
        ],
      },
    ],
  },
];
