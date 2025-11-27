import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Calendar, Tag } from 'lucide-react';
import { getPostBySlug } from '@/utils/mdx';
import { getCategoryPairs } from '@/utils/category';
import NoPrefetchLink from '@/components/NoPrefetchLink';
import BackButton from '@/components/blog/BackButton';
import { Badge } from '@/components/ui/badge';
import Comments from '@/components/blog/Comments';

import '@/styles/markdown.css';

export async function generateMetadata({params}: {  params: Promise<{ slug: string }>}) {
  const { slug = '' } = await params;
  const blogSlug = slug.at(-1);

  const post = await getPostBySlug(blogSlug ?? '');
  const {meta} = post;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${SITE_URL}/api/blog/${blogSlug}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${SITE_URL}/api/blog/${blogSlug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({params}: {params: {slug: string[]}}) {
  const {slug: slugArray} = await params;
  const slug = slugArray.at(-1);
  if(!slug) return notFound();

  const post = await getPostBySlug(slug);
  if(!post) return notFound();

  const {meta, content} = post;

  const fullPath = [meta.depth1, meta.depth2, meta.depth3].filter(Boolean);
  const pairs = getCategoryPairs(fullPath);
  const hasCategory = fullPath.length > 0;

  return (
    <div className="flex flex-col">
      <h1
        className="md:text-4xl sm:text-3xl text-2xl font-bold tracking-tight mb-4 wrap-break-word whitespace-normal">{meta.title}</h1>
      {hasCategory && (
        <div className="flex items-center flex-wrap text-sm text-muted-foreground gap-1 mb-4">
          {pairs.map((c, i) => {
            const href = `/blog/category/${pairs
              .slice(0, i + 1)
              .map((p) => p.value)
              .join('/')}`;

            const isLast = i === pairs.length - 1;
            return (
              <div key={c.value} className="flex items-center gap-1">
                <NoPrefetchLink
                  href={href}
                  className={cn(isLast
                    ? 'font-medium text-foreground'
                    : 'hover:text-foreground transition-colors text-muted-foreground')}>
                  {c.name}
                </NoPrefetchLink>
                {!isLast && (
                  <span className="text-muted-foreground/50">/</span>
                )}
              </div>
            );
          })}
        </div>

      )}
      <div className="flex gap-6 text-sm text-muted-foreground flex-col lg:flex-row">
        <div className="flex items-center gap-1 max-w-md">
          <Calendar className="h-4 w-4"/>
          {meta.createdDate}
        </div>
        {meta.tags?.length > 0 && (
          <div className="flex items-center align-center gap-1 flex-wrap">
            <Tag className="h-4 w-4"/>
            {meta.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-2 py-1 rounded-md mb-1">
                <NoPrefetchLink href={`/tags/${tag}`}>
                  #{tag}
                </NoPrefetchLink>
              </Badge>
            ))}
          </div>
        )}
      </div>
      <article className="markdown-body my-6">{content}</article>
      <Comments/>
      <section className="pt-4 flex text-sm">
        <BackButton/>
      </section>
    </div>
  );
}
