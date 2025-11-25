import { notFound } from 'next/navigation';
import { CATEGORIES, findCategoryByPath } from '@/utils/category';
import { getPostsByCategoryPaginated } from '@/utils/mdx';
import PostCard from '@/components/blog/PostCard';
import PageSizeSelect from '@/components/pagination/PageSizeSelect';

interface CategoryPageProps {
  params: Promise<{ category: string[] }>;
  searchParams: Promise<{ pageSize?: string }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const resolved = await props;

  const params = await resolved.params;
  const searchParams = await resolved.searchParams;

  const categoryPath = params.category;
  const pageSize = Number(searchParams?.pageSize ?? 0);

  const category = findCategoryByPath(CATEGORIES, categoryPath);
  if (!category) return notFound();

  const { posts } = await getPostsByCategoryPaginated(category.fullPath, 1, pageSize);

  return (
    <main className="flex flex-col">
      <section className="flex items-start justify-between mb-5">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {category.fullPathName.join(' / ')}
          </h1>
        </div>
        <PageSizeSelect pageSize={pageSize} />
      </section>

      <section className="space-y-6">
        {posts.length === 0 && (
          <p className="text-muted-foreground text-sm">
            아직 이 카테고리에는 글이 없습니다.
          </p>
        )}

        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </section>
    </main>
  );
}
