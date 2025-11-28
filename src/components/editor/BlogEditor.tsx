'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Image as ImageIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import ImageCropModal from './ImageCropModal';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {ssr: false});

interface BlogEditorProps {
  value: string;
  onChange: (v: string) => void;
}

export default function BlogEditor({value, onChange}: BlogEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [mounted, setMounted] = useState<boolean>(false);
  const {resolvedTheme} = useTheme();
  const [cropFile, setCropFile] = useState<File | null>(null);

  useEffect(() => setMounted(true), []);

  function insertAtCursor(text: string) {
    const textarea = editorRef.current?.querySelector('textarea') as HTMLTextAreaElement | null;

    if(!textarea) {
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

  function insertImage(url: string) {
    const html = `
<img src="${url}" data-zoom="true"
  className="rounded cursor-zoom-in max-w-full my-4" />
`;

    insertAtCursor(`\n${html}\n`);
  }

  async function handleImageUpload(file: File) {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/blog/image/upload', {
      method: 'POST',
      body: form,
    });

    const data = (await res.json()) as {url: string};
    return data.url;
  }

  async function handleCropped(blob: Blob) {
    setCropFile(null);

    const edited = new File([blob], 'edited.jpg', {type: 'image/jpeg'});

    const url = await handleImageUpload(edited);
    insertImage(url);
  }

  function triggerSelect() {
    fileInputRef.current?.click();
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if(!file) return;

    setCropFile(file);
    e.target.value = '';
  }

  return (
    <div className="w-full">

      {/* hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={onSelectFile}
      />

      <div
        ref={editorRef}
        data-color-mode={mounted ? resolvedTheme : undefined}
        className={cn('pr-1')}
      >
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={700}
          preview="live"
          previewOptions={{skipHtml: false}}
          onDrop={(e) => {
            const file = e.dataTransfer.files?.[0];
            if(file) setCropFile(file);
          }}
          extraCommands={[
            {
              name: 'upload-image',
              keyCommand: 'upload-image',
              buttonProps: {title: '이미지 업로드'},
              icon: <ImageIcon size={18}/>,
              execute: () => triggerSelect(),
            },
          ]}
        />
      </div>

      {cropFile && (
        <ImageCropModal
          file={cropFile}
          onCancel={() => setCropFile(null)}
          onCropped={handleCropped}
        />
      )}
    </div>
  );
}
