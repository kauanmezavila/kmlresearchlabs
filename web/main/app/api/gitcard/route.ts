import { NextResponse } from "next/server";

const REPOSITORIES: Record<string, string> = {
  gitcard: "kauanmezavila/gitcard",
  JavaliDados: "kauanmezavila/JavaliDados",
  MyFirstVM: "kauanmezavila/my-first-vm",
  resenhudo: "kauanmezavila/resenhudo",
};
const CACHE_SECONDS = 300;

type GitHubRepository = { default_branch?: string };

type GitHubItem = {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
  size: number;
  html_url: string;
  download_url: string | null;
  content?: string;
  encoding?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const repo = url.searchParams.get("repo") ?? "gitcard";
  const repository = REPOSITORIES[repo];
  const path = (url.searchParams.get("path") ?? "").replace(/^\/+|\/+$/g, "");

  if (!repository) {
    return NextResponse.json(
      { error: "Unsupported repository." },
      { status: 400 },
    );
  }

  if (path.split("/").some((segment) => segment === "." || segment === "..")) {
    return NextResponse.json(
      { error: "Invalid repository path." },
      { status: 400 },
    );
  }

  const repositoryEndpoint = `https://api.github.com/repos/${repository}`;
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const repositoryResponse = await fetch(repositoryEndpoint, {
      headers,
      next: { revalidate: CACHE_SECONDS },
    });

    if (!repositoryResponse.ok) {
      return NextResponse.json(
        {
          error:
            repositoryResponse.status === 404
              ? "Repository not found on GitHub."
              : "GitHub API is temporarily unavailable.",
        },
        { status: repositoryResponse.status === 404 ? 404 : 502 },
      );
    }

    const metadata = (await repositoryResponse.json()) as GitHubRepository;
    const branch = metadata.default_branch || "main";
    const endpoint = `https://api.github.com/repos/${repository}/contents/${path}`;
    const response = await fetch(
      `${endpoint}?ref=${encodeURIComponent(branch)}`,
      {
        headers,
        next: { revalidate: CACHE_SECONDS },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            response.status === 404
              ? "Path not found in repository."
              : "GitHub API is temporarily unavailable.",
        },
        { status: response.status === 404 ? 404 : 502 },
      );
    }

    const data = (await response.json()) as GitHubItem | GitHubItem[];

    if (Array.isArray(data)) {
      const items = data
        .filter((item) => item.type === "dir" || item.type === "file")
        .map(({ name, path: itemPath, type, size, html_url }) => ({
          name,
          path: itemPath,
          type,
          size,
          html_url,
        }))
        .sort((a, b) => {
          if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
          return a.name.localeCompare(b.name);
        });

      return NextResponse.json(
        { type: "directory", path, items },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        },
      );
    }

    if (data.type !== "file") {
      return NextResponse.json(
        { error: "Unsupported repository item." },
        { status: 400 },
      );
    }

    let content = "";
    if (data.content && data.encoding === "base64") {
      content = Buffer.from(data.content, "base64").toString("utf-8");
    } else if (data.download_url) {
      const rawResponse = await fetch(data.download_url, {
        next: { revalidate: CACHE_SECONDS },
      });
      if (!rawResponse.ok) {
        return NextResponse.json(
          { error: "Could not read file contents." },
          { status: 502 },
        );
      }
      content = await rawResponse.text();
    }

    return NextResponse.json(
      {
        type: "file",
        name: data.name,
        path: data.path,
        size: data.size,
        html_url: data.html_url,
        content,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("Repository mirror request failed:", error);
    return NextResponse.json(
      { error: "Could not load repository from GitHub." },
      { status: 502 },
    );
  }
}
