"use client";

import { RoseShower } from "@/components/RoseShower";
import { Sathiya } from "@/components/Sathiya";
import { wedding } from "@/data/wedding";

type Props = {
  visible: boolean;
  onOpen: () => void;
};

export function PortalGate({ visible, onOpen }: Props) {
  if (!visible) return null;

  return (
    <div
      className="gate gate--portal"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation. Open to begin."
    >
      <RoseShower active />

      <div className="gate__inner gate__inner--portal">
        <p className="portal-mangal">श्रीं पार्श्वनाथाय नमः</p>

        <Sathiya className="sathiya sathiya--portal" />

        <p className="portal-names">
          {wedding.couple.groom} <span className="amp">&amp;</span>{" "}
          {wedding.couple.bride}
        </p>

        <div className="portal-logo">
          <img
            src="/brand/logo.jpg"
            alt="Aashish and Amisha — एक दूजे के हमेशा"
            className="portal-logo__img"
            width={720}
            height={900}
            decoding="async"
          />
        </div>

        <p className="gate__tag">{wedding.portal.tag}</p>

        <button type="button" className="enter" onClick={onOpen}>
          {wedding.portal.cta}
        </button>

        <div className="portal-footer">
          <div className="portal-footer__rule" aria-hidden="true">
            <i />
            <span>✦</span>
            <i />
          </div>
          <p className="portal-plans">Clear your plans</p>
          <p className="portal-cursive">We are getting married, you are coming</p>
        </div>
      </div>
    </div>
  );
}
