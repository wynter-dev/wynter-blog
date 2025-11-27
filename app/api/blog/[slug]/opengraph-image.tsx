import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/utils/mdx';
import dayjs from 'dayjs';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function Image({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;

  const post = await getPostBySlug(slug);
  const {meta} = post;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Pretendard, sans-serif',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0F1117 0%, #1A1D27 100%)',
          color: 'white',
        }}
      >
        {/* 상단 타이틀 */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 1.5,
              maxWidth: '90%',
            }}
          >
            {meta.title}
          </div>

          <div
            style={{
              fontSize: 25,
              fontWeight: 700,
              opacity: 0.8,
              maxWidth: '80%',
              lineHeight: 1.45,
              padding: '10px',
            }}
          >
            {meta.description}
          </div>
        </div>

        {/* 하단 카테고리/브랜드 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 25,
            alignItems: 'center',
          }}
        >
          <div style={{ fontWeight: 800 }}>Wynter.log</div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              opacity: 0.7,
            }}
          >
            {dayjs(meta.createdDate).format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
