import { getAllPosts } from '@/lib/sanity';
import { absoluteUrl } from '@/lib/seo';

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();
  const postsWithImages = posts.filter(p => p.mainImage?.asset?.url);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${postsWithImages.map(post => `  <url>
    <loc>${absoluteUrl(`/blog/${post.slug}`)}</loc>
    <image:image>
      <image:loc>${post.mainImage!.asset!.url}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.mainImage!.alt || post.title)}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
