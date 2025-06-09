import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="logo-icon">B</div>
              <span className="logo-text">BitiBank</span>
            </div>
            <p className="footer__description">
              Modern banking designed for the way you live. Simple, secure, and
              always there when you need it.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Products</h4>
              <ul className="footer__link-list">
                <li>
                  <a href="#" className="footer__link">
                    Checking Account
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Savings Account
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Credit Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Loans
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Support</h4>
              <ul className="footer__link-list">
                <li>
                  <a href="#" className="footer__link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__link-list">
                <li>
                  <a href="#" className="footer__link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Investors
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__cta">
            <h3 className="footer__cta-title">
              Ready to start banking better?
            </h3>
            <p className="footer__cta-text">
              Join over 2 million customers who've discovered a better way to
              bank. Open your account in minutes.
            </p>
            <div className="footer__cta-actions">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__email-input"
              />
              <button className="btn btn--primary">Get Started</button>
            </div>
            <p className="footer__disclaimer">
              No minimum balance • No monthly fees • FDIC insured up to $250,000
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
