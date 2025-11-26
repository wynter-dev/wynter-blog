import {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import '@/styles/admin.css';
import AdminSidebar from '@/components/admin/AdminSidebar';


export default async function AdminLayout({children}: { children: ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('admin-auth')?.value === 'true';

  if (!isLoggedIn) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
