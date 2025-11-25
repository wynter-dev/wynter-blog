import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/utils/mdx';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image(
  req: NextRequest,
  {params}: {params: {slug: string}},
) {
  const post = await getPostBySlug(params.slug);

  if(!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'black',
            color: 'white',
            fontFamily: 'Pretendard, sans-serif',
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

  const title = post.meta.title ?? '';
  const description = post.meta.description ?? '';

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
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: '90%',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            opacity: 0.7,
            lineHeight: 1.45,
            maxWidth: '90%',
            wordBreak: 'break-word',
          }}
        >
          {description}
        </div>

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
