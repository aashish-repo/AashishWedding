"use client";

import Link from "next/link";
import { Atmosphere } from "@/components/Atmosphere";
import { ScratchCard } from "@/components/ScratchCard";

export function BrideGroomPage() {
  return (
    <div className="invite-root theme-sky couple-page">
      <Atmosphere active tone="sky" />

      <main className="couple">
        <Link href="/" className="couple__back">
          ← Back to invite
        </Link>

        <p className="eyebrow center">Bride &amp; Groom</p>
        <h1 className="title center couple__title">
          Aashish <em>&amp;</em> Amisha
        </h1>

        <figure className="couple__photo">
          <img
            src="/brand/bride-groom.jpeg"
            alt="Aashish and Amisha"
            width={1600}
            height={1067}
            decoding="async"
          />
        </figure>

        <ScratchCard>
          <div className="scratch__notes">
            <div className="scratch__note">
              <p className="scratch__note-label">In his words</p>
              <p className="scratch__note-body">
                Amisha is a child at heart, and that is the most amazing quality
                you can find in a partner. She is always excited about
                everything. I cannot remember a time she said no to me. She is
                the most caring and loving person. 💙
              </p>
            </div>
            <div className="scratch__note">
              <p className="scratch__note-label">In her words</p>
              <p className="scratch__note-body">
                Aashish is my heart and my everything. For the things I do not
                know, he is already aware, he seems to know it all. He is gentle
                and caring, and at the same time so humble. 💙
              </p>
            </div>
          </div>
        </ScratchCard>
      </main>
    </div>
  );
}
