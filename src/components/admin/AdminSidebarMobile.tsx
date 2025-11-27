type MenuItem = {
  label: string;
  href: string;
};

export default function AdminSidebarMobile({items}: { items: MenuItem[] }) {
  return (
    <nav className="flex flex-col bg-black text-white p-4 gap-4 text-base w-screen">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-gray-300 hover:text-white py-1"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
