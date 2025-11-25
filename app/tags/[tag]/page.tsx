import {getAllPostsPaginated} from '@/utils/mdx';
import PostCard from '@/components/blog/PostCard';

/* ---------------------------------------------
 * TAG Static Params (정적 생성)
 * ------------------------------------------- */
export async function generateStaticParams() {
  const {posts} = await getAllPostsPaginated(1, 999999);

  const tagSet = new Set(posts.flatMap((p) => p.tags ?? []));
  return [...tagSet].map((tag) => ({tag: encodeURIComponent(tag)}));
}

/* ---------------------------------------------
 * TAG 상세 페이지
 * ------------------------------------------- */
interface TagDetailPageProps {
  params: { tag: string };
}

export default async function TagDetailPage({params}: TagDetailPageProps) {
  const resolved = await params;
  const tag = decodeURIComponent(resolved.tag);

  const {posts} = await getAllPostsPaginated(1, 999999);
  const filtered = posts.filter((p) => p.tags?.includes(tag));

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight">#{tag}</h1>

      <section className="space-y-4 py-5">
        {filtered.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}

        {filtered.length === 0 && (
          <p className="text-muted-foreground">해당 태그의 글이 없습니다.</p>
        )}
      </section>
    </main>
  );
}
