import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { getPostMetaBySlug } from '@/utils/mdx';
import NoPrefetchLink from '@/components/NoPrefetchLink';

interface PostCardProps {
  slug: string;
  title: string;
  description?: string;
  createdDate: string;
  updatedDate: string;
  tags?: string[];
}

export default async function PostCard({slug, title, description, createdDate, updatedDate, tags = []}: PostCardProps) {

  const url = await getPostUrl(slug);

  async function getPostUrl(slug: string) {
    const meta = await getPostMetaBySlug(slug);
    if(!meta) return `/blog/${slug}`; // fallback

    const parts = [meta.depth1, meta.depth2, meta.depth3, meta.slug].filter(Boolean);

    return `/blog/${parts.join('/')}`;
  }

  return (
    <NoPrefetchLink
      href={url}
      className="
        group block border rounded-xl p-6
        transition hover:bg-muted/40
      "
    >
      {/* Title */}
      <h2 className="text-xl font-medium tracking-tight">{title}</h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
        {description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5"/>
          {updatedDate !== createdDate ? `수정됨 ${updatedDate}` : `${createdDate}`}
        </div>

        {tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5"/>
            {tags.join(', ')}
          </div>
        )}
      </div>

      <div className="flex items-center text-primary text-sm mt-4">
        자세히 보기
        <ArrowRight
          className="
            h-4 w-4 ml-1
            transition-transform group-hover:translate-x-1
          "
        />
      </div>
    </NoPrefetchLink>
  );
}
