import { NextResponse } from "next/server";

const ORGANIZATION = "KML-Research-Labs";
const API_URL = "https://api.github.com";
const CACHE_SECONDS = 60 * 60;

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  archived: boolean;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

type GitHubOrganization = {
  followers: number;
};

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;

  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

async function fetchGitHub<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: githubHeaders(),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status} for ${path}`);
  }

  return (await response.json()) as T;
}

async function fetchOrganizationRepos(): Promise<GitHubRepo[]> {
  const repositories: GitHubRepo[] = [];

  for (let page = 1; ; page += 1) {
    const pageRepos = await fetchGitHub<GitHubRepo[]>(
      `/orgs/${ORGANIZATION}/repos?type=public&sort=updated&direction=desc&per_page=100&page=${page}`,
    );
    repositories.push(...pageRepos);

    if (pageRepos.length < 100) return repositories;
  }
}

async function fetchReadmeRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://raw.githubusercontent.com/${ORGANIZATION}/.github/main/profile/README.md`,
    { next: { revalidate: CACHE_SECONDS } },
  );

  if (!response.ok) return [];

  const readme = await response.text();
  const excluded = new Set([
    ".github",
    "topics",
    "orgs",
    "users",
    "sponsors",
    "features",
    "settings",
    "marketplace",
    "login",
    "signup",
    "explore",
    "collections",
  ]);
  const targets = [
    ...new Map(
      [...readme.matchAll(/https?:\/\/github\.com\/([^/\s)#?]+)\/([^/\s)#?]+)/gi)]
        .map((match) => ({
          owner: match[1],
          repo: match[2].replace(/\.git$/i, "").replace(/[.,;:!?]+$/, ""),
        }))
        .filter(
          ({ owner, repo }) =>
            owner &&
            repo &&
            !excluded.has(owner.toLowerCase()) &&
            !excluded.has(repo.toLowerCase()),
        )
        .map((target) => [`${target.owner}/${target.repo}`.toLowerCase(), target]),
    ).values(),
  ];

  const repos = await Promise.all(
    targets.map(async ({ owner, repo }) => {
      try {
        return await fetchGitHub<GitHubRepo>(
          `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
        );
      } catch (error) {
        console.warn(`Could not fetch GitHub repository ${owner}/${repo}:`, error);
        return null;
      }
    }),
  );

  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

export async function GET() {
  try {
    const [organization, organizationRepos, readmeRepos] = await Promise.all([
      fetchGitHub<GitHubOrganization>(`/orgs/${ORGANIZATION}`),
      fetchOrganizationRepos(),
      fetchReadmeRepos(),
    ]);
    const reposByName = new Map<string, GitHubRepo>();

    for (const repo of [...readmeRepos, ...organizationRepos]) {
      reposByName.set(repo.full_name.toLowerCase(), repo);
    }

    const repos = [...reposByName.values()];
    const stats = {
      repositories: repos.length,
      stars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
      forks: repos.reduce((total, repo) => total + repo.forks_count, 0),
      followers: organization.followers,
    };

    return NextResponse.json(
      { repos, stats },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Failed to load GitHub organization data:", error);
    return NextResponse.json(
      { error: "Could not load GitHub data." },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
