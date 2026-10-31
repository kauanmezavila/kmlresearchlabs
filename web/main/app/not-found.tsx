import DinoGame from "@/components/games/DinoGame";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-8xl font-bold tracking-tighter">404</h1>

      <p className="text-neutral-400 mt-3 mb-10 text-center">
        This page not exist or was moved.
      </p>

      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10">
        <iframe
          src="/dino/index.html"
          title="Dino"
          className="w-full h-[230px] border-0"
          loading="eager"
        />
      </div>

      <Link
        href="/"
        className="mt-10 text-sm text-neutral-400 hover:text-white transition"
      >
        Back to home
      </Link>
    </main>
  );
}
