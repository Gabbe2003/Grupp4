import React from "react";
import "../scss/Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <div className="footer-adress">
          <p className="footer__info-title">Hitta Oss:</p>
          <p className="footer__info">hejgatan 123</p>
          <p className="footer__info">Stockholm</p>
          <p className="footer__info">543 21</p>
        </div>
        <div className="footer-contact">
          <p className="footer__info-title">Kontakta oss:</p>
          <p className="footer__info">asdasd@asdasd.se</p>
          <p className="footer__info">01-123456</p>
        </div>
        <div className="footer-google">Google hitta oss karta</div>
      </section>
    </footer>
  );
};
