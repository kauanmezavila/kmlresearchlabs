"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type OrganizationStats = {
  repositories: number;
  stars: number;
  forks: number;
  followers: number;
};

const initialStats: OrganizationStats = {
  repositories: 0,
  stars: 0,
  forks: 0,
  followers: 0,
};

export default function Stats() {
  const [animate, setAnimate] = useState(false);
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("/api/github", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load GitHub statistics.");

        const data = (await response.json()) as { stats: OrganizationStats };
        setStats(data.stats);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Error loading statistics:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => controller.abort();
  }, []);

  const items = [
    {
      value: stats.repositories,
      label: "Public Repositories",
    },
    {
      value: stats.stars,
      label: "GitHub Stars",
    },
    {
      value: stats.forks,
      label: "Total Forks",
    },
    {
      value: stats.followers,
      label: "Organization Followers",
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          onViewportEnter={() => setAnimate(true)}
          viewport={{ once: true, amount: 0.4 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="text-center"
            >
              <div
                className="mb-2 text-3xl font-bold md:text-4xl"
                aria-live="polite"
              >
                {loading || error ? (
                  <span className="text-muted-foreground">—</span>
                ) : (
                  <NumberFlow
                    value={animate ? item.value : 0}
                    format={{
                      maximumFractionDigits: 0,
                    }}
                  />
                )}
              </div>

              <div className="text-sm font-medium text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {error && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Could not load GitHub statistics.
            <br />
            Check the data directly on the{" "}
            <a
              href="https://github.com/KML-Research-Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              organization profile
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
