import {getPostBySlug} from '@/utils/mdx';
import EditPost from '@/components/admin/post/edit/EditPost';

export default async function EditPostPage({params}: { params: { slug: string } }) {
  const resolved = await params;
  const slug = resolved.slug;
  const {raw, meta} = await getPostBySlug(slug);

  const title = meta.title;
  const tags = meta.tags ?? [];
  const categoryPath = [meta.depth1, meta.depth2, meta.depth3].filter(Boolean) as string[];

  return (
    <main className="flex flex-col max-w-5xl">
      <h1 className="text-3xl font-semibold tracking-tight">수정</h1>
      <EditPost
        slug={slug}
        initialTitle={title}
        initialContent={raw}
        initialTags={tags.join(', ')}
        initialCategoryPath={categoryPath}
      />
    </main>
  );
}
