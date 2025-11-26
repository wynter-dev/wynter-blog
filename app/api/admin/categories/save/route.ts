import {NextResponse} from 'next/server';
import {Octokit} from 'octokit';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const {categories} = await req.json();

  const fileContent = `export type CategoryNode = {
  label: string;
  value: string;
  children?: CategoryNode[];
};

export const RAW_CATEGORIES = ${JSON.stringify(categories, null, 2)} satisfies CategoryNode[];
`;

  const filePath = path.join(process.cwd(), 'src/constants/categories.ts');

  // 🔥 1) 로컬 개발 환경이면 -> 그냥 파일 쓰기
  if (process.env.NODE_ENV === 'development') {
    try {
      fs.writeFileSync(filePath, fileContent, 'utf8');
      return NextResponse.json({ok: true, env: 'local-write'});
    } catch (err) {
      console.error(err);
      return NextResponse.json({ok: false, error: 'write-failed'}, {status: 500});
    }
  }

  // 🔥 2) 프로덕션(배포 환경)이라면 -> GitHub에 저장
  const token = process.env.GITHUB_TOKEN!;
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  const octokit = new Octokit({auth: token});

  let sha: string | undefined = undefined;

  try {
    const existing = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: 'src/constants/categories.ts',
      ref: branch,
    });

    if (!Array.isArray(existing.data)) {
      sha = existing.data.sha;
    }
  } catch {
    console.log('GitHub 파일 없음 → 새로 생성');
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: 'src/constants/categories.ts',
    message: 'Update categories.ts',
    content: Buffer.from(fileContent).toString('base64'),
    branch,
    sha,
  });

  return NextResponse.json({ok: true, env: 'github-update'});
}
