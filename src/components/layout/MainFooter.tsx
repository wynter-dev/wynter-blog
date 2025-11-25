'use client';

import NoPrefetchLink from '@/components/NoPrefetchLink';

export function MainFooter() {
  return (
    <footer
      className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[1024px]
        border-t bg-background
        px-4 py-6
        text-center text-sm text-muted-foreground
        z-[60]
      "
    >
      <p>© {new Date().getFullYear()} wynter.log</p>
      <p className="text-xs">Built with Next.js · TailwindCSS · shadcn/ui</p>

      <NoPrefetchLink
        href="https://github.com/wynter-dev"
        className="text-xs underline hover:text-foreground transition"
        target="_blank"
      >
        GitHub
      </NoPrefetchLink>
    </footer>
  );
}
