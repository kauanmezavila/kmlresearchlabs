# kmlresearchlabs

The KML Research Labs ecosystem brings together the projects and applications developed by the team.

## Web

The organization website lives in [`web/main`](web/main/). It is built with Next.js, React, TypeScript, and Tailwind CSS.

The homepage introduces KML Research Labs and lists its projects. The `/peloponeso` and `/harbor` routes embed their respective project websites.

### Run locally

Requirements: Node.js and pnpm.

```sh
cd web/main
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To create and serve a production build, run `pnpm build` followed by `pnpm start` from `web/main`.

### Project structure

```text
web/main/
├── app/                 # Next.js routes, layout, and global styles
├── components/          # Page sections and reusable UI components
├── lib/                 # Shared utilities
├── public/              # Static assets
├── package.json         # Scripts and dependencies
└── pnpm-lock.yaml       # Locked dependency versions
```

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE).
