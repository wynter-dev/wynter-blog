import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 3);

  return (
    <main className="flex flex-col items-center px-6 py-20">
      {/* Hero */}
      <section className="text-center space-y-7 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50 backdrop-blur-sm">
          <PenLine className="h-4 w-4" />
          Wynter.log — Dev, Infra & Everyday Notes
        </div>

        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          프론트엔드, 인프라,<br />
          그리고 일상을 적어가는 공간
        </h1>

        <p className="text-muted-foreground leading-relaxed text-base">
          개발하며 배운 인사이트, 문제를 해결했던 경험들,
          그리고 일상에서 느낀 것들을 기록합니다.
          기술과 생각이 자연스럽게 쌓여가는 Wynter의 아카이브입니다.
        </p>

        <Link
          href="/blog"
          className="
            inline-flex items-center gap-2
            rounded-md bg-primary px-6 py-3 text-primary-foreground text-sm font-medium
            hover:bg-primary/85 transition-all
          "
        >
          블로그 전체 글 보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Divider */}
      <div className="my-20 h-px w-full max-w-3xl bg-border/70" />

      {/* Recent Posts */}
      <section className="w-full max-w-3xl space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">최근 업데이트</h2>

        <div className="space-y-5">
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground">
              아직 작성한 글이 없어요. 첫 글을 작성해보세요!
            </p>
          )}

          {recent.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="
                block rounded-xl border p-6 transition group
                hover:bg-muted/50 hover:shadow-sm
              "
            >
              <h3 className="text-lg font-semibold group-hover:text-primary transition">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {post.description}
              </p>
              <span className="text-xs text-muted-foreground mt-2 block">
                {post.date}
              </span>
            </Link>
          ))}
        </div>

        <div className="pt-2">
          <Link
            href="/blog"
            className="text-sm text-primary hover:underline inline-flex items-center"
          >
            전체 글 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
