// src/app/blog/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { ArrowRight, Calendar, Tag, PlusCircle } from 'lucide-react';
import AdBanner from '@/components/ad/AdBanner';

export const metadata = {
  title: 'Blog | Wynter.log',
  description: '개발, 인프라, 일상 기록 블로그',
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <main className="space-y-12">
      {/* Header Section */}
      <section className="flex items-start justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">블로그</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            개발하면서 배운 것들, 인프라 트러블슈팅 기록,
            일상의 생각들을 담고 있는 공간입니다.
          </p>
        </div>

        {/* 새 글 작성 버튼 */}
        <Link
          href="/blog/new"
          className="
            inline-flex items-center gap-2
            rounded-lg border px-3 py-2 text-sm font-medium
            bg-background hover:bg-muted transition
          "
        >
          <PlusCircle className="h-4 w-4"/>
          새 글 작성
        </Link>
      </section>

      {/* Blog List */}
      <section className="space-y-6">
        {posts.length === 0 && (
          <p className="text-muted-foreground text-sm">작성된 글이 없습니다.</p>
        )}

        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="
              group block border rounded-xl p-6
              transition hover:bg-muted/40
            "
          >
            {/* Title */}
            <h2 className="text-xl font-medium tracking-tight">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5"/>
                {post.date}
              </div>

              {post.tags?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5"/>
                  {post.tags.join(', ')}
                </div>
              )}
            </div>

            {/* Read More */}
            <div className="flex items-center text-primary text-sm mt-4">
              자세히 보기
              <ArrowRight className="
                h-4 w-4 ml-1
                transition-transform group-hover:translate-x-1
              "/>
            </div>
          </Link>
        ))}
      </section>
      <AdBanner adSlot="1234567890" className="mt-10"/>
    </main>
  );
}
