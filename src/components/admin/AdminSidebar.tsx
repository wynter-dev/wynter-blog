'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      label: '블로그 글 관리',
      href: '/admin/posts',
      children: [
        { label: '글 생성', href: '/admin/posts/new' },
      ],
    },
    {
      label: '카테고리 관리',
      href: '/admin/categories',
    },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Title */}
      <div className="admin-title">
        <Link href="/admin" className="hover:text-gray-600">Admin</Link>
      </div>

      {/* Navigation */}
      <nav className="admin-nav space-y-1">
        {menu.map((item) => {
          const activeParent = pathname.startsWith(item.href);

          return (
            <div key={item.label}>
              {/* Parent item */}
              <Link href={item.href}>{item.label}</Link>
              {/* Children */}
              {item.children && activeParent && (
                <ul className="mt-2 ml-4 space-y-1">
                  {item.children.map((child) => {
                    return (
                      <li key={child.href}>
                        <Link href={child.href}>
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
