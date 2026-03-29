import type { MetadataRoute } from 'next';

import { featurePages, useCasePages } from '@/lib/marketing-content';
import { personas } from '@/lib/marketing-personas';
import { absoluteUrl } from '@/lib/seo';
import { getAllPosts } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    '/',
    '/product',
    '/for-whom',
    '/features',
    '/use-cases',
    '/blog',
    '/privacy',
    '/terms',
    '/eula',
    '/waitlist',
  ];

  const blogPosts = await getAllPosts();

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
    ...personas.map((persona) => ({
      url: absoluteUrl(`/for-whom/${persona.id}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
