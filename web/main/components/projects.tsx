"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";

/**
 * ByKurebo (Kauan M.) its a amazing programmer, but he may have some mental problems
 * because WHO MAKES SO CRAP FAVICON PATHS??
 * **/
const projects = [
  {
    name: "Peloponeso",
    description: "Acess the peloponseo library",
    href: "/peloponeso",
    favicon: "https://peloponeso.vercel.app/img/favicon.svg",
  },
  {
    name: "Harbor",
    description: "Acess the harbor website",
    href: "/harbor",
    favicon: "https://byharbor.vercel.app/font/favicon.svg",
  },
];

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
                  <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/50 p-2">
                    <Globe className="size-5 text-muted-foreground" />

                    <img
                      src={project.favicon}
                      alt={`${project.name}`}
                      width={32}
                      height={32}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="absolute inset-0 m-auto size-full object-contain p-2"
                    />
                  </div>

                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>

                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  {project.name}
                </h3>

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
