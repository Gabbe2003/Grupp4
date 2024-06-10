import React from "react";
import "../scss/Footer.scss";
import MapComponent from "./MapComponent";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <div className="footer-adress">
          <p className="footer__info-title">Hitta Oss:</p>
          <p className="footer__info">Gustavslundsvägen 151 D</p>
          <p className="footer__info">Bromma</p>
          <p className="footer__info">167 51</p>
        </div>
        <div className="footer-contact">
          <p className="footer__info-title">Kontakta oss:</p>
          <p className="footer__info">asdasd@asdasd.se</p>
          <p className="footer__info">01-123456</p>
        </div>
        <div className="footer-google">
          <MapComponent />
        </div>
      </section>
    </footer>
  );
};
