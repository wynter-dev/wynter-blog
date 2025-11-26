import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Octokit } from 'octokit';
import { summarize } from '@/utils/summarize';
import dayjs from 'dayjs';

export async function POST(req: Request) {
  try {
    const {
      title,
      content,
      tags,
      depth1,
      depth2,
      depth3,
    }: {
      title: string;
      content: string;
      tags: string[];
      depth1: string;
      depth2?: string;
      depth3?: string | null;
    } = await req.json();

    if(!title || !content || !depth1) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

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
createdDate: "${dayjs().format('YYYY-MM-DD HH:mm')}"
updatedDate: "${dayjs().format('YYYY-MM-DD HH:mm')}"
category: ["${depth1}", "${depth2 ?? ''}"${depth3 ? `, "${depth3}"` : ''}]
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
---

${content}
`;

    const categoryPath = [depth1, depth2, depth3].filter(Boolean).join('/');
    const filePath = `src/content/posts/${categoryPath}/${slug}.mdx`;
    const localPath = path.join(process.cwd(), filePath);

    if(process.env.NODE_ENV === 'development') {
      fs.mkdirSync(path.dirname(localPath), {recursive: true});
      fs.writeFileSync(localPath, mdx, {encoding: 'utf8'});

      return NextResponse.json({slug, categoryPath});
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

    let sha: string | undefined = undefined;

    try {
      const existingFile = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch,
      });

      if(!Array.isArray(existingFile.data)) {
        sha = existingFile.data.sha;
      }
    } catch {
      sha = undefined;
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

    return NextResponse.json({slug, categoryPath});
  } catch(error) {
    console.error('POST /api/admin/post error:', error);
    return NextResponse.json({error: 'Server error'}, {status: 500});
  }
}
