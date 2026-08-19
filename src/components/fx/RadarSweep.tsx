"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Blip = { a: number; d: number; v: number; r: number; life: number };

export default function RadarSweep({
  className = "",
  hue = "34, 211, 238",
  speed = 0.02,
}: {
  className?: string;
  hue?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let angle = -Math.PI / 2;
    let raf = 0;
    let blips: Blip[] = [];
    let lastBlip = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.46;

      // afterglow trail
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5, 7, 12, 0.14)";
      ctx.fillRect(0, 0, w, h);

      // rings
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hue}, ${i === 4 ? 0.22 : 0.1})`;
        ctx.stroke();
      }
      // cross ticks
      ctx.strokeStyle = `rgba(${hue}, 0.07)`;
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.lineTo(cx + R, cy);
      ctx.moveTo(cx, cy - R);
      ctx.lineTo(cx, cy + R);
      ctx.stroke();

      // rotating beam with trailing wedge
      const a = angle + Math.PI / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, `rgba(${hue}, 0.001)`);
      grad.addColorStop(0.55, `rgba(${hue}, 0.14)`);
      grad.addColorStop(0.85, `rgba(${hue}, 0.28)`);
      grad.addColorStop(0.95, `rgba(${hue}, 0.42)`);
      grad.addColorStop(1, `rgba(${hue}, 0.55)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a - 0.09, a);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hue}, 0.9)`;
      ctx.fill();

      // blips
      if (t - lastBlip > 700) {
        lastBlip = t;
        blips.push({
          a: Math.random() * Math.PI * 2,
          d: 0.25 + Math.random() * 0.65,
          v: Math.random() * 1.4 + 0.8,
          r: 1 + Math.random() * 1.6,
          life: 0,
        });
      }
      blips = blips.filter((b) => b.life < 1);
      for (const b of blips) {
        b.life += 0.012;
        b.d += b.v * 0.00035;
        const x = cx + Math.cos(b.a) * R * b.d;
        const y = cy + Math.sin(b.a) * R * b.d;
        const fade = 1 - b.life;
        ctx.beginPath();
        ctx.arc(x, y, b.r * (1 + b.life * 2.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hue}, ${0.5 * fade})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hue}, ${0.85 * fade})`;
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // static snapshot
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.46;
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hue}, ${i === 4 ? 0.2 : 0.09})`;
        ctx.stroke();
      }
    } else {
      // seed trail with base fill
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.fillStyle = "rgba(5, 7, 12, 1)";
      ctx.fillRect(0, 0, w, h);
      const animate = (t: number) => {
        angle += speed;
        draw(t);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, hue, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}