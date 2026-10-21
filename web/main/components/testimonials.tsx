"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Star,
  GitFork,
  ExternalLink,
  Github,
  Code2,
  CalendarDays,
} from "lucide-react";
import { Button } from "./ui/button";

const ORGANIZATION = "KML-Research-Labs";

type GitHubRepo = {
  id: number;
  name: string;
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

export default function Testimonials() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibleCount = isMobile ? 2 : 6;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRepos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/github", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load projects");

        const data = (await response.json()) as { repos: GitHubRepo[] };
        setRepos(data.repos.filter((repo) => !repo.archived));
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Error");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      controller.abort();
    };
  }, []);

  const visibleRepos = showAll ? repos : repos.slice(0, visibleCount);

  return (
    <section id="repositories" className="px-3 py-16 sm:px-4 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16"
        >
          <h2 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-xl font-semibold text-transparent sm:text-4xl">
            See what we are working
          </h2>

          <p className="mx-auto max-w-xl text-center text-muted-foreground">
            Explore our open source projects, tools and solutions developeds.
          </p>

          <a
            href={`https://github.com/${ORGANIZATION}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
            See organization
            <ExternalLink className="size-3.5" />
          </a>
        </motion.div>

        {loading && (
          <div
            aria-label="Loading repos"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-xl border border-border bg-card p-5"
              >
                <div className="mb-5 h-5 w-2/3 rounded bg-muted" />
                <div className="mb-2 h-3 w-full rounded bg-muted" />
                <div className="h-3 w-4/5 rounded bg-muted" />
                <div className="mt-8 h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>

            <a
              href={`https://github.com/${ORGANIZATION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              Open the source
              <ExternalLink className="size-4" />
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No public repo found
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRepos.map((repo, index) => (
                <motion.article
                  key={repo.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (index % visibleCount) * 0.06,
                    ease: "easeOut",
                  }}
                  className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40 hover:bg-muted/30 sm:p-6"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <a
                        href={repo.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`See ${repo.owner.login} profile`}
                        className="shrink-0"
                      >
                        <img
                          src={repo.owner.avatar_url}
                          alt={`${repo.owner.login}`}
                          width={32}
                          height={32}
                          loading="lazy"
                          className="size-8 rounded-full border border-border object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </a>

                      <h3 className="truncate font-semibold tracking-tight">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outline-none hover:text-primary focus-visible:underline"
                        >
                          {repo.name}
                        </a>
                      </h3>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir repositório ${repo.name} no GitHub`}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>

                  <p className="mb-5 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">
                    {repo.description || "Repositório sem descrição definida."}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto border-t border-border pt-4">
                    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <Code2 className="size-3.5" />
                          {repo.language}
                        </span>
                      )}

                      <span className="flex items-center gap-1.5">
                        <Star className="size-3.5" />
                        {repo.stargazers_count}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <GitFork className="size-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span>
                        Updated at{" "}
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(repo.updated_at))}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {repos.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAll((previous) => !previous)}
                >
                  {showAll ? "Show less" : "Show more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
