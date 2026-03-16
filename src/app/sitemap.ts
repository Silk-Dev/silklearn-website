import type { MetadataRoute } from 'next';

import { featurePages, guidePages, useCasePages } from '@/lib/marketing-content';
import { absoluteUrl } from '@/lib/seo';
import { getPostsByCategory } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    '/',
    '/product',
    '/how-it-works',
    '/features',
    '/use-cases',
    '/guides',
    '/blog',
    '/news',
    '/waitlist',
  ];

  const [blogPosts, newsPosts] = await Promise.all([
    getPostsByCategory('blog'),
    getPostsByCategory('news'),
  ]);

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
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...newsPosts.map((post) => ({
      url: absoluteUrl(`/news/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
