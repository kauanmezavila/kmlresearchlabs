"use client";

import { useEffect, useRef, useState } from "react";

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let points = 0;
    let speed = 5;
    let animation: number;
    let obstacles: { x: number; width: number; height: number }[] = [];

    const ground = 180;

    const dino = {
      x: 45,
      y: ground - 35,
      width: 28,
      height: 35,
      velocity: 0,
      jumping: false,
    };

    const jump = () => {
      if (!dino.jumping) {
        dino.velocity = -12;
        dino.jumping = true;
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    };

    canvas.addEventListener("pointerdown", jump);
    window.addEventListener("keydown", handleKey);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#555";
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.stroke();

      ctx.fillStyle = "#e5e5e5";
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      ctx.fillRect(dino.x + 18, dino.y - 8, 18, 16);

      ctx.fillStyle = "#111";
      ctx.fillRect(dino.x + 29, dino.y - 4, 3, 3);

      dino.velocity += 0.6;
      dino.y += dino.velocity;

      if (dino.y >= ground - dino.height) {
        dino.y = ground - dino.height;
        dino.velocity = 0;
        dino.jumping = false;
      }

      if (frame % 85 === 0) {
        obstacles.push({
          x: canvas.width,
          width: 18,
          height: 25 + Math.random() * 20,
        });
      }

      obstacles.forEach((obstacle) => {
        obstacle.x -= speed;

        ctx.fillStyle = "#a3a3a3";
        ctx.fillRect(
          obstacle.x,
          ground - obstacle.height,
          obstacle.width,
          obstacle.height,
        );

        const collision =
          dino.x < obstacle.x + obstacle.width &&
          dino.x + dino.width > obstacle.x &&
          dino.y + dino.height > ground - obstacle.height;

        if (collision) {
          setPlaying(false);
          setGameOver(true);
        }
      });

      obstacles = obstacles.filter((item) => item.x > -30);

      points++;
      if (frame % 6 === 0) {
        setScore(Math.floor(points / 6));
      }

      speed += 0.001;
      frame++;

      if (playing) {
        animation = requestAnimationFrame(draw);
      }
    };

    animation = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animation);
      canvas.removeEventListener("pointerdown", jump);
      window.removeEventListener("keydown", handleKey);
    };
  }, [playing]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between text-xs text-neutral-400 mb-3">
        <span>Dino, developed with tiny-agents</span>
        <span>Score: {score}</span>
      </div>

      <div className="relative border border-white/10 rounded-xl bg-neutral-950 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={210}
          className="w-full touch-none"
        />

        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65">
            <p className="text-white font-semibold mb-3">
              {gameOver ? "Game Over" : "Ready?"}
            </p>

            <button
              onClick={startGame}
              className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition"
            >
              {gameOver ? "Play again" : "Start"}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-neutral-500 mt-3">
        Press SPACE or touch the screen to jump.
      </p>
    </div>
  );
}
