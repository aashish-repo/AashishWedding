"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { Atmosphere } from "@/components/Atmosphere";
import { Countdown } from "@/components/Countdown";
import { MusicToggle } from "@/components/MusicToggle";
import { NamokarScene } from "@/components/NamokarScene";
import { PortalGate } from "@/components/PortalGate";
import { Reveal } from "@/components/Reveal";

type Stage = "portal" | "namokar" | "invite";

export function InviteExperience() {
  const [stage, setStage] = useState<Stage>("portal");
  const { couple, date } = wedding;
  const entered = stage === "invite";

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  useEffect(() => {
    if (stage === "invite") window.scrollTo(0, 0);
  }, [stage]);

  return (
    <div
      className={`invite-root theme-cherry${entered ? " is-open theme-sky" : ""}`}
    >
      <Atmosphere active={entered} tone="sky" />

      <PortalGate
        visible={stage === "portal"}
        onOpen={() => setStage("namokar")}
      />

      <NamokarScene
        visible={stage === "namokar"}
        onFinished={() => setStage("invite")}
      />

      <main tabIndex={-1} aria-hidden={!entered}>
        <header className="hero hero--announce" aria-label="Wedding announcement">
          <img
            src="/brand/rj-camel.png"
            alt=""
            className="rj-sticker rj-sticker--camel"
            width={320}
            height={240}
            decoding="async"
            aria-hidden="true"
          />
          <div className="announce">
            <div className="announce__side">
              <p className="announce__rel">
                Grandson of Shree Late Mojilal Ji &amp; Shreemati Late Kesar Bai
                Ji
              </p>
              <p className="announce__rel">
                Son of Rajesh Jain and Lalita Jain
              </p>
              <p className="announce__house">Thola</p>
              <p className="announce__name">Aashish Jain</p>
            </div>

            <p className="announce__join">&amp;</p>

            <div className="announce__side">
              <p className="announce__rel">
                Granddaughter of Shree Late Poonamchand Ji &amp; Shreemati Late
                Ratan Bai Ji
              </p>
              <p className="announce__rel">
                Daughter of Ajit Jain and Archana Jain
              </p>
              <p className="announce__house">Kotiya</p>
              <p className="announce__name">Amisha Jain</p>
            </div>

            <p className="announce__marry">
              are to be married on Saturday, the 21st of November
            </p>
            <p className="announce__place">
              Location: {wedding.location.venue}, {wedding.location.city},{" "}
              {wedding.location.state}
            </p>
          </div>

          <div className="scrollcue" aria-hidden="true">
            <span>
              <i className="scrollcue__first">Scroll to begin</i>
            </span>
          </div>
        </header>

        <section className="scene scene--days" aria-label="Celebration schedule">
          <Reveal>
            <p className="eyebrow center">The celebrations</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="title center">
              Day by <em>day</em>
            </h2>
          </Reveal>

          {wedding.days.map((day) => (
            <div className={`day-block day-block--${day.n}`} key={day.n}>
              <Reveal>
                <header className={`day-heading day-heading--${day.n}`}>
                  {day.n === 1 ? (
                    <div className="day-hearts" aria-hidden="true">
                      <svg className="day-heart day-heart--lg" viewBox="0 0 24 24">
                        <path d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z" />
                      </svg>
                      <svg className="day-heart day-heart--md" viewBox="0 0 24 24">
                        <path d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z" />
                      </svg>
                      <svg className="day-heart day-heart--sm" viewBox="0 0 24 24">
                        <path d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z" />
                      </svg>
                      <svg className="day-heart day-heart--md" viewBox="0 0 24 24">
                        <path d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z" />
                      </svg>
                      <svg className="day-heart day-heart--lg" viewBox="0 0 24 24">
                        <path d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z" />
                      </svg>
                    </div>
                  ) : null}
                  <span className="day-heading__label">{day.label}</span>
                  <p className="day-heading__date">
                    {day.dow}, {day.date} {day.year}
                  </p>
                  <p className="day-heading__kick">{day.kicker}</p>
                </header>
              </Reveal>

              <div className="event-stack">
                {wedding.schedule
                  .filter((e) => e.day === day.n)
                  .map((event, i) => (
                    <Reveal key={event.id} delay={0.06 * i}>
                      <article
                        className={`event-card event-card--${event.theme}`}
                      >
                        <div className="event-card__top">
                          <p className="event-card__when">{event.when}</p>
                          <p className="event-card__time">{event.time}</p>
                        </div>
                        <h3 className="event-card__title">{event.title}</h3>
                        {event.note ? (
                          <p className="event-card__note">{event.note}</p>
                        ) : null}
                        {event.place ? (
                          <p className="event-card__place">{event.place}</p>
                        ) : null}
                        {event.palette.length > 0 ? (
                          <ul className="event-card__swatches">
                            {event.palette.map((s) => (
                              <li key={s.name}>
                                <i
                                  style={{ background: s.hex }}
                                  aria-hidden="true"
                                />
                                {s.name}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </article>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}
        </section>

        <section className="scene center" aria-label="Countdown to the wedding">
          <Reveal>
            <img
              src="/brand/rj-pagri.png"
              alt=""
              className="rj-sticker rj-sticker--pagri"
              width={220}
              height={220}
              decoding="async"
              aria-hidden="true"
            />
            <p className="eyebrow center">Counting the days</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="title">
              Until we say <em>I do</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Countdown iso={date.iso} />
          </Reveal>
          <Reveal delay={0.15}>
            <a
              className="ig-follow"
              href="https://www.instagram.com/aashish_amisha"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow aashish_amisha on Instagram"
            >
              <span className="ig-follow__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
              </span>
              <span className="ig-follow__handle">aashish_amisha</span>
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-cta">
              <span className="bg-cta__heart" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z"
                  />
                </svg>
              </span>
              <a className="bg-cta__btn" href="/bride-groom">
                Bride &amp; Groom
              </a>
              <span className="bg-cta__heart" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M12 21s-6.2-4.35-9.05-8.1C1.05 10.55 1.3 7.2 3.55 5.55 5.3 4.25 7.7 4.55 9.2 6.2L12 9.2l2.8-3c1.5-1.65 3.9-1.95 5.65-.65 2.25 1.65 2.5 5 0.6 7.35C18.2 16.65 12 21 12 21z"
                  />
                </svg>
              </span>
            </div>
          </Reveal>
        </section>

        <section className="scene center" aria-label="Venue">
          <Reveal>
            <p className="eyebrow center">Where we gather</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="title">
              Find us <em>here</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="venue">
              <h3>{wedding.location.venue}</h3>
              <p className="venue__area">
                {wedding.location.city}, {wedding.location.state},{" "}
                {wedding.location.country}
              </p>
              <p className="venue__note">
                Join us at Bandhan Resort for the celebrations.
              </p>
              <a
                className="map-link"
                href={wedding.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps →
              </a>
            </div>
          </Reveal>
        </section>

        <section className="scene center" aria-label="Gifts">
          <Reveal>
            <p className="eyebrow center">On the subject of gifts</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="title">
              Your presence <em>is</em> the present
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="soft" style={{ marginTop: "1rem" }}>
              {wedding.gifts.body}
            </p>
            <p className="mono">
              {couple.groom[0]} &amp; {couple.bride[0]}
            </p>
          </Reveal>
        </section>

        <section className="scene center" aria-label="Closing">
          <Reveal>
            <p className="eyebrow center">We can hardly wait</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="soft">{wedding.closing.body}</p>
          </Reveal>
        </section>

        <footer className="scene center">
          <Reveal>
            <p className="eyebrow center">जय जिनेन्द्र</p>
            <p
              className="soft"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              Thola · Kotiya
            </p>
          </Reveal>
        </footer>
      </main>

      <MusicToggle enabled={entered} />
    </div>
  );
}
