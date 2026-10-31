"use client";

import { X, Terminal } from "lucide-react";
import { useKonamiCode } from "@/hooks/use-konami-code";

export default function KonamiSecret() {
  const { unlocked, close } = useKonamiCode();

  if (!unlocked) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md rounded-md">
      <div className="relative w-full max-w-xl border border-[#3bdb00] rounded-md bg-[#080d12] p-8 shadow-[0_0_60px_rgba(0,102,255,0.15)]">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-500 transition hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center gap-2 text-[#3bdb00]">
          <Terminal size={20} />
          <span className="font-mono text-xs tracking-[0.3em]">
            KML // RESTRICTED ACCESS
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">
          Well, well, well.
        </h1>

        <p className="mb-8 font-mono text-sm leading-relaxed text-gray-400">
          You found something that wasn't supposed to be found.
          <br />
          Welcome to the hidden layer of KML Research Labs.
        </p>

        <div className="space-y-2 border-l-2 border-[#3bdb00] pl-4 font-mono text-xs text-[#3bdb00]">
          <p>[OK] Sequence recognized</p>
          <p>[OK] Access granted</p>
          <p>[OK] Welcome, researcher.</p>
        </div>

        <button
          onClick={close}
          className="mt-8 w-full border border-[#3bdb00] rounded-md py-3 font-mono text-xs tracking-widest text-[#3bdb00] transition hover:bg-[#3bdb00] hover:text-black"
        >
          RETURN TO SYSTEM
        </button>
      </div>
    </div>
  );
}
