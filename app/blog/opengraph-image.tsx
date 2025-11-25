import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/utils/mdx';
import { summarize } from '@/utils/summarize';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({params}: {params: {slug: string[]}}) {
  const resolved = await params;
  const slugArray = resolved.slug;
  const slugString = slugArray?.length ? slugArray.join('/') : '/';

  const post = await getPostBySlug(slugString);

  if(!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'black',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
          }}
        >
          Not Found
        </div>
      ),
      size,
    );
  }

  const {meta, raw} = post;
  const title = meta.title;
  const summary = meta.description?.trim()
    ? meta.description
    : summarize(raw);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0F1117 0%, #1A1D27 100%)',
          padding: '60px 80px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'Pretendard, sans-serif',
          boxShadow: '0 0 120px rgba(255, 255, 255, 0.06) inset',
          borderRadius: '20px',
        }}
      >
        {/* 제목 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: '90%',
            wordBreak: 'break-word',
            textShadow: `
              0 0 12px rgba(255,255,255,0.25),
              0 0 24px rgba(255,255,255,0.15)
            `,
          }}
        >
          {title}
        </div>

        {/* 요약 */}
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            opacity: 0.7,
            lineHeight: 1.45,
            maxWidth: '90%',
            wordBreak: 'break-word',
            textShadow: '0 0 10px rgba(255,255,255,0.1)',
          }}
        >
          {summary}
        </div>

        {/* 워터마크 */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 80,
            fontSize: 26,
            opacity: 0.25,
          }}
        >
          Wynter.log
        </div>
      </div>
    ),
    size,
  );
}
