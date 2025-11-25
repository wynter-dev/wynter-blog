'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:bg-transparent hover:underline underline-offset-4 px-0"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      블로그 목록
    </Button>
  );
}
