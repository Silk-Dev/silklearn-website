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
  marks?: string[];
};

export type PortableTextBlock = {
  _type: 'block' | 'image';
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextSpan[];
  asset?: { _ref?: string; url?: string };
  alt?: string;
};

export type PortableTextCallout = {
  _type: 'callout';
  title?: string;
  body?: string;
};

export type MarketingPostCategory = 'blog';

export type MarketingPost = {
  title: string;
  slug: string;
  category: MarketingPostCategory;
  eyebrow?: string;
  excerpt: string;
  description?: string;
  publishedAt: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
    alt?: string;
  };
  body: Array<PortableTextBlock | PortableTextCallout>;
};

export const fallbackPosts: MarketingPost[] = [
  {
    title: 'Why knowledge compilation matters more than another AI wrapper',
    slug: 'why-knowledge-compilation-matters',
    category: 'blog',
    eyebrow: 'Blog',
    tags: ['research'],
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
];
