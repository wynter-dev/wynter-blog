import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Missing GitHub token" }, { status: 500 });
  }

  const octokit = new Octokit({ auth: token });

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  const formData = await req.formData();
  const file: File | null = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}-${file.name}`;
  const path = `public/images/${fileName}`;

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Image upload: ${fileName}`,
    content: buffer.toString("base64"),
    branch,
  });

  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/images/${fileName}`;

  return NextResponse.json({ url: rawUrl });
}
