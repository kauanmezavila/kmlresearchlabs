import { readFileSync } from "node:fs";
import { join } from "node:path";

export default function NextLab() {
  const html = readFileSync(
    join(process.cwd(), "app", "NextLab", "index.html"),
    "utf8",
  );

  return (
    <iframe
      srcDoc={html}
      title="Afterwords"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
      }}
    />
  );
}
