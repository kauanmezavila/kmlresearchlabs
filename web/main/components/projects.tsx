"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

const projects = [
  {
    name: "Peloponeso",
    description: "A free library for sharing and finding books.",
    href: "/peloponeso",
    researcher: "Kauan M.",
    favicon: "https://peloponeso.vercel.app/img/favicon.svg",
  },
  {
    name: "Harbor",
    description: "A simple way to share your GitHub projects.",
    href: "/harbor",
    researcher: "Kauan M.",
    favicon: "https://byharbor.vercel.app/font/favicon.svg",
  },
  {
    name: "GitCard [MIRROR]",
    description: "Turn your GitHub profile into a shareable card.",
    href: "/gitcard",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
  },
  {
    name: "EtherBreaker",
    description: "Access the EtherBreaker research",
    href: "/EtherBreaker",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
  },
  {
    name: "Oracle",
    description: "Access the Oracle research",
    href: "/oracle",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
  },
  {
    name: "JavaliDados [MIRROR]",
    description: "An experimental language with Portuguese syntax.",
    href: "/JavaliDados",
    researcher: "Kauan M.",
    favicon:
      "https://raw.githubusercontent.com/kauanmezavila/JavaliDados/refs/heads/main/docs/assets/javalidados.svg",
  },
  {
    name: "BCBS-NetHunter",
    description: "A NetHunter setup for Termux, built with BCBS.",
    href: "/BCBS-NetHunter",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
  },
  {
    name: "MyFirstVM [MIRROR]",
    description:
      "A small Python virtual machine experiment, separate from real BIOS and OS behavior.",
    href: "/MyFirstVM",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
  },
  {
    name: "Resenhudo [MIRROR]",
    description: "O bot mais resenha do Brasil!",
    href: "/resenhudo",
    researcher: "Kauan M.",
    favicon:
      "https://raw.githubusercontent.com/kauanmezavila/resenhudo/refs/heads/main/media/THEPCISTA.jpg",
  },
];

function ProjectFavicon({ project }: { project: (typeof projects)[number] }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 p-2">
      {!project.favicon || hasError ? (
        <Globe className="size-5 text-muted-foreground" />
      ) : (
        <img
          src={project.favicon}
          alt={`${project.name} favicon`}
          width={32}
          height={32}
          loading="lazy"
          onError={() => setHasError(true)}
          className="size-full object-contain"
        />
      )}
    </div>
  );
}

export default function Projects() {
  return (
      <section id="projects" className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-3 text-center sm:mb-16">
          <h2 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold text-transparent sm:text-4xl">
            Our Projects
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Projects and experiments from the people behind KML Research Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.href} className="h-full">
              <Link
                href={project.href}
                className="group flex h-full min-h-52 flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-muted/30 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <ProjectFavicon project={project} />

                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-foreground" />
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  {project.name}
                </h3>

                <p className="mb-2 text-xs font-medium text-primary">
                  {project.researcher || "Unassigned"}
                </p>

                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-border pt-4">
                  <span className="text-sm font-medium group-hover:text-primary">
                    Visit project
                    <span aria-hidden="true"> ↗</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
