'use client';

import {CATEGORIES, EnhancedCategoryNode} from '@/utils/category';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NoPrefetchLink from '@/components/NoPrefetchLink';

export default function BlogCategoryMenu() {
  const renderNode = (node: EnhancedCategoryNode) => {
    const hasChildren = node.children && node.children.length > 0;

    // 자식 없음 → 링크 하나만 표시 (leaf node)
    if (!hasChildren) {
      return (
        <DropdownMenuItem key={node.value} asChild>
          <NoPrefetchLink href={`/app/(blog)/blog/category/${node.value}`}>{node.label}</NoPrefetchLink>
        </DropdownMenuItem>
      );
    }

    // 자식 있음 → DropdownMenuSub 로 depth 확장
    return (
      <DropdownMenuSub key={node.value}>
        <DropdownMenuSubTrigger>
          {node.label}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {node.children?.map(renderNode)}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm text-muted-foreground hover:text-foreground transition">
        Blog
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60">
        {CATEGORIES.map(renderNode)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
