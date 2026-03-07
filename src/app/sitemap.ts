import type { MetadataRoute } from 'next';

import { featurePages, guidePages, useCasePages } from '@/lib/marketing-content';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['/', '/product', '/how-it-works', '/features', '/use-cases', '/guides', '/waitlist'];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '/' ? 1 : 0.8,
    })),
    ...featurePages.map((page) => ({
      url: absoluteUrl(`/features/${page.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...useCasePages.map((page) => ({
      url: absoluteUrl(`/use-cases/${page.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...guidePages.map((page) => ({
      url: absoluteUrl(`/guides/${page.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}