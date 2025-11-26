import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-title"><Link href="/admin">Admin</Link></div>

      <nav className="admin-nav">
        <ul>
          <li><Link href="/admin/posts">블로그 글 관리</Link></li>
          <li><Link href="/admin/categories">카테고리 관리</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
