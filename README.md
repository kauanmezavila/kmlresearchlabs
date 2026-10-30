# KML Research Labs

KML Research Labs is a collection of projects, experiments, and research works from the team and community. This repository contains the code for the organization’s website where works: github status, projects cards, repos card with readme + redirect in site + repo mirrors

## Website

The main website is in `web/main` built with Next.js, React, TypeScript, and Tailwind CSS for a more abstracted and easy interface build.

The repository mirror and README pages are loaded from GitHub. The code also includes GitHub API routes under `/api/github` and `/api/gitcard`.

## Get started

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/), then run the website locally:

```sh
cd web/main
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. To run a production build locally:

```sh
pnpm build
pnpm start
```

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.
