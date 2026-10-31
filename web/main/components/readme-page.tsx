import { ReadmeRenderer } from "@/components/readme-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

type ReadmePageProps = {
  repository: string;
  title: string;
};

export async function ReadmePage({ repository, title }: ReadmePageProps) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${repository}/main/README.md`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error(
      `Error loading ${title} documentation. Please try again later.`,
    );
  }

  const markdown = await response.text();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div>
            <Button asChild size="sm">
              <Link
                href={`https://github.com/${repository}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Open the source
                <Github className="size-4" />
              </Link>
            </Button>
          </div>

          <div>
            <b>{repository}</b>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <ReadmeRenderer markdown={markdown} />
      </article>
    </main>
  );
}
