'use client';

import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {BookOpen, Folder, Home, Rss} from 'lucide-react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {CATEGORIES, EnhancedCategoryNode, getCategoryUrl, isCategoryActive} from '@/utils/category';
import NoPrefetchLink from '@/components/NoPrefetchLink';

export function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    {href: '/', label: 'Home', icon: Home},
    {href: '/blog', label: 'Blog', icon: BookOpen},
    {href: '/tags', label: 'Tags', icon: Folder},
    {href: '/rss.xml', label: 'RSS', icon: Rss},
  ];

  const renderCategoryNode = (node: EnhancedCategoryNode, depth = 1) => {
    const url = getCategoryUrl(node.fullPath);
    const active = isCategoryActive(pathname, node.fullPath);

    const depthStyle =
      depth === 1
        ? 'pl-2 text-md font-semibold text-foreground'
        : depth === 2
          ? 'pl-4 text-sm font-medium text-muted-foreground'
          : 'pl-8 text-sm font-normal text-muted-foreground/80';

    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    return (
      <div key={node.value} className="relative">
        <NoPrefetchLink
          href={url}
          className={cn(
            'relative block py-1 px-2 rounded overflow-hidden',
            'hover:bg-muted/70 hover:text-gray-500 text-secondary',
            depthStyle,
            active && `border-2 bg-muted text-primary font-bold`
          )}
        >
          {node.label}
        </NoPrefetchLink>

        {hasChildren && (
          <div className="mt-1 space-y-1">
            {node.children!.map((child: EnhancedCategoryNode) =>
              renderCategoryNode(child, depth + 1)
            )}
          </div>
        )}
      </div>

    );
  };

  const isBlogActive = pathname.startsWith('/blog');

  return (
    <aside
      className="hidden md:block w-56
        sticky top-16
        h-[calc(100vh-64px)]
        border-r bg-background/50 backdrop-blur
        overflow-y-auto z-40
      "
    >
      <nav className="px-6 py-6 space-y-2">
        {sidebarItems.map((item) =>
          item.label !== 'Blog' ? (
            <NoPrefetchLink
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 text-sm px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition',
                pathname === item.href && 'bg-muted text-foreground font-medium'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NoPrefetchLink>
          ) : (
            <Accordion
              key="blog-accordion"
              type="single"
              collapsible
              defaultValue={isBlogActive ? 'blog' : undefined}
              className="w-full"
            >
              <AccordionItem value="blog">
                <div className="flex items-center rounded-md hover:bg-muted transition px-3 py-1">
                  <NoPrefetchLink
                    href="/blog"
                    className={cn(
                      'flex flex-1 items-center gap-3 text-sm rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition',
                      isBlogActive && 'text-foreground font-medium'
                    )}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Blog</span>
                  </NoPrefetchLink>
                  <AccordionTrigger className="p-2 ml-2 rounded-md hover:bg-muted transition [&>svg]:size-4" />
                </div>
                <AccordionContent className="pl-4 py-1 space-y-4">
                  {CATEGORIES.map((category) => renderCategoryNode(category))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          )
        )}
      </nav>
    </aside>
  );
}
