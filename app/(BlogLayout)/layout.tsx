'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import MainHeader from '@/components/layout/header/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Sidebar } from '@/components/layout/Sidebar';

export default function BlogLayout({children}: {children: ReactNode}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false}>
      <div className="w-screen h-screen flex flex-col">
        {/* Header (Fixed) */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl z-[999]">
          <MainHeader/>
        </div>

        <div className="flex pt-16 mx-auto max-w-screen-xl md:h-[calc(100vh-10dvh)] h-full w-screen overflow-hidden">
          {/* Sidebar (PC Only) */}
          <aside className="max-w-50 hidden md:block h-full w-full border-r bg-background z-[900]">
            <Sidebar/>
          </aside>

          {/* Content Scroll Container */}
          <div className="flex flex-1 flex-col overflow-y-auto md:p-8 p-4 h-full">
            <main className="flex-1">
              {children}
            </main>
            <div className="md:hidden h-20">
              <MainFooter/>
            </div>
          </div>
          {/*<main className="flex-1 overflow-y-auto md:p-8 p-4 h-screen">*/}
          {/*  {children}*/}
          {/*  /!* Mobile footer inside flow *!/*/}
          {/*  <div className="md:hidden mt-5 h-20">*/}
          {/*    <MainFooter/>*/}
          {/*  </div>*/}
          {/*</main>*/}
        </div>

        {/* Footer (Fixed on PC) */}
        <div
          className="hidden md:block fixed bottom-0 h-[10dvh] left-1/2 -translate-x-1/2 w-full max-w-screen-xl z-[999]">
          <MainFooter/>
        </div>
      </div>
    </ThemeProvider>
  );
}
