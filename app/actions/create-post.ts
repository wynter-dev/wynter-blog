'use server';

import fs from 'fs';
import path from 'path';
import {Octokit} from 'octokit';
import { summarize } from '@/utils/summarize';

type CreatePostParams = {
  title: string;
  content: string;
  tags: string[];
  depth1: string;
  depth2?: string;
  depth3?: string | null;
};

export async function createPost({title, content, tags, depth1, depth2, depth3}: CreatePostParams) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ㄱ-ㅎ가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const descriptionText = summarize(content);

  const mdx = `---
title: "${title}"
description: "${descriptionText}"
date: "${new Date().toISOString().split('T')[0]}"
category: ["${depth1}", "${depth2}"${depth3 ? `, "${depth3}"` : ''}]
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

${content}
`;

  const categoryPath = [depth1, depth2, depth3].filter(Boolean).join('/');
  const filePath = `src/content/posts/${categoryPath}/${slug}.mdx`;
  const localPath = path.join(process.cwd(), filePath);

  if (process.env.NODE_ENV === 'development') {
    fs.mkdirSync(path.dirname(localPath), {recursive: true});
    fs.writeFileSync(localPath, mdx, {encoding: 'utf8'});

    console.log(`Local file created: ${localPath}`);
    return {slug, categoryPath};
  }

  const token = process.env.GITHUB_TOKEN!;
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  const octokit = new Octokit({auth: token});

  // 파일 존재 여부 검사 (sha 필요)
  let sha: string | undefined = undefined;

  try {
    const existingFile = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });

    if (!Array.isArray(existingFile.data)) {
      sha = existingFile.data.sha;
    }
  } catch (err) {
    console.log(err);
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: sha ? `Update post: ${slug}` : `Create post: ${slug}`,
    content: Buffer.from(mdx).toString('base64'),
    branch,
    sha,
  });

  return {slug, categoryPath};
}
