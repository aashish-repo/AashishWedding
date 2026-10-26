"use client";

import { useEffect, useRef, useState } from "react";
import { RoseShower } from "@/components/RoseShower";
import { wedding } from "@/data/wedding";

type Props = {
  visible: boolean;
  onFinished: () => void;
};

export function NamokarScene({ visible, onFinished }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [hint, setHint] = useState("playing…");
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const a = audioRef.current;
    /* Let mantra keep playing softly into the invite; only stop if user skipped early */
    setActiveLines(wedding.invocation.lines.map((_, i) => i));
    setHint("");
    window.setTimeout(onFinished, 600);
    void a;
  };

  useEffect(() => {
    if (!visible) return;
    doneRef.current = false;
    setActiveLines([]);
    setHint("playing…");

    const a = audioRef.current;
    if (!a) return;

    a.play().catch(() => setHint("tap to play mantra"));

    const onTime = () => {
      const t = a.currentTime;
      const duration =
        a.duration && Number.isFinite(a.duration)
          ? a.duration
          : wedding.invocation.duration;
      const scale = duration / wedding.invocation.duration;
      const on: number[] = [];
      wedding.invocation.lines.forEach((line, i) => {
        if (t >= line.from * scale) on.push(i);
      });
      setActiveLines(on);
    };

    const onEnded = () => finish();
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);

    const fallback = window.setTimeout(
      finish,
      (wedding.invocation.duration + 3) * 1000
    );

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
      window.clearTimeout(fallback);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="gate gate--namokar"
      role="dialog"
      aria-modal="true"
      aria-label="Navkar Mantra"
    >
      <RoseShower active />
      <div className="gate__inner">
        <audio ref={audioRef} src={wedding.invocation.chant} preload="auto" />

        <p className="namokar-kicker">जय जिनेन्द्र</p>
        <p className="inv-salutation">{wedding.invocation.salutation}</p>

        <div
          className="inv-verse inv-verse--wide"
          aria-live="polite"
          role="button"
          tabIndex={0}
          onClick={() => {
            const a = audioRef.current;
            if (a?.paused) {
              a.play().catch(() => {});
              setHint("playing…");
            } else {
              finish();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              finish();
            }
          }}
        >
          {wedding.invocation.lines.map((line, i) => (
            <p
              key={line.text}
              className={`inv-verse__line${activeLines.includes(i) ? " is-on" : ""}`}
            >
              {line.text}
            </p>
          ))}
        </div>

        <div className="inv-hint">{hint || "entering…"}</div>

        <button type="button" className="enter enter--ghost" onClick={finish}>
          Continue
        </button>
      </div>
    </div>
  );
}
