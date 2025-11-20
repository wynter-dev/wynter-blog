import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import '@/styles/markdown.css';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/ad/AdBanner';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({slug: p.slug}));
}

export default async function BlogPostPage({params}: {params: {slug: string}}) {
  const resolved = await params;
  const slug = resolved.slug;
  const {meta, content} = await getPostBySlug(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      {/* Title */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {meta.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      </section>

      {/* Content */}
      <article className="markdown-body">
        {content}
      </article>

      {/* Footer */}
      <section className="pt-10 border-t flex justify-between text-sm">
        <Link
          href="/blog"
          className="text-primary hover:underline underline-offset-4"
        >
          ← 블로그 목록
        </Link>
      </section>
      <AdBanner adSlot="2345678901"/>
    </main>
  );
}
