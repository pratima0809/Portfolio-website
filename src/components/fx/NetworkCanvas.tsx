"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

export default function NetworkCanvas({
  className = "",
  density = 60,
}: {
  className?: string;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let nodes: Node[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = width;
      const h = height;
      const count = Math.max(18, Math.min(density, Math.floor((w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const step = () => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1600;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const pulse = 0.5 + 0.5 * Math.sin(t + n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${0.14 + pulse * 0.28})`;
        ctx.fill();
      }

      const linkDist = 130;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const o = (1 - d / linkDist) * 0.12;
            ctx.strokeStyle = `rgba(34, 211, 238, ${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      step();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}