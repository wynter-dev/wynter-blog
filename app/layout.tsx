import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const DEFAULT_SITE_URL = 'http://localhost:3000';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const metadata: Metadata = {
  title: 'Wynter Blog',
  description: '개발, 인프라, 일상 기록 블로그',
  verification: {
    google: '3gdlBQNXxTs-lTdAFrssx1fETbB3w90C4WmlMooIM_o',
  },
  other: {
    'google-adsense-account': 'ca-pub-6689558343928586',
    'naver-site-verification': 'ae884de6cab8b3873195b98280f30b0376afe713',
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Blog - Wynter.log',
    description:
      '개발하면서 배운 것들, 인프라 트러블슈팅 기록, 일상의 생각들을 담고 있는 공간입니다.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
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
    images: [`${baseUrl}/twitter-image`],
  },
  metadataBase: new URL(baseUrl),
};

const pretendard = localFont({
  src: [
    {path: '../public/fonts/pretendard/Pretendard-Thin.woff2', weight: '100'},
    {path: '../public/fonts/pretendard/Pretendard-ExtraLight.woff2', weight: '200'},
    {path: '../public/fonts/pretendard/Pretendard-Light.woff2', weight: '300'},
    {path: '../public/fonts/pretendard/Pretendard-Regular.woff2', weight: '400'},
    {path: '../public/fonts/pretendard/Pretendard-Medium.woff2', weight: '500'},
    {path: '../public/fonts/pretendard/Pretendard-SemiBold.woff2', weight: '600'},
    {path: '../public/fonts/pretendard/Pretendard-Bold.woff2', weight: '700'},
    {path: '../public/fonts/pretendard/Pretendard-ExtraBold.woff2', weight: '800'},
    {path: '../public/fonts/pretendard/Pretendard-Black.woff2', weight: '900'},
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="ko" suppressHydrationWarning>
    <head>
      {/* GA4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EJJ7DDJXC9"
        strategy="afterInteractive"
      />

      <Script id="ga-setup" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EJJ7DDJXC9');
          `}
      </Script>

      {/* GTM */}
      <Script id="gtm" strategy="afterInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MN4J5NJN');
          `}
      </Script>

      {/* Google AdSense */}
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6689558343928586"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </head>
    <body className={cn(pretendard.variable, geistMono.variable)}>
    {/* GTM noscript */}
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-MN4J5NJN"
        height="0"
        width="0"
        style={{display: 'none', visibility: 'hidden'}}
      ></iframe>
    </noscript>
    {children}
    </body>
    </html>
  );
}
