'use client';

import {useState} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react';
import CategorySelect from '@/components/admin/post/new/CategorySelect';
import {Button} from '@/components/ui/button';
import {useTheme} from 'next-themes';
import {cn} from '@/lib/utils';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {ssr: false});

export default function EditPostClient({
                                         slug,
                                         initialTitle,
                                         initialContent,
                                         initialTags,
                                         initialCategoryPath,
                                       }: {
  slug: string;
  initialTitle: string;
  initialContent: string;
  initialTags: string;
  initialCategoryPath: string[];
}) {
  const router = useRouter();
  const {resolvedTheme} = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState(initialTags);
  const [content, setContent] = useState(initialContent);
  const [categoryPath, setCategoryPath] = useState(initialCategoryPath);

  useState(() => setMounted(true));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/admin/posts/edit/${slug}/save`, {
      method: 'POST',
      body: JSON.stringify({content}),
    });

    setLoading(false);

    if (!res.ok) {
      alert('저장 실패');
      return;
    }

    alert('저장 완료!');
    router.push('/admin/posts');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-10">

      {/* Title */}
      <div>
        <h1 className="block mb-2 text-lg font-medium">제목</h1>
        <input
          className="w-full border rounded-md px-3 py-2 bg-background"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category */}
      <CategorySelect value={categoryPath} onChange={setCategoryPath} />

      {/* Content */}
      <div data-color-mode={mounted ? resolvedTheme : undefined} className={cn(`pr-1`)}>
        <label className="block mb-2 text-lg font-medium">내용</label>
        <MDEditor
          height={700}
          value={content}
          onChange={(val) => setContent(val ?? '')}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-2 text-lg font-medium">태그</label>
        <input
          className="w-full border rounded-md px-3 py-2 bg-background"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        저장하기
      </Button>
    </form>
  );
}
