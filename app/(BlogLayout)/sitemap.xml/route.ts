import { getAllPostsPaginated } from '@/utils/mdx';
export const runtime = 'nodejs';

function isValidDate(date: string | number | Date) {
  return !isNaN(new Date(date).getTime());
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { posts } = await getAllPostsPaginated(1, 999999);

  const postUrls = posts
    .map((p) => {
      const date = isValidDate(p.date)
        ? new Date(p.date).toISOString()
        : new Date().toISOString();

      return [
        '<url>',
        `<loc>${siteUrl}/blog/${p.slug}</loc>`,
        `<lastmod>${date}</lastmod>`,
        '</url>',
      ].join('');
    })
    .join('');

  const staticPaths = ['/blog', '/about', '/blog/tags'];

  const staticUrls = staticPaths
    .map((path) => {
      const now = new Date().toISOString();
      return [
        '<url>',
        `<loc>${siteUrl}${path}</loc>`,
        `<lastmod>${now}</lastmod>`,
        '</url>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    staticUrls,
    postUrls,
    '</urlset>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
