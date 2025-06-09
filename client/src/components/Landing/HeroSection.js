import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatters";

const HeroSection = ({ onViewDemo }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [counters, setCounters] = useState({
    customers: 0,
    savings: 0,
    transactions: 0,
  });

  const rotatingTexts = [
    "that works for you",
    "reimagined for today",
    "without the hassle",
    "that grows with you",
  ];

  // Typing animation effect
  useEffect(() => {
    const currentFullText = rotatingTexts[currentTextIndex];
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex <= currentFullText.length) {
        setDisplayText(currentFullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          // Start erasing
          const eraseText = () => {
            if (currentIndex > 0) {
              setDisplayText(currentFullText.slice(0, currentIndex));
              currentIndex--;
              setTimeout(eraseText, 50);
            } else {
              setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
            }
          };
          setTimeout(eraseText, 2000);
        }, 1000);
      }
    };

    typeText();
  }, [currentTextIndex]);

  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        customers: 2000000,
        savings: 50000000,
        transactions: 1000000,
      };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          customers: Math.floor(targets.customers * progress),
          savings: Math.floor(targets.savings * progress),
          transactions: Math.floor(targets.transactions * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+";
    }
    return num.toString();
  };

  return (
    <section className="hero">
      {/* Floating background elements */}
      <div className="hero__bg-elements">
        <div className="floating-element floating-element--1">💳</div>
        <div className="floating-element floating-element--2">📱</div>
        <div className="floating-element floating-element--3">🛡️</div>
        <div className="floating-element floating-element--4">⚡</div>
        <div className="floating-element floating-element--5">📈</div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge animate-fade-in">
            <span className="badge-icon">✨</span>
            FDIC Insured • Zero Monthly Fees • Award Winning
          </div>

          <h1 className="hero__title">
            <span className="hero__title--main">Banking</span>
            <br />
            <span className="hero__title--rotating">
              {displayText}
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          <p className="hero__description animate-slide-up">
            Experience the future of banking with AI-powered insights, instant
            everything, and security that never sleeps. Join millions who've
            discovered a better way to manage money.
          </p>

          {/* Live stats counter */}
          <div className="hero__stats">
            <div className="stat-item">
              <div className="stat-number">
                {formatNumber(counters.customers)}
              </div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                ${formatNumber(counters.savings)}
              </div>
              <div className="stat-label">Total Savings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {formatNumber(counters.transactions)}
              </div>
              <div className="stat-label">Monthly Transactions</div>
            </div>
          </div>

          <div className="hero__actions">
            <button className="btn btn--primary btn--large btn--glow">
              <span className="btn-text">Start Banking Today</span>
              <span className="btn-icon">→</span>
              <div className="btn-shine"></div>
            </button>
            <button
              className="btn btn--secondary btn--large btn--interactive"
              onClick={onViewDemo}
            >
              <span className="btn-icon">▶</span>
              Watch Demo
            </button>
          </div>

          <div className="hero__trust-indicators">
            <div className="trust-badge">
              <span className="trust-icon">🏆</span>
              <span>Best Mobile App 2024</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">⭐</span>
              <span>4.9/5 App Store</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🔒</span>
              <span>Bank-Grade Security</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="visual-container">
            {/* Interactive phone mockup */}
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-time">9:41</div>
                  <div className="phone-indicators">
                    <span>📶</span>
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                <div className="phone-content">
                  <div className="app-header">
                    <h3>Good morning! 👋</h3>
                    <p>Ready to manage your money?</p>
                  </div>

                  <div className="account-cards-stack">
                    <div className="account-card-mini checking-card">
                      <div className="card-type">Checking</div>
                      <div className="card-balance">
                        {formatCurrency(2847.32)}
                      </div>
                      <div className="card-number">•••• 4829</div>
                    </div>

                    <div className="account-card-mini savings-card">
                      <div className="card-type">Savings</div>
                      <div className="card-balance">
                        {formatCurrency(16420.89)}
                      </div>
                      <div className="card-number">•••• 7392</div>
                    </div>
                  </div>

                  <div className="quick-actions">
                    <div className="action-btn">💸 Send</div>
                    <div className="action-btn">📥 Deposit</div>
                    <div className="action-btn">📊 Invest</div>
                    <div className="action-btn">💳 Pay</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating transaction notifications */}
            <div className="transaction-notifications">
              <div className="notification notification--1">
                <span className="notification-icon">✅</span>
                <div className="notification-content">
                  <div className="notification-title">Payment Sent</div>
                  <div className="notification-amount">-$24.99</div>
                </div>
              </div>

              <div className="notification notification--2">
                <span className="notification-icon">💰</span>
                <div className="notification-content">
                  <div className="notification-title">Cashback Earned</div>
                  <div className="notification-amount">+$12.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
