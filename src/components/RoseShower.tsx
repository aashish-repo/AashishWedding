"use client";

import { useEffect, useRef } from "react";

/** Falling red rose petal shower for the portal / first page */
export function RoseShower({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    type Petal = {
      x: number;
      y: number;
      s: number;
      vy: number;
      vx: number;
      rot: number;
      vr: number;
      sway: number;
      swaySpeed: number;
      color: string;
      a: number;
    };

    const petals: Petal[] = [];
    const colors = [
      "135,206,235",
      "100,170,210",
      "70,150,200",
      "160,215,240",
      "90,160,205",
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (fromTop: boolean) => {
      petals.push({
        x: Math.random() * w,
        y: fromTop ? -30 - Math.random() * 80 : Math.random() * h,
        s: 6 + Math.random() * 12,
        vy: 0.45 + Math.random() * 1.1,
        vx: -0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI * 2,
        vr: -0.04 + Math.random() * 0.08,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        a: 0.45 + Math.random() * 0.45,
      });
    };

    const drawRosePetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(p.s / 10, p.s / 10);
      ctx.fillStyle = `rgba(${p.color}, ${p.a})`;
      ctx.beginPath();
      // Soft rose-petal silhouette
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(5, -6, 7, -2, 6, 2);
      ctx.bezierCurveTo(4, 7, 1, 9, 0, 10);
      ctx.bezierCurveTo(-1, 9, -4, 7, -6, 2);
      ctx.bezierCurveTo(-7, -2, -5, -6, 0, -6);
      ctx.closePath();
      ctx.fill();
      // Subtle highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${p.a * 0.45})`;
      ctx.beginPath();
      ctx.ellipse(-1.5, -1, 1.8, 3.2, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const target = Math.min(48, Math.floor(w / 22));
      while (petals.length < target) spawn(petals.length > 12);

      for (const p of petals) {
        p.sway += p.swaySpeed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.sway) * 0.55;
        p.rot += p.vr;
        if (p.y > h + 40) {
          p.y = -30;
          p.x = Math.random() * w;
        }
        drawRosePetal(p);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="rose-shower"
      aria-hidden="true"
    />
  );
}
