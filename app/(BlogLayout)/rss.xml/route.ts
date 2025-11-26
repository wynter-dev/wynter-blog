import {getAllPostsPaginated} from '@/utils/mdx';

export const runtime = 'nodejs';

export async function GET() {
  const {posts} = await getAllPostsPaginated(1, 999999);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const updated = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map(
      (post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/blog/${post.slug}</link>
    <guid>${siteUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>
  `
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Wynter.log RSS</title>
  <link>${siteUrl}</link>
  <description>Wynter Blog Feed</description>
  <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
