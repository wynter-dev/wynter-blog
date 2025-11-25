import SkillList from '@/components/about/SkillList';
import CareerCard from '@/components/about/CareerCard';

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <div className="text-[17px] leading-[1.85] text-foreground my-4">
          <p>
            안녕하세요. 저는 커머스와 핀테크 분야에서 다양한 웹 서비스를 구축하며
            프론트엔드 중심의 실무 경험을 쌓아온 개발자입니다.
            현재는 핀테크 기업에서 팀장을 맡아 서비스 개발과 기술적 방향성을 함께 이끌고 있으며,
            Next.js와 TypeScript 기반의 환경 구성부터 CI/CD 자동화, 코드 품질 관리, 운영까지
            서비스 전반을 경험하고 있습니다.
            프론트엔드뿐 아니라 백엔드와 인프라 경험도 함께 쌓아왔고,
            다양한 직군과 협업하며 문제를 해결하는 과정에서 팀의 성장을 이끌어내는 데 큰 보람을 느낍니다.
            지식 공유와 열린 소통을 통해 수평적인 개발 문화를 만드는 것을 중요하게 생각합니다.
            신뢰를 기반으로 함께 일할 수 있는 개발자가 되기 위해 항상 책임감 있게 일하고 있습니다.
            잘 부탁드립니다.
          </p>
        </div>
      </section>

      {/* Career Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">경력</h2>

        <div className="space-y-4">
          <CareerCard
            company="페이민트"
            period="2024.10 - 재직중"
            position="프론트엔드 팀장"
            details={[
              '핀테크 서비스 결제선생 운영 및 개발',
              'SPEEID, 대교 청구서 프로젝트 유지보수',
              'Next.js · React 전환 프로젝트 리딩',
            ]}
          />

          <CareerCard
            company="큐텐테크놀러지 / 위메프"
            period="2021.10 - 2024.08"
            position="프론트엔드 개발"
            details={[
              '위메프 서비스 프론트 운영 및 개발',
              '티몬 로그인/회원 서비스 전환 개발',
              '검색 전환 프로젝트 구축 및 리딩',
            ]}
          />

          <CareerCard
            company="TG360° Technologies"
            period="2020.08 - 2021.04"
            position="프론트엔드 / 인프라 개발"
            details={[
              'DMP 솔루션 Molecule 프론트 개발',
              '광고 서버 신규 구축 및 인프라 운영',
              'Vue 기반 SPA 구축 및 데이터 시각화',
            ]}
          />

          <CareerCard
            company="애니포인트미디어"
            period="2017.09 - 2020.06"
            position="프론트엔드 개발"
            details={[
              '실시간 TV 광고 플랫폼 웹 개발',
              '청약/관리자 B2B 사이트 운영 및 신규 개발',
              'Nuxt, Vue, Kotlin 기반 광고 플랫폼 구축',
            ]}
          />

          <CareerCard
            company="삼미정보시스템"
            period="2016.09 - 2017.09"
            position="MES 프로그램 개발"
            details={[
              '이건창호 MES 프로그램 개발',
              'C# 기반 제조 공정 시스템 개발',
            ]}
          />

          <CareerCard
            company="시터스"
            period="2016.03 - 2016.04"
            position="네비게이션 시스템 유지보수"
            details={[
              '자동차 네비게이션 카메라 루틴 유지보수',
              'C++ 기반 내비게이션 시스템 개발',
            ]}
          />
        </div>
      </section>

      {/* Skills Summary */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">주요 역량</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <SkillList
            title="Languages / FE Framework"
            items={[
              'Javascript, Typescript, Java, Kotlin',
              'React, Vue, AngularJs 기반 SPA 개발',
              'Next.js 기반 SSR/SSG 구축 경험',
            ]}
          />

          <SkillList
            title="Frontend / UI"
            items={[
              'HTML, Bootstrap, Emotion, Material(Vuetify)',
              'CSS/SCSS, TailwindCSS, Webpack5+',
            ]}
          />

          <SkillList
            title="Backend"
            items={[
              'Spring Boot 기반 REST API 개발',
              'Node.js · Express',
            ]}
          />

          <SkillList
            title="Cloud / DevOps"
            items={[
              'AWS(S3, EC2, CloudFront, WAF, VPC...)',
              'Hadoop(HDFS, Hive, Kafka, Flume)',
              'CI/CD (GitLab, Github Actions)',
              'Docker, Nginx, RabbitMQ',
            ]}
          />
        </div>
      </section>
    </main>
  );
}
