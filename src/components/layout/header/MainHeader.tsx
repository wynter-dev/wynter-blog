'use client';

import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import {Menu, Moon, Sun} from 'lucide-react';
import DesktopHeader from '@/components/layout/header/DesktopHeader';
import MobileHeader from '@/components/layout/header/MobileHeader';
import VisitorStats from '@/components/analytics/VisitorStats';

export default function MainHeader() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () =>
    mounted && setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 left-0 right-0 h-15 bg-background border-b items-center sm:px-6 ">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <DesktopHeader.Logo />
        <DesktopHeader.Nav />
        <div className="flex items-center gap-2">
          <div className="md:hidden block py-3">
            <VisitorStats />
          </div>
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
          <DesktopHeader.UtilityButtons />
          <button
            className="md:hidden rounded-md border px-2 py-1 hover:bg-muted transition"
            onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <MobileHeader open={mobileOpen} setOpen={setMobileOpen} />
    </header>
  );
}
