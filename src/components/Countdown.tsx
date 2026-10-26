"use client";

import { useEffect, useState } from "react";

function parts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso);
  const [t, setT] = useState(() => parts(target));

  useEffect(() => {
    const id = window.setInterval(() => setT(parts(target)), 1000);
    return () => window.clearInterval(id);
  }, [iso]);

  const units = [
    { n: t.days, l: "Days" },
    { n: t.hours, l: "Hours" },
    { n: t.minutes, l: "Minutes" },
    { n: t.seconds, l: "Seconds" },
  ];

  return (
    <div className="clock" role="timer" aria-live="off">
      {units.map((u) => (
        <div className="unit" key={u.l}>
          <div className="n">{String(u.n).padStart(2, "0")}</div>
          <span className="l">{u.l}</span>
        </div>
      ))}
    </div>
  );
}
