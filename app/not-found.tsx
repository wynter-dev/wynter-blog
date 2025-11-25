import {ArrowLeft, Ghost} from 'lucide-react';
import NoPrefetchLink from '@/components/NoPrefetchLink';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-6">
        <Ghost className="h-16 w-16 text-muted-foreground animate-pulse" />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-3">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-muted-foreground max-w-md text-sm leading-6">
        이동하려는 페이지가 존재하지 않거나<br />
        주소가 잘못 입력된 것 같아요.
        <br />
        잠시 쉬었다 다시 시도해보세요 :)
      </p>
      <NoPrefetchLink
        href="/"
        className="
          mt-8 inline-flex items-center gap-2
          rounded-md bg-primary px-4 py-2 text-primary-foreground
          hover:bg-primary/90 transition-colors
        "
      >
        <ArrowLeft className="h-4 w-4" />
        홈으로 돌아가기
      </NoPrefetchLink>
      <div className="absolute inset-0 -z-10 flex justify-center opacity-[0.04] pointer-events-none select-none">
        <div className="h-full w-full max-w-4xl border border-foreground rounded-[3rem]" />
      </div>
    </main>
  );
}
