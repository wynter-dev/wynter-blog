import {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import AdminSidebarPC from '@/components/admin/AdminSidebarPC';
import AdminSidebarMobile from '@/components/admin/AdminSidebarMobile';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Menu} from 'lucide-react';
import NoPrefetchLink from '@/components/NoPrefetchLink';

type MenuItem = {
  label: string;
  href: string;
};

export default async function AdminLayout({children}: { children: ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/admin/login');

  const menuList: MenuItem[] = [
    {label: '블로그 목록', href: '/admin/posts'},
    {label: '블로그 생성', href: '/admin/posts/new'},
    {label: '카테고리 관리', href: '/admin/categories'},
    {label: '사용자 지표', href: '/admin/analytics'},
  ];

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      <div className="hidden md:block">
        <AdminSidebarPC items={menuList} />
      </div>
      <div className="block md:hidden w-full border-b bg-black text-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu size={26} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 w-full rounded-none">
              <AdminSidebarMobile items={menuList} />
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-lg font-semibold"><NoPrefetchLink href="/admin">Admin</NoPrefetchLink></div>
        </div>
      </div>

      <main className="md:p-10 p-5 w-full">
        {children}
      </main>
    </div>
  );
}
