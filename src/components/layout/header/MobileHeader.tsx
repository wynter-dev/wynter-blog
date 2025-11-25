'use client';

import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {CATEGORIES, EnhancedCategoryNode, getCategoryUrl, isCategoryActive} from '@/utils/category';
import {cn} from '@/lib/utils';
import NoPrefetchLink from '@/components/NoPrefetchLink';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function MobileHeader({open, setOpen}: Props) {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);

  if (!open) return null;

  const renderMobileNode = (node: EnhancedCategoryNode, depth = 1) => {
    const url = getCategoryUrl(node.fullPath);
    const active = isCategoryActive(pathname, node.fullPath);
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const depthStyle =
      depth === 1
        ? 'pl-0 text-base font-semibold'
        : depth === 2
          ? 'pl-2 text-sm font-medium'
          : 'pl-4 text-xs font-normal';

    return (
      <div key={node.value}>
        <NoPrefetchLink
          href={url}
          onClick={() => setOpen(false)}
          className={cn(
            'block py-1 rounded hover:bg-muted/40 transition',
            depthStyle,
            active && 'text-primary font-bold bg-muted'
          )}
        >
          {node.label}
        </NoPrefetchLink>

        {hasChildren && (
          <div className="mt-1 space-y-1">
            {node.children!.map((child: EnhancedCategoryNode) => renderMobileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="md:hidden border-t bg-background px-4 py-3 space-y-4">
      {/* 기본 메뉴 */}
      <NoPrefetchLink
        href="/"
        onClick={() => setOpen(false)}
        className="block text-sm text-muted-foreground hover:text-foreground"
      >
        Home
      </NoPrefetchLink>

      {/* Blog Dropdown */}
      <div>
        <button
          onClick={() => setBlogOpen(!blogOpen)}
          className="w-full flex text-sm text-muted-foreground hover:text-foreground"
        >
          Blog
        </button>

        {blogOpen && (
          <div className="mt-3 space-y-2">
            {CATEGORIES.map((category) => renderMobileNode(category))}
          </div>
        )}
      </div>

      <NoPrefetchLink
        href="/about"
        onClick={() => setOpen(false)}
        className="block text-sm text-muted-foreground hover:text-foreground"
      >
        About
      </NoPrefetchLink>
    </div>
  );
}
