import NoPrefetchLink from '@/components/NoPrefetchLink';

type MenuItem = {
  label: string;
  href: string;
};

export default function AdminSidebarPC({ items }: { items: MenuItem[] }) {
  return (
    <aside className="w-60 h-screen bg-[#111] text-white p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold"><NoPrefetchLink href="/admin">Admin</NoPrefetchLink></h2>
      <nav className="flex flex-col gap-3 text-sm font-semibold">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-gray-300 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
