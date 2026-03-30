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
    '/for-teams',
    '/features',
    '/use-cases',
    '/blog',
    '/the-reset',
    '/about',
    '/waitlist',
  ];

  const blogPosts = await getAllPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
    })),
    ...featurePages.map((page) => ({
      url: absoluteUrl(`/features/${page.slug}`),
      lastModified: now,
    })),
    ...useCasePages.map((page) => ({
      url: absoluteUrl(`/use-cases/${page.slug}`),
      lastModified: now,
    })),
    ...personas.map((persona) => ({
      url: absoluteUrl(`/for-teams/${persona.id}`),
      lastModified: now,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
