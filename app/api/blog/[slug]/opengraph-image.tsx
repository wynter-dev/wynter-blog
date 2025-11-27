import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/utils/mdx';
import dayjs from 'dayjs';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function Image({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  console.log(slug);

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
          padding: '60px 80px',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #5be6d5 0%, #9a8dff 50%, #ff82c5 100%)',
          border: '1px solid #ececec',
        }}
      >
        {/* 상단 타이틀 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 1.5,
              maxWidth: '90%',
              color: '#fff',
            }}
          >
            {meta.title}
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              opacity: 0.7,
              maxWidth: '80%',
              lineHeight: 1.45,
              color: '#111',
              padding: '10px'
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
            fontSize: 22,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Wynter.log
          </div>

          <div
            style={{
              fontSize: 18,
              opacity: 0.6,
              color: '#111',
            }}
          >
            {dayjs(meta.createdDate).format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
    ),
    size
  )
}
