'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const {resolvedTheme} = useTheme();

  return (
    <div className="mt-12">
      <Giscus
        id="comments"
        repo="wynter-dev/wynter-dev"
        repoId="R_kgDOQZYZeg"
        category="Announcements"
        categoryId="DIC_kwDOQZYZes4CzEqH"
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="1"
        inputPosition="bottom"
        theme={resolvedTheme}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
