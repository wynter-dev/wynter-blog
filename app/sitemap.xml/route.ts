import { getAllPosts } from "@/lib/mdx";

export const runtime = "nodejs";

export async function GET() {
  const siteUrl = "https://your-domain.com"; // 🔥 꼭 수정해!

  const posts = await getAllPosts();

  const postUrls = posts
    .map((p) => {
      return `
  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.date).toISOString()}</lastmod>
  </url>
`;
    })
    .join("");

  const staticUrls = [
    "",
    "/blog",
    "/about",
    "/blog/tags",
  ]
    .map((path) => {
      return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`;
    })
    .join("");

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
      "Content-Type": "application/xml",
    },
  });
}
