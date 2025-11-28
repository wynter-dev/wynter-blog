'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Image as ImageIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import ImageCropModal from './ImageCropModal';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface BlogEditorProps {
  value: string;
  onChange: (v: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const [cropFile, setCropFile] = useState<File | null>(null);

  useEffect(() => setMounted(true), []);

  // 이미지 클릭 → 라이트박스
  useEffect(() => {
    const showLightbox = (src: string) => {
      const root = document.getElementById('lightbox-root');
      if (!root) return;

      root.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out" id="lightbox-overlay">
          <img src="${src}" class="max-w-[95%] max-h-[95%] rounded-lg shadow-xl" />
        </div>
      `;

      const overlay = document.getElementById('lightbox-overlay');
      if (overlay) overlay.onclick = () => (root.innerHTML = '');
    };

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.dataset.zoom === 'true') {
        const src = target.getAttribute('src');
        if (src) showLightbox(src);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  function insertAtCursor(text: string) {
    const textarea = editorRef.current?.querySelector('textarea') as HTMLTextAreaElement | null;

    if (!textarea) {
      onChange(value + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    onChange(value.slice(0, start) + text + value.slice(end));

    setTimeout(() => {
      const pos = start + text.length;
      textarea.selectionStart = pos;
      textarea.selectionEnd = pos;
      textarea.focus();
    }, 0);
  }

  // 이미지 HTML 삽입
  function insertImage(url: string) {
    const imgHtml = `
<img src="${url}" data-zoom="true" className="rounded cursor-zoom-in max-w-full" />
`;

    if (value.includes('<!-- image-placeholder -->')) {
      const updated = value.replace('<!-- image-placeholder -->', imgHtml);
      onChange(updated);
      return;
    }

    insertAtCursor(`\n${imgHtml}\n`);
  }

  // 업로드
  async function handleImageUpload(file: File) {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/blog/image/upload', {
      method: 'POST',
      body: form,
    });

    const data: { url: string } = await res.json();
    return data.url;
  }

  // 크롭 완료 후 에디터에 삽입
  async function handleCropped(blob: Blob) {
    setCropFile(null);

    const editedFile = new File([blob], 'edited.jpg', { type: 'image/jpeg' });

    const url = await handleImageUpload(editedFile);
    insertImage(url);
  }

  // 파일 선택
  async function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCropFile(file);
    e.target.value = '';
  }

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  return (
    <div className="w-full">

      <div
        ref={editorRef}
        data-color-mode={mounted ? resolvedTheme : undefined}
        className={cn('pr-1')}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleSelectFile}
        />

        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={700}
          preview="live"
          previewOptions={{ skipHtml: false }}
          onDrop={(e) => {
            const file = e.dataTransfer.files?.[0];
            if (file) setCropFile(file);
          }}
          extraCommands={[
            {
              name: 'upload-image',
              keyCommand: 'upload-image',
              buttonProps: { title: '이미지 업로드' },
              icon: <ImageIcon size={18} />,
              execute: () => triggerFileSelect(),
            },
          ]}
        />

        {cropFile && (
          <ImageCropModal
            file={cropFile}
            onCancel={() => setCropFile(null)}
            onCropped={handleCropped}
          />
        )}
      </div>
    </div>
  );
}
