import Script from 'next/script';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import MainHeader from '@/components/layout/header/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Sidebar } from '@/components/layout/Sidebar';
import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {path: '../public/fonts/pretendard/Pretendard-Thin.woff2', weight: '100', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-ExtraLight.woff2', weight: '200', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-Light.woff2', weight: '300', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-SemiBold.woff2', weight: '600', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-Bold.woff2', weight: '700', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-ExtraBold.woff2', weight: '800', style: 'normal'},
    {path: '../public/fonts/pretendard/Pretendard-Black.woff2', weight: '900', style: 'normal'},
  ],
  variable: '--font-pretendard',
  display: 'swap',
});
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']});

const DEFAULT_SITE_URL = 'http://localhost:3000';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

const metadataBase = new URL(baseUrl);
export const metadata: Metadata = {
  title: 'Blog | Wynter.log',
  description: '개발, 인프라, 일상 기록 블로그',
  openGraph: {
    type: 'website',
    url: 'https://wynter-dev.vercel.app/blog',
    title: 'Blog | Wynter.log',
    description:
      '개발하면서 배운 것들, 인프라 트러블슈팅 기록, 일상의 생각들을 담고 있는 공간입니다.',
    images: [
      {
        url: 'https://wynter-dev.vercel.app/opengraph-image', // blog OG image endpoint
        width: 1200,
        height: 630,
        alt: 'Wynter.log Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Wynter.log',
    description:
      '개발하면서 배운 것들, 인프라 트러블슈팅 기록, 일상의 생각들을 담고 있는 공간입니다.',
    images: ['https://wynter-dev.vercel.app/twitter-image'],
  },
  metadataBase,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko" suppressHydrationWarning>
    <head>
      <meta name="google-adsense-account" content="ca-pub-6689558343928586"/>
    </head>
    <body
      className={cn(
        'h-screen flex flex-col bg-background text-foreground antialiased font-sans',
        pretendard.variable,
        geistMono.variable,
      )}
    >
    {/* Google AdSense */}
    <Script
      id="adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6689558343928586"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />

    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false}>
      <div className="relative mx-auto w-full max-w-[1024px] px-4">
        <MainHeader/>
        <div className="flex flex-1 mx-auto w-full max-w-[1024px] px-4">
          <Sidebar/>
          <main className="flex-1 relative overflow-y-auto py-12 md:pl-10">
            {children}
          </main>
        </div>

        <MainFooter/>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}
