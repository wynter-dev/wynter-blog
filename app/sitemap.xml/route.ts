import { getAllPostsPaginated } from '@/utils/mdx';

export const runtime = 'nodejs';

// 날짜 유효성 검사 함수
function isValidDate(date: string | number | Date) {
  return !isNaN(new Date(date).getTime());
}

export async function GET() {
  const siteUrl = process.env.HOST_DOMAIN;
  const {posts} = await getAllPostsPaginated(1, 999999);

  const postUrls = posts
    .map((p) => {
      const date = isValidDate(p.date)
        ? new Date(p.date).toISOString()
        : new Date().toISOString(); // fallback

      return `
  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${date}</lastmod>
  </url>
`;
    })
    .join('');

  const staticUrls = [
    '',
    '/blog',
    '/about',
    '/blog/tags',
  ]
    .map((path) => {
      const now = new Date().toISOString();
      return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
  </url>
`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${staticUrls}
${postUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
