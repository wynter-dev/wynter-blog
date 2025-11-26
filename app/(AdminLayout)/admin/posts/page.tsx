import {Button} from '@/components/ui/button';
import {getAllPostsPaginated} from '@/utils/mdx';

export default async function AdminPostsPage() {
  const {posts} = await getAllPostsPaginated(1, 9999);

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">블로그 글 목록</h1>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4 font-medium text-gray-700">제목</th>
            <th className="text-left p-4 font-medium text-gray-700">카테고리</th>
            <th className="text-left p-4 font-medium text-gray-700">날짜</th>
            <th className="p-4" />
          </tr>
          </thead>

          <tbody>
          {posts.map((p) => (
            <tr key={p.slug} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">{p.title}</td>

              <td className="p-4 text-gray-600">
                {[p.depth1, p.depth2, p.depth3].filter(Boolean).join(' / ')}
              </td>

              <td className="p-4 text-gray-600">{p.date}</td>

              <td className="p-4 text-right">
                <Button asChild variant="outline" size="sm">
                  <a href={`/admin/posts/edit/${p.slug}`}>수정</a>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            등록된 글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
