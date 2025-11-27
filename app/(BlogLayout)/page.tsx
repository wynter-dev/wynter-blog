import {ArrowRight, PenLine} from 'lucide-react';
import {getAllPostsPaginated} from '@/utils/mdx';
import NoPrefetchLink from '@/components/NoPrefetchLink';
import PostCard from '@/components/blog/PostCard';

export default async function HomePage() {
  const {posts} = await getAllPostsPaginated(1, 3);

  return (
    <div className="flex flex-col items-center">
      <section className="text-center space-y-7 max-w-3xl">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50 backdrop-blur-sm">
          <PenLine className="h-4 w-4" />
          Wynter.log — Dev, Infra & Everyday Notes
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          프론트엔드, 인프라,<br />
          그리고 일상을 적어가는 공간
        </h1>

        <p className="text-muted-foreground leading-relaxed md:text-base text-sm">
          개발하며 배운 인사이트, 문제를 해결했던 경험들,
          그리고 일상에서 느낀 것들을 기록합니다.<br />
          기술과 생각이 자연스럽게 쌓여가는 Wynter의 아카이브입니다.
        </p>

        <NoPrefetchLink
          href="/blog"
          className="
            inline-flex items-center gap-2
            rounded-md bg-primary px-6 py-3 text-primary-foreground text-sm font-medium
            hover:bg-primary/85 transition-all
          "
        >
          블로그 전체 글 보기
          <ArrowRight className="h-4 w-4" />
        </NoPrefetchLink>
      </section>
      {/* Divider */}
      <div className="my-13 h-px w-full max-w-3xl bg-border/70" />
      {/* Recent Posts */}
      <section className="w-full max-w-3xl space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">최근 업데이트</h2>
        <div className="space-y-5">
          {posts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              아직 작성한 글이 없어요. 첫 글을 작성해보세요!
            </p>
          )}
          {posts.map((post) => <PostCard key={post.slug} {...post} />)}
        </div>
        <div className="pt-2 mb-30">
          <NoPrefetchLink
            href="/blog"
            className="text-sm text-primary hover:underline inline-flex items-center"
          >
            전체 글 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </NoPrefetchLink>
        </div>
      </section>
    </div>
  );
}
