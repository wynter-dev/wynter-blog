import Script from 'next/script';
import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/components/ThemeProvider';
import MainHeader from '@/components/layout/header/MainHeader';
import {MainFooter} from '@/components/layout/MainFooter';
import {Sidebar} from '@/components/layout/Sidebar';
import {Geist_Mono} from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {path: '../../public/fonts/pretendard/Pretendard-Thin.woff2', weight: '100'},
    {path: '../../public/fonts/pretendard/Pretendard-ExtraLight.woff2', weight: '200'},
    {path: '../../public/fonts/pretendard/Pretendard-Light.woff2', weight: '300'},
    {path: '../../public/fonts/pretendard/Pretendard-Regular.woff2', weight: '400'},
    {path: '../../public/fonts/pretendard/Pretendard-Medium.woff2', weight: '500'},
    {path: '../../public/fonts/pretendard/Pretendard-SemiBold.woff2', weight: '600'},
    {path: '../../public/fonts/pretendard/Pretendard-Bold.woff2', weight: '700'},
    {path: '../../public/fonts/pretendard/Pretendard-ExtraBold.woff2', weight: '800'},
    {path: '../../public/fonts/pretendard/Pretendard-Black.woff2', weight: '900'},
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function BlogLayout({children}: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false}>
      {/* Google AdSense */}
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6689558343928586"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div
        className={cn(
          'h-screen flex flex-col bg-background text-foreground antialiased font-sans',
          pretendard.variable,
          geistMono.variable,
        )}
      >
        <div className="relative mx-auto w-full max-w-screen-2xl px-4">
          <MainHeader />
          <div className="flex flex-1 mx-auto w-full max-w-screen-2xl px-4">
            <Sidebar />
            <main className="flex-1 relative overflow-y-auto py-12 md:pl-10">
              {children}
            </main>
          </div>
          <MainFooter />
        </div>
      </div>
    </ThemeProvider>
  );
}
