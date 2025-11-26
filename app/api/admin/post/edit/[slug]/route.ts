import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Octokit } from 'octokit';
import { summarize } from '@/utils/summarize';
import dayjs from 'dayjs';

async function getSha(octokit: Octokit, owner: string, repo: string, path: string, branch: string) {
  try {
    const res = await octokit.rest.repos.getContent({owner, repo, path, ref: branch});
    if(!Array.isArray(res.data) && 'sha' in res.data) {
      return res.data.sha;
    }
  } catch {
    return undefined;
  }
}

export async function POST(request: Request, {params}: {params: Promise<{slug: string}>}) {
  try {
    const {slug} = await params;
    const {
      title,
      content,
      tags,
      depth1,
      depth2,
      depth3,
      originalDepth1,
      originalDepth2,
      originalDepth3,
      createdDate,
    }: {
      title: string
      content: string
      tags: string[]
      depth1: string
      depth2?: string
      depth3?: string | null
      originalDepth1: string
      originalDepth2?: string | null
      originalDepth3?: string | null
      createdDate: string
    } = await request.json();

    if(!title || !content || !depth1) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }
    const descriptionText = summarize(content);

    const mdx = `---
title: "${title}"
description: "${descriptionText}"
createdDate: "${createdDate}"
updatedDate: "${dayjs().format('YYYY-MM-DD HH:mm')}"
category: ["${depth1}", "${depth2 ?? ''}"${depth3 ? `, "${depth3}"` : ''}]
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

${content}
`;
    const newCategoryPath = [depth1, depth2, depth3].filter(Boolean).join('/');
    const oldCategoryPath = [originalDepth1, originalDepth2, originalDepth3]
      .filter(Boolean)
      .join('/');

    const newFilePath = `src/content/posts/${newCategoryPath}/${slug}.mdx`;
    const oldFilePath = `src/content/posts/${oldCategoryPath}/${slug}.mdx`;

    const newLocalPath = path.join(process.cwd(), newFilePath);
    const oldLocalPath = path.join(process.cwd(), oldFilePath);

    if(process.env.NODE_ENV === 'development') {
      if(oldFilePath !== newFilePath && fs.existsSync(oldLocalPath)) {
        fs.unlinkSync(oldLocalPath);
      }

      fs.mkdirSync(path.dirname(newLocalPath), {recursive: true});
      fs.writeFileSync(newLocalPath, mdx, {encoding: 'utf8'});

      return NextResponse.json({
        slug,
        categoryPath: newCategoryPath,
      });
    }

    const token = process.env.GITHUB_TOKEN!;
    const owner = process.env.GITHUB_OWNER!;
    const repo = process.env.GITHUB_REPO!;
    const branch = process.env.GITHUB_BRANCH ?? 'main';

    const octokit = new Octokit({auth: token});

    const newSha = await getSha(octokit, owner, repo, newFilePath, branch);
    const oldSha = await getSha(octokit, owner, repo, oldFilePath, branch);

    if(oldSha && oldFilePath !== newFilePath) {
      await octokit.rest.repos.deleteFile({
        owner,
        repo,
        path: oldFilePath,
        branch,
        message: `Delete old location: ${slug}`,
        sha: oldSha,
      });
    }

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path: newFilePath,
      content: Buffer.from(mdx).toString('base64'),
      sha: newSha,
      message: newSha ? `Update post: ${slug}` : `Create post: ${slug}`,
    });

    return NextResponse.json({slug, categoryPath: newCategoryPath});
  } catch(err) {
    console.error(err);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}
