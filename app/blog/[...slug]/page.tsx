import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Tag } from 'lucide-react';
import { getPostBySlug } from '@/utils/mdx';
import { getCategoryPairs } from '@/utils/category';
import NoPrefetchLink from '@/components/NoPrefetchLink';
import BackButton from '@/components/blog/BackButton';

const DEFAULT_SITE_URL = 'http://localhost:3000';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

const metadataBase = new URL(baseUrl);

export async function generateMetadata({params}: {params: {slug: string[]}}): Promise<Metadata> {
  const slugArr = params.slug;
  const slug = slugArr?.at(-1);
  if(!slug) return {};

  const post = await getPostBySlug(slug);
  if(!post) return {};

  const {meta} = post;

  const title = meta.title;
  const description = meta.description || '';

  const categoryPath = [meta.depth1, meta.depth2, meta.depth3]
    .filter(Boolean)
    .join(' / ');

  const fullPath = slugArr.join('/');
  const url = `${baseUrl}/blog/${fullPath}`;
  const ogImage = `/blog/${fullPath}/opengraph-image`;

  return {
    title,
    description,
    metadataBase,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'ko_KR',
      siteName: 'Wynter Blog',
      section: categoryPath || undefined,
      tags: meta.tags || [],
      publishedTime: meta.date || undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({params}: {params: {slug: string[]}}) {
  const resolved = await params;
  const slugArray = resolved.slug;
  const slug = slugArray.at(-1);
  if(!slug) return notFound();

  const post = await getPostBySlug(slug);
  if(!post) return notFound();

  const {meta, content} = post;

  const fullPath = [meta.depth1, meta.depth2, meta.depth3].filter(Boolean);
  const pairs = getCategoryPairs(fullPath);
  const hasCategory = fullPath.length > 0;

  return (
    <main className="flex flex-1">
      <div className="w-full max-w-3xl">
        {/* 제목 */}
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {meta.title}
        </h1>
        {/* Category Breadcrumb */}
        {hasCategory && (
          <div className="flex items-center gap-1 flex-wrap mb-4">
            {pairs.map((c, i) => (
              <div key={c.value}>
                <NoPrefetchLink
                  href={`/blog/category/${pairs
                    .slice(0, i + 1)
                    .map((p) => p.value)
                    .join('/')}`}
                  className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200
                   transition-colors text-[13px] font-medium">
                  {c.name}
                </NoPrefetchLink>
              </div>
            ))}
          </div>
        )}
        {/* 메타 정보 */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4"/>
            {meta.date}
          </span>

          {meta.tags?.length > 0 && (
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4"/>
              {meta.tags.join(', ')}
            </span>
          )}
        </div>
        {/* 본문 */}
        <article className="markdown-body mb-12">{content}</article>

        {/* Footer */}
        <section className="pt-4 border-t flex text-sm">
          <BackButton/>
        </section>
      </div>
    </main>
  );
}
