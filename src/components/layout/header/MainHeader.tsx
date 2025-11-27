'use client';

import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import {Menu, Moon, Sun} from 'lucide-react';
import DesktopHeader from '@/components/layout/header/DesktopHeader';
import MobileHeader from '@/components/layout/header/MobileHeader';

export default function MainHeader() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () =>
    mounted && setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <DesktopHeader.Logo />
        <DesktopHeader.Nav />
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
          <DesktopHeader.UtilityButtons />
          <button
            className="md:hidden rounded-md border px-2 py-1 hover:bg-muted transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <MobileHeader open={mobileOpen} setOpen={setMobileOpen} />
    </header>
  );
}
