import React from "react";
import { formatCurrency } from "../../utils/formatters";

const HeroSection = ({ onViewDemo }) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">FDIC Insured • Zero Monthly Fees</div>

          <h1 className="hero__title">
            Banking that <span className="hero__title--highlight">works</span>
            <br />
            <span className="hero__title--highlight">for you</span>
          </h1>

          <p className="hero__description">
            Experience modern banking with no hidden fees, instant transfers,
            and tools that help you save smarter. Join over 2 million satisfied
            customers.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary btn--large">
              Open Account Today
              <span className="btn-icon">→</span>
            </button>
            <button
              className="btn btn--secondary btn--large"
              onClick={onViewDemo}
            >
              View Demo
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="account-preview">
            <div className="account-preview__card account-preview__card--checking">
              <div className="card-header">
                <div className="card-icon">💳</div>
                <div className="card-plus">+</div>
              </div>
              <div className="card-type">Checking Account</div>
              <div className="card-number">•••• •••• •••• 4829</div>
              <div className="card-balance">{formatCurrency(2847.32)}</div>
              <div className="card-label">Available Balance</div>
            </div>

            <div className="account-preview__card account-preview__card--savings">
              <div className="card-header">
                <div className="card-icon">🐷</div>
                <div className="card-plus">+</div>
              </div>
              <div className="card-type">Savings Account</div>
              <div className="card-number">•••• •••• •••• 7392</div>
              <div className="card-balance">{formatCurrency(16420.89)}</div>
              <div className="card-label">Available Balance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
