"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let position = 0;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === KONAMI_CODE[position]) {
        position++;

        if (position === KONAMI_CODE.length) {
          setUnlocked(true);
          position = 0;
        }
      } else {
        position = key === KONAMI_CODE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    unlocked,
    close: () => setUnlocked(false),
  };
}
