"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ORGANIZATION = "KML-Research-Labs";

type GitHubOrganization = {
  public_repos: number;
  followers: number;
};

type GitHubRepository = {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
};

type OrganizationStats = {
  repositories: number;
  stars: number;
  forks: number;
  followers: number;
};

const initialStats: OrganizationStats = {
  repositories: 0,
  stars: 0,
  forks: 0,
  followers: 0,
};

export default function Stats() {
  const [animate, setAnimate] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPublicRepos(): Promise<GitHubRepository[]> {
      const repositories: GitHubRepository[] = [];
      let page = 1;

      while (true) {
        const response = await fetch(
          `https://api.github.com/orgs/${ORGANIZATION}/repos?type=public&per_page=100&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load repositories.");
        }

        const data = (await response.json()) as GitHubRepository[];

        repositories.push(...data);

        if (data.length < 100) break;
        page++;
      }

      return repositories;
    }

    async function loadStats() {
      try {
        setLoading(true);
        setError(false);

        const [organizationResponse, readmeResponse, organizationRepos] =
          await Promise.all([
            fetch(`https://api.github.com/orgs/${ORGANIZATION}`, {
              headers: {
                Accept: "application/vnd.github+json",
              },
              signal: controller.signal,
            }),
            fetch(
              "https://raw.githubusercontent.com/KML-Research-Labs/.github/main/profile/README.md",
              { signal: controller.signal },
            ),
            fetchPublicRepos(),
          ]);

        if (!organizationResponse.ok) {
          throw new Error("Failed to load organization.");
        }

        const organization = (await organizationResponse.json()) as {
          followers: number;
        };

        const readme = readmeResponse.ok ? await readmeResponse.text() : "";

        const matches = [
          ...readme.matchAll(
            /https?:\/\/github\.com\/([^/\s)#?]+)\/([^/\s)#?]+)/gi,
          ),
        ];

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
            matches
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
              .map((target) => [
                `${target.owner}/${target.repo}`.toLowerCase(),
                target,
              ]),
          ).values(),
        ];

        const readmeRepos = await Promise.all(
          targets.map(async ({ owner, repo }) => {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
                {
                  headers: {
                    Accept: "application/vnd.github+json",
                  },
                  signal: controller.signal,
                },
              );

              if (!response.ok) return null;

              return (await response.json()) as GitHubRepository;
            } catch (err) {
              if (controller.signal.aborted) throw err;
              return null;
            }
          }),
        );

        const uniqueRepos = new Map<string, GitHubRepository>();

        for (const repo of organizationRepos) {
          uniqueRepos.set(repo.full_name.toLowerCase(), repo);
        }

        for (const repo of readmeRepos) {
          if (repo) {
            uniqueRepos.set(repo.full_name.toLowerCase(), repo);
          }
        }

        const allRepos = [...uniqueRepos.values()];

        setStats({
          repositories: allRepos.length,
          stars: allRepos.reduce(
            (total, repo) => total + repo.stargazers_count,
            0,
          ),
          forks: allRepos.reduce((total, repo) => total + repo.forks_count, 0),
          followers: organization.followers,
        });
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Error loading statistics:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => controller.abort();
  }, []);

  const items = [
    {
      value: stats.repositories,
      label: "Public Repositories",
    },
    {
      value: stats.stars,
      label: "GitHub Stars",
    },
    {
      value: stats.forks,
      label: "Total Forks",
    },
    {
      value: stats.followers,
      label: "Organization Followers",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          onViewportEnter={() => setAnimate(true)}
          viewport={{ once: true, amount: 0.4 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <div
                className="mb-2 text-3xl font-bold md:text-4xl"
                aria-live="polite"
              >
                {loading || error ? (
                  <span className="text-muted-foreground">—</span>
                ) : (
                  <NumberFlow
                    value={animate ? item.value : 0}
                    format={{
                      maximumFractionDigits: 0,
                    }}
                  />
                )}
              </div>

              <div className="text-sm font-medium text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {error && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Could not load GitHub statistics.
            <br />
            Check the data directly on the{" "}
            <a
              href={`https://github.com/${ORGANIZATION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              organization profile
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
