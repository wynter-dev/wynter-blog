import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import AdBanner from '@/components/ad/AdBanner';

export interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  createdDate: string;
  updatedDate: string;
  tags?: string[];
  depth1?: string | null;
  depth2?: string | null;
  depth3?: string | null;
}

export interface PostListResult {
  posts: PostMeta[];
  total: number;
  totalPages: number;
}

export const POSTS_ROOT = path.join(process.cwd(), 'src/content/posts');

export const MARKDOWN_EXTENSIONS = [
  '.md',
  '.mdx',
  '.markdown',
  '.mdown',
  '.mkd',
  '.mkdn',
] as const;

/* ---------------------------------------------
 * 공통 slug 디코딩 유틸
 * ------------------------------------------- */
export function decodeSlug(value: string | null | undefined): string {
  if(!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/* ---------------------------------------------
 * 공통 유틸
 * ------------------------------------------- */
export const isMarkdownFile = (filename: string) =>
  MARKDOWN_EXTENSIONS.some((ext) => filename.endsWith(ext));

export const stripMarkdownExtension = (filename: string) => {
  const decoded = decodeSlug(filename);

  for(const ext of MARKDOWN_EXTENSIONS) {
    if(decoded.endsWith(ext)) return decoded.slice(0, -ext.length);
  }

  return decoded;
};

/* ---------------------------------------------
 * depth 추출
 * ------------------------------------------- */
export function extractDepthFromPath(filePath: string) {
  const relative = path.relative(POSTS_ROOT, filePath);
  const parts = relative.split(path.sep);

  return {
    depth1: decodeSlug(parts[0] ?? null),
    depth2: parts[1] && !isMarkdownFile(parts[1]) ? decodeSlug(parts[1]) : null,
    depth3: parts[2] && !isMarkdownFile(parts[2]) ? decodeSlug(parts[2]) : null,
  };
}

/* ---------------------------------------------
 * 재귀 탐색 (slug 검색용)
 * ------------------------------------------- */
export function getAllMarkdownFilesRecursively(dir: string): string[] {
  if(!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).flatMap((item) => {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if(stat.isDirectory()) return getAllMarkdownFilesRecursively(full);
    if(isMarkdownFile(item)) return full;

    return [];
  });
}

/* ---------------------------------------------
 * 단일 파일 로드 (캐싱 적용)
 * ------------------------------------------- */
export const loadMarkdownFile = cache(async(filePath: string) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);

  const rawSlug = stripMarkdownExtension(filename);
  const slug = decodeSlug(rawSlug);

  const depthInfo = extractDepthFromPath(filePath);

  const {content, frontmatter} = await compileMDX<PostMeta>({
    source: raw,
    components: mdxComponents,
    options: {parseFrontmatter: true},
  });


  const frontmatterMatch = raw.match(/^---\s*([\s\S]*?)\s*---/);
  const body = frontmatterMatch
    ? raw.slice(frontmatterMatch[0].length).trimStart()
    : raw;

  return {
    meta: {
      slug,
      title: frontmatter.title ?? slug,
      description: frontmatter.description ?? '',
      createdDate: frontmatter.createdDate ?? '',
      updatedDate: frontmatter.updatedDate ?? '',
      tags: frontmatter.tags ?? [],
      depth1: decodeSlug(frontmatter.depth1 ?? depthInfo.depth1),
      depth2: decodeSlug(frontmatter.depth2 ?? depthInfo.depth2),
      depth3: decodeSlug(frontmatter.depth3 ?? depthInfo.depth3),
    },
    content,
    body,
    raw,
  };
});

/* ---------------------------------------------
 * 공통 pagination 로직
 * ------------------------------------------- */
async function paginateFiles(
  files: string[],
  page: number,
  pageSize: number,
): Promise<PostListResult> {
  const items = files.map((file) => {
    const stat = fs.statSync(file);

    return {
      path: file,
      timestamp: stat.mtime.getTime(),
    };
  });

  items.sort((a, b) => b.timestamp - a.timestamp);

  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize;
  const sliced = items.slice(start, start + pageSize).map((i) => i.path);

  const loaded = await Promise.all(sliced.map(loadMarkdownFile));

  return {
    posts: loaded.map((p) => p.meta),
    total,
    totalPages,
  };
}

/* ---------------------------------------------
 * 전체 글 pagination
 * ------------------------------------------- */
export async function getAllPostsPaginated(
  page = 1,
  pageSize = 30,
): Promise<PostListResult> {
  const files = getAllMarkdownFilesRecursively(POSTS_ROOT);
  return paginateFiles(files, page, pageSize);
}

/* ---------------------------------------------
 * 카테고리 pagination
 * ------------------------------------------- */
export async function getPostsByCategoryPaginated(
  fullPath: string[],
  page = 1,
  pageSize = 10,
) {
  const dir = path.join(POSTS_ROOT, ...fullPath);
  if(!fs.existsSync(dir)) return {posts: [], total: 0, totalPages: 0};

  const files = getAllMarkdownFilesRecursively(dir);
  return paginateFiles(files, page, pageSize);
}

/* ---------------------------------------------
 * 단일 포스트 (캐싱 적용)
 * ------------------------------------------- */
export const getPostBySlug = cache(async(slug: string) => {
  const all = getAllMarkdownFilesRecursively(POSTS_ROOT);
  const target = decodeSlug(slug);

  const match = all.find((f) =>
    MARKDOWN_EXTENSIONS.some((ext) => f.endsWith(`${target}${ext}`)),
  );

  if(!match) notFound();
  return loadMarkdownFile(match);
});

/* ---------------------------------------------
 * 단일 메타
 * ------------------------------------------- */
export async function getPostMetaBySlug(slug: string) {
  const all = getAllMarkdownFilesRecursively(POSTS_ROOT);
  const target = decodeSlug(slug);

  const match = all.find((f) =>
    MARKDOWN_EXTENSIONS.some((ext) => f.endsWith(`${target}${ext}`)),
  );

  if(!match) return null;

  return (await loadMarkdownFile(match)).meta;
}

/* ---------------------------------------------
 * 태그 목록
 * ------------------------------------------- */
export async function getAllTags() {
  const {posts} = await getAllPostsPaginated(1, 999999);

  const map: Record<string, number> = {};
  posts.forEach((p) =>
    p.tags?.forEach((t) => {
      const clean = t.trim();
      if(!clean) return;
      map[clean] = (map[clean] || 0) + 1;
    }),
  );

  return Object.entries(map)
               .map(([tag, count]) => ({tag, count}))
               .sort((a, b) => a.tag.localeCompare(b.tag));
}

const mdxComponents = {AdBanner};
