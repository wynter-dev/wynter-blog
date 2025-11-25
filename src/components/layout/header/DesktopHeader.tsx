'use client';

import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Github, Mail, PencilLine} from 'lucide-react';
import {CATEGORIES, EnhancedCategoryNode, getCategoryUrl, isCategoryActive} from '@/utils/category';
import {Button} from '@/components/ui/button';
import NoPrefetchLink from '@/components/NoPrefetchLink';

function Logo() {
  return (
    <NoPrefetchLink href="/" className="text-lg font-semibold tracking-tight">
      wynter.log
    </NoPrefetchLink>
  );
}

function Nav() {
  const pathname = usePathname();

  const navItems = [
    {href: '/', label: 'Home'},
    {href: '/blog', label: 'Blog'},
    {href: '/about', label: 'About'},
  ];

  const renderNode = (node: EnhancedCategoryNode, depth = 1) => {
    const url = getCategoryUrl(node.fullPath);
    const active = isCategoryActive(pathname, node.fullPath);
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const depthStyle =
      depth === 1
        ? 'px-0 text-sm font-semibold'
        : depth === 2
          ? 'pl-2 text-sm font-medium'
          : 'pl-4 text-xs font-normal';

    return (
      <div key={node.value}>
        <NoPrefetchLink
          href={url}
          className={cn(
            'block px-2 py-1 rounded hover:bg-muted/40 transition',
            depthStyle,
            active && 'bg-muted text-primary font-bold'
          )}
        >
          {node.label}
        </NoPrefetchLink>

        {hasChildren && (
          <div className="mt-1 space-y-1">
            {node.children!.map((child: EnhancedCategoryNode) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) =>
        item.href === '/blog' ? (
          <div key="blog" className="relative group">
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "px-1 h-auto text-sm font-normal hover:bg-transparent hover:text-foreground",
                pathname.startsWith("/blog") && "text-foreground font-medium"
              )}
            >
              Blog
            </Button>
            <div
              className="absolute left-0 top-full bg-popover border rounded-md shadow-lg p-4 w-60 z-50 hidden group-hover:block">
              {CATEGORIES.map((category) => renderNode(category))}
            </div>
          </div>
        ) : (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            className={cn(
              'px-1 h-auto text-sm font-normal hover:bg-transparent hover:text-foreground transition',
              pathname === item.href && 'text-foreground font-medium'
            )}
          >
            <NoPrefetchLink href={item.href}>{item.label}</NoPrefetchLink>
          </Button>
        )
      )}
    </nav>
  );
}

function UtilityButtons() {
  return (
    <div className="hidden md:flex items-center gap-2 ml-2">
      <NoPrefetchLink
        href="https://github.com/wynter-dev"
        target="_blank"
        className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
      >
        <Github className="h-3 w-3" /> GitHub
      </NoPrefetchLink>

      <NoPrefetchLink
        href="mailto:u0lee.dev@gmail.com"
        className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
      >
        <Mail className="h-3 w-3" /> Email
      </NoPrefetchLink>

      <NoPrefetchLink
        href="/blog"
        className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
      >
        <PencilLine className="h-3 w-3" /> Blog
      </NoPrefetchLink>
    </div>
  );
}

export default {
  Logo,
  Nav,
  UtilityButtons,
};