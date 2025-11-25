import { Metadata } from 'next';
import { getAllPostsPaginated } from '@/utils/mdx';
import PostCard from '@/components/blog/PostCard';
import PageSizeSelect from '@/components/pagination/PageSizeSelect';

interface BlogListPageProps {
  searchParams?: {
    pageSize?: string;
  };
}

export default async function BlogListPage(props: BlogListPageProps) {
  const resolved = await props.searchParams;
  const pageSize = Number(resolved?.pageSize ?? 10);
  const {posts} = await getAllPostsPaginated(1, pageSize);

  return (
    <main className="flex flex-col">
      <section className="flex items-start justify-between mb-5">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">블로그</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            개발하면서 배운 것들, 인프라 트러블슈팅 기록,
            일상의 생각들을 담고 있는 공간입니다.
          </p>
        </div>
        <PageSizeSelect pageSize={pageSize}/>
      </section>

      <section className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </section>
    </main>
  );
}
