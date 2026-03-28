import type { LucideIcon } from 'lucide-react';
import { BookOpenText, Newspaper } from 'lucide-react';

export type ContentCategory = 'blog' | 'news' | 'guides';

export const validCategories: ContentCategory[] = ['blog', 'news', 'guides'];

export type CategoryConfig = {
  label: string;
  icon: LucideIcon;
  metadata: { title: string; description: string; keywords: string[] };
  hero: {
    kicker: string;
    title: string;
    description: string;
    rightEyebrow: string;
    rightTitle: string;
    rightItems: string[];
  };
  list: { label: string; title: string };
  cta: { kicker: string; title: string; ctaLabel: string };
  detail: {
    sectionLabel: string;
    sectionTitle: string;
    ctaKicker: string;
    ctaTitle: string;
    backLabel: string;
  };
};

export const categoryConfig: Record<ContentCategory, CategoryConfig> = {
  blog: {
    label: 'Blog',
    icon: BookOpenText,
    metadata: {
      title: 'Blog',
      description:
        'Longer-form essays and thinking from SILKLEARN on knowledge compilation, synthesis, learning paths, and structured reasoning.',
      keywords: ['silklearn blog', 'knowledge compilation blog', 'structured reasoning'],
    },
    hero: {
      kicker: 'Blog',
      title: 'Thinking in public about compiled knowledge.',
      description:
        'Essays, product thinking, and deeper articulation of why structure matters more than flat retrieval or generic AI output.',
      rightEyebrow: 'What belongs here',
      rightTitle:
        "The blog should carry longer-form arguments that explain SILKLEARN\u2019s worldview, not just announce product updates.",
      rightItems: [
        'Knowledge compilation',
        'Canvas & synthesis',
        'Team learning design',
        'Structured reasoning',
      ],
    },
    list: {
      label: 'Recent writing',
      title: "Essays that explain the product\u2019s deepest logic.",
    },
    cta: {
      kicker: 'Next step',
      title: 'Want the product to think with your actual documents?',
      ctaLabel: 'Join the waitlist',
    },
    detail: {
      sectionLabel: 'Article',
      sectionTitle: 'Read the argument in sequence.',
      ctaKicker: 'Explore more',
      ctaTitle: 'Keep reading, then bring your own source base.',
      backLabel: 'Back to blog',
    },
  },
  news: {
    label: 'News',
    icon: Newspaper,
    metadata: {
      title: 'News',
      description:
        'Product updates, launch notes, and progress from SILKLEARN as the synthesis canvas and structured knowledge workflow evolve.',
      keywords: ['silklearn news', 'silklearn updates', 'product updates'],
    },
    hero: {
      kicker: 'News',
      title: 'Product movement, not just promises.',
      description:
        'Updates on the canvas, roadmap builder, website, and the broader shift toward structure-first knowledge operations.',
      rightEyebrow: 'Why this exists',
      rightTitle:
        'News should show momentum and clarity: what changed, why it matters, and where the product is going next.',
      rightItems: [
        'Launch notes',
        'Feature updates',
        'Architecture shifts',
        'Product direction',
      ],
    },
    list: {
      label: 'Latest updates',
      title: 'A running record of product direction and execution.',
    },
    cta: {
      kicker: 'Next step',
      title: 'Follow progress, then get your own source base into the system.',
      ctaLabel: 'Join the waitlist',
    },
    detail: {
      sectionLabel: 'Update',
      sectionTitle: 'Read the change, then the implication.',
      ctaKicker: 'Explore more',
      ctaTitle: 'See the broader direction, not just one update.',
      backLabel: 'Back to news',
    },
  },
  guides: {
    label: 'Guides',
    icon: BookOpenText,
    metadata: {
      title: 'Guides',
      description:
        'Read practical guides on dependency-ordered learning, turning docs into onboarding paths, and structuring team knowledge transfer.',
      keywords: [
        'team learning guides',
        'docs to training guide',
        'dependency ordered learning',
      ],
    },
    hero: {
      kicker: 'Guides',
      title: 'Educational content that can rank on its own.',
      description:
        'These guides explain the underlying logic of dependency-ordered knowledge, not just the UI surface of the product.',
      rightEyebrow: 'Guide intent',
      rightTitle:
        'The educational layer should explain why structured learning matters before someone ever sees the product.',
      rightItems: [
        'Explain dependency order',
        'Clarify product thesis',
        'Support SEO depth',
        'Connect to practical workflows',
      ],
    },
    list: {
      label: 'Reading list',
      title: 'Read the theory, then apply it to real internal knowledge.',
    },
    cta: {
      kicker: 'Next step',
      title: 'Use the theory on a real document stack.',
      ctaLabel: 'Start with your docs',
    },
    detail: {
      sectionLabel: 'Sections',
      sectionTitle: 'Read the argument in sequence, not as isolated tips.',
      ctaKicker: 'Next step',
      ctaTitle: 'Apply this guide to your own private source base.',
      backLabel: 'Back to guides',
    },
  },
};

export function isValidCategory(value: string): value is ContentCategory {
  return validCategories.includes(value as ContentCategory);
}
