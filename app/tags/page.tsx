import { getAllTags } from '@/utils/mdx';
import NoPrefetchLink from '@/components/NoPrefetchLink';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tags',
  };
}

export default async function TagsPage() {
  const tags = await getAllTags();
  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
      <section className="flex flex-wrap gap-3 pt-5">
        {tags.map(({tag, count}) => (
          <NoPrefetchLink
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 rounded-full text-sm border bg-muted hover:bg-muted/70 transition"
          >
            #{tag} <span className="text-muted-foreground">({count})</span>
          </NoPrefetchLink>
        ))}
      </section>
    </main>
  );
}
