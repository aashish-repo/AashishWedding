"use client";

import { useEffect, useRef } from "react";

type Props = {
  active: boolean;
  tone?: "cherry" | "sky";
};

export function Atmosphere({ active, tone = "cherry" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const petals: {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      rot: number;
      vr: number;
      a: number;
    }[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const spawn = (fromTop: boolean) => {
      petals.push({
        x: Math.random() * w,
        y: fromTop ? -20 : Math.random() * h,
        r: 3 + Math.random() * 5,
        vy: 0.25 + Math.random() * 0.55,
        vx: -0.25 + Math.random() * 0.5,
        rot: Math.random() * Math.PI * 2,
        vr: -0.02 + Math.random() * 0.04,
        a: 0.25 + Math.random() * 0.35,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const target = Math.min(36, Math.floor(w / 40));
      while (petals.length < target) spawn(petals.length > 8);

      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
        p.rot += p.vr;
        if (p.y > h + 30) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle =
          tone === "sky"
            ? `rgba(70, 150, 210, ${p.a})`
            : `rgba(196, 30, 58, ${p.a})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
  }, [active, tone]);

  return (
    <>
      <div
        className={`atmosphere${tone === "sky" ? " atmosphere--sky" : ""}`}
        aria-hidden="true"
      >
        <div className="atmosphere__motif" />
      </div>
      <canvas ref={canvasRef} className="embers" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div ref={progressRef} className="progress" aria-hidden="true" />
    </>
  );
}
