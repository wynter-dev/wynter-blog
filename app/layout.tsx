import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css';

const DEFAULT_SITE_URL = 'http://localhost:3000';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

const metadataBase = new URL(baseUrl);
export const metadata: Metadata = {
  title: 'Wynter Blog',
  description: '개발, 인프라, 일상 기록 블로그',
  verification: {
    google: '3gdlBQNXxTs-lTdAFrssx1fETbB3w90C4WmlMooIM_o',
  },
  other: {
    'google-adsense-account': 'ca-pub-6689558343928586',
  },
  openGraph: {
    type: 'website',
    url: 'https://wynter-dev.vercel.app/blog',
    title: 'Blog - Wynter.log',
    description:
      '개발하면서 배운 것들, 인프라 트러블슈팅 기록, 일상의 생각들을 담고 있는 공간입니다.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`, // blog OG image endpoint
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
  metadataBase,
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="ko" suppressHydrationWarning>
    <body>
    {children}
    </body>
    </html>
  );
}
