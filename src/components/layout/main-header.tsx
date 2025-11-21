'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { startTransition, useEffect, useState } from 'react';
import { Github, Mail, PencilLine } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';

export function MainHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (href: string) => {
    return href === '/'
      ? pathname === '/'
      : pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-[1024px] flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          wynter.log
        </Link>

        {/* ---- Desktop Navigation ---- */}
        <nav className="hidden gap-6 md:flex items-center">
          {navItems.map((item) => {
            const active = isActive(item.href);

            // Blog 메뉴 드롭다운
            if (item.href === '/blog') {
              return (
                <div key="blog" className="relative group">
                  <Link
                    href="/blog"
                    className={cn(
                      'text-sm text-muted-foreground hover:text-foreground transition',
                      active && 'text-foreground font-medium'
                    )}
                  >
                    Blog
                  </Link>

                  {/* 드롭다운 */}
                  <div className="absolute left-0 mt-3 hidden group-hover:block bg-popover border rounded-md shadow-lg p-4 w-60 z-50">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.value} className="mb-4 last:mb-0">
                        {/* Parent Category */}
                        <p className="text-sm font-semibold text-foreground px-1 mb-2">
                          {cat.label}
                        </p>

                        {/* Sub Categories */}
                        <div className="ml-2 space-y-1.5">
                          {cat.children.length > 0 ? (
                            cat.children.map((sub) => (
                              <Link
                                key={sub.value}
                                href={`/blog/category/${sub.value}`}
                                className="block text-xs text-muted-foreground px-2 py-1 rounded hover:bg-muted/40 transition"
                              >
                                {sub.label}
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={`/blog/category/${cat.value}`}
                              className="block text-xs text-muted-foreground px-2 py-1 rounded hover:bg-muted/40 transition"
                            >
                              전체 보기
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // 일반 메뉴
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm text-muted-foreground hover:text-foreground transition',
                  active && 'text-foreground font-medium'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ---- Right Buttons ---- */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-md border px-2 py-1 hover:bg-muted transition"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link
              href="https://github.com/wynter-dev"
              target="_blank"
              className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
            >
              <Github className="h-3 w-3" /> GitHub
            </Link>

            <Link
              href="mailto:u0lee.dev@gmail.com"
              className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
            >
              <Mail className="h-3 w-3" /> Email
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-muted transition text-xs"
            >
              <PencilLine className="h-3 w-3" /> Blog
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-md border px-2 py-1 hover:bg-muted transition"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ---- Mobile Menu ---- */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 py-3 space-y-3">

          {/* 기본 메뉴 */}
          {navItems.map((item) => (
            item.href !== '/blog' ? (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <div key="mobile-blog">
                {/* Blog 클릭으로 토글 */}
                <button
                  className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                >
                  Blog
                </button>

                {/* Blog 카테고리 펼침 */}
                {mobileBlogOpen && (
                  <div className="ml-3 mt-3 space-y-4">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.value}>
                        {/* Parent Category */}
                        <p className="text-sm font-semibold text-foreground mb-2">
                          {cat.label}
                        </p>

                        {/* Sub Categories */}
                        <div className="ml-2 space-y-1.5">
                          {cat.children.length > 0 ? (
                            cat.children.map((sub) => (
                              <Link
                                key={sub.value}
                                href={`/blog/category/${sub.value}`}
                                className="block text-xs text-muted-foreground px-2 py-1 rounded hover:bg-muted/40 transition"
                                onClick={() => setOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={`/blog/category/${cat.value}`}
                              className="block text-xs text-muted-foreground px-2 py-1 rounded hover:bg-muted/40 transition"
                              onClick={() => setOpen(false)}
                            >
                              전체 보기
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </header>
  );
}
