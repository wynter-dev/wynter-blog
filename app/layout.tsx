import type { ReactNode } from 'react';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
    <body>
    {children}
    </body>
    </html>
  );
}
