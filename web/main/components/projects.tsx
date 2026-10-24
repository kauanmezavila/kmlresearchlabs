"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

const projects = [
  {
    name: "Peloponeso",
    description: "The free library, forever and ever.",
    href: "/peloponeso",
    researcher: "Kauan M.",
    favicon: "https://peloponeso.vercel.app/img/favicon.svg",
  },
  {
    name: "Harbor",
    description: "Distribute your github projects in a simple way.",
    href: "/harbor",
    researcher: "Kauan M.",
    favicon: "https://byharbor.vercel.app/font/favicon.svg",
  },
  {
    name: "GitCard [MIRROR]",
    description: "You github profile in a card, for free.",
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
    description: "A simple PT-BR sintaxe experimental language",
    href: "/JavaliDados",
    researcher: "Kauan M.",
    favicon:
      "https://raw.githubusercontent.com/kauanmezavila/JavaliDados/refs/heads/main/docs/assets/javalidados.svg",
  },
  {
    name: "BCBS-NetHunter",
    description: "The NetHunter for Termux, but with the KML and BCBS touch",
    href: "/BCBS-NetHunter",
    researcher: "Kauan M.",
    favicon: "https://kmlresearchlabs.vercel.app/svg/kml-icon.svg",
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
    <section id="projects" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-3 text-center sm:mb-16"
        >
          <h2 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold text-transparent sm:text-4xl">
            Our Projects
          </h2>

          <p className="mx-auto max-w-xl text-muted-foreground">
            Explore the projects and applications built by KML Research Labs
            people.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.href}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="h-full"
            >
              <Link
                href={project.href}
                className="group flex h-full min-h-52 flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40 hover:bg-muted/30 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <ProjectFavicon project={project} />

                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
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
                  <span className="text-sm font-medium transition-colors group-hover:text-primary">
                    Visit project
                    <span aria-hidden="true"> ↗</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
