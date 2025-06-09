import React from "react";

const SecuritySection = () => {
  return (
    <section id="security" className="security">
      <div className="security__container">
        <div className="security__content">
          <h2 className="security__title">
            Your money is{" "}
            <span className="security__title--highlight">safe and secure</span>
          </h2>
          <p className="security__description">
            We use the same security measures as the world's largest banks to
            protect your accounts and personal information.
          </p>

          <div className="security__features">
            <div className="security-feature">
              <div className="security-feature__icon">✅</div>
              <div className="security-feature__content">
                <h3 className="security-feature__title">FDIC Insured</h3>
                <p className="security-feature__description">
                  Your deposits are insured up to $250,000 by the FDIC
                </p>
              </div>
            </div>

            <div className="security-feature">
              <div className="security-feature__icon">✅</div>
              <div className="security-feature__content">
                <h3 className="security-feature__title">256-bit Encryption</h3>
                <p className="security-feature__description">
                  Military-grade encryption protects all your data
                </p>
              </div>
            </div>

            <div className="security-feature">
              <div className="security-feature__icon">✅</div>
              <div className="security-feature__content">
                <h3 className="security-feature__title">
                  24/7 Fraud Monitoring
                </h3>
                <p className="security-feature__description">
                  Advanced AI monitors your accounts for suspicious activity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="security__visual">
          <div className="security-panel">
            <div className="security-panel__header">
              <div className="security-panel__icon">🔒</div>
              <h3>Security Center</h3>
              <span className="security-panel__status">
                All systems operational
              </span>
            </div>

            <div className="security-items">
              <div className="security-item">
                <span>Account Protection</span>
                <span className="security-item__status security-item__status--active">
                  Active
                </span>
              </div>
              <div className="security-item">
                <span>Fraud Monitoring</span>
                <span className="security-item__status security-item__status--active">
                  Active
                </span>
              </div>
              <div className="security-item">
                <span>Data Encryption</span>
                <span className="security-item__status security-item__status--active">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
