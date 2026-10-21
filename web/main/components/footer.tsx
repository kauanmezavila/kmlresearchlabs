"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            <div className="space-y-3">
              <Link href="/" className="flex items-left gap-2">
                <Image
                  src="/svg/kml-color.svg"
                  alt="KML Research Labs"
                  width={160}
                  height={40}
                  priority
                  className="h-16 w-auto"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground ml-3">
                Researching the coding world: precision-driven research,
                uncompromising innovation, a new standard for what's next.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <span>© {year} KML Research Labs. All rights reserved.</span>
            <span className="font-medium">#BuildingANewWorld</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
