import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Octokit } from 'octokit';
import { summarize } from '@/utils/summarize';

export async function POST(
  req: Request,
  {params}: {params: {slug: string}},
) {
  try {
    const slug = params.slug;

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
    } = await req.json();

    if(!title || !content || !depth1) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400},
      );
    }
    const descriptionText = summarize(content);

    const mdx = `---
title: "${title}"
description: "${descriptionText}"
date: "${new Date().toISOString().split('T')[0]}"
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

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH ?? 'main';

    if(!token || !owner || !repo) {
      return NextResponse.json(
        {error: 'Missing GitHub environment variables'},
        {status: 500},
      );
    }
    const octokit = new Octokit({auth: token});
    let oldSha: string | undefined = undefined;
    try {
      const oldFile = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: oldFilePath,
        ref: branch,
      });

      if(!Array.isArray(oldFile.data) && 'sha' in oldFile.data) {
        oldSha = oldFile.data.sha;
      }
    } catch {
      oldSha = undefined;
    }
    if(oldSha && oldFilePath !== newFilePath) {
      await octokit.rest.repos.deleteFile({
        owner,
        repo,
        path: oldFilePath,
        branch,
        message: `Delete old post location: ${slug}`,
        sha: oldSha,
      });
    }
    let newSha: string | undefined = undefined;

    try {
      const newFile = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: newFilePath,
        ref: branch,
      });

      if(!Array.isArray(newFile.data) && 'sha' in newFile.data) {
        newSha = newFile.data.sha;
      }
    } catch {
      newSha = undefined;
    }

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: newFilePath,
      message: newSha
        ? `Update post: ${slug}`
        : `Create post: ${slug}`,
      content: Buffer.from(mdx).toString('base64'),
      branch,
      sha: newSha,
    });

    return NextResponse.json({
      slug,
      categoryPath: newCategoryPath,
    });
  } catch(error) {
    console.error('POST /admin/posts/edit/[slug] error:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}
