import { ReadmeRenderer } from "@/components/readme-renderer";

export default async function DocsPage() {
  const response = await fetch(
    "https://raw.githubusercontent.com/kauanmezavila/EtherBreaker/main/README.md",
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error("Error loading the documentation. Please try again later.");
  }

  const markdown = await response.text();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <article className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <ReadmeRenderer markdown={markdown} />
      </article>
    </main>
  );
}
