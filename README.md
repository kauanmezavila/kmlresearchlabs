# KML Research Labs

KML Research Labs is a collection of projects, experiments, and applications built by the team. This repository contains the source code for the organization’s website, which brings those projects together in one place.

## Website

The website is located in [`web/main`](web/main/) and is built with Next.js, React, TypeScript, and Tailwind CSS. Its homepage introduces KML Research Labs and highlights the projects. Dedicated routes provide access to project pages and research:

| Route           | Project               |
| --------------- | --------------------- |
| `/peloponeso`   | Peloponeso            |
| `/harbor`       | Harbor                |
| `/gitcard`      | GitCard mirror        |
| `/EtherBreaker` | EtherBreaker research |
| `/oracle`       | Oracle research       |

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

Run these commands from `web/main`.

## Repository layout

```text
web/main/
├── app/          # Routes, layouts, API endpoints, and global styles
├── components/   # Page sections and reusable interface components
├── lib/          # Shared utilities
├── public/       # Static assets
├── package.json  # Scripts and dependencies
└── pnpm-lock.yaml
```

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.
