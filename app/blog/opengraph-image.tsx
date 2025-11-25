import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/utils/mdx';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({params}: {params: {slug: string[]}}) {
  const slugArray = await params?.slug;
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

  const {title, description} = post.meta;

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
          // 폰트 설정 (만약 외부 폰트를 사용한다면, ImageResponse 옵션에 font를 추가해야 함)
        }}
      >
        {/* ... (이전의 디자인 JSX 유지) ... */}
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
