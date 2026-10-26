"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ScratchCard({ children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const clearedRef = useRef(false);
  const [cleared, setCleared] = useState(false);
  const [ready, setReady] = useState(false);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || clearedRef.current) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(280, Math.floor(rect.width));
    const h = Math.max(220, Math.floor(rect.height));

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#7ec8e8");
    grad.addColorStop(0.45, "#2f7eb0");
    grad.addColorStop(1, "#0a3d62");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,0.22)";
    for (let i = 0; i < 22; i++) {
      const x = (i * 47) % w;
      const y = (i * 31) % h;
      ctx.beginPath();
      ctx.arc(x, y, 10 + (i % 5), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = `600 ${Math.max(14, Math.floor(w * 0.045))}px var(--font-body), sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to reveal 💙", w / 2, h / 2);

    setReady(true);
    setCleared(false);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => paintCover(), 40);
    const onResize = () => {
      if (!drawing.current) paintCover();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", onResize);
    };
  }, [paintCover]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const radius = Math.max(24, rect.width * 0.08);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const step = 16;
    for (let i = 3; i < sample.length; i += 4 * step) {
      if (sample[i] < 40) transparent++;
    }
    const total = sample.length / (4 * step);
    if (transparent / total > 0.48) {
      clearedRef.current = true;
      setCleared(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const pointFromEvent = (
    e: React.MouseEvent | React.TouchEvent,
  ): { x: number; y: number } | null => {
    if ("touches" in e) {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return null;
      return { x: t.clientX, y: t.clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="scratch" ref={wrapRef}>
      <div className="scratch__prize" aria-hidden={cleared ? undefined : true}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className={`scratch__cover${cleared ? " is-gone" : ""}`}
        style={{ opacity: ready ? 1 : 0 }}
        onMouseDown={(e) => {
          drawing.current = true;
          const p = pointFromEvent(e);
          if (p) scratchAt(p.x, p.y);
        }}
        onMouseMove={(e) => {
          if (!drawing.current) return;
          const p = pointFromEvent(e);
          if (p) scratchAt(p.x, p.y);
        }}
        onMouseUp={() => {
          drawing.current = false;
        }}
        onMouseLeave={() => {
          drawing.current = false;
        }}
        onTouchStart={(e) => {
          drawing.current = true;
          const p = pointFromEvent(e);
          if (p) scratchAt(p.x, p.y);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          if (!drawing.current) return;
          const p = pointFromEvent(e);
          if (p) scratchAt(p.x, p.y);
        }}
        onTouchEnd={() => {
          drawing.current = false;
        }}
        aria-label="Scratch card. Scratch to reveal a message."
      />
      {!cleared ? (
        <p className="scratch__hint">Scratch gently with your finger</p>
      ) : null}
    </div>
  );
}
