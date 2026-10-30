import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/svg/kml-color.svg"
                alt="KML Research Labs"
                width={160}
                height={40}
                priority
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <div>
            <Button
              asChild
              size="sm"
              className="group bg-#f5f3ed hover:bg-[#f5f3ed]"
            >
              <Link
                href="/NextLab"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <h1 className="group transition-colors">
                  <span className="text-white group-hover:text-[#24241f] transition-colors">
                    Next
                  </span>

                  <span className="text-white group-hover:text-[#0066ff] transition-colors">
                    Lab
                  </span>
                </h1>
              </Link>
            </Button>
          </div>
          <div>
            <Button asChild size="sm">
              <Link
                href="https://github.com/KML-Research-Labs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                Open the source
                <Github className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
