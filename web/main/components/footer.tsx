import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/svg/kml-color.svg"
                  alt="KML Research Labs"
                  width={160}
                  height={40}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground ml-3">
                A collection of open source projects and experiments.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <span>© {year} KML Research Labs</span>
            <a
              href="https://github.com/KML-Research-Labs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
