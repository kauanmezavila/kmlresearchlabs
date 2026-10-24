import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-8 border-b pb-4 text-4xl font-bold tracking-tight sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-12 border-b pb-3 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-5 leading-7 text-muted-foreground">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-5 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-primary pl-5 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border bg-muted p-5 text-sm leading-6">
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code
      className={`rounded-md bg-muted px-1.5 py-1 font-mono text-sm ${className ?? ""}`}
    >
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b bg-muted px-4 py-3 font-semibold">{children}</th>
  ),
  td: ({ children }) => <td className="border-b px-4 py-3">{children}</td>,
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-8 h-auto max-w-full rounded-xl border"
    />
  ),
};

export function ReadmeRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
