"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReadmeRenderer } from "@/components/readme-renderer";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileCode2,
  FileText,
  Folder,
  Github,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

type RepoItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  size: number;
  html_url: string;
};

type DirectoryResult = { type: "directory"; path: string; items: RepoItem[] };
type FileResult = {
  type: "file";
  name: string;
  path: string;
  size: number;
  html_url: string;
  content: string;
};
type ApiResult = DirectoryResult | FileResult;

const REPO_URL = "https://github.com/kauanmezavila/gitcard";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function GitCardExplorer() {
  const searchParams = useSearchParams();
  const requestedPath = searchParams.get("path") ?? "";
  const [data, setData] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedPath = requestedPath || "README.md";

  async function loadPath(path: string) {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const response = await fetch(`/api/gitcard?path=${encodeURIComponent(path)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to load repository.");
      setData(result as ApiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load GitCard.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPath(selectedPath);
    // URL changes should reload the selected file or folder.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath]);

  const breadcrumbs = useMemo(() => {
    if (!data?.path) return [];
    const parts = data.path.split("/");
    return parts.map((part, index) => ({
      name: part,
      path: parts.slice(0, index + 1).join("/"),
    }));
  }, [data?.path]);

  async function copyContent(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Clipboard access failed. Select and copy the code manually.");
    }
  }

  const isMarkdown = data?.type === "file" && /\.md$/i.test(data.name);

  return (
    <main className="min-h-dvh px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to KML Research Labs
        </Link>

        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border bg-muted/20 p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                  <Code2 className="size-7" />
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border px-2.5 py-1">PUBLIC REPOSITORY</span>
                    <span>JavaScript</span>
                    <span>·</span>
                    <span>main</span>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">GitCard</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Customizable GitHub profile cards built with native JavaScript and Web Components.
                  </p>
                </div>
              </div>
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
                View on GitHub <ArrowUpRight className="size-4" />
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <a href={`${REPO_URL}/commits/main`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <RefreshCw className="size-3.5" /> Commit history
              </a>
              <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <Github className="size-3.5" /> Issues
              </a>
              <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                <FileText className="size-3.5" /> License
              </a>
            </div>
          </div>

          <div className="grid min-h-[560px] lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="border-b border-border bg-muted/10 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Repository files</span>
                <button onClick={() => void loadPath(data?.type === "directory" ? data.path : data?.path.split("/").slice(0, -1).join("/") || "")} title="Refresh" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <RefreshCw className="size-3.5" />
                </button>
              </div>
              <div className="p-2">
                <button onClick={() => void loadPath("")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Folder className="size-4" /> gitcard <span className="ml-auto text-xs">main</span>
                </button>
                {data?.type === "directory" && data.items.map((item) => (
                  <Link key={item.path} href={`/gitcard?path=${encodeURIComponent(item.path)}`} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${requestedPath === item.path ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}>
                    {item.type === "dir" ? <Folder className="size-4 shrink-0" /> : <FileCode2 className="size-4 shrink-0" />}
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    {item.type === "dir" && <ChevronRight className="size-3.5 shrink-0" />}
                  </Link>
                ))}
                {data?.type === "file" && (
                  <>
                    <div className="my-2 border-t border-border" />
                    <button onClick={() => void loadPath(data.path.split("/").slice(0, -1).join("/"))} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                      <Folder className="size-4" /> Parent directory
                    </button>
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium">
                      {/\.md$/i.test(data.name) ? <BookOpen className="size-4" /> : <FileCode2 className="size-4" />}
                      <span className="truncate">{data.name}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="border-t border-border px-4 py-4 text-xs leading-5 text-muted-foreground">
                Files are fetched from the public GitHub repository and cached briefly to reduce API requests.
              </div>
            </aside>

            <section className="min-w-0">
              {loading ? (
                <div className="flex min-h-[420px] items-center justify-center gap-3 text-sm text-muted-foreground">
                  <LoaderCircle className="size-5 animate-spin" /> Loading repository…
                </div>
              ) : error ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                  <FileText className="mb-3 size-8 text-muted-foreground" />
                  <h2 className="font-semibold">Could not load this path</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                  <button onClick={() => void loadPath(selectedPath)} className="mt-5 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">Try again</button>
                </div>
              ) : data?.type === "directory" ? (
                <div>
                  <div className="flex flex-wrap items-center gap-1 border-b border-border px-5 py-4 text-sm">
                    <button onClick={() => void loadPath("")} className="font-medium hover:underline">gitcard</button>
                    {breadcrumbs.map((crumb) => (
                      <span key={crumb.path} className="inline-flex items-center gap-1 text-muted-foreground">
                        <ChevronRight className="size-3.5" />
                        <button onClick={() => void loadPath(crumb.path)} className="hover:text-foreground hover:underline">{crumb.name}</button>
                      </span>
                    ))}
                  </div>
                  <div className="divide-y divide-border">
                    {data.items.length === 0 ? (
                      <p className="p-6 text-sm text-muted-foreground">This folder is empty.</p>
                    ) : data.items.map((item) => (
                      <Link key={item.path} href={`/gitcard?path=${encodeURIComponent(item.path)}`} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/30">
                        {item.type === "dir" ? <Folder className="size-4 shrink-0 text-muted-foreground" /> : <FileCode2 className="size-4 shrink-0 text-muted-foreground" />}
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.type === "file" ? formatBytes(item.size) : "Folder"}</span>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                  {!requestedPath && (
                    <div className="border-t border-border p-5">
                      <button onClick={() => void loadPath("README.md")} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">
                        <BookOpen className="size-4" /> Open README
                      </button>
                    </div>
                  )}
                </div>
              ) : data?.type === "file" ? (
                <div className="min-w-0">
                  <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-wrap items-center gap-1 text-sm">
                      <button onClick={() => void loadPath("")} className="text-muted-foreground hover:text-foreground">gitcard</button>
                      {breadcrumbs.map((crumb) => (
                        <span key={crumb.path} className="inline-flex min-w-0 items-center gap-1 text-muted-foreground">
                          <ChevronRight className="size-3.5 shrink-0" />
                          <button onClick={() => void loadPath(crumb.path)} className="max-w-36 truncate hover:text-foreground">{crumb.name}</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-xs text-muted-foreground">{formatBytes(data.size)}</span>
                      <button onClick={() => void copyContent(data.content)} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">
                        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <a href={data.html_url} target="_blank" rel="noreferrer" title="Open on GitHub" className="rounded-md border border-border p-1.5 hover:bg-muted">
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </div>
                  {isMarkdown ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none px-5 py-6 sm:px-8 sm:py-8 [&_a]:break-words [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_code]:break-words">
                      <ReadmeRenderer markdown={(data as FileResult).content} />
                    </div>
                  ) : (
                    <pre className="max-h-[75vh] overflow-auto bg-background p-5 text-xs leading-6 sm:p-8 sm:text-sm"><code>{(data as FileResult).content}</code></pre>
                  )}
                  <div className="border-t border-border px-5 py-4 text-xs text-muted-foreground">
                    Showing the current contents of <span className="font-mono">{data.path}</span> from the public repository.
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          GitCard source mirror · KML Research Labs · <a href={REPO_URL} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">Source repository</a>
        </p>
      </div>
    </main>
  );
}

export default function GitCardPage() {
  return (
    <Suspense fallback={<main className="flex min-h-dvh items-center justify-center gap-3 text-sm text-muted-foreground"><LoaderCircle className="size-5 animate-spin" /> Loading GitCard…</main>}>
      <GitCardExplorer />
    </Suspense>
  );
}
