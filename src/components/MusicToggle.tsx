"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

type Props = {
  enabled: boolean;
};

export function MusicToggle({ enabled }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !enabled) return;
    if (on) {
      a.play().catch(() => setOn(false));
    } else {
      a.pause();
    }
  }, [on, enabled]);

  if (!enabled) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.themeAudio}
        preload="none"
        onEnded={(e) => {
          const el = e.currentTarget;
          el.currentTime = 0;
          el.play().catch(() => {});
        }}
      />
      <button
        type="button"
        className={`music${on ? " on" : ""}`}
        aria-pressed={on}
        aria-label={on ? "Turn music off" : "Turn music on"}
        onClick={() => setOn((v) => !v)}
      >
        <span className="eq" aria-hidden="true">
          <b />
          <b />
          <b />
          <b />
        </span>
        <span>{on ? "Sound on" : "Sound off"}</span>
      </button>
    </>
  );
}
